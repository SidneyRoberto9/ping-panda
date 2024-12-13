import { PlusIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { Fragment } from "react"

import DashboardPageContent from "@/app/dashboard/dashboard-page-content"
import CreateEventCategoryModal from "@/components/create-event-category-modal"
import DashboardPage from "@/components/dashboard-page"
import PaymentSuccessModal from "@/components/payment-success-modal"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { createCheckOutSession } from "@/lib/stripe"
import { auth as currentAuth } from "@clerk/nextjs/server"

interface PageProps {
  searchParams: {
    [keyof: string]: string | string[] | undefined
  }
}

export default async function Page({ searchParams }: PageProps) {
  const { userId } = await currentAuth()

  if (!userId) {
    redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: { externalId: userId },
  })

  if (!user) {
    redirect("/welcome")
  }

  const intent = searchParams.intent

  if (intent === "upgrade") {
    const session = await createCheckOutSession({
      userEmail: user.email,
      userId: user.id,
    })

    if (session.url) {
      redirect(session.url)
    }
  }

  const success = searchParams.success

  return (
    <Fragment>
      {success ? <PaymentSuccessModal /> : null}

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
    </Fragment>
  )
}
