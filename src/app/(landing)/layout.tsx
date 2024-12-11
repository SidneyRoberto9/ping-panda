import { Fragment, PropsWithChildren } from "react"

import Navbar from "@/components/navbar"

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  )
}
