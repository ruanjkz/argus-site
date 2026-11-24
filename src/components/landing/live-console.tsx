"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

export type LineKind = "default" | "admin" | "error" | "warn" | "system"

export type ConsoleLine = { time: string; kind: LineKind; tag?: string; text: string }

type LiveLine = ConsoleLine & { id: number }

type LineDraft = Omit<ConsoleLine, "time">

type ScriptContext = { groupedErrors: number }

type Step =
  | { type: "line"; delay: number; line: (context: ScriptContext) => LineDraft }
  | { type: "command"; delay: number; command: string }

const LINE_STYLES: Record<LineKind, string> = {
  default: "text-foreground/80",
  admin: "bg-muted text-foreground",
  error: "text-destructive",
  warn: "text-warning",
  system: "text-info",
}

const SCRIPT: Step[] = [
  { type: "line", delay: 1800, line: () => ({ kind: "system", tag: "argus", text: "kxng joined the server" }) },
  { type: "line", delay: 1500, line: () => ({ kind: "default", text: "[ script:arena] Round 14 started on Vinewood" }) },
  { type: "line", delay: 2200, line: () => ({ kind: "warn", text: "[ inventory] Slow tick: 58 ms" }) },
  { type: "command", delay: 1600, command: "restart shop" },
  { type: "line", delay: 450, line: () => ({ kind: "default", text: "[ resources] Stopping resource shop" }) },
  { type: "line", delay: 650, line: () => ({ kind: "default", text: "[ resources] Started resource shop" }) },
  { type: "line", delay: 2100, line: () => ({ kind: "default", text: "[ script:arena] Round 14 won by red, 5 to 3" }) },
  { type: "line", delay: 1700, line: () => ({ kind: "system", tag: "argus", text: "vlt.ana left the server" }) },
  {
    type: "line",
    delay: 2400,
    line: () => ({ kind: "error", tag: "stderr", text: "SCRIPT ERROR: @shop/server.lua:88: attempt to index a nil value" }),
  },
  {
    type: "line",
    delay: 550,
    line: (context) => {
      context.groupedErrors += 1
      return {
        kind: "system",
        tag: "argus",
        text: `Error grouped with ${context.groupedErrors} earlier events in shop/server.lua:88`,
      }
    },
  },
]

const MAX_LINES = 18
const TYPE_INTERVAL = 70
const SUBMIT_PAUSE = 380
const FIRST_GROUPED_COUNT = 3

function toSeconds(time: string) {
  const [hours, minutes, seconds] = time.split(":").map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

function formatClock(totalSeconds: number) {
  const value = ((totalSeconds % 86400) + 86400) % 86400
  const parts = [Math.floor(value / 3600), Math.floor((value % 3600) / 60), value % 60]
  return parts.map((part) => String(part).padStart(2, "0")).join(":")
}

export function LiveConsole({ initialLines }: { initialLines: ConsoleLine[] }) {
  const [lines, setLines] = useState<LiveLine[]>(() => initialLines.map((line, index) => ({ ...line, id: index })))
  const [draft, setDraft] = useState("")
  const rootRef = useRef<HTMLDivElement>(null)
  const feedRef = useRef<HTMLDivElement>(null)
  const animatedId = useRef(initialLines.length - 1)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const root = rootRef.current
    if (!root) return

    let cancelled = false
    let onScreen = false
    let wake: (() => void) | null = null
    let nextId = initialLines.length
    const timers = new Set<number>()
    const context: ScriptContext = { groupedErrors: FIRST_GROUPED_COUNT }
    const baseSeconds = toSeconds(initialLines[initialLines.length - 1]?.time ?? "00:00:00")
    const startedAt = performance.now()

    const isActive = () => onScreen && document.visibilityState === "visible"
    const notify = () => {
      if (wake && isActive()) {
        const resolve = wake
        wake = null
        resolve()
      }
    }
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer)
          resolve()
        }, ms)
        timers.add(timer)
      })
    const untilActive = () =>
      isActive()
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            wake = resolve
          })
    const clock = () => formatClock(baseSeconds + Math.floor((performance.now() - startedAt) / 1000))
    const append = (line: LineDraft) => {
      const entry = { ...line, id: nextId++, time: clock() }
      setLines((previous) => [...previous, entry].slice(-MAX_LINES))
    }

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting
      notify()
    })
    observer.observe(root)
    document.addEventListener("visibilitychange", notify)

    async function run() {
      while (!cancelled) {
        for (const step of SCRIPT) {
          await sleep(step.delay)
          await untilActive()
          if (cancelled) return
          if (step.type === "line") {
            append(step.line(context))
            continue
          }
          for (let length = 1; length <= step.command.length; length++) {
            setDraft(step.command.slice(0, length))
            await sleep(TYPE_INTERVAL)
            if (cancelled) return
          }
          await sleep(SUBMIT_PAUSE)
          if (cancelled) return
          setDraft("")
          append({ kind: "admin", tag: "admin", text: step.command })
        }
      }
    }

    run()

    return () => {
      cancelled = true
      observer.disconnect()
      document.removeEventListener("visibilitychange", notify)
      timers.forEach((timer) => window.clearTimeout(timer))
      timers.clear()
    }
  }, [initialLines])

  useLayoutEffect(() => {
    const newest = lines[lines.length - 1]
    if (!newest || newest.id <= animatedId.current) return
    animatedId.current = newest.id
    const feed = feedRef.current
    const row = feed?.querySelector<HTMLElement>(`[data-line-id="${newest.id}"]`)
    if (!feed || !row) return
    feed.classList.add("is-shift-start")
    feed.style.transform = `translateY(${row.offsetHeight}px)`
    row.classList.add("is-enter-start")
    void feed.offsetHeight
    feed.classList.remove("is-shift-start")
    feed.style.transform = ""
    row.classList.remove("is-enter-start")
  }, [lines])

  return (
    <div ref={rootRef} className="flex min-h-0 flex-1 flex-col px-2 py-3">
      <div className="relative min-h-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_2.5rem)]">
        <div ref={feedRef} className="t-console-feed absolute inset-x-0 bottom-0 font-mono text-[12px] leading-6">
          {lines.map((line) => (
            <div
              key={line.id}
              data-line-id={line.id}
              className={cn("t-console-line flex gap-3 overflow-hidden rounded-md px-2 whitespace-nowrap", LINE_STYLES[line.kind])}
            >
              <span className="hidden shrink-0 text-muted-foreground/60 tabular-nums sm:inline">{line.time}</span>
              <span className={cn("w-12 shrink-0", line.kind === "admin" ? "font-medium" : "opacity-80")}>{line.tag ?? ""}</span>
              <span className="truncate">{line.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 px-2">
        <div
          className={cn(
            "flex h-9 items-center gap-2 rounded-xl border border-border/70 px-3 font-mono text-[13px] transition-shadow duration-150",
            draft ? "ring-2 ring-focus/60" : "ring-0",
          )}
        >
          <span className="text-muted-foreground">›</span>
          {draft ? (
            <>
              <span>{draft}</span>
              <span className="h-4 w-px bg-foreground" />
            </>
          ) : (
            <>
              <span className="-mr-1.5 h-4 w-px bg-foreground" />
              <span className="font-sans text-xs text-muted-foreground">Run a command</span>
            </>
          )}
          <span className="ml-auto font-sans text-[11px] text-muted-foreground">Enter to run</span>
        </div>
      </div>
    </div>
  )
}
