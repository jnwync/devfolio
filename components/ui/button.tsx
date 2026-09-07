import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/* Flat buttons: colour changes on hover, a slight press on active. No glow,
   no lift. */
const buttonVariants = cva(
  "inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold transition-[transform,background-color,border-color,color] duration-200 ease-[var(--ease-out-quart)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/88",
        outline:
          "border border-border bg-background text-foreground hover:border-primary hover:text-primary",
        paper:
          "bg-paper-on-ink text-ink hover:bg-green-bright",
        outlineDark:
          "border border-border-on-ink bg-transparent text-paper-on-ink hover:border-paper-on-ink",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "text-foreground hover:bg-secondary/70 hover:text-primary",
        link:
          "min-h-0 rounded-none px-0 py-0 text-primary underline-offset-4 hover:underline focus-visible:ring-0 focus-visible:underline",
      },
      size: {
        default: "px-6 py-2.5",
        sm: "px-4.5 py-2 text-xs",
        lg: "min-h-12 px-7 py-3 text-base",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
