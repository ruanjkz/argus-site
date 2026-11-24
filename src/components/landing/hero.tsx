import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { BUTTON_PRIMARY, DOWNLOAD_URL, BUTTON_SECONDARY, Frame } from "./primitives"
import { t } from "@/lib/i18n"

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="scroll-mt-16">
      <Frame className="grid gap-10 pt-16 pb-12 md:grid-cols-[1.3fr_1fr] md:items-end md:pt-24">
        <div data-ascii-calm>
          <p className="font-mono text-xs text-muted-foreground">{t("Open source server manager for FiveM")}</p>
          <h1 id="hero-title" className="mt-4 text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t("Run your FiveM server")}
            <span className="block text-muted-foreground">{t("with a hundred eyes")}</span>
          </h1>
        </div>
        <div data-ascii-calm className="md:pb-1.5">
          <p className="text-base text-pretty text-muted-foreground">
            {t("Argus starts, watches and restarts FXServer from the outside. A live console, health monitoring and moderation that keep running while you update the panel.")}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={DOWNLOAD_URL} className={BUTTON_PRIMARY}>
              {t("Download for Windows")}
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} className="size-4" />
            </a>
            <a href="#how-it-works" className={BUTTON_SECONDARY}>
              {t("How to install")}
            </a>
          </div>
        </div>
      </Frame>
    </section>
  )
}
