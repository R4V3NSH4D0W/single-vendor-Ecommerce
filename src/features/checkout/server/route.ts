import { Hono } from "hono";
import { sessionMiddleware } from "@/lib/session-middleware";
import prisma from "@/lib/prisma";

const app = new Hono()

.post("/", sessionMiddleware, async (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { shippingInfo, paymentInfo, shippingMethod } = await c.req.json();

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return c.json({ message: "Cart is empty" }, 400);
  }

  const shipping = await prisma.shippingMethod.findUnique({
    where: { id: shippingMethod.id },
  });

  if (!shipping) {
    return c.json({ message: "Invalid shipping method" }, 400);
  }

  const subtotal = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shippingCost = shippingMethod.cost;
  const tax = subtotal * 0.08;
  const totalAmount = subtotal + shippingCost + tax;

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      return c.json(
        { message: `Insufficient stock for ${item.product.name}` },
        400
      );
    }
  }

  try {
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        userId: user.id,
        subtotal,
        totalAmount,
        tax,
        shippingCost,
        shippingMethodId: shippingMethod.id,
        shippingAddress: shippingInfo.address,
        shippingCity: shippingInfo.city,
        shippingState: shippingInfo.state,
        shippingPostalCode: shippingInfo.zipCode,
        shippingCountry: shippingInfo.country,
        paymentMethod: paymentInfo.paymentMethod === "card" ? "CARD" : "COD",
        items: {
          create: cart.items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
            size: item.size,
            color: item.color,
          })),
        },
        ...(paymentInfo.paymentMethod === "card" && paymentInfo.cardNumber && {
          payment: {
            create: {
              amount: totalAmount,
              method: "CARD",
              transactionId: paymentInfo.cardNumber,
              last4Digits: paymentInfo.cardNumber.slice(-4),
              expirationDate: paymentInfo.expirationDate,
              status: "COMPLETED",
            },
          },
        }),
      },
    });

    // ✅ Decrease stock for each product
    for (const item of cart.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // ✅ Clear the cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return c.json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error("Error placing order:", error);
    return c.json({ message: "Error placing order" }, 500);
  }
})

.get("/shipping-methods", async (c) => {
  try {
    const shippingMethods = await prisma.shippingMethod.findMany({
      where: { active: true },
      orderBy: { cost: "asc" },
    });

    return c.json({ shippingMethods });
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    return c.json({ error: "Failed to fetch shipping methods" }, 500);
  }
});

export default app;
