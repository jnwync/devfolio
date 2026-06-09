import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 rounded-md border px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] whitespace-nowrap [&>svg]:size-3 [&>svg]:pointer-events-none transition-[border-color,background-color,color] focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20",
  {
    variants: {
      variant: {
        default:
          "border-primary/25 bg-primary/8 text-primary [a&]:hover:border-primary/45",
        secondary:
          "border-border bg-secondary text-secondary-foreground [a&]:hover:border-primary/30",
        destructive:
          "border-destructive/30 bg-destructive/10 text-destructive [a&]:hover:bg-destructive/15",
        outline:
          "border-border bg-background text-muted-foreground [a&]:hover:border-primary/40 [a&]:hover:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
