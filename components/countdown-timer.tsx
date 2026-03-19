"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate?: Date
  /** Si se pasa, la cuenta regresiva es "hoy + N días" (se calcula en el cliente). */
  daysFromNow?: number
  title?: string
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const difference = targetDate.getTime() - new Date().getTime()

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative group">
      {/* Glow effect - violet/cyan */}
      <div className="absolute -inset-1 rounded-none blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#896afd]/30" />

      {/* Card */}
      <div className="relative flex flex-col items-center justify-center w-20 h-24 sm:w-28 sm:h-32 md:w-32 md:h-36 rounded-none bg-[#020617]/80 backdrop-blur-md border border-white/50 shadow-lg shadow-black/20">
        <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums">
          {value.toString().padStart(2, "0")}
        </span>
        <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-white/60 mt-1">
          {label}
        </span>
      </div>
    </div>
  )
}

function Separator() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-0.5 sm:px-1">
      <div className="w-2 h-2 rounded-full bg-[#896afd99]" />
      <div className="w-2 h-2 rounded-full bg-[#896afd99]" />
    </div>
  )
}

export function CountdownTimer({ targetDate: targetDateProp, daysFromNow, title }: CountdownTimerProps) {
  const [targetDate, setTargetDate] = useState<Date | null>(() => targetDateProp ?? null)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    targetDateProp ? calculateTimeLeft(targetDateProp) : { days: 0, hours: 0, minutes: 0, seconds: 0 }
  )
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (daysFromNow != null && !targetDateProp) {
      const target = new Date()
      target.setDate(target.getDate() + daysFromNow)
      target.setHours(0, 0, 0, 0)
      setTargetDate(target)
    }
  }, [daysFromNow, targetDateProp])

  useEffect(() => {
    const date = targetDateProp ?? targetDate
    if (!date) return

    const update = () => setTimeLeft(calculateTimeLeft(date))
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [targetDateProp, targetDate])

  if (!mounted) {
    return (
      <section className="py-8 md:py-8">
        <div className="container mx-auto px-4">
          {title && (
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#cc00ff] to-[#00e7ff]" style={{ fontFamily: "'Bison Bold', sans-serif" }}>
              {title}
            </h2>
          )}
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <TimeBlock value={0} label="DÍAS" />
            <Separator />
            <TimeBlock value={0} label="HORAS" />
            <Separator />
            <TimeBlock value={0} label="MIN" />
            <Separator />
            <TimeBlock value={0} label="SEG" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-8">
      <div className="container mx-auto px-4">
        {title && (
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#cc00ff] to-[#00e7ff] drop-shadow-[0_0_15px_rgba(204,0,255,0.3)]" style={{ fontFamily: "'Bison Bold', sans-serif" }}>
            {title}
          </h2>
        )}
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <TimeBlock value={timeLeft.days} label="DÍAS" />
          <Separator />
          <TimeBlock value={timeLeft.hours} label="HORAS" />
          <Separator />
          <TimeBlock value={timeLeft.minutes} label="MIN" />
          <Separator />
          <TimeBlock value={timeLeft.seconds} label="SEG" />
        </div>
      </div>
    </section>
  )
}
