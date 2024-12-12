import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/db"
import { CATEGORY_NAME_VALIDATOR } from "@/lib/validators/category-validator"

const REQUEST_VALIDATOR = z
  .object({
    category: CATEGORY_NAME_VALIDATOR,
    fields: z.record(z.string().or(z.number()).or(z.boolean())).optional(),
    description: z.string().optional(),
  })
  .strict()

export const POST = async (req: NextRequest) => {
  const authHeader = req.headers.get("Authorization")

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  if (!authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Invalid auth header format. Expected: 'Bearer [API_KEY]'" },
      { status: 401 }
    )
  }

  const apiKey = authHeader.split(" ")[1]

  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json({ message: "Invalid API key" }, { status: 401 })
  }

  const user = await db.user.findUnique({
    where: { apiKey },
    include: { eventCategories: true },
  })

  if (!user) {
    return NextResponse.json({ message: "Invalid API key" }, { status: 401 })
  }

  if (!user.discordId) {
    return NextResponse.json(
      { message: "Please enter your Discord ID in your account settings" },
      { status: 403 }
    )
  }

  const currentData = new Date()
  const currentMonth = currentData.getMonth() + 1
  const currentYear = currentData.getFullYear()

  const quota = await db.quota.findUnique({
    where: {
      userId: user.id,
      month: currentMonth,
      year: currentYear,
    },
  })
}
