import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import prisma from "@/lib/prisma";
import { addressSchema } from "../schema";
import { sessionMiddleware } from "@/lib/session-middleware";
import { z } from "zod";

const app = new Hono()
.post("/",sessionMiddleware, zValidator('json',addressSchema), async (c) => {
    const user = c.get("user")
    const body = c.req.valid('json');

    if (!user?.id) {
        return c.json({ error: "User not authenticated" }, 401);
    }

    const address = await prisma.address.create({
        data:{
            userId: user.id,
            label: body.label,
            street: body.street,
            city: body.city,
            state: body.state,
            country: body.country,
            postalCode: body.postalCode,
            isDefault: body.isDefault ?? false,
        }
    });
    return c.json({message:"Address Saved Successfully",data:address});
    
})
.get("/", sessionMiddleware, async (c) => {
  const user = c.get("user");

  if (!user?.id) {
    return c.json({ error: "User not authenticated" }, 401);
  }

const addresses = await prisma.address.findMany({
  where: { userId: user.id },
  orderBy: { createdAt: "desc" },
  select: {
    id: true,
    label: true,
    street: true,
    city: true,
    state: true,
    postalCode: true,
    country: true,
    isDefault: true,
    createdAt: true,
    updatedAt: true,
  },
});

  return c.json({ data: addresses });
})

.put(
  ":id",
  sessionMiddleware,
  zValidator("json", addressSchema),
  async (c) => {
    const user = c.get("user");
    if (!user?.id) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    const userId = user.id;
    const addressId = c.req.param("id");
    const data = c.req.valid("json");

    const existing = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existing || existing.userId !== userId) {
      return c.json({ error: "Address not found or unauthorized" }, 404);
    }

    if (data.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId,
          id: { not: addressId },
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const updated = await prisma.address.update({
      where: { id: addressId },
      data: {
        label: data.label,
        street: data.street,
        city: data.city,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        isDefault: data.isDefault ?? false,
      },
    });

    return c.json({ message: "Address updated", data: updated });
  }
)
.put(
  "default/:id",
  sessionMiddleware,
  zValidator("json", z.object({ isDefault: z.boolean() })),
  async (c) => {
    const user = c.get("user");
    if (!user?.id) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    const userId = user.id;
    const addressId = c.req.param("id");
    const data = c.req.valid("json");

    const existing = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existing || existing.userId !== userId) {
      return c.json({ error: "Address not found or unauthorized" }, 404);
    }

    if (data.isDefault) {
      await prisma.address.updateMany({
        where: {
          userId,
          id: { not: addressId },
          isDefault: true,
        },
        data: {
          isDefault: false,
        },
      });
    }

    const updated = await prisma.address.update({
      where: { id: addressId },
      data: {
        isDefault: data.isDefault,
      },
    });

    return c.json({ message: "Default address updated", data: updated });
  }
)
.delete(
  ":id",
  sessionMiddleware,
  async (c) => {
    const user = c.get("user");
    if (!user?.id) {
      return c.json({ error: "User not authenticated" }, 401);
    }

    const userId = user.id;
    const addressId = c.req.param("id");
    const existing = await prisma.address.findUnique({
      where: { id: addressId },
    });

    if (!existing || existing.userId !== userId) {
      return c.json({ error: "Address not found or unauthorized" }, 404);
    }

    await prisma.address.delete({
      where: { id: addressId },
    });

    return c.json({ message: "Address deleted successfully" });
  }
)



export default app;