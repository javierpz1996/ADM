"use client"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  duration?: number
  colorFrom?: string
  colorTo?: string
  className?: string
  borderWidth?: number
}

export function BorderBeam({
  className,
  duration = 8,
  colorFrom = "#896afd",
  colorTo = "#00e7ff",
  borderWidth = 2,
}: BorderBeamProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden", className)}
      aria-hidden
    >
      <div
        className="absolute rounded-[inherit] w-[200%] h-[200%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-beam-rotate"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg 250deg, ${colorFrom} 280deg, ${colorTo} 320deg, transparent 360deg)`,
          animationDuration: `${duration}s`,
        }}
      />
    </div>
  )
}
