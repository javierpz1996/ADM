"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function BorderBeam({
  duration = 8,
  size = 100,
  reverse = false,
  className,
}: {
  duration?: number
  size?: number
  reverse?: boolean
  className?: string
}) {
  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-xl z-0 bg-gradient-to-r",
        className ?? "from-transparent via-[#a855f7] to-transparent"
      )}
      style={{
        backgroundSize: `${size}px 100%`,
        backgroundRepeat: "repeat",
      }}
      animate={{
        backgroundPosition: reverse ? ["200% 0%", "0% 0%"] : ["0% 0%", "200% 0%"],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}
