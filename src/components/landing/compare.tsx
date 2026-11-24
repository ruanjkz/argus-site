import { HugeiconsIcon } from "@hugeicons/react"
import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons"

import { Frame, SectionHeading } from "./primitives"

const ROWS: { feature: string; inside: boolean; argus: boolean }[] = [
  { feature: "Live console with colors and command history", inside: true, argus: true },
  { feature: "Bans, whitelist and action history", inside: true, argus: true },
  { feature: "Update the panel without restarting the game", inside: false, argus: true },
  { feature: "Pin and roll back FXServer artifacts", inside: false, argus: true },
  { feature: "Staging instance on the same host", inside: false, argus: true },
  { feature: "Script errors grouped by resource and line", inside: false, argus: true },
  { feature: "Linked accounts across identifiers and tokens", inside: false, argus: true },
]

function Cell({ supported }: { supported: boolean }) {
  return supported ? (
    <span className="inline-flex items-center gap-1.5 text-foreground">
      <HugeiconsIcon icon={Tick02Icon} strokeWidth={1.75} className="size-4 text-success" />
      <span className="sr-only">Supported</span>
    </span>
  ) : (
    <span className="inline-flex items-center text-muted-foreground/60">
      <HugeiconsIcon icon={MinusSignIcon} strokeWidth={1.75} className="size-4" />
      <span className="sr-only">Not supported</span>
    </span>
  )
}

export function Compare() {
  return (
    <section id="compare" aria-labelledby="compare-title" className="scroll-mt-16">
      <Frame className="border-t border-border/60 py-16 md:py-24">
        <SectionHeading
          id="compare-title"
          eyebrow="Compare"
          title="Why the agent lives outside the server"
          description="A panel that runs inside FXServer goes down with it, and it cannot swap the binary it runs on."
        />
        <div className="relative mt-10 overflow-x-auto rounded-2xl border border-border/70">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-border/70 bg-muted/60 text-left text-xs text-muted-foreground">
                <th scope="col" className="px-4 py-3 font-normal">
                  Capability
                </th>
                <th scope="col" className="w-40 px-4 py-3 font-normal">
                  Panel inside FXServer
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
                    {row.feature}
                  </th>
                  <td className="px-4 py-3">
                    <Cell supported={row.inside} />
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
