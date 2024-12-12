import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

const parseColor = (color: string): number => {
  const hex = color.startsWith("#") ? color.slice(1) : color

  return parseInt(hex, 16)
}

export { cn, parseColor }
