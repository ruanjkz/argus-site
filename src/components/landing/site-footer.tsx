import { ArgusLogo } from "./argus-logo"
import { Frame } from "./primitives"
import { NAV_LINKS } from "./site-header"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <Frame marks className="flex flex-col gap-8 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <ArgusLogo id="footer-logo" />
          <p className="mt-3 text-sm text-muted-foreground">FiveM server management, from outside the server.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="font-mono text-[11px] text-muted-foreground">© 2026 Argus</p>
      </Frame>
    </footer>
  )
}
