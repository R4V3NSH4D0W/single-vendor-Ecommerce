import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { LoginSchema, RegisterSchema } from "../schema";
import Jwt from "jsonwebtoken";
import { deleteCookie, setCookie } from "hono/cookie";

import bcrypt from "bcryptjs"; 
import prisma from "@/lib/prisma";
import { AUTH_COOKIE } from "../constants";
import { sessionMiddleware } from "@/lib/session-middleware";
import { randomBytes } from "crypto";
import { addMinutes } from "date-fns";
import { OTPType } from "@/generated/prisma";
import { sendEmail } from "@/lib/email";
import { z } from "zod";

const generateOtpCode = (length: number = 6): string => {
  return randomBytes(length).toString('hex').slice(0, length).toUpperCase();
};

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
        { id: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: "7d" }
      );
  
      setCookie(c, AUTH_COOKIE, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
  
      return c.json({
        message: "Logged in successfully",
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
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
  })


.post(
  '/otp/generate',
  zValidator(
    'json',
    z.object({
      email: z.string().email(),
      type: z.nativeEnum(OTPType),
    })
  ),
  async (c) => {
    const { email, type } = c.req.valid('json');

    try {
      let user = null;

      const shouldCheckUser = [OTPType.LOGIN_OTP, OTPType.PASSWORD_RESET].includes(type as any);
      if (shouldCheckUser) {
        user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return c.json({ error: 'User not found' }, 404);
        }
      }

      const existingOtp = await prisma.oTPVerification.findFirst({
        where: {
          email,
          type,
          verified: false,
          expiresAt: {
            gt: new Date(),
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (existingOtp) {
        const now = new Date();
        const remainingMs = existingOtp.expiresAt.getTime() - now.getTime();
        const remainingSec = Math.ceil(remainingMs / 1000);

        return c.json({
          error: `OTP already sent. Please wait ${remainingSec} seconds before requesting again.`,
          remainingSeconds: remainingSec,
        }, 429);
      }

      const otpCode = generateOtpCode();
      const expiresAt = addMinutes(new Date(), 5);

      await prisma.oTPVerification.create({
        data: {
          userId: shouldCheckUser ? user?.id : null,
          email,
          code: otpCode,
          type,
          expiresAt,
        },
      });

      await sendEmail({
        to: email,
        subject: 'Your OTP Code',
        otp: otpCode,
    
      });

      return c.json({ message: 'OTP sent successfully' });
    } catch (error) {
      console.error('Error generating OTP:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  }
)


.post(
  '/otp/verify',
  zValidator('json', z.object({
    email: z.string().email(),
    otpCode: z.string(),
  })),
  async (c) => {
    const { email, otpCode } = c.req.valid('json');

    try {
      const otpVerification = await prisma.oTPVerification.findFirst({
        where: {
          email,
          code: otpCode,
          verified: false,
        },
      });

      if (!otpVerification) {
        return c.json({ error: 'Invalid or expired OTP' }, 400);
      }

      if (new Date() > otpVerification.expiresAt) {
        return c.json({ error: 'OTP has expired' }, 400);
      }

  
      await prisma.oTPVerification.update({
        where: { id: otpVerification.id },
        data: { verified: true },
      });

      return c.json({ message: 'OTP verified successfully' }, 200);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  }
);


  

export default app;
