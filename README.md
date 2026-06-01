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

The site is published to GitHub Pages. `astro.config.mjs` is configured for the project
site at `https://saschb2b.github.io/llm-default-stack/` via `site` + `base`. If you move
it to a custom domain, update those two constants.

## License

[MIT](./LICENSE)
