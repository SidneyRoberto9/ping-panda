import { createCheckOutSession } from "@/lib/stripe"
import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"

const paymentRouter = router({
  createCheckOutSession: privateProcedure.mutation(async ({ c, ctx }) => {
    const { user } = ctx

    const session = await createCheckOutSession({
      userEmail: user.email,
      userId: user.id,
    })

    return c.json({ url: session.url })
  }),
})

export default paymentRouter
