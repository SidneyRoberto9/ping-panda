import { Metadata } from "next"

export const SITE_CONFIG: Metadata = {
  title: {
    default: "Ping Panda - Real-Time SaaS Insights",
    template: `%s | Ping Panda`,
  },
  description:
    "PingPanda is a powerful event monitoring SaaS that provides real-time insights and notifications. Built with Next.js, TypeScript, and Postgres, it offers instant alerts via Discord, secure authentication with Clerk, and easy payments through Stripe. Stay informed effortlessly with PingPanda!",
  icons: {
    icon: [
      {
        url: "/brand-asset-profile-picture.png",
        href: "/brand-asset-profile-picture.png",
      },
    ],
  },
  openGraph: {
    title: "Ping Panda - Real-Time SaaS Insights",
    description:
      "PingPanda is a powerful event monitoring SaaS that provides real-time insights and notifications. Built with Next.js, TypeScript, and Postgres, it offers instant alerts via Discord, secure authentication with Clerk, and easy payments through Stripe. Stay informed effortlessly with PingPanda!",
    images: [
      {
        url: "/thumbnail.png",
      },
    ],
  },
}
