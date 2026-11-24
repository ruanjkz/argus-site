import { cache } from "react"

import { translate, type Locale } from "./core"

export { isLocale, LOCALES, translate, type Locale } from "./core"

const store = cache(() => ({ locale: "en" as Locale }))

export function setLocale(locale: Locale) {
  store().locale = locale
}

export function getLocale() {
  return store().locale
}

export function t(text: string) {
  return translate(store().locale, text)
}
