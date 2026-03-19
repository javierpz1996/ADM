"use client"

import { motion } from "framer-motion"
import type { Transition } from "framer-motion"
import { cn } from "@/lib/utils"

interface BorderBeamProps {
  size?: number
  initialOffset?: number
  className?: string
  transition?: Transition
}

export function BorderBeam({
  size = 50,
  initialOffset = 0,
  className,
  transition,
}: BorderBeamProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <motion.div
        className={cn(
          "absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r",
          className ?? "from-transparent via-[#896afd] to-transparent"
        )}
        style={{ opacity: 0.6 }}
        initial={{ rotate: initialOffset * 3.6 }}
        animate={{ rotate: 360 + (initialOffset * 3.6) }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 8,
          ...transition,
        }}
      />
    </div>
  )
}
