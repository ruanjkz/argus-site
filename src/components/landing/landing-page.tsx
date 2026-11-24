import { setLocale, type Locale } from "@/lib/i18n"
import { LocaleProvider } from "@/lib/i18n/client"
import { t } from "@/lib/i18n"

import { AsciiField } from "./ascii-field"
import { Compare } from "./compare"
import { Faq } from "./faq"
import { Features } from "./features"
import { Hero } from "./hero"
import { HowItWorks } from "./how-it-works"
import { ProductShot } from "./product-shot"
import { Signals } from "./signals"
import { SiteFooter } from "./site-footer"
import { SiteHeader } from "./site-header"

export function LandingPage({ locale }: { locale: Locale }) {
  setLocale(locale)
  return (
    <LocaleProvider locale={locale}>
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#hero-title"
        className="sr-only rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        {t("Skip to content")}
      </a>
      <SiteHeader />
      <main>
        <div className="relative isolate">
          <AsciiField className="absolute inset-x-0 top-0 -z-10 h-[44rem] w-full" pulseOrigin="[data-pulse-origin]" calm="[data-ascii-calm]" />
          <Hero />
          <ProductShot />
        </div>
        <Signals />
        <Features />
        <HowItWorks />
        <Compare />
        <Faq />
      </main>
      <SiteFooter />
    </div>
    </LocaleProvider>
  )
}
