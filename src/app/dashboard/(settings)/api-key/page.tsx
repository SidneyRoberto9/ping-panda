import { redirect } from "next/navigation"

import APIKeySettingsPageContent from "@/app/dashboard/(settings)/api-key/api-key-settings-content"
import DashboardPage from "@/components/dashboard-page"
import { db } from "@/db"
import { auth as currentAuth } from "@clerk/nextjs/server"

export default async function Page() {
  const { userId } = await currentAuth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: userId },
  })

  if (!user) {
    redirect("/sign-in")
  }

  return (
    <DashboardPage title="API Key">
      <APIKeySettingsPageContent apiKey={user.apiKey ?? ""} />
    </DashboardPage>
  )
}
