import { redirect } from "next/navigation"

import AccountSettingsPageContent from "@/app/dashboard/(settings)/account-settings/settings-page-content"
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
    <DashboardPage title="Account Settings">
      <AccountSettingsPageContent discordId={user.discordId ?? ""} />
    </DashboardPage>
  )
}
