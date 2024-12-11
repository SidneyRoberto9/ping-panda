import {
  Cog,
  Gift,
  Headphones,
  HelpCircle,
  Inbox,
  Menu,
  Mic,
  Phone,
  Pin,
  PlusCircle,
  Search,
  Smile,
  Sticker,
  UserCircle,
  Video,
} from "lucide-react"
import Image from "next/image"
import { PropsWithChildren } from "react"

import Icons from "@/components/icons"

const MockDiscordUI = ({ children }: PropsWithChildren) => {
  return (
    <div className="bg-discord-background flex min-h-[800px] w-full max-w-[1200px] overflow-hidden rounded-lg text-white shadow-xl">
      <div className="hidden w-[72px] flex-col items-center bg-[#202225] py-3 sm:flex">
        <div className="bg-discord-brand-color mb-2 flex size-12 items-center justify-center rounded-2xl transition-all duration-200 hover:rounded-lg">
          <Icons.discord className="size-3/5 text-white" />
        </div>

        <div className="bg-discord-background my-2 h-[2px] w-8 rounded-full" />

        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="bg-discord-background hover:bg-discord-brand-color mb-3 flex size-12 cursor-not-allowed items-center justify-center rounded-3xl transition-all duration-200 hover:rounded-xl"
          >
            <span className="text-lg font-semibold text-gray-400">
              {String.fromCharCode(65 + i)}
            </span>
          </div>
        ))}

        <div className="bg-discord-background group mb-3 mt-auto flex size-12 cursor-not-allowed items-center justify-center rounded-3xl transition-all duration-200 hover:rounded-xl hover:bg-[#3ba55c]">
          <PlusCircle className="text-[#3ba55c] group-hover:text-white" />
        </div>
      </div>

      <div className="hidden w-60 flex-col bg-[#2f3136] md:flex">
        <div className="flex h-16 items-center border-b border-[#202225] px-4 shadow-sm">
          <div className="flex h-8 w-full cursor-not-allowed items-center justify-center rounded bg-[#202225] px-2 text-sm text-gray-600">
            Find or start a conversation
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pt-4">
          <div className="mb-4 px-2">
            <div className="flex cursor-not-allowed items-center rounded px-2 py-1.5 text-sm text-[#dcddde] hover:bg-[#393c43]">
              <UserCircle className="mr-4 size-8 text-[#b9bbbe]" />
              <span className="text-sm font-medium">Friends</span>
            </div>
            <div className="flex cursor-not-allowed items-center rounded px-2 py-1.5 text-sm text-[#dcddde] hover:bg-[#393c43]">
              <Inbox className="mr-4 size-8 text-[#b9bbbe]" />
              <span className="text-sm font-medium">Nitro</span>
            </div>
          </div>

          <div className="mb-4 px-2">
            <h3 className="mb-2 px-2 text-xs font-semibold uppercase text-[#8e9297]">
              Direct Messages
            </h3>
            <div className="flex cursor-pointer items-center rounded bg-[#393c43] px-2 py-1.5 text-white">
              <Image
                src="/brand-asset-profile-picture.png"
                alt="PingPanda Avatar"
                width={32}
                height={32}
                className="mr-3 rounded-full object-cover"
              />
              <span className="font-medium">PingPanda</span>
            </div>

            <div className="my-1 space-y-px">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="flex cursor-not-allowed items-center rounded px-2 py-1.5 text-gray-600"
                >
                  <div className="bg-discord-background mr-3 size-8 rounded-full" />
                  <span className="font-medium">User {i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center bg-[#292b2f] p-2">
          <div className="mr-2 size-8 rounded-full bg-brand-700" />
          <div className="flex-1">
            <p className="text-sm font-medium text-white">You</p>
            <p className="flex items-center text-xs text-[#b9bbbe]">
              @your_account
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Mic className="size-5 cursor-pointer text-[#b9bbbe] hover:text-white" />
            <Headphones className="size-5 cursor-pointer text-[#b9bbbe] hover:text-white" />
            <Cog className="size-5 cursor-pointer text-[#b9bbbe] hover:text-white" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex h-16 items-center border-b border-[#202225] bg-[#36393f] px-4 shadow-sm">
          <div className="mr-4 hidden md:block">
            <Menu className="size-6 cursor-pointer text-[#b9bbbe] hover:text-white" />
          </div>

          <div className="flex items-center">
            <div className="relative">
              <Image
                src="/brand-asset-profile-picture.png"
                alt="PingPanda Avatar"
                width={40}
                height={40}
                className="mr-3 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-3 size-3 rounded-full border-2 border-[#36393f] bg-green-500" />
            </div>

            <p className="font-semibold text-white">PingPanda</p>
          </div>

          <div className="ml-auto flex items-center space-x-4 text-[#b9bbb3]">
            <Phone className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
            <Video className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
            <Pin className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
            <UserCircle className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
            <Search className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
            <Inbox className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
            <HelpCircle className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
          </div>
        </div>

        <div className="bg-discord-background flex flex-1 flex-col-reverse overflow-y-auto p-4">
          {children}
        </div>

        <div className="p-4">
          <div className="flex items-center rounded-lg bg-[#40444b] p-1">
            <PlusCircle className="mx-3 cursor-not-allowed text-[#b9bbbe] hover:text-white" />
            <input
              readOnly
              type="text"
              placeholder="Message @PingPanda"
              className="placeholder=[#72767d] flex-1 cursor-not-allowed bg-transparent px-1 py-2.5 text-white focus:outline-none"
            />
            <div className="mx-3 flex items-center space-x-3 text-[#b9bbbe]">
              <Gift className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
              <Sticker className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
              <Smile className="hidden size-5 cursor-not-allowed hover:text-white sm:block" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MockDiscordUI
