import { PlusIcon } from "lucide-react"
import { redirect } from "next/navigation"

import DashboardPageContent from "@/app/dashboard/dashboard-page-content"
import CreateEventCategoryModal from "@/components/create-event-category-modal"
import DashboardPage from "@/components/dashboard-page"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { currentUser } from "@clerk/nextjs/server"

export default async function Page() {
  try {
    const auth = await currentUser()

    if (!auth) {
      redirect("/sign-in")
    }

    const user = await db.user.findUnique({
      where: { externalId: auth.id },
    })

    if (!user) {
      redirect("/sign-in")
    }

    return (
      <DashboardPage
        cta={
          <CreateEventCategoryModal>
            <Button className="w-full sm:w-fit">
              <PlusIcon className="mr-2 size-4" />
              Add Category
            </Button>
          </CreateEventCategoryModal>
        }
        title="Dashboard"
      >
        <DashboardPageContent />
      </DashboardPage>
    )
  } catch (error) {
    console.error("Erro ao obter o usuário atual:", error)
  }
}
