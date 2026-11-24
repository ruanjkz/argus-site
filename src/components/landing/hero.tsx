import { HugeiconsIcon } from "@hugeicons/react"
import {
  Activity01Icon,
  ArrowRight01Icon,
  ComputerTerminal01Icon,
  Rocket01Icon,
  Shield01Icon,
} from "@hugeicons/core-free-icons"

import { BUTTON_PRIMARY, BUTTON_SECONDARY, Eyebrow, Frame } from "./primitives"

export const PRODUCT_AREAS = [
  { id: "console", label: "Console", icon: ComputerTerminal01Icon },
  { id: "monitor", label: "Monitor", icon: Activity01Icon },
  { id: "moderation", label: "Moderation", icon: Shield01Icon },
  { id: "deploy", label: "Deploy", icon: Rocket01Icon },
]

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="scroll-mt-16">
      <Frame className="grid gap-10 pt-16 pb-12 md:grid-cols-[1.3fr_1fr] md:items-end md:pt-24">
        <div>
          <Eyebrow>
            <span className="size-1.5 rounded-full bg-success" />
            Early access for FiveM servers
          </Eyebrow>
          <h1 id="hero-title" className="mt-5 text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Run your FiveM server
            <span className="block text-muted-foreground">with a hundred eyes.</span>
          </h1>
        </div>
        <div className="md:pb-1.5">
          <p className="text-base text-pretty text-muted-foreground">
            Argus starts, watches and restarts FXServer from the outside. A live console, health monitoring and
            moderation that keep running while you update the panel.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="#waitlist" className={BUTTON_PRIMARY}>
              Join the waitlist
              <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={1.75} className="size-4" />
            </a>
            <a href="#how-it-works" className={BUTTON_SECONDARY}>
              See how it works
            </a>
          </div>
        </div>
        <nav aria-label="Product areas" className="md:col-span-2">
          <ul className="flex flex-wrap gap-2">
            {PRODUCT_AREAS.map((area) => (
              <li key={area.id}>
                <a
                  href={`#${area.id}`}
                  className="press inline-flex h-8 items-center gap-2 rounded-lg px-2.5 text-sm text-muted-foreground outline-none hover:bg-muted hover:text-foreground active:bg-muted active:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <HugeiconsIcon icon={area.icon} strokeWidth={1.75} className="size-4" />
                  {area.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Frame>
    </section>
  )
}
