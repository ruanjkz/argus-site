"use client"

import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons"

import { Frame, SectionHeading } from "./primitives"

const STEPS = [
  {
    title: "Download Argus",
    description: "Needs Node.js 22 or newer and Git on the machine that runs FXServer. Windows and Linux.",
    commands: ["git clone https://github.com/ruanjkz/argus.git", "cd argus", "npm run setup", "npm link"],
    note: "npm link puts the argus command on your PATH.",
  },
  {
    title: "Link your server",
    description:
      "Two questions: the folder with server.cfg, and where FXServer is. Argus copies its resource, adds ensure argus to server.cfg and keeps a backup. It shows the plan and waits for a yes.",
    commands: ["argus init"],
    note: "Your server is not started or stopped during setup.",
  },
  {
    title: "Start everything",
    description: "Starts the agent, the panel and FXServer. Ctrl+C stops the server gracefully, then Argus.",
    commands: ["argus start"],
    note: "Panel on http://localhost:3200. Try it first with argus start --simulate.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 border-t border-border/60 bg-panel">
      <Frame marks className="grid gap-10 py-16 [--mark-surface:var(--panel)] md:grid-cols-[1fr_1.15fr] md:py-24">
        <div className="min-w-0 md:sticky md:top-24 md:self-start">
          <SectionHeading
            id="how-title"
            eyebrow="Install"
            title="Running in three commands"
            description="Argus runs next to your server, on the same machine. It starts FXServer as its own child process, so it sees every line, every exit code and every hung thread."
          />
          <p className="mt-4 text-sm text-muted-foreground">
            Something missing? <span className="font-mono text-[13px] text-foreground/90">argus doctor</span> checks Node, Git, the
            resource, server.cfg and the ports, and says what to fix.
          </p>
        </div>
        <ol className="flex min-w-0 flex-col gap-2">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5">
              <span className="w-4 shrink-0 font-mono text-sm leading-6 text-muted-foreground tabular-nums">{index + 1}</span>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-pretty text-muted-foreground">{step.description}</p>
                <CommandBlock commands={step.commands} />
                <p className="mt-2 text-xs text-muted-foreground">{step.note}</p>
              </div>
            </li>
          ))}
        </ol>
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
        aria-label={copied ? "Copied" : commands.length === 1 ? `Copy ${commands[0]}` : "Copy the commands"}
        className="press grid size-7 shrink-0 place-items-center rounded-md text-muted-foreground outline-none hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
      >
        <HugeiconsIcon icon={copied ? Tick02Icon : Copy01Icon} strokeWidth={1.75} className="size-3.5" />
      </button>
    </div>
  )
}
