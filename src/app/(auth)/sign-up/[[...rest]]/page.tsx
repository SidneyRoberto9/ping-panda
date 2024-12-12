"use client"

import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <SignUp />
    </div>
  )
}
