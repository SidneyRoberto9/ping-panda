"use client"

import { Menu, X } from "lucide-react"
import { PropsWithChildren, useState } from "react"

import Sidebar from "@/components/sidebar"
import Modal from "@/components/ui/modal"

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-white md:flex-row">
      <div className="relative z-10 hidden h-full w-64 border-r border-gray-100 p-6 text-brand-900 md:block lg:w-80">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-200 p-4 md:hidden">
          <p className="text-lg/7 font-semibold text-brand-900">
            Ping<span className="text-brand-700">Panda</span>
          </p>
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="size-6" />
          </button>
        </div>

        <div className="relative z-10 flex-1 overflow-y-auto bg-gray-50 p-4 shadow-md md:p-6">
          <div className="relative flex min-h-full flex-col">
            <div className="flex h-full flex-1 flex-col space-y-4">
              {children}
            </div>
          </div>
        </div>

        <Modal
          className="p-4"
          showModal={isDrawerOpen}
          setShowModal={setIsDrawerOpen}
        >
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg/7 font-semibold text-brand-900">
              Ping<span className="text-brand-700">Panda</span>
            </p>
            <button
              aria-label="Close modal"
              onClick={() => setIsDrawerOpen(false)}
            >
              <X className="size-6" />
            </button>
          </div>

          <Sidebar />
        </Modal>
      </div>
    </div>
  )
}

export default Layout
