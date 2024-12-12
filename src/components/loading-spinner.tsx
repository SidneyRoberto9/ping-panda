import { VariantProps, cva } from "class-variance-authority"

const spinnerVariantes = cva(
  "border-4 rounded-full border-brand-200 border-t-brand-700 animate-spin duration-700",
  {
    variants: {
      size: {
        sm: "size-4 border-2",
        md: "size-6 border-4",
        lg: "size-8 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariantes> {
  className?: string
}

const LoadingSpinner = ({ size, className }: LoadingSpinnerProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className={spinnerVariantes({ size, className })} />
    </div>
  )
}

export default LoadingSpinner
