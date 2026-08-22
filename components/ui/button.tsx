import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-[transform,background-color,border-color,color,opacity,box-shadow] duration-200 ease-[var(--ease-out-quart)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_12px_28px_oklch(0.4_0.1_152/0.18)] hover:-translate-y-0.5 hover:bg-primary/92 hover:shadow-[0_18px_38px_oklch(0.4_0.1_152/0.2)] active:translate-y-px",
        outline:
          "border border-border bg-background text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-(--shadow-soft) active:translate-y-px",
        paper:
          "bg-paper-on-ink text-ink hover:-translate-y-0.5 hover:bg-green-bright active:translate-y-px",
        outlineDark:
          "border border-border-on-ink bg-transparent text-paper-on-ink hover:-translate-y-0.5 hover:border-paper-on-ink active:translate-y-px",
        secondary:
          "bg-secondary text-secondary-foreground hover:-translate-y-0.5 hover:bg-secondary/80 hover:shadow-(--shadow-soft) active:translate-y-px",
        ghost:
          "text-foreground hover:-translate-y-0.5 hover:bg-secondary/70 hover:text-primary active:translate-y-px",
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
