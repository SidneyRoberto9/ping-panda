import { startOfMonth } from "date-fns"
import { HTTPException } from "hono/http-exception"
import { z } from "zod"

import { db } from "@/db"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"
import { router } from "@/server/__internals/router"
import { privateProcedure } from "@/server/procedures"
import { parseColor } from "@/utils"

const categoryRouter = router({
  getEventCategories: privateProcedure.query(async ({ c, ctx }) => {
    const categories = await db.eventCategory.findMany({
      where: { userId: ctx.user.id },
      select: {
        id: true,
        name: true,
        emoji: true,
        color: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: { updatedAt: "desc" },
    })

    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const now = new Date()
        const firstDayOfMonth = startOfMonth(now)

        const [uniqueFieldCount, eventsCount, lastPing] = await Promise.all([
          db.event
            .findMany({
              where: {
                eventCategory: { id: category.id },
              },
              select: { fields: true },
              distinct: ["fields"],
            })
            .then((events) => {
              const fieldNames = new Set<string>()

              events.forEach((event) =>
                Object.keys(event.fields as Object).forEach((fieldName) =>
                  fieldNames.add(fieldName)
                )
              )

              return fieldNames.size
            }),
          db.event.count({
            where: { eventCategory: { id: category.id } },
          }),
          db.event.findFirst({
            where: { eventCategory: { id: category.id } },
            orderBy: { createdAt: "desc" },
            select: { createdAt: true },
          }),
        ])

        return {
          ...category,
          uniqueFieldCount,
          eventsCount,
          lastPing: lastPing?.createdAt || null,
        }
      })
    )

    return c.superjson({
      categories: categoriesWithCounts,
    })
  }),

  deleteCategory: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ c, ctx, input }) => {
      const { name } = input

      await db.eventCategory.delete({
        where: { name_userId: { name, userId: ctx.user.id } },
      })

      return c.json({ success: true })
    }),

  createEventCategory: privateProcedure
    .input(
      z.object({
        name: CATEGORY_NAME_VALIDATOR,
        color: z
          .string()
          .min(1, "Color is required.")
          .regex(/^#[0-9A-F]{6}/i, "Invalid Color format."),
        emoji: z.string().emoji("Invalid emoji.").optional(),
      })
    )
    .mutation(async ({ c, ctx, input }) => {
      const { user } = ctx
      const { name, color, emoji } = input

      const eventCategory = await db.eventCategory.create({
        data: {
          name: name.toLowerCase(),
          color: parseColor(color),
          emoji,
          userId: user.id,
        },
      })

      return c.json({ eventCategory })
    }),

  insertQuickStartCategories: privateProcedure.mutation(async ({ c, ctx }) => {
    const { user } = ctx

    const categories = await db.eventCategory.createMany({
      data: [
        { name: "Bug", emoji: "🐛", color: 0xff6b6b },
        { name: "Sale", emoji: "💰", color: 0xffeb3b },
        { name: "Question", emoji: "🤔", color: 0x6c5ce7 },
      ].map((category) => ({
        ...category,
        userId: user.id,
      })),
    })

    return c.json({ success: true, count: categories.count })
  }),

  pollCategory: privateProcedure
    .input(z.object({ name: CATEGORY_NAME_VALIDATOR }))
    .query(async ({ c, ctx, input }) => {
      const { name } = input

      const category = await db.eventCategory.findUnique({
        where: { name_userId: { name, userId: ctx.user.id } },
        include: { _count: { select: { events: true } } },
      })

      if (!category) {
        throw new HTTPException(404, {
          message: `Category "${name}" not found.`,
        })
      }

      const hasEvents = category._count.events > 0

      return c.json({ hasEvents })
    }),
})

export default categoryRouter
