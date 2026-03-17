"use client"

import { motion } from "framer-motion"

export function BorderBeam({
  size = 200,
  duration = 8,
  className = "",
}: {
  size?: number
  duration?: number
  className?: string
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute h-[200%] w-[200%] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-40 blur-xl"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: duration,
          ease: "linear",
        }}
      />
    </div>
  )
}
