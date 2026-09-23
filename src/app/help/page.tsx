"use client";

import { AppHeader } from "@/components/app-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const FAQ: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Overview",
    items: [
      {
        q: "What is ProposalPal?",
        a: "ProposalPal is an AI proposal partner that brings research, content, teaming and commercial strategy into one workspace, so a team can move from RFP to a winning proposal faster.",
      },
      {
        q: "What can ProposalPal do?",
        a: "It generates client research, engagement plans, team recommendations, topic research, a slide-by-slide storyline, a commercial approach, feedback on your draft, and practice pitch questions. You can chat with the assistant about any module, bookmark useful passages and export everything as Markdown.",
      },
    ],
  },
  {
    group: "Access",
    items: [
      {
        q: "Who can access ProposalPal?",
        a: "Anyone with the link. In this version proposals are stored in your browser, so each person sees the proposals they created on their own device.",
      },
      {
        q: "I can't find my team member",
        a: "Team members are chosen from the people directory in the Team Members panel on the proposal details page. Search by name; if someone is missing, ask the app owner to add them to the directory.",
      },
      {
        q: "I can't open ProposalPal on my phone?",
        a: "ProposalPal is designed for desktop screens. The home and details pages work on mobile, but the workspace needs a wider screen.",
      },
    ],
  },
  {
    group: "Creating a new proposal",
    items: [
      {
        q: "How can I create a new proposal?",
        a: "Click New Proposal, fill in the Opportunity ID, Client Name and Proposal Name, then upload an RFP or draft and/or write a short proposal context. Use Generate to draft the remaining details, then open the workspace.",
      },
      {
        q: "How can I find a proposal my team created?",
        a: "Proposals are stored locally in the browser that created them. Ask the creator to export the generated content, or to share their screen.",
      },
      {
        q: "Where can I find an old proposal?",
        a: "All proposals created in this browser are listed on the home page. Use search, sort and the practice-area filter to find them.",
      },
      {
        q: "Can I upload more documents later?",
        a: "Yes. Open the proposal details page and use Edit on the Proposal Details panel to add files, or attach a file directly in the workspace chat.",
      },
    ],
  },
  {
    group: "Security & Privacy",
    items: [
      {
        q: "How is confidential data handled?",
        a: "Proposal data is stored in your browser. When you generate content, the proposal details and excerpts of uploaded documents are sent to the configured AI provider. Free tiers of hosted providers may use prompts to improve their models; for confidential material use a local model (Ollama) or a paid tier with data-use protections.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        <h1 className="text-2xl font-bold">Instructions & Support</h1>
        <p className="mt-1 text-sm text-muted-foreground">Learn more about the proposal process and how to get product help</p>
        <Tabs defaultValue="faq" className="mt-6">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>
          <TabsContent value="faq" className="mt-4 space-y-8">
            {FAQ.map((g) => (
              <section key={g.group}>
                <h2 className="mb-2 text-lg font-semibold">{g.group}</h2>
                <Accordion>
                  {g.items.map((it) => (
                    <AccordionItem key={it.q} value={it.q} className="border-b">
                      <AccordionTrigger className="text-sm">{it.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{it.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            ))}
          </TabsContent>
          <TabsContent value="support" className="mt-4">
            <div className="rounded-lg border p-6 text-sm">
              <h2 className="text-lg font-semibold">Get product help</h2>
              <p className="mt-2 text-muted-foreground">
                If something isn&apos;t working, include the proposal name, the module you were using and any error message you saw.
                AI errors about rate limits usually clear after waiting a minute.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
