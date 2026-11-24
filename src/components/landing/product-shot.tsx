import { HugeiconsIcon } from "@hugeicons/react"
import {
  ComputerTerminal01Icon,
  DashboardSquare01Icon,
  GitBranchIcon,
  PackageIcon,
  Settings01Icon,
  UserBlock01Icon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

import { ArgusMark } from "./argus-logo"
import { LiveConsole, type ConsoleLine } from "./live-console"
import { Frame } from "./primitives"

const CONSOLE_LINES: ConsoleLine[] = [
  { time: "13:42:05", kind: "system", tag: "argus", text: "Starting FXServer with server.cfg" },
  { time: "13:42:06", kind: "default", text: "[ resources] Found 48 resources" },
  { time: "13:42:07", kind: "default", text: "[ resources] Started resource arena" },
  { time: "13:42:07", kind: "default", text: "[ resources] Started resource inventory" },
  { time: "13:42:09", kind: "default", text: "[citizen-server-impl] Server license key authentication succeeded" },
  { time: "13:42:10", kind: "admin", tag: "admin", text: "ensure shop" },
  { time: "13:42:10", kind: "default", text: "[ resources] Started resource shop" },
  { time: "13:42:31", kind: "error", tag: "stderr", text: "SCRIPT ERROR: @shop/server.lua:88: attempt to index a nil value" },
  { time: "13:42:33", kind: "warn", text: "[ inventory] Slow tick: 61 ms" },
  { time: "13:42:40", kind: "system", tag: "argus", text: "Error grouped with 3 earlier events in shop/server.lua:88" },
]

const NAV_ITEMS = [
  { label: "Dashboard", icon: DashboardSquare01Icon },
  { label: "Console", icon: ComputerTerminal01Icon, active: true },
  { label: "Players", icon: UserGroupIcon },
  { label: "Bans", icon: UserBlock01Icon },
  { label: "Resources", icon: PackageIcon },
  { label: "Deploys", icon: GitBranchIcon },
  { label: "Settings", icon: Settings01Icon },
]

const TICK_SAMPLES = [
  18, 22, 20, 24, 19, 21, 26, 23, 20, 22, 25, 21, 19, 24, 22, 20, 23, 27, 22, 21, 24, 20, 61, 30, 23, 21, 19, 22, 24, 20, 21, 23,
]

const PLAYERS = [
  { name: "kxng", ping: 31 },
  { name: "vlt.ana", ping: 44 },
  { name: "mrkz", ping: 58 },
  { name: "dusk", ping: 27 },
]

export function ProductShot() {
  return (
    <section aria-label="Product preview">
      <Frame className="pb-16 md:pb-24">
        <div data-pulse-origin className="rounded-3xl bg-panel p-2">
          <div
            role="img"
            aria-label="Argus panel showing the live console, server health, tick time and online players"
            className="overflow-hidden rounded-2xl border border-border/70 bg-background"
          >
            <div aria-hidden className="grid min-h-[22rem] md:min-h-[30rem] md:grid-cols-[12.5rem_1fr] lg:grid-cols-[12.5rem_1fr_16rem]">
              <MockSidebar />
              <MockConsole />
              <MockInspector />
            </div>
          </div>
        </div>
      </Frame>
    </section>
  )
}

function MockSidebar() {
  return (
    <div className="hidden flex-col gap-1 border-r border-border/70 bg-panel p-2 md:flex">
      <div className="flex h-11 items-center gap-2.5 rounded-2xl px-2">
        <span className="grid size-7 place-items-center rounded-lg bg-background">
          <ArgusMark id="mock-sidebar" className="size-4" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm leading-5 font-medium text-foreground/90">arena-01</span>
          <span className="block truncate font-mono text-[11px] leading-4 text-muted-foreground/80">fxserver 12345</span>
        </span>
      </div>
      <div className="mt-1 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <span
            key={item.label}
            className={cn(
              "flex h-9 items-center gap-2.5 rounded-xl px-2.5 text-sm text-muted-foreground",
              item.active && "bg-muted text-foreground",
            )}
          >
            <HugeiconsIcon icon={item.icon} strokeWidth={1.75} className="size-4 shrink-0" />
            {item.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function MockConsole() {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="flex items-start justify-between gap-4 border-b border-border/70 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">Live console</p>
          <p className="mt-0.5 overflow-hidden font-mono text-[11px] text-ellipsis whitespace-pre text-muted-foreground">
            {"arena-01  pid 18244  up 3h 12m"}
          </p>
        </div>
        <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-lg bg-success/12 px-2 text-[11px] font-medium text-success">
          <span className="size-1.5 rounded-full bg-success" />
          Online
        </span>
      </div>
      <LiveConsole initialLines={CONSOLE_LINES} />
    </div>
  )
}

function MockInspector() {
  const peak = Math.max(...TICK_SAMPLES)
  const average = TICK_SAMPLES.reduce((total, value) => total + value, 0) / TICK_SAMPLES.length
  return (
    <div className="hidden flex-col gap-5 border-l border-border/70 p-4 lg:flex">
      <div>
        <p className="text-[11px] text-muted-foreground">Health</p>
        <dl className="mt-2 grid grid-cols-[1fr_auto] gap-y-2 text-xs">
          <dt className="flex items-center gap-2 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" />
            Heartbeat
          </dt>
          <dd className="font-mono tabular-nums">2s ago</dd>
          <dt className="flex items-center gap-2 text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" />
            Health check
          </dt>
          <dd className="font-mono tabular-nums">200 · 38 ms</dd>
          <dt className="pl-3.5 text-muted-foreground">Players</dt>
          <dd className="font-mono tabular-nums">48 / 64</dd>
          <dt className="pl-3.5 text-muted-foreground">Tick avg</dt>
          <dd className="font-mono tabular-nums">{average.toFixed(1)} ms</dd>
        </dl>
      </div>
      <div>
        <div className="flex items-baseline justify-between">
          <p className="text-[11px] text-muted-foreground">Tick time</p>
          <p className="font-mono text-[11px] text-warning tabular-nums">peak {peak} ms</p>
        </div>
        <div className="mt-2 flex h-16 items-end gap-[3px]">
          {TICK_SAMPLES.map((value, index) => (
            <span
              key={index}
              className={cn("flex-1 rounded-[2px]", value === peak ? "bg-warning" : "bg-chart-2/70")}
              style={{ height: `${Math.round((value / peak) * 100)}%` }}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground">Online</p>
        <ul className="mt-2 flex flex-col gap-1.5 text-xs">
          {PLAYERS.map((player) => (
            <li key={player.name} className="flex items-center justify-between">
              <span className="text-foreground/90">{player.name}</span>
              <span className="font-mono text-muted-foreground tabular-nums">{player.ping} ms</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
