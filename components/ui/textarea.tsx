import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
   return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full rounded-2xl border border-border bg-white/20 dark:bg-white/10 backdrop-blur-lg px-4 py-3 text-base text-foreground placeholder:text-muted-foreground shadow-inner transition-all resize-none focus:outline-none focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:opacity-50 h-16 py-4 ",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
