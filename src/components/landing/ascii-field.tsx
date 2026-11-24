"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const RAMP = [".", ":", "-", "=", "+", "*"]
const CELL_WIDTH = 9
const CELL_HEIGHT = 16
const FONT_SIZE = 12
const FRAME_INTERVAL = 90
const HEARTBEAT_SECONDS = 3
const MAX_PIXEL_RATIO = 2
const NOISE_SCALE = 0.06
const FRAME_MAX_WIDTH = 1152
const RING_WIDTH = 22
const POINTER_RADIUS = 150
const STILL_TIME = 4.2
const CALM_MARGIN = 64
const CALM_FLOOR = 0.22

const GRADIENT_COUNT = 256
const GRADIENT_X = new Float32Array(GRADIENT_COUNT)
const GRADIENT_Y = new Float32Array(GRADIENT_COUNT)
for (let index = 0; index < GRADIENT_COUNT; index++) {
  const angle = (index / GRADIENT_COUNT) * Math.PI * 2
  GRADIENT_X[index] = Math.cos(angle)
  GRADIENT_Y[index] = Math.sin(angle)
}

function corner(cellX: number, cellY: number, offsetX: number, offsetY: number) {
  let value = Math.imul(cellX, 374761393) ^ Math.imul(cellY, 668265263)
  value = Math.imul(value ^ (value >>> 13), 1274126177)
  const index = (value ^ (value >>> 16)) & (GRADIENT_COUNT - 1)
  return (GRADIENT_X[index] ?? 0) * offsetX + (GRADIENT_Y[index] ?? 0) * offsetY
}

function fade(value: number) {
  return value * value * value * (value * (value * 6 - 15) + 10)
}

function noise(x: number, y: number) {
  const cellX = Math.floor(x)
  const cellY = Math.floor(y)
  const offsetX = x - cellX
  const offsetY = y - cellY
  const easeX = fade(offsetX)
  const easeY = fade(offsetY)
  const top = corner(cellX, cellY, offsetX, offsetY)
  const topNext = corner(cellX + 1, cellY, offsetX - 1, offsetY)
  const bottom = corner(cellX, cellY + 1, offsetX, offsetY - 1)
  const bottomNext = corner(cellX + 1, cellY + 1, offsetX - 1, offsetY - 1)
  const upper = top + (topNext - top) * easeX
  const lower = bottom + (bottomNext - bottom) * easeX
  return (upper + (lower - upper) * easeY) * 0.72 + 0.5
}

function smoothstep(start: number, end: number, value: number) {
  const amount = Math.min(1, Math.max(0, (value - start) / (end - start)))
  return amount * amount * (3 - 2 * amount)
}

type AsciiFieldProps = {
  className?: string
  pulseOrigin?: string
  calm?: string
}

