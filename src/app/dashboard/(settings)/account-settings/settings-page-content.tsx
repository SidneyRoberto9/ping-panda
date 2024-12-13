"use client"

import { ExternalLink } from "lucide-react"
import Link from "next/link"
import { Fragment, useState } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import Card from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DISCORD_BOT_CONNECTION_URL } from "@/config"
import { client } from "@/lib/client"
import { useMutation } from "@tanstack/react-query"

interface AccountSettingsPageContentProps {
  discordId: string
}

const AccountSettingsPageContent = ({
  discordId: initialDiscordId,
}: AccountSettingsPageContentProps) => {
  const [discordId, setDiscordId] = useState<string>(initialDiscordId)
  const [copySuccess, setCopySuccess] = useState<boolean>(false)

  const copyApiKey = () => {
    navigator.clipboard.writeText(DISCORD_BOT_CONNECTION_URL)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const { mutate: changeDiscordId, isPending: isChangingYourDiscordId } =
    useMutation({
      mutationFn: async (discordId: string) => {
        const res = await client.project.setDiscordId.$post({ discordId })
        return await res.json()
      },
    })

  return (
    <Fragment>
      <Card className="w-full max-w-2xl space-y-4">
        <div>
          <Label>Discord Bot Permission</Label>
          <div className="relative mt-1">
            <Input value={DISCORD_BOT_CONNECTION_URL} readOnly />
            <div className="absolute inset-y-0 right-0 flex items-center space-x-0.5">
              <Link
                href={DISCORD_BOT_CONNECTION_URL}
                className={buttonVariants({
                  variant: "ghost",
                  className:
                    "focus:online-none w-10 p-1 focus:ring-2 focus:ring-brand-500",
                })}
              >
                <ExternalLink className="size-4 text-brand-900" />
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-2 text-sm/6 text-gray-600">
          To start receiving your alerts, please connect to the bot using the
          link provided above.
        </p>
      </Card>

      <Card className="w-full max-w-2xl space-y-4">
        <div>
          <Label>Discord ID</Label>
          <Input
            className="mt-1"
            value={discordId}
            onChange={(e) => setDiscordId(e.target.value)}
            placeholder="Enter your Discord Id"
          />
        </div>

        <p className="mt-2 text-sm/6 text-gray-600">
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
    </Fragment>
  )
}

export default AccountSettingsPageContent
