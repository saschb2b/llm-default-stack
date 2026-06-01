// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Deployment target.
// Default is the GitHub Pages *project* site: https://saschb2b.github.io/llm-default-stack/
// If you wire up a custom domain (e.g. a subdomain of saschb2b.com), set
// `site` to that origin and `base` to '/' (or remove it).
const SITE = 'https://saschb2b.github.io';
const BASE = '/llm-default-stack';

// https://astro.build/config
export default defineConfig({
	site: SITE,
	base: BASE,
	trailingSlash: 'ignore',
	integrations: [
		starlight({
			title: 'LLM Default Stack',
			description:
				'Explore the default React stack each LLM (and version) reaches for — framework, styling, components, state, and backend.',
			tagline: 'What does each model build by default?',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/saschb2b/llm-default-stack',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/saschb2b/llm-default-stack/edit/main/',
			},
			sidebar: [
				{ label: 'Explorer', link: '/explorer/' },
				{
					label: 'About',
					items: [
						{ label: 'The convergence', slug: 'about/convergence' },
						{ label: 'Methodology & contributing', slug: 'about/methodology' },
					],
				},
			],
		}),
	],
});
