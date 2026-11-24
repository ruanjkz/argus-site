"use client"

import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react"

import { LOCALES, translate, type Locale } from "./core"

const LocaleContext = createContext<Locale>("en")

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.lang = LOCALES.find((entry) => entry.value === locale)?.lang ?? "en"
  }, [locale])
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  return useContext(LocaleContext)
}

export function useT() {
  const locale = useContext(LocaleContext)
  return useCallback((text: string) => translate(locale, text), [locale])
}
