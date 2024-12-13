"use client"

import { useSearchParams } from "next/navigation"

import { SignIn } from "@clerk/nextjs"

export default function Page() {
  const searchParams = useSearchParams()
  const intent = searchParams.get("intent")

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <SignIn
        forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"}
      />
    </div>
  )
}
