"use client"

import { useEffect } from "react"

import { LOCALES } from "@/lib/i18n/core"
import { useLocale, useT } from "@/lib/i18n/client"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "argus-site-locale"

function remember(value: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    return
  }
}

export function LanguageSwitch({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useT()

  useEffect(() => {
    if (locale !== "en" || window.location.pathname !== "/") return
    let stored: string | null = null
    try {
      stored = window.localStorage.getItem(STORAGE_KEY)
    } catch {
      return
    }
    if (stored) return
    const language = window.navigator.language.toLowerCase()
    const target = language.startsWith("pt") ? "/pt" : language.startsWith("es") ? "/es" : null
    if (target) window.location.replace(`${target}${window.location.hash}`)
  }, [locale])

  return (
    <nav aria-label={t("Language")} className={cn("flex items-center gap-0.5 rounded-lg bg-muted p-0.5", className)}>
      {LOCALES.map((entry) => {
        const active = entry.value === locale
        return (
          <a
            key={entry.value}
            href={entry.path}
            hrefLang={entry.lang}
            lang={entry.lang}
            aria-current={active ? "page" : undefined}
            title={entry.label}
            onClick={() => remember(entry.value)}
            className={cn(
              "press grid h-7 min-w-8 place-items-center rounded-md px-1.5 font-mono text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active ? "bg-background text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {entry.short}
          </a>
        )
      })}
    </nav>
  )
}
