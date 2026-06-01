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

## How precise is it?

Worth being honest about the grain of the data:

- **Defaults are observed at the family/generation level, not measured per version.**
  Every Claude version inherits the "Claude" default unless someone records a
  specific divergence. The data model supports per-version overrides — they just
  haven't been filled in, because that takes deliberate measurement.
- **Products don't have public version histories,** so v0, Lovable, and Bolt are
  single entries rather than timelines.
- **It's a snapshot.** Models ship constantly and the training flywheel keeps
  turning. A default that's true today drifts; corrections are welcome.

## Contributing

Every family is a single YAML file in `src/data/models/`. Adding or fixing one is a
small, self-contained pull request. The shape:

```yaml
vendor: Anthropic
family: Claude
kind: model # 'model' or 'product'
url: https://www.anthropic.com/claude
order: 1 # lower sorts first in the explorer
blurb: One short sentence on what makes this family's default distinctive.
defaultStack:
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

## Reproduce it yourself

The whole thing is falsifiable in five minutes: open a few coding models in
separate tabs, give each the same bare prompt, and diff the results. If your run
disagrees with what's here, that's a contribution — open an issue or a PR.
