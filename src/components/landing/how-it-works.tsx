import { Frame, SectionHeading } from "./primitives"

const STEPS = [
  {
    title: "Install the agent",
    description: "One service on the machine that runs FXServer, on Windows or Linux.",
    detail: "argus-agent install",
  },
  {
    title: "Point it at your server",
    description: "Pick the server data folder and server.cfg. Both are validated before the first start.",
    detail: "+exec server.cfg",
  },
  {
    title: "Open the panel",
    description: "Sign in with Discord and invite your staff with the roles they need.",
    detail: "console.view  console.write",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="scroll-mt-16 border-t border-border/60 bg-panel">
      <Frame className="grid gap-10 py-16 md:grid-cols-[1fr_1.15fr] md:py-24">
        <div className="md:sticky md:top-24 md:self-start">
          <SectionHeading
            id="how-title"
            eyebrow="How it works"
            title="From install to live console in three steps"
            description="The agent starts FXServer as its own child process, so it sees every line, every exit code and every hung thread."
          />
        </div>
        <ol className="flex flex-col gap-2">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5">
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-border font-mono text-xs text-muted-foreground">
                {index + 1}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-medium">{step.title}</h3>
                <p className="mt-1 text-sm text-pretty text-muted-foreground">{step.description}</p>
                <p className="mt-3 w-fit rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] whitespace-pre text-muted-foreground">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Frame>
    </section>
  )
}
