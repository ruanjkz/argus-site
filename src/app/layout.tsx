import type { Metadata } from "next"
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import Script from "next/script"

import { THEME_SCRIPT } from "@/lib/theme-script"
import { cn } from "@/lib/utils"

import "./globals.css"

const plexSans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans" })
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-mono" })

export const metadata: Metadata = {
  title: "Argus · FiveM server management",
  description:
    "Argus spawns, watches and restarts FXServer from the outside. Live console, health monitoring, moderation and safe deploys.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("dark antialiased", plexSans.variable, plexMono.variable)}>
      <body>
        <Script id="theme" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {children}
      </body>
    </html>
  )
}
