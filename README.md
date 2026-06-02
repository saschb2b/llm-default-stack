# LLM Default Stack

An interactive explorer for the default React stack each large language model reaches
for when you ask it to build something with no further direction.

It's the companion to the article
[**Six Models, One React Stack**](https://www.saschb2b.com/blog/llm-default-react-stack):
open a few chat tabs, type *"build me a todo app,"* diff the `package.json` files, and
watch the answers converge — a React metaframework, Tailwind, shadcn/ui, TanStack Query.
This site turns that observation into something you can browse model by model, version
by version, and dimension by dimension.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Develop

```sh
pnpm install
pnpm dev      # start the dev server at localhost:4321
pnpm build    # production build into ./dist
pnpm preview  # preview the production build locally
```

> This project uses **pnpm**. A `pnpm-lock.yaml` is committed; please keep it in sync.

## Deploy

The site ships to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
(the official `withastro/action`), which builds and publishes on every push to `main`.
One-time setup: in the repo's **Settings → Pages → Build and deployment**, set **Source**
to **GitHub Actions**.

`astro.config.mjs` is configured for the project site at
`https://saschb2b.github.io/llm-default-stack/` via `site` + `base`. If you move it to a
custom domain, update those two constants — internal links derive from the configured
base (via `import.meta.env.BASE_URL`), so they follow automatically.

## Adding a model

Each model family is one YAML file in [`src/data/models/`](src/data/models), validated by
the schema in `src/content.config.ts`. See the **Methodology & contributing** page for the
exact shape.

## License

[MIT](./LICENSE)
