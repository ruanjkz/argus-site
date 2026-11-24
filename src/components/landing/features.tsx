import type { ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  Activity01Icon,
  Alert02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  ComputerTerminal01Icon,
  GitBranchIcon,
  Image01Icon,
  LockIcon,
  Rocket01Icon,
  Shield01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

import { FeatureIndex, type FeatureIndexItem } from "./feature-index"
import { Eyebrow, Frame, SectionHeading } from "./primitives"

type Feature = FeatureIndexItem & {
  icon: IconSvgElement
  title: string
  description: string
  points: string[]
  mock: ReactNode
}

const FEATURES: Feature[] = [
  {
    id: "console",
    label: "Console",
    summary: "Every line, tagged and colored",
    icon: ComputerTerminal01Icon,
    title: "A console that reads like a terminal",
    description:
      "Stdout and stderr in their original colors, with timestamps and the name of whoever ran each command. Autocomplete comes from the server itself.",
    points: [
      "Admin commands tagged with the admin's name",
      "Autocomplete from the commands the server registered",
      "Permissions per command, per role",
    ],
    mock: <ConsoleMock />,
  },
  {
    id: "monitor",
    label: "Monitor",
    summary: "Know what froze, not just that it froze",
    icon: Activity01Icon,
    title: "Know which resource froze the server",
    description:
      "A heartbeat from inside the Lua runtime and a health check against the HTTP thread run side by side. When a thread hangs, you get the stack trace instead of a guess.",
    points: [
      "Heartbeat every 3 seconds over two channels",
      "Hung thread stacks grouped by resource",
      "Profiler captured automatically on tick spikes",
    ],
    mock: <MonitorMock />,
  },
  {
    id: "moderation",
    label: "Moderation",
    summary: "Bans that follow the player",
    icon: Shield01Icon,
    title: "Bans that follow the player, not the account",
    description:
      "Identifiers, hardware tokens and IPs are linked into one history, so a fresh license does not mean a clean slate.",
    points: [
      "Linked accounts across identifiers and tokens",
      "Screenshot evidence attached to every ban",
      "Appeals with Discord sign-in",
    ],
    mock: <ModerationMock />,
  },
  {
    id: "deploy",
    label: "Deploy",
    summary: "Update without restarting blind",
    icon: Rocket01Icon,
    title: "Update without restarting blind",
    description:
      "The agent lives outside FXServer. Update the panel at any time, test resources on a second instance and pin the artifact you trust.",
    points: [
      "Git deploys applied at the next scheduled restart",
      "Staging instance on the same host",
      "Pin and roll back FXServer artifacts",
    ],
    mock: <DeployMock />,
  },
]

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-16">
      <Frame className="border-t border-border/60 py-16 md:py-24">
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          title="Everything you check when the server acts up"
          description="Four parts of one panel, built around the way FXServer actually reports what it is doing."
        />
        <div className="mt-12 grid gap-12 md:grid-cols-[15rem_1fr] md:gap-10 lg:gap-16">
          <FeatureIndex items={FEATURES.map(({ id, label, summary, icon }) => ({ id, label, summary, icon }))} />
          <div className="flex min-w-0 flex-col gap-20">
            {FEATURES.map((feature) => (
              <article key={feature.id} id={feature.id} aria-labelledby={`${feature.id}-title`} className="scroll-mt-24">
                <Eyebrow icon={feature.icon}>{feature.label}</Eyebrow>
                <h3 id={`${feature.id}-title`} className="mt-4 text-2xl font-medium tracking-tight text-balance sm:text-3xl">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-xl text-pretty text-muted-foreground">{feature.description}</p>
                <ul className="mt-5 flex flex-col gap-2 text-sm">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <HugeiconsIcon icon={Tick02Icon} strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <span className="text-foreground/90">{point}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 max-w-2xl">{feature.mock}</div>
              </article>
            ))}
          </div>
        </div>
      </Frame>
    </section>
  )
}

function MockFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="rounded-[1.375rem] bg-panel p-2">
      <div role="img" aria-label={label} className="rounded-2xl border border-border/70 bg-background p-4">
        <div aria-hidden>{children}</div>
      </div>
    </div>
  )
}

const COMMANDS = [
  { name: "start", args: "<resource>", role: "moderator", allowed: true },
  { name: "status", args: "", role: "moderator", allowed: true },
  { name: "stop", args: "<resource>", role: "owner", allowed: false },
]

function ConsoleMock() {
  return (
    <MockFrame label="Command autocomplete with permissions: a moderator can run start and status, stop is owner only">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Signed in as moderator</span>
        <span className="font-mono">3 matches</span>
      </div>
      <div className="mt-3 flex h-9 items-center gap-2 rounded-xl border border-border/70 px-3 font-mono text-[13px] ring-2 ring-focus/60">
        <span className="text-muted-foreground">›</span>
        <span>st</span>
        <span className="h-4 w-px bg-foreground" />
      </div>
      <ul className="mt-2 flex flex-col gap-0.5 font-mono text-[12px]">
        {COMMANDS.map((command, index) => (
          <li
            key={command.name}
            className={cn(
              "flex h-9 items-center gap-3 rounded-lg px-3",
              index === 0 && "bg-muted",
              !command.allowed && "text-muted-foreground",
            )}
          >
            <span className={cn("w-14", command.allowed && "text-foreground")}>{command.name}</span>
            <span className="flex-1 text-muted-foreground">{command.args}</span>
            {command.allowed ? (
              <span className="text-muted-foreground">{command.role}</span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <HugeiconsIcon icon={LockIcon} strokeWidth={1.75} className="size-3.5" />
                {command.role} only
              </span>
            )}
          </li>
        ))}
      </ul>
    </MockFrame>
  )
}

