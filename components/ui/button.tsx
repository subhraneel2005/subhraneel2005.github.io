import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent bg-clip-padding text-sm/5 font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:focus-ring disabled:pointer-events-none disabled:opacity-50 disabled:bg-gray-100 disabled:text-gray-700 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/70",
        outline:
          "border-border bg-background text-foreground hover:bg-gray-alpha-100 active:bg-gray-alpha-200 aria-expanded:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-gray-200 active:bg-gray-300 aria-expanded:bg-secondary",
        ghost:
          "bg-transparent text-foreground hover:bg-gray-alpha-100 active:bg-gray-alpha-200 aria-expanded:bg-muted",
        destructive:
          "bg-red-800 text-white hover:bg-red-900 active:bg-red-900/90 focus-visible:ring-red-800/30 dark:bg-red-800 dark:hover:bg-red-900",
        link: "text-blue-700 underline-offset-4 hover:underline dark:text-blue-600",
      },
      size: {
        default: "h-10 gap-1.5 px-2.5 text-sm/5",
        sm: "h-8 gap-1 px-1.5 text-xs/5",
        lg: "h-12 gap-2 px-3.5 text-base/6",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-xs": "size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
