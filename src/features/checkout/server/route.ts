// // app/api/orders/route.ts
// import { Hono } from "hono";
// import { sessionMiddleware } from "@/lib/session-middleware";
// import { z } from "zod";
// import { zValidator } from "@hono/zod-validator";
// import  prisma  from "@/lib/prisma";
// import { PaymentInfo, ShippingInfo, ShippingMethod } from "../types";

// const app = new Hono();

// // Order schema using Redux types
// const orderSchema = z.object({
//   shippingInfo: z.custom<ShippingInfo>(),
//   shippingMethod: z.custom<ShippingMethod>(),
//   paymentMethod: z.enum(['card', 'cod']),
//   paymentInfo: z.custom<PaymentInfo | null>().optional(),
// });

// app.post(
//   '/',
//   sessionMiddleware,
//   zValidator('json', orderSchema),
//   async (c) => {
//     try {
//       const user = c.get("user");
//       if (!user) return c.json({ error: "Unauthorized" }, 401);

//       const { 
//         shippingInfo,
//         shippingMethod,
//         paymentMethod,
//         paymentInfo
//       } = c.req.valid('json');

//       // Get cart items
//       const cartItems = await prisma.cartItem.findMany({
//         where: { userId: user.id },
//         include: { product: true },
//       });

//       if (cartItems.length === 0) {
//         return c.json({ error: "Cart is empty" }, 400);
//       }

//       // Calculate totals
//       const subtotal = cartItems.reduce(
//         (acc, item) => acc + (item.product.price * item.quantity),
//         0
//       );

//       const tax = subtotal * 0.08;
//       const total = subtotal + shippingMethod.cost + tax;

//       // Stock validation
//       const stockValid = cartItems.every(
//         item => item.product.stock >= item.quantity
//       );
      
//       if (!stockValid) {
//         return c.json({ error: "Insufficient stock" }, 400);
//       }

//       // Create order transaction
//       const order = await prisma.$transaction(async (prisma) => {
//         // Create order
//         const order = await prisma.order.create({
//           data: {
//             user: { connect: { id: user.id } },
//             totalAmount: total,
//             subtotal,
//             shippingCost: shippingMethod.cost,
//             tax,
//             paymentMethod,
//             shippingAddress: shippingInfo.address,
//             shippingCity: shippingInfo.city,
//             shippingState: shippingInfo.state,
//             shippingPostalCode: shippingInfo.zipCode,
//             shippingCountry: shippingInfo.country,
//             status: 'PENDING',
//             items: {
//               create: cartItems.map(item => ({
//                 productId: item.productId,
//                 quantity: item.quantity,
//                 price: item.product.price,
//                 size: item.size,
//                 color: item.color
//               }))
//             }
//           }
//         });

//         // Handle payment
//         if (paymentMethod === 'card' && paymentInfo) {
//           await prisma.payment.create({
//             data: {
//               orderId: order.id,
//               amount: total,
//               method: 'CARD',
//               last4Digits: paymentInfo.cardNumber?.slice(-4) || '',
//               expirationDate: paymentInfo.expiry,
//               status: 'COMPLETED'
//             }
//           });
//         }

//         // Update product stock
//         await Promise.all(
//           cartItems.map(item =>
//             prisma.product.update({
//               where: { id: item.productId },
//               data: { stock: { decrement: item.quantity } }
//             })
//           )
//         );

//         // Clear cart
//         await prisma.cartItem.deleteMany({
//           where: { userId: user.id }
//         });

//         return order;
//       });

//       return c.json({
//         success: true,
//         orderId: order.id,
//         total,
//         paymentStatus: paymentMethod === 'cod' ? 'PENDING' : 'COMPLETED'
//       });

//     } catch (error) {
//       console.error("Order error:", error);
//       return c.json({ error: "Order failed" }, 500);
//     }
//   }
// );

// export default app;