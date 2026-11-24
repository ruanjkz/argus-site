import type { ComponentProps, ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"

export function Frame({ className, marks, ...props }: ComponentProps<"div"> & { marks?: boolean }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl border-x border-border/60 px-5 sm:px-8", marks && "xl:frame-marks", className)}
      {...props}
    />
  )
}

export function Eyebrow({ icon, children, className }: { icon?: IconSvgElement; children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-mono text-xs text-muted-foreground", className)}>
      {icon ? <HugeiconsIcon icon={icon} strokeWidth={1.75} className="size-3.5" /> : null}
      {children}
    </span>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
}: {
  eyebrow: ReactNode
  title: ReactNode
  description?: ReactNode
  align?: "left" | "center"
  id?: string
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-3xl font-medium tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-3 text-base text-pretty text-muted-foreground">{description}</p> : null}
    </div>
  )
}

export const DOWNLOAD_URL = "https://github.com/ruanjkz/argus/releases/download/v0.1.0/Argus.exe"

export const BUTTON_PRIMARY =
  "press inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground outline-none hover:bg-primary/85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45"

export const BUTTON_SECONDARY =
  "press inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-border px-4 text-sm font-medium text-foreground outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-45"
