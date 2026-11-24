import type { KeyboardEvent } from "react"

const STEPS: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

export function handleRadioKeyDown(event: KeyboardEvent<HTMLElement>) {
  const step = STEPS[event.key]
  if (!step) return
  const group = event.currentTarget.closest('[role="radiogroup"]')
  if (!group) return
  const radios = [...group.querySelectorAll<HTMLElement>('[role="radio"]:not(:disabled)')]
  const index = radios.indexOf(event.currentTarget)
  if (index === -1 || radios.length < 2) return
  event.preventDefault()
  const next = radios[(index + step + radios.length) % radios.length]
  next.focus()
  next.click()
}
