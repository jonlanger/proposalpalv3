# ProposalPal

AI proposal partner: client research, engagement planning, team formation, topic research, storyline, commercial approach, draft review and pitch practice, in one workspace. A rebuild of proposalpal-v2 on Next.js 16, Tailwind v4 and shadcn/ui (Base UI).

## Run it

```bash
npm install
cp .env.example .env.local   # add your GEMINI_API_KEY, or leave it empty for demo mode
npm run dev
```

## AI providers

All providers go through one OpenAI-compatible client in `src/lib/ai/provider.ts`. Choose one with `AI_PROVIDER`:

| Provider | Cost | Setup | Notes |
|---|---|---|---|
| `gemini` (default when `GEMINI_API_KEY` is set) | Paid or free tier | Key from aistudio.google.com | `GEMINI_MODEL` defaults to `gemini-3.8-flash` |
| `groq` | Free tier | Key from console.groq.com | Default model `openai/gpt-oss-120b`; override with `GROQ_MODEL` |
| `ollama` | Free, local | Install Ollama, `ollama pull llama3.1` | Data never leaves your machine; doesn't work on Vercel |
| `demo` (default with no key) | Free | None | Sample content, no AI |

Free hosted tiers are rate-limited and may use prompts for training. Don't send confidential client material through them.

## Knowledge base and demo proposals

`src/data/` holds research that grounds the AI and pre-fills the demos:

- `companies.ts`: public profiles of Walmart, Ford, Pfizer, JPMorgan Chase and 7-Eleven (financials, segments, leadership, priorities, sources), summarized from SEC filings and company releases as of September 2026. When a proposal's client matches one, the profile is added to every AI prompt.
- `playbooks.ts`: consulting best practices (Pyramid Principle/SCQA and action titles, BCG transformation research and the 10-20-70 rule, pricing models, engagement and pitch prep) and paraphrased public case studies from BCG, Bain and McKinsey, all linked. Relevant entries are added to each module's prompts.
- `demos/`: five demo proposals with all 8 modules pre-filled, so they open without any AI call. Stakeholder views, fees and value estimates in the demos are illustrative.

To add a client, add a profile to `companies.ts`. To add a demo, add a file in `demos/` and list it in `demos/index.ts`.

## Data

Proposals, generated content, chats, bookmarks and data sources are stored in the browser's `localStorage` (`src/lib/storage.ts`). Nothing is stored on the server. Uploaded PDF/DOCX/TXT files are converted to text by `/api/extract`, and excerpts are sent to the AI as context.

## Layout

- `src/app` – pages (`/`, `/new-proposal`, `/proposal/[id]/{setup,dashboard,print}`, `/help`) and API routes
- `src/lib/modules.ts` – the 8 workspace modules and their sections (edit here to change what gets generated)
- `src/lib/ai/prompts.ts` – prompts; `demo.ts` – demo-mode content
- `src/components/workspace` – workspace panels (data sources, chat, module content, bookmarks, toolbar)

## Deploy to Vercel

Import the repo in Vercel, then under **Settings → Environment Variables** add `AI_PROVIDER=gemini` and `GEMINI_API_KEY`. `GEMINI_MODEL` is optional. Redeploy after changing variables.
