import { addMonths, startOfMonth } from "date-fns"

import { FREE_QUOTA, PRO_QUOTA } from "@/config"
import { db } from "@/db"
import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"

const projectRouter = router({
  getUsage: privateProcedure.query(async ({ c, ctx }) => {
    const { user } = ctx

    const currentDate = startOfMonth(new Date())

    const quota = await db.quota.findFirst({
      where: {
        userId: user.id,
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
      },
    })

    const eventCount = quota?.count ?? 0

    const categoryCount = await db.eventCategory.count({
      where: { userId: user.id },
    })

    const limits = user.plan === "PRO" ? PRO_QUOTA : FREE_QUOTA

    const resetDate = addMonths(currentDate, 1)

    return c.superjson({
      categoriesUser: categoryCount,
      categoriesLimits: limits.maxEventCategories,
      eventsUsed: eventCount,
      eventsLimits: limits.maxEventsPerMonth,
      resetDate,
    })
  }),
})

export default projectRouter
