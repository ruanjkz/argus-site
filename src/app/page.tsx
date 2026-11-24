import { AsciiField } from "@/components/landing/ascii-field"
import { Compare } from "@/components/landing/compare"
import { Faq } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { ProductShot } from "@/components/landing/product-shot"
import { Signals } from "@/components/landing/signals"
import { SiteFooter } from "@/components/landing/site-footer"
import { SiteHeader } from "@/components/landing/site-header"
import { Waitlist } from "@/components/landing/waitlist"

export default function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#hero-title"
        className="sr-only rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        Skip to content
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
        <Waitlist />
      </main>
      <SiteFooter />
    </div>
  )
}
