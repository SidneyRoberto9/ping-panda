import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import MaxWidthWrapper from "@/components/mas-width-wrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { SignOutButton } from "@clerk/nextjs"
import { auth as currentAuth } from "@clerk/nextjs/server"

const Navbar = async () => {
  const { userId } = await currentAuth()

  return (
    <nav className="sticky inset-x-0 top-0 z-[100] h-16 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="z-40 flex cursor-pointer font-semibold">
            Ping <span className="text-brand-700">Panda</span>
          </Link>

          <div className="flex h-full items-center space-x-4">
            {userId ? (
              <Fragment>
                <SignOutButton>
                  <Button size="sm" variant="ghost">
                    Sign Out
                  </Button>
                </SignOutButton>

                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1",
                  })}
                >
                  Dashboard <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Pricing
                </Link>

                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign In
                </Link>

                <div className="h-8 w-px bg-gray-200" />

                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1.5",
                  })}
                >
                  Sign Up <ArrowRight className="size-4" />
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
