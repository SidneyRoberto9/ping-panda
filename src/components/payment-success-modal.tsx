"use client"

import { CheckIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { Fragment, useState } from "react"

import LoadingSpinner from "@/components/loading-spinner"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

const PaymentSuccessModal = () => {
  const router = useRouter()

  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { data: currentPlan, isPending } = useQuery({
    queryKey: ["user-plan"],
    queryFn: async () => {
      const res = await client.payment.getUserPlan.$get()
      return await res.json()
    },
    refetchInterval: (query) =>
      query.state.data?.plan === "PRO" ? false : 1000,
  })

  const handleClose = () => {
    setIsOpen(false)
    router.push("/dashboard")
  }

  const isPaymentSuccessfully = currentPlan?.plan === "PRO"

  return (
    <Modal
      showModal={isOpen}
      setShowModal={setIsOpen}
      onClose={handleClose}
      className="px-6 pt-6"
      preventDefaultClose={!isPaymentSuccessfully}
    >
      <div className="flex flex-col items-center">
        {isPending || !isPaymentSuccessfully ? (
          <div className="h-65 flex flex-col items-center justify-center">
            <LoadingSpinner className="mb-4" />
            <p className="text-lg/7 font-medium text-gray-900">
              Upgrading your account...
            </p>
            <p className="mt-2 text-pretty text-center text-sm/6 text-gray-600">
              Please wait while we process your upgrade. This may take a moment.{" "}
            </p>
          </div>
        ) : (
          <Fragment>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
              <img
                src="/brand-asset-heart.png"
                alt="Payment success"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mt-6 flex flex-col items-center gap-1 text-center">
              <p className="text-lg/7 font-medium tracking-tight">
                Upgrade Successful!! 🎉
              </p>

              <p className="text-pretty text-sm/6 text-gray-600">
                Thank you for upgrading to Pro and supporting PingPanda. Your
                account has been upgraded.
              </p>
            </div>

            <div className="mt-8 w-full">
              <Button onClick={handleClose} className="h-12 w-full">
                <CheckIcon className="mr-2 size-5" />
                Go to Dashboard
              </Button>
            </div>
          </Fragment>
        )}
      </div>
    </Modal>
  )
}

export default PaymentSuccessModal
