"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

import Backgrounds from "@/components/backgrounds"
import Heading from "@/components/heading"
import LoadingSpinner from "@/components/loading-spinner"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

export default function Page() {
  const router = useRouter()
  const { data } = useQuery({
    queryFn: async () => {
      const res = await client.auth.getDatabaseSyncStatus.$get()
      return await res.json()
    },
    queryKey: ["get-database-sync-status"],
    refetchInterval: (query) => (query.state.data?.isSynced ? false : 1000),
  })

  useEffect(() => {
    if (data?.isSynced) {
      router.push("/dashboard")
    }
  }, [data, router])

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <Backgrounds.backgroundPattern className="absolute inset-0 left-1/2 z-0 -translate-x-1/2 opacity-75" />

      <div className="relative z-10 flex -translate-y-1/2 flex-col items-center gap-6 text-center">
        <LoadingSpinner size="md" />

        <Heading> Creating your account...</Heading>
        <p className="max-w-prose text-base/7 text-gray-600">
          Just a moment while we set things up for you.
        </p>
      </div>
    </div>
  )
}