export function AsciiField({ className, pulseOrigin, calm }: AsciiFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")

    let width = 0
    let height = 0
    let columns = 0
    let rows = 0
    let weights = new Float32Array(0)
    let levels = new Uint8Array(0)
    let falloffs = new Float32Array(0)
    let color = ""
    let font = ""
    let originX = 0
    let originY = 0
    let hasOrigin = false
    let pointerX = -9999
    let pointerY = -9999
    let targetX = -9999
    let targetY = -9999
    let onScreen = true
    let frame = 0
    let last = 0

    const fieldWeights = (rect: DOMRect) => {
      const frameHalf = Math.min(width, FRAME_MAX_WIDTH) / 2
      const zones = calm ? Array.from(document.querySelectorAll(calm), (element) => element.getBoundingClientRect()) : []
      for (let row = 0; row < rows; row++) {
        const falloff = 1 - smoothstep(0.3, 1, (row + 0.5) / rows)
        const centerY = (row + 0.5) * CELL_HEIGHT
        falloffs[row] = falloff
        for (let column = 0; column < columns; column++) {
          const centerX = (column + 0.5) * CELL_WIDTH
          const edge = smoothstep(frameHalf - 200, frameHalf + 40, Math.abs(centerX - width / 2))
          let quiet = 1
          for (const zone of zones) {
            const gapX = Math.max(zone.left - rect.left - centerX, 0, centerX - (zone.right - rect.left))
            const gapY = Math.max(zone.top - rect.top - centerY, 0, centerY - (zone.bottom - rect.top))
            quiet = Math.min(quiet, smoothstep(0, CALM_MARGIN, Math.hypot(gapX, gapY)))
          }
          weights[row * columns + column] = falloff * (0.68 + 0.32 * edge) * (CALM_FLOOR + (1 - CALM_FLOOR) * quiet)
        }
      }
    }

    const measure = () => {
      const rect = canvas.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
      width = rect.width
      height = rect.height
      canvas.width = Math.max(1, Math.round(width * ratio))
      canvas.height = Math.max(1, Math.round(height * ratio))
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      columns = Math.ceil(width / CELL_WIDTH)
      rows = Math.ceil(height / CELL_HEIGHT)
      weights = new Float32Array(columns * rows)
      falloffs = new Float32Array(rows)
      levels = new Uint8Array(columns * rows)
      const style = getComputedStyle(canvas)
      color = style.color
      font = `${FONT_SIZE}px ${style.fontFamily}`
      fieldWeights(rect)
      const origin = pulseOrigin ? document.querySelector(pulseOrigin) : null
      hasOrigin = Boolean(origin)
      if (origin) {
        const target = origin.getBoundingClientRect()
        originX = target.left + target.width / 2 - rect.left
        originY = target.top - rect.top
      }
    }

    const draw = (time: number, still: boolean) => {
      context.clearRect(0, 0, width, height)
      pointerX += (targetX - pointerX) * 0.35
      pointerY += (targetY - pointerY) * 0.35
      const beat = (time % HEARTBEAT_SECONDS) / HEARTBEAT_SECONDS
      const ringRadius = beat * Math.max(width, height) * 0.7
      const ringStrength = hasOrigin && !still ? (1 - beat) ** 1.6 : 0
      const drift = time * 0.07
      const aspect = CELL_HEIGHT / CELL_WIDTH

      for (let row = 0; row < rows; row++) {
        const noiseY = row * NOISE_SCALE * aspect
        const centerY = row * CELL_HEIGHT + CELL_HEIGHT / 2
        for (let column = 0; column < columns; column++) {
          const index = row * columns + column
          const weight = weights[index] ?? 0
          if (weight < 0.02) {
            levels[index] = 0
            continue
          }
          const noiseX = column * NOISE_SCALE
          const warp = noise(noiseX * 0.6 + drift * 0.7, noiseY * 0.6 - drift * 0.5) * 1.8
          const base =
            noise(noiseX + warp + drift, noiseY + warp + drift * 0.4) * 0.68 +
            noise(noiseX * 2.4 - drift * 1.3, noiseY * 2.4 + drift * 0.6) * 0.32
          const centerX = column * CELL_WIDTH + CELL_WIDTH / 2
          let value = smoothstep(0.46, 0.74, base)
          const reach = Math.hypot(centerX - pointerX, centerY - pointerY) / POINTER_RADIUS
          if (reach < 2.5) value += Math.exp(-reach * reach) * 0.45
          value *= weight
          if (ringStrength > 0) {
            const distance = Math.hypot(centerX - originX, centerY - originY)
            const offset = (distance - ringRadius) / RING_WIDTH
            if (offset > -3 && offset < 3) {
              const lift = ((falloffs[row] ?? 0) + weight) / 2
              value += Math.exp(-offset * offset) * ringStrength * lift * 0.62
            }
          }
          levels[index] = value <= 0.04 ? 0 : Math.min(RAMP.length, Math.ceil(value * RAMP.length))
        }
      }

      context.font = font
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.fillStyle = color
      for (let level = 1; level <= RAMP.length; level++) {
        const glyph = RAMP[level - 1] ?? "."
        context.globalAlpha = 0.1 + level * 0.055
        for (let index = 0; index < levels.length; index++) {
          if (levels[index] !== level) continue
          const column = index % columns
          const row = (index - column) / columns
          context.fillText(glyph, column * CELL_WIDTH + CELL_WIDTH / 2, row * CELL_HEIGHT + CELL_HEIGHT / 2)
        }
      }
      context.globalAlpha = 1
    }

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (now - last < FRAME_INTERVAL) return
      last = now
      draw(now / 1000, false)
    }

    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }

    const start = () => {
      stop()
      if (reducedMotion.matches) {
        draw(STILL_TIME, true)
        return
      }
      draw(performance.now() / 1000, false)
      if (onScreen && document.visibilityState === "visible") frame = requestAnimationFrame(tick)
    }

    const refresh = () => {
      measure()
      start()
    }

    const handlePointer = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return
      const rect = canvas.getBoundingClientRect()
      targetX = event.clientX - rect.left
      targetY = event.clientY - rect.top
    }

    const resizeObserver = new ResizeObserver(refresh)
    resizeObserver.observe(canvas)
    const themeObserver = new MutationObserver(refresh)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] })
    const viewObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry?.isIntersecting ?? true
      if (onScreen) start()
      else stop()
    })
    viewObserver.observe(canvas)

    window.addEventListener("pointermove", handlePointer, { passive: true })
    document.addEventListener("visibilitychange", start)
    reducedMotion.addEventListener("change", start)
    let disposed = false
    document.fonts.ready.then(() => {
      if (!disposed) refresh()
    })
    refresh()

    return () => {
      disposed = true
      stop()
      resizeObserver.disconnect()
      themeObserver.disconnect()
      viewObserver.disconnect()
      window.removeEventListener("pointermove", handlePointer)
      document.removeEventListener("visibilitychange", start)
      reducedMotion.removeEventListener("change", start)
    }
  }, [pulseOrigin, calm])

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none block font-mono text-foreground", className)} />
}
