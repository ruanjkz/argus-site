import { Frame } from "./primitives"

const SIGNALS = [
  { code: "stdio[3]", label: "Structured events from the server" },
  { code: "stdin", label: "Command bridge to the console" },
  { code: "/dynamic.json", label: "Health checks on the HTTP thread" },
  { code: "watchdog_bark", label: "Stack traces of hung threads" },
]

export function Signals() {
  return (
    <section aria-labelledby="signals-title">
      <Frame marks className="border-t border-border/60 py-12">
        <p id="signals-title" className="text-center text-sm text-muted-foreground">
          Built on the signals FXServer already emits
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border/70 bg-border/70 sm:grid-cols-2 lg:grid-cols-4">
          {SIGNALS.map((signal) => (
            <li key={signal.code} className="bg-background px-4 py-5">
              <p className="font-mono text-sm text-foreground">{signal.code}</p>
              <p className="mt-1 text-xs text-muted-foreground">{signal.label}</p>
            </li>
          ))}
        </ul>
      </Frame>
    </section>
  )
}
