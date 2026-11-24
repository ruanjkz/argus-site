"use client"

import { useSyncExternalStore } from "react"

import { THEME_STORAGE_KEY } from "./theme-script"

export type Theme = "light" | "dark"

const listeners = new Set<() => void>()

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function setTheme(theme: Theme) {
  const root = document.documentElement
  const blocker = document.createElement("style")
  blocker.textContent = "*,*::before,*::after{transition:none!important}"
  document.head.appendChild(blocker)
  root.classList.toggle("dark", theme === "dark")
  root.style.colorScheme = theme
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {}
  listeners.forEach((listener) => listener())
  root.getBoundingClientRect()
  requestAnimationFrame(() => blocker.remove())
}

export function useTheme() {
  const resolvedTheme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark")
  return { theme: resolvedTheme, resolvedTheme, setTheme }
}
