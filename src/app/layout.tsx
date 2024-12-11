import "@/styles/globals.css"

import { EB_Garamond, Inter } from "next/font/google"
import { PropsWithChildren } from "react"

import { cn } from "@/utils"
import { ClerkProvider } from "@clerk/nextjs"

import { Providers } from "../components/providers"

import type { Metadata } from "next"
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "jStack App",
  description: "Created using jStack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="bg-brand-50 font-sans text-brand-950 antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
