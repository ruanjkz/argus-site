"use client"

import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon, Download04Icon, Tick02Icon } from "@hugeicons/core-free-icons"

import { BUTTON_PRIMARY, Frame, SectionHeading } from "./primitives"

const DOWNLOAD_URL = "https://github.com/ruanjkz/argus/releases/download/v0.1.0/Argus.exe"

const STEPS = [
  {
    title: "Download Argus.exe",
    description: "One file. Put it on the machine that runs FXServer, anywhere you like. Nothing else to install.",
  },
  {
    title: "Open it and pick your server",
    description:
      "Your browser opens the setup. Argus finds the servers on the machine, you pick one, create your owner account and click Install. It shows what it will change before it does.",
  },
  {
    title: "Invite your staff",
    description: "Create logins in Settings. Each member picks their own password on the first sign in. Turn on remote access to let them in from their computers.",
  },
]

const MANUAL = ["git clone https://github.com/ruanjkz/argus.git", "cd argus", "npm run setup", "npm link", "argus"]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 border-t border-border/60 bg-panel">
      <Frame marks className="grid gap-10 py-16 [--mark-surface:var(--panel)] md:grid-cols-[1fr_1.15fr] md:py-24">
        <div className="min-w-0 md:sticky md:top-24 md:self-start">
          <SectionHeading
            id="how-title"
            eyebrow="Install"
            title="Download, open, pick your server"
            description="Argus runs next to your server, on the same machine. It starts FXServer as its own child process, so it sees every line, every exit code and every hung thread."
          />
          <a href={DOWNLOAD_URL} className={`${BUTTON_PRIMARY} mt-6`}>
            <HugeiconsIcon icon={Download04Icon} strokeWidth={1.75} className="size-4" />
            Download for Windows
          </a>
          <p className="mt-2 text-xs text-muted-foreground">Windows may warn about an unknown publisher: the file is not signed yet.</p>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <ol className="flex flex-col gap-2">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5">
                <span className="w-4 shrink-0 font-mono text-sm leading-6 text-muted-foreground tabular-nums">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-medium">{step.title}</h3>
                  <p className="mt-1 text-sm text-pretty text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="rounded-2xl border border-border/70 bg-background p-5">
            <h3 className="text-sm font-medium">Linux, or from source</h3>
            <p className="mt-1 text-sm text-pretty text-muted-foreground">
              Needs Node.js 22 and Git. The same setup opens in the browser, or run argus init for a terminal version.
            </p>
            <CommandBlock commands={MANUAL} />
          </div>
        </div>
      </Frame>
    </section>
  )
}

function CommandBlock({ commands }: { commands: string[] }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(commands.join("\n"))
      setCopied(true)
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="mt-3 flex items-start gap-2 rounded-xl bg-muted py-2.5 pr-2 pl-3">
      <pre className="min-w-0 flex-1 overflow-x-auto font-mono text-[13px] leading-6 text-foreground/90">
        {commands.map((command) => (
          <span key={command} className="block whitespace-pre">
            <span className="text-muted-foreground select-none">$ </span>
            {command}
          </span>
        ))}
      </pre>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy the commands"}
        className="press grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground outline-none hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} strokeWidth={1.75} className="size-3.5" />
      </button>
    </div>
  )
}
