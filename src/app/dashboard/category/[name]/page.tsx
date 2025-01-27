import { notFound } from "next/navigation"

import CategoryPageContent from "@/app/dashboard/category/[name]/category-page-content"
import DashboardPage from "@/components/dashboard-page"
import { db } from "@/db"
import { auth as currentAuth } from "@clerk/nextjs/server"

interface PageProps {
  params: {
    name: string | string[] | undefined
  }
}

export default async function Page({ params }: PageProps) {
  try {
    if (typeof params.name !== "string") {
      return notFound()
    }

    const { userId } = await currentAuth()

    if (!userId) {
      return notFound()
    }

    const user = await db.user.findUnique({
      where: { externalId: userId },
    })

    if (!user) {
      return notFound()
    }

    const category = await db.eventCategory.findUnique({
      where: { name_userId: { name: params.name, userId: user.id } },
      include: { _count: { select: { events: true } } },
    })

    if (!category) {
      return notFound()
    }

    const hasEvents = category._count.events > 0

    return (
      <DashboardPage title={`${category.emoji} ${category.name} events`}>
        <CategoryPageContent hasEvents={hasEvents} category={category} />
      </DashboardPage>
    )
  } catch (error) {
    console.error("Erro ao obter o usuário atual:", error)
  }
}
