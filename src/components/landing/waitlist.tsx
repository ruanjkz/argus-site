"use client"

import { useState, type FormEvent } from "react"

import { TextSwap } from "@/components/motion-primitives"
import { cn } from "@/lib/utils"

import { BUTTON_PRIMARY, Frame, SectionHeading } from "./primitives"

type Status = "idle" | "sending" | "done" | "error"

const LABELS: Record<Status, string> = {
  idle: "Join the waitlist",
  sending: "Joining…",
  done: "You are on the list",
  error: "Try again",
}

export function Waitlist() {
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const email = new FormData(form).get("email")
    setStatus("sending")
    setMessage("")
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null
        setStatus("error")
        setMessage(body?.error ?? "Something went wrong. Try again in a moment.")
        return
      }
      setStatus("done")
      setMessage("We will email you when your spot opens.")
      form.reset()
    } catch {
      setStatus("error")
      setMessage("Could not reach the server. Check your connection and try again.")
    }
  }

  return (
    <section id="waitlist" aria-labelledby="waitlist-title" className="scroll-mt-16">
      <Frame className="border-t border-border/60 py-16 md:py-24">
        <div className="rounded-3xl bg-panel p-2">
          <div className="rounded-2xl border border-border/70 bg-background px-6 py-12 sm:px-12 sm:py-16">
            <SectionHeading
              align="center"
              id="waitlist-title"
              eyebrow="Early access"
              title="Get Argus on your server first"
              description="Spots open in small batches. One email when yours is ready, nothing else."
            />
            <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row">
              <label htmlFor="waitlist-email" className="sr-only">
                Email
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@server.gg"
                disabled={status === "sending" || status === "done"}
                aria-describedby="waitlist-message"
                aria-invalid={status === "error" ? true : undefined}
                className="h-10 min-w-0 flex-1 rounded-xl border border-input bg-transparent px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-45 aria-invalid:border-destructive"
              />
              <button type="submit" disabled={status === "sending" || status === "done"} className={cn(BUTTON_PRIMARY, "sm:w-44")}>
                <TextSwap text={LABELS[status]} />
              </button>
            </form>
            <p
              id="waitlist-message"
              aria-live="polite"
              className={cn(
                "mt-3 min-h-5 text-center text-xs",
                status === "error" ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {message}
            </p>
          </div>
        </div>
      </Frame>
    </section>
  )
}
