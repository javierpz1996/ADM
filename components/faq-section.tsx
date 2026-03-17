"use client"

import { Plus, Minus } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "Are there qualifiers?",
    answer:
      "Yes, there are open and closed qualifiers for various regions leading up to the main events.",
  },
  {
    question: "Will there be a live audience for these events?",
    answer:
      "Select events will feature live audiences. Check individual event pages for details.",
  },
  {
    question: "What is the ESL Pro Tour?",
    answer:
      "The ESL Pro Tour is a comprehensive competitive circuit for professional esports.",
  },
  {
    question: "Does the ESL Pro Tour only cover Dota 2?",
    answer:
      "No, the ESL Pro Tour covers multiple esports titles including CS2 and other games.",
  },
  {
    question: "What are the streaming guidelines for the EPT?",
    answer:
      "Streaming guidelines vary by event. Please refer to the official documentation for details.",
  },
  {
    question: "Where can I find the official press release?",
    answer:
      "Official press releases can be found on the ESL Pro Tour website and media channels.",
  },
]

export function FaqSection() {
  return (
    <section className="w-full bg-[#030712] py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Contenedor rectangular */}
        <div className="mx-auto max-w-7xl border border-[#4b5563] bg-[#020617]/90 px-6 py-8 shadow-[0_0_40px_rgba(15,23,42,0.9)] md:px-10 md:py-10">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left side - Title and subtitle centrado vertical */}
            <div className="space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#896afd] via-[#a78bfa] to-[#38bdf8]"
            >
              Any Questions?
            </h2>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg max-w-xl">
              For a clearer explanation and breakdown of the DOTA 2 ESL Pro Tour,
              make sure to visit the{" "}
              <a
                href="#"
                className="font-bold text-[#a78bfa] transition-colors hover:text-[#38bdf8]"
              >
                Season 3
              </a>{" "}
              details page!
            </p>
          </div>

          {/* Right side - FAQ Accordion */}
          <div className="w-full">
            <Accordion type="single" collapsible className="w-full space-y-1">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border/40 first:border-t-0"
                >
                  <AccordionTrigger className="group flex items-center justify-between py-3 text-sm md:text-base font-medium text-white transition-colors hover:no-underline hover:text-[#a78bfa] [&[data-state=open]>div>svg.plus-icon]:hidden [&[data-state=open]>div>svg.minus-icon]:block [&>svg]:hidden">
                    <span className="text-left">{item.question}</span>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#4b5563] transition-colors group-hover:border-[#a78bfa]/70">
                      <Plus className="plus-icon h-4 w-4 text-[#a78bfa]" />
                      <Minus className="minus-icon hidden h-4 w-4 text-[#a78bfa]" />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-sm text-muted-foreground md:text-[0.95rem]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}

