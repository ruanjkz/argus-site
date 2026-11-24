import { HugeiconsIcon } from "@hugeicons/react"
import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons"

import { Frame, SectionHeading } from "./primitives"
import { t } from "@/lib/i18n"

const ROWS: { feature: string; bundled: boolean; argus: boolean }[] = [
  { feature: "Live console with colors and command history", bundled: true, argus: true },
  { feature: "Bans, warns and action history", bundled: true, argus: true },
  { feature: "Restart on crash or hang, plus daily restarts with warnings", bundled: true, argus: true },
  { feature: "Staff logins with roles", bundled: true, argus: true },
  { feature: "Update the panel without restarting the game server", bundled: false, argus: true },
  { feature: "Download, switch and roll back FXServer builds from the panel", bundled: false, argus: true },
  { feature: "Deploy resources from a Git repository", bundled: false, argus: true },
  { feature: "Script errors grouped, with a likely fix and the commit that caused them", bundled: false, argus: true },
  { feature: "TypeScript errors pointed at the original .ts line", bundled: false, argus: true },
]

function Cell({ supported }: { supported: boolean }) {
  return supported ? (
    <span className="inline-flex items-center gap-1.5 text-foreground">
      <HugeiconsIcon icon={Tick02Icon} strokeWidth={1.75} className="size-4 text-success" />
      <span className="sr-only">{t("Supported")}</span>
    </span>
  ) : (
    <span className="inline-flex items-center text-muted-foreground/60">
      <HugeiconsIcon icon={MinusSignIcon} strokeWidth={1.75} className="size-4" />
      <span className="sr-only">{t("Not supported")}</span>
    </span>
  )
}

export function Compare() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="scroll-mt-16">
      <Frame marks className="border-t border-border/60 py-16 md:py-24">
        <SectionHeading
          id="compare-title"
          eyebrow="Compare"
          title={t("Why the agent ships apart from FXServer")}
          description={t("A panel bundled with the FXServer artifact runs on that same binary. It cannot swap it, and updating the panel means restarting the server.")}
        />
        <div className="relative mt-10 overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/60 text-left text-xs text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-normal">
                  {t("Capability")}
                </th>
                <th scope="col" className="w-44 px-4 py-3 font-normal">
                  {t("Bundled with FXServer")}
                </th>
                <th scope="col" className="w-28 px-4 py-3 font-medium text-foreground">
                  Argus
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/70">
              {ROWS.map((row) => (
                <tr key={row.feature}>
                  <th scope="row" className="px-4 py-3 text-left font-normal text-foreground/90">
                    {t(row.feature)}
                  </th>
                  <td className="px-4 py-3">
                    <Cell supported={row.bundled} />
                  </td>
                  <td className="px-4 py-3">
                    <Cell supported={row.argus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Frame>
    </section>
  )
}
