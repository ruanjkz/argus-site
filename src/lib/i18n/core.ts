import { MESSAGES } from "./messages"

export type Locale = "en" | "es" | "pt"

export const LOCALES: { value: Locale; label: string; short: string; path: string; lang: string }[] = [
  { value: "en", label: "English", short: "EN", path: "/", lang: "en" },
  { value: "es", label: "Español", short: "ES", path: "/es", lang: "es" },
  { value: "pt", label: "Português", short: "PT", path: "/pt", lang: "pt-BR" },
]

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "es" || value === "pt"
}

export function translate(locale: Locale, text: string) {
  if (locale === "en") return text
  return MESSAGES[locale][text] ?? text
}
