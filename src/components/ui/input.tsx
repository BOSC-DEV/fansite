
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-sm border border-hacker-border bg-hacker-dark px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-hacker-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-hacker-accent focus-visible:border-hacker-accent disabled:cursor-not-allowed disabled:opacity-50 font-mono text-hacker-text md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
