import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import { Frame, SectionHeading } from "./primitives"

const QUESTIONS = [
  {
    question: "Can I try it without touching my live server?",
    answer:
      "Yes. Install the agent on a staging instance first and keep your current setup on production until you are ready to switch.",
  },
  {
    question: "Will updating the panel restart my server?",
    answer:
      "No. The panel and the agent are separate. The agent only restarts FXServer when you, a schedule or a failed health check asks for it.",
  },
  {
    question: "Which hosts are supported?",
    answer: "Windows and Linux machines that run FXServer. The agent is a single Node.js service.",
  },
  {
    question: "Does it need a resource on my server?",
    answer:
      "One small Lua resource, named argus. It sends heartbeats, player events and logs back to the agent and receives commands from it.",
  },
  {
    question: "When can I use it?",
    answer: "Argus is in early access. Join the waitlist and we will email you when a spot opens.",
  },
]

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16">
      <Frame marks className="grid gap-10 border-t border-border/60 py-16 md:grid-cols-[1fr_1.3fr] md:py-24">
        <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions server owners ask first" />
        <Accordion type="single" collapsible className="rounded-2xl border-border/70">
          {QUESTIONS.map((item) => (
            <AccordionItem key={item.question} value={item.question} className="border-border/70 data-open:bg-muted/40">
              <AccordionTrigger className="p-4 text-sm font-medium hover:no-underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-2 text-sm leading-relaxed text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Frame>
    </section>
  )
}
