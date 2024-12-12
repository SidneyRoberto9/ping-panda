import { ArrowLeft } from "lucide-react"
import { ReactNode } from "react"

import Heading from "@/components/heading"
import { Button } from "@/components/ui/button"

interface DashboardPageProps {
  title: string
  children?: ReactNode
  hideBackButton?: boolean
  cta?: ReactNode
}

const DashboardPage = ({
  cta,
  title,
  children,
  hideBackButton,
}: DashboardPageProps) => {
  return (
    <section className="flex h-full w-full flex-1 flex-col">
      <div className="flex justify-between border-b border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col gap-x-8 gap-y-2 sm:flex-row sm:items-center">
          {hideBackButton ? null : (
            <Button className="w-fit bg-white" variant="outline">
              <ArrowLeft className="size-4" />
            </Button>
          )}

          <Heading>{title}</Heading>

          {cta ? <div>{cta}</div> : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto p-6 sm:p-8">
        {children}
      </div>
    </section>
  )
}

export default DashboardPage
