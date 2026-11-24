"use client"

import { useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

function readDuration(variable: string, fallback: number) {
  return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(variable)) || fallback
}

export function TextSwap({ text, className }: { text: string; className?: string }) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const [initialText] = useState(text)
  const shown = useRef(text)

  useLayoutEffect(() => {
    const element = elementRef.current
    if (!element || shown.current === text) return
    shown.current = text
    element.classList.add("is-exit")
    const timer = window.setTimeout(() => {
      element.textContent = text
      element.classList.remove("is-exit")
      element.classList.add("is-enter-start")
      element.getBoundingClientRect()
      element.classList.remove("is-enter-start")
    }, readDuration("--text-swap-dur", 200))
    return () => window.clearTimeout(timer)
  }, [text])

  return (
    <span ref={elementRef} className={cn("t-text-swap", className)} aria-live="polite">
      {initialText}
    </span>
  )
}
