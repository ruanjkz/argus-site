"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"

import { handleRadioKeyDown } from "@/lib/radio-group"
import { useTheme } from "@/lib/theme"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  return (
    <div className={cn("flex items-center gap-0.5 rounded-full bg-muted p-0.5", className)} role="radiogroup" aria-label="Theme">
      {(["light", "dark"] as const).map((value) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={theme === value}
          tabIndex={theme === value ? 0 : -1}
          aria-label={value === "light" ? "Light theme" : "Dark theme"}
          onClick={() => setTheme(value)}
          onKeyDown={handleRadioKeyDown}
          className={cn(
            "press grid size-7 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring",
            theme === value ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
          )}
        >
          <HugeiconsIcon icon={value === "light" ? Sun03Icon : Moon02Icon} strokeWidth={1.75} className="size-3.5" />
        </button>
      ))}
    </div>
  )
}
