import "@/styles/globals.css"

import { EB_Garamond, Inter } from "next/font/google"
import { PropsWithChildren } from "react"

import { Providers } from "@/components/providers"
import { SITE_CONFIG } from "@/config/index"
import { cn } from "@/utils"
import { ClerkProvider } from "@clerk/nextjs"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata = SITE_CONFIG

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="flex min-h-[calc(100vh-1px)] flex-col bg-brand-50 font-sans text-brand-950 antialiased">
          <main className="relative flex flex-1 flex-col">
            <Providers>{children}</Providers>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
