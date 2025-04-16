
import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'

import jwt from 'jsonwebtoken'
import prisma from '@/lib/prisma'
import { AUTH_COOKIE } from '@/features/auth/constants'


type CustomContext = {
  Variables: {
    prisma: typeof prisma
    user: {
      id: string
      email: string
      name: string
    } | null
  }
}

export const sessionMiddleware = createMiddleware<CustomContext>(async (c, next) => {
  const token = getCookie(c, AUTH_COOKIE)

  c.set('prisma', prisma)

  if (!token) {
    c.set('user', null)
    return await next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      email: string
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    })

    if (!user) {
      c.set('user', null)
      return await next()
    }

    c.set('user', { id: user.id, email: user.email, name: user.name })
  } catch (err) {
    console.error('Invalid token', err)
    c.set('user', null)
  }

  await next()
})
