import { HTMLAttributes } from "react"

import { cn } from "@/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  contentClassName?: string
}

const Card = ({
  className,
  contentClassName,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-lg bg-gray-50 text-card-foreground",
        className
      )}
      {...props}
    >
      <div className={cn("relative z-10 p-6", contentClassName)}>
        {children}
      </div>
      <div className="absolute inset-px z-0 rounded-lg bg-white" />
      <div className="pointer-events-none absolute inset-px z-0 rounded-lg shadow-sm ring-1 ring-black/5" />
    </div>
  )
}

export default Card
