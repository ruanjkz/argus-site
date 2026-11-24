import { cn } from "@/lib/utils"

export function ArgusMark({ id, className }: { id: string; className?: string }) {
  const gradientId = `${id}-gradient`
  return (
    <svg viewBox="0 0 320 320" aria-hidden className={cn("size-6 shrink-0", className)}>
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="5.5" y1="160" x2="314.5" y2="160">
          <stop offset="0" stopColor="#DDC3AE" />
          <stop offset="1" stopColor="#E2EEFF" />
        </linearGradient>
      </defs>
      <g className="fill-foreground dark:hidden">
        <MarkPaths />
      </g>
      <g className="hidden dark:inline" fill={`url(#${gradientId})`}>
        <MarkPaths />
      </g>
    </svg>
  )
}

function MarkPaths() {
  return (
    <>
      <path d="M6.61 141.5 A154.5 154.5 0 0 1 313.39 141.5 L245 141.5 A66 66 0 0 1 179 75.5 L141 75.5 A66 66 0 0 1 75 141.5 Z" />
      <path d="M6.61 178.5 L75 178.5 A66 66 0 0 1 141 244.5 L179 244.5 A66 66 0 0 1 245 178.5 L313.39 178.5 A154.5 154.5 0 0 1 6.61 178.5 Z" />
    </>
  )
}

export function ArgusLogo({ id, className }: { id: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <ArgusMark id={id} />
      <span className="text-[15px] font-medium tracking-tight">argus</span>
    </span>
  )
}
