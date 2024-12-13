"use client"

import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import Card from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"

interface AccountSettingsPageContentProps {
  discordId: string
}

const AccountSettingsPageContent = ({
  discordId: initialDiscordId,
}: AccountSettingsPageContentProps) => {
  const [discordId, setDiscordId] = useState<string>(initialDiscordId)

  const { mutate: changeDiscordId, isPending: isChangingYourDiscordId } =
    useMutation({
      mutationFn: async (discordId: string) => {
        const res = await client.project.setDiscordId.$post({ discordId })
        return await res.json()
      },
    })

  return (
    <Card className="w-full max-w-xl space-y-4">
      <div>
        <Label>Discord ID</Label>
        <Input
          className="mt-1"
          value={discordId}
          onChange={(e) => setDiscordId(e.target.value)}
          placeholder="Enter your Discord Id"
        />
      </div>

      <p className="text-s/6 mt-2 text-gray-600">
        Don't know how to find your Discord ID?{" "}
        <Link
          href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID"
          className="text-brand-600 hover:text-brand-500"
        >
          Learn how to obtain it here
        </Link>
        .
      </p>

      <div className="pt-4">
        <Button
          onClick={() => changeDiscordId(discordId)}
          disabled={isChangingYourDiscordId}
        >
          {isChangingYourDiscordId ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  )
}

export default AccountSettingsPageContent
