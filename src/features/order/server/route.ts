// app/api/orders/route.ts
import { Hono } from "hono";
import prisma from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono()

// Get all orders with search
.get("/", async (c) => {
  const { search } = c.req.query();
  
  try {
    const orders = await prisma.order.findMany({
      where: search ? {
        OR: [
          { orderNumber: { contains: search, mode: "insensitive" } },
          { user: { 
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } }
            ]
          } }
        ]
      } : {},
      include: {
        user: { select: { id: true, name: true, email: true } },
        items: { include: { product: true } },
        shippingMethod: true,
        payment: true
      },
      orderBy: { createdAt: "desc" }
    });

    return c.json({ orders });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return c.json({ error: "Failed to fetch orders" }, 500);
  }
})

// Update order status
.patch("/:id", zValidator("json", z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"]),
  paymentStatus: z.enum(["PENDING", "COMPLETED", "FAILED"])
})), async (c) => {
  const id = c.req.param("id");
  const { status, paymentStatus } = await c.req.json();

  try {
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status, paymentStatus },
      include: { user: true, items: true }
    });

    return c.json(updatedOrder);
  } catch (error) {
    console.error("Failed to update order:", error);
    return c.json({ error: "Failed to update order" }, 500);
  }
})

// Delete order
.delete("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    await prisma.$transaction([
      prisma.orderItem.deleteMany({ where: { orderId: id } }),
      prisma.payment.deleteMany({ where: { orderId: id } }),
      prisma.order.delete({ where: { id } })
    ]);

    return c.json({ success: true });
  } catch (error) {
    console.error("Failed to delete order:", error);
    return c.json({ error: "Failed to delete order" }, 500);
  }
});

export default app;