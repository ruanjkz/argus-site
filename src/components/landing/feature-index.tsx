"use client"

import { useEffect, useState } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

import { cn } from "@/lib/utils"

export type FeatureIndexItem = { id: string; label: string; summary: string; icon: IconSvgElement }

export function FeatureIndex({ items, label }: { items: FeatureIndexItem[]; label: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-35% 0px -60% 0px" },
    )
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })
    return () => observer.disconnect()
  }, [items])

  return (
    <nav aria-label={label} className="hidden md:block">
      <ul className="sticky top-24 flex flex-col gap-1">
        {items.map((item) => {
          const active = item.id === activeId
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "flex gap-2.5 rounded-xl px-2.5 py-2 outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
                  active && "bg-muted",
                )}
              >
                <HugeiconsIcon
                  icon={item.icon}
                  strokeWidth={1.75}
                  className={cn("mt-0.5 size-4 shrink-0", active ? "text-foreground" : "text-muted-foreground")}
                />
                <span className="min-w-0">
                  <span className={cn("block text-sm", active ? "font-medium text-foreground" : "text-foreground/80")}>
                    {item.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{item.summary}</span>
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