const LANES = [
  { name: "fd3", gap: [14, 15, 16] },
  { name: "http", gap: [] as number[] },
]

function MonitorMock() {
  return (
    <MockFrame label="Incident card: server thread hung for 4.1 seconds in inventory, with stack trace and heartbeat lanes">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <HugeiconsIcon icon={Alert02Icon} strokeWidth={1.75} className="size-4 text-destructive" />
          Server thread hung
        </span>
        <span className="font-mono text-[11px] text-muted-foreground tabular-nums">4.1s  23:14:52</span>
      </div>
      <div className="mt-3 rounded-xl bg-muted px-3 py-2.5 font-mono text-[12px] leading-5">
        <p>
          <span className="text-muted-foreground">svMain </span>
          <span className="text-foreground">@inventory/server/tick.lua:212</span>
        </p>
        <p className="text-muted-foreground sm:pl-[7ch]">@inventory/server/main.lua:48</p>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {LANES.map((lane) => (
          <div key={lane.name} className="flex items-center gap-3">
            <span className="w-9 font-mono text-[11px] text-muted-foreground">{lane.name}</span>
            <div className="flex flex-1 gap-[3px]">
              {Array.from({ length: 24 }, (_, index) => (
                <span
                  key={index}
                  className={cn("h-3 flex-1 rounded-[2px]", lane.gap.includes(index) ? "bg-destructive/50" : "bg-chart-2/50")}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">profiler capture saved  300 frames</p>
    </MockFrame>
  )
}

const LINKED = [
  { id: "license:3f2a…91c0", reason: "current" },
  { id: "license:b81d…02ee", reason: "same token" },
  { id: "discord:8812…4471", reason: "same discord" },
  { id: "ip 177.92.x.42", reason: "same ip" },
]

function ModerationMock() {
  return (
    <MockFrame label="Player kxng banned for 7 days, with four linked accounts and two screenshots attached">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-muted font-mono text-[11px] font-medium">KX</span>
          <span>
            <span className="block text-sm font-medium">kxng</span>
            <span className="block font-mono text-[11px] text-muted-foreground">first seen 14 Mar</span>
          </span>
        </span>
        <span className="inline-flex h-6 items-center rounded-lg bg-destructive/12 px-2 text-[11px] font-medium text-destructive">
          Banned · 7 days
        </span>
      </div>
      <p className="mt-4 text-[11px] text-muted-foreground">Linked accounts</p>
      <ul className="mt-2 divide-y divide-border/70 rounded-xl border border-border/70 font-mono text-[12px]">
        {LINKED.map((account) => (
          <li key={account.id} className="flex h-9 items-center justify-between gap-3 px-3">
            <span className="truncate text-foreground/90">{account.id}</span>
            <span className="shrink-0 text-muted-foreground">{account.reason}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
        <HugeiconsIcon icon={Image01Icon} strokeWidth={1.75} className="size-4" />2 screenshots attached
      </p>
    </MockFrame>
  )
}

const DEPLOY_STEPS = [
  { label: "Pulled from main", meta: "12s", done: true },
  { label: "Validated fxmanifest.lua", meta: "0.4s", done: true },
  { label: "Started on arena-staging", meta: "6s", done: true },
  { label: "Apply at next restart", meta: "04:00", done: false },
]

function DeployMock() {
  return (
    <MockFrame label="Deploy of shop at commit a41c9e2: three steps done, waiting for the 04:00 restart">
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 text-sm font-medium">
          <HugeiconsIcon icon={GitBranchIcon} strokeWidth={1.75} className="size-4 text-muted-foreground" />
          shop
          <span className="font-mono text-[11px] font-normal text-muted-foreground">a41c9e2</span>
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">3 / 4</span>
      </div>
      <ol className="mt-4 flex flex-col gap-1">
        {DEPLOY_STEPS.map((step) => (
          <li key={step.label} className={cn("flex h-9 items-center gap-2.5 rounded-xl px-2.5", !step.done && "bg-muted")}>
            <HugeiconsIcon
              icon={step.done ? CheckmarkCircle02Icon : Clock01Icon}
              strokeWidth={1.75}
              className={cn("size-4 shrink-0", step.done ? "text-success" : "text-muted-foreground")}
            />
            <span className={cn("flex-1 text-sm", step.done ? "text-muted-foreground" : "text-foreground")}>{step.label}</span>
            <span className="font-mono text-[11px] text-muted-foreground tabular-nums">{step.meta}</span>
          </li>
        ))}
      </ol>
    </MockFrame>
  )
}
