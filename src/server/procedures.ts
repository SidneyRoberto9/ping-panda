import { HTTPException } from "hono/http-exception"

import { db } from "@/db"
import { auth as currentAuth } from "@clerk/nextjs/server"

import { j } from "./__internals/j"

const authMiddleware = j.middleware(async ({ c, next }) => {
  const authHeader = c.req.header("Authorization")

  if (authHeader) {
    const apiKey = authHeader.split(" ")[1] // bearer <API_KEY>

    const user = await db.user.findUnique({
      where: { apiKey },
    })

    if (user) {
      return next({ user })
    }
  }

  const { userId } = await currentAuth()

  if (!userId) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  const user = await db.user.findUnique({
    where: { externalId: userId },
  })

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  return next({ user })
})

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = j.procedure
export const publicProcedure = baseProcedure
export const privateProcedure = publicProcedure.use(authMiddleware)
