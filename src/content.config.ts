import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

/**
 * A single pick within a stack dimension, e.g. { name: "Next.js" } or
 * { name: "Vite", note: "varies by project" }. The `name` should be a
 * canonical, consistently-spelled label so the explorer can group across
 * models (every Tailwind entry should read exactly "Tailwind").
 */
const choice = z.object({
	name: z.string(),
	note: z.string().optional(),
});

const source = z.object({
	label: z.string(),
	url: z.string().url().optional(),
});

/** The five stack dimensions the article diffs across. */
const stack = z.object({
	framework: z.array(choice).default([]),
	styling: z.array(choice).default([]),
	components: z.array(choice).default([]),
	stateData: z.array(choice).default([]),
	backend: z.array(choice).default([]),
});

/**
 * A version override only names the dimensions that differ from the family
 * default — omitted dimensions fall back to it. Defaults are observed at the
 * family/generation level (see the article); add overrides as per-version
 * behaviour gets measured.
 */
const stackOverride = z.object({
	framework: z.array(choice).optional(),
	styling: z.array(choice).optional(),
	components: z.array(choice).optional(),
	stateData: z.array(choice).optional(),
	backend: z.array(choice).optional(),
});

const version = z.object({
	name: z.string(),
	releaseDate: z.string().optional(), // 'YYYY-MM-DD' or 'YYYY-MM'
	status: z
		.enum(['current', 'preview', 'previous', 'legacy'])
		.default('previous'),
	stack: stackOverride.optional(),
	notes: z.string().optional(),
	sources: z.array(source).default([]),
});

const models = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/data/models' }),
	schema: z.object({
		vendor: z.string(),
		family: z.string(),
		/** 'model' = a raw model line; 'product' = an app/agent built on top. */
		kind: z.enum(['model', 'product']).default('model'),
		url: z.string().url().optional(),
		blurb: z.string().optional(),
		/** Lower sorts first in the explorer. */
		order: z.number().default(99),
		defaultStack: stack,
		versions: z.array(version).default([]),
		sources: z.array(source).default([]),
	}),
});

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	models,
};
