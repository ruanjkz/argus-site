import { cn } from "@/lib/utils"

import { ArgusLogo } from "./argus-logo"
import { BUTTON_PRIMARY } from "./primitives"
import { ThemeToggle } from "./theme-toggle"

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#compare", label: "Compare" },
  { href: "#faq", label: "FAQ" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background">
      <div className="mx-auto grid h-16 w-full max-w-6xl grid-cols-[1fr_auto] items-center gap-4 border-x border-border/60 px-5 sm:px-8 md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          className="w-fit rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Argus home"
        >
          <ArgusLogo id="header-logo" />
        </a>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="press flex h-8 items-center rounded-lg px-3 text-sm text-muted-foreground outline-none hover:text-foreground active:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center justify-end gap-2">
          <ThemeToggle />
          <a href="#waitlist" className={cn(BUTTON_PRIMARY, "h-9 px-3.5")}>
            Join the waitlist
          </a>
        </div>
      </div>
    </header>
  )
}
