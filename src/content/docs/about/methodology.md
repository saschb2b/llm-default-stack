---
title: Methodology & contributing
description: How the default-stack data is sourced and verified, how precise it is, and how to add or correct a model in a few lines of YAML.
---

## What this measures

The **zero-prompt default** — what a model reaches for when handed *"build me a
todo app"* and nothing else. Not best practice, not what the model produces when
you steer it, and not the ceiling of what it can do. The reflex, with no thumb on
the scale. That reflex is the thing the [article](https://www.saschb2b.com/blog/llm-default-react-stack)
is about, because it's the stack most people actually ship.

## Where the data comes from

The seed data reproduces the table in
[**Six Models, One React Stack**](https://www.saschb2b.com/blog/llm-default-react-stack),
which observed defaults across Claude, GPT/Codex, Gemini, Grok, DeepSeek, Qwen, and
the agent products v0, Lovable, and Bolt. Version names and release dates were then
checked against public releases as of mid-2026 so the timeline is concrete.

Beyond the article, the dataset has been extended with app builders and coding
agents, each entry backed by a cited source (linked on its card). The rule for
additions is **no guessing**: a default is only recorded when a credible source —
the product's own docs/templates, or a reputable hands-on review — states it. Where
a dimension isn't documented, it's left blank ("Not documented") rather than
inferred from what similar tools do. Several raw model families (Mistral, Llama,
Kimi, GLM, Cohere, Nova, Phi, MiniMax) were researched and **deliberately left out**
because no source describes the stack they emit by default — being absent is more
honest than being guessed.

## Three kinds of entry

The explorer tags each family as one of three **kinds**, because they relate to the
default stack differently:

- **Models** — raw model lines (Claude, GPT, Gemini, …). They emit a default when
  asked to build something.
- **Builders** — app/site generators (v0, Lovable, Firebase Studio, …). They
  *impose* a stack; it's baked into their templates.
- **Agents** — coding IDEs/agents that work on your repository (Cursor, Windsurf,
  Devin, …). Most are documented to **mirror the existing project** rather than
  impose a stack, so their power tells more from the model that drives them
  (shown as "Powered by …") than from a fixed default. Kiro is the rare agent with
  a documented greenfield default.

## How precise is it?

Worth being honest about the grain of the data:

- **Defaults are observed at the family/generation level, not measured per version.**
  Every Claude version inherits the "Claude" default unless someone records a
  specific divergence. The data model supports per-version overrides — they just
  haven't been filled in, because that takes deliberate measurement.
- **Products don't have public version histories,** so v0, Lovable, and Bolt are
  single entries rather than timelines.
- **Version-lag (`emits`) and the practice `checklist` are observational.** Which
  library version a model scaffolds, and whether it reaches for current idioms
  (React Compiler, Server Components, …), isn't documented anywhere — it has to be
  tested. So they're filled in only where someone has run the model. Claude's
  checklist is **self-reported by Opus 4.8** (and marked as such); everything else
  is left unassessed rather than guessed. The "latest" versions and the checklist
  definitions live in `src/lib/stack-versions.ts` and `src/lib/practices.ts`.
- **It's a snapshot.** Models ship constantly and the training flywheel keeps
  turning. A default that's true today drifts; corrections are welcome.

## Contributing

Every family is a single YAML file in `src/data/models/`. Adding or fixing one is a
small, self-contained pull request. The shape:

```yaml
vendor: Anthropic
family: Claude
kind: model # 'model' | 'product' (a builder) | 'agent'
url: https://www.anthropic.com/claude
poweredBy: # optional — for builders/agents, the model(s) that drive it
order: 1 # lower sorts first in the explorer
blurb: One short sentence on what makes this family's default distinctive.
defaultStack:
  # Only list dimensions you can source. Omit a dimension entirely if it isn't
  # documented — the explorer shows it as "Not documented" rather than a guess.
  framework:
    - name: Next.js
    - name: Vite
      note: for lighter, SPA-style apps # optional qualifier
  styling:
    - name: Tailwind
      note: v4
  components:
    - name: shadcn/ui
  stateData:
    - name: TanStack Query
  backend:
    - name: Vercel
    - name: Supabase
emits: # optional — the library *versions* the current flagship scaffolds (the lag)
  - name: Vite # match a key in src/lib/stack-versions.ts to compute the lag
    version: '7'
    note: although Vite 8 shipped in March 2026
checklist: # optional — modern-practice adoption; id must match src/lib/practices.ts
  - id: react-compiler
    status: missing # adopted | partial | missing | unknown
    note: writes manual useMemo/useCallback
versions:
  - name: Claude Opus 4.8
    releaseDate: '2026-05-28' # quote it so YAML keeps it a string
    status: current # current | preview | previous | legacy
  - name: Claude 3.5 Sonnet
    releaseDate: '2024-06'
    status: legacy
    # Add a `stack:` block here to override individual dimensions for this
    # version — omitted dimensions fall back to defaultStack above.
sources:
  - label: Where this default was observed
    url: https://example.com
```

The five dimensions — **framework, styling, components, stateData, backend** —
match the columns in the explorer. Keep choice `name`s spelled consistently (every
Tailwind entry should read exactly `Tailwind`) so the explorer can group them and
the convergence counts stay accurate.

The schema that validates all of this lives in `src/content.config.ts`; `pnpm build`
(or `pnpm astro sync`) will reject a file that doesn't fit.

## Reproduce it yourself — the probe prompt

The whole thing is falsifiable: give a model the same bare prompt and read what it
builds. To capture a model's *genuine* default — not its aspirational best-practice
answer — make it **build first with no steering**, then describe what it actually
wrote. Asking "do you use React Compiler?" cold gets a "yes, best practice"; asking
"does the code you just wrote use it?" gets the truth.

Run this in a **fresh chat, with default settings** (a custom system prompt or an
"always use the latest" rule contaminates the default):

````text
Build a minimal but real React app: a todo list where users sign in, todos load
from a backend, and a form adds new ones. Use whatever you reach for by default —
don't ask me anything, don't explain your choices, just write it the way you
naturally would. Include the complete package.json with exact versions, the main
page, the add-todo form, and any data-fetching and reusable input component.

Then add a JSON block labelled STACK-REPORT describing exactly what the code above
uses (report what you wrote, not what's ideal). Use null for anything N/A:

{
  "framework": "",   "styling": "",   "components": "",
  "stateData": "",   "backend": "",
  "versions": { "react": "", "next": "", "vite": "", "tailwind": "" },
  "checklist": {
    "react-compiler": "",     // relies on React Compiler, not manual useMemo/useCallback?
    "ref-as-prop": "",        // ref as a normal prop, no forwardRef?
    "form-actions": "",       // <form action={fn}> + useActionState, not controlled onSubmit?
    "use-hook": "",           // uses use() / in-component <title>?
    "app-router": "",         // Next.js App Router (not Pages Router)?
    "rsc-default": "",        // Server Components by default, "use client" only at leaves?
    "server-actions": "",     // mutations via Server Actions, not client fetch to an API route?
    "tailwind-v4-config": "", // Tailwind v4 CSS-first (@theme/@import), not tailwind.config.js?
    "ts-strict": ""           // tsconfig strict: true?
  }
  // checklist values: "adopted" | "partial" | "missing"
}
````

The package.json is the hard evidence for `versions`/`emits`; the generated
component code is the evidence for the `checklist` (don't fully trust the
self-report — read the code). Drop the model's full output into an issue or PR and
it can be turned into a data file. If your run disagrees with what's here, that's a
contribution.
