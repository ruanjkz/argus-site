import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LandingPage } from "@/components/landing/landing-page"
import { isLocale, translate } from "@/lib/i18n"

export function generateStaticParams() {
  return [{ locale: "es" }, { locale: "pt" }]
}

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}
  return {
    title: translate(locale, "Argus · FiveM server management"),
    description: translate(
      locale,
      "Argus spawns, watches and restarts FXServer from the outside. Live console, health monitoring, moderation and safe deploys.",
    ),
    alternates: { canonical: `/${locale}`, languages: { en: "/", es: "/es", "pt-BR": "/pt" } },
  }
}

export default async function LocalePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params
  if (!isLocale(locale) || locale === "en") notFound()
  return <LandingPage locale={locale} />
}
