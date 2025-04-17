import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { LoginSchema, RegisterSchema } from "../schema";
import Jwt from "jsonwebtoken";
import { deleteCookie, setCookie } from "hono/cookie";

import bcrypt from "bcryptjs"; 
import prisma from "@/lib/prisma";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";

const app = new Hono()
.get("/current",
    sessionMiddleware,
    (c)=>{
    const user = c.get("user");

    return c.json({data:user});
})
  .post("/register", zValidator("json", RegisterSchema), async (c) => {
    const { name, email, password } = c.req.valid("json");

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return c.json({ error: "User already exists" }, 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

    
      return c.json(user, 201);
    } catch (error) {
      console.error("Error during registration", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  })
  .post("/login", zValidator("json", LoginSchema), async (c) => {
    const { email, password } = c.req.valid("json");

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !user.password) {
        return c.json({ error: "Invalid credentials" }, 401);
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return c.json({ error: "Invalid credentials" }, 401);
      }

      const token = Jwt.sign(
        { id: user.id, email: user.email},
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );

      setCookie(c, AUTH_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, 
      });

      return c.json({ message: "Logged in successfully" });
    } catch (error) {
      console.error("Login error:", error);
      return c.json({ error: "Internal Server Error" }, 500);
    }
  })
  .post("/logout", sessionMiddleware, async (c) => {
    deleteCookie(c, AUTH_COOKIE, {
      path: "/",
    });

    c.set("user", null);
  
    return c.json({ success: true, message: "Logged out successfully" });
  });
  

export default app;
