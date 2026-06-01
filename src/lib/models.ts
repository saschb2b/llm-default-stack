import { getCollection, type CollectionEntry } from 'astro:content';

export type ModelEntry = CollectionEntry<'models'>;
export type Version = ModelEntry['data']['versions'][number];
export type Choice = { name: string; note?: string };

/**
 * The five stack dimensions, in display order. Keys match the schema in
 * `src/content.config.ts`.
 */
export const DIMENSIONS = [
	{
		key: 'framework',
		label: 'Framework',
		blurb: 'Build tool / React metaframework',
	},
	{ key: 'styling', label: 'Styling', blurb: 'How components get styled' },
	{
		key: 'components',
		label: 'Components',
		blurb: 'Where prebuilt UI components come from',
	},
	{
		key: 'stateData',
		label: 'State & Data',
		blurb: 'Client state and server-state fetching',
	},
	{ key: 'backend', label: 'Backend', blurb: 'Default backend / deploy target' },
] as const;

export type DimensionKey = (typeof DIMENSIONS)[number]['key'];

export const STATUS_LABEL: Record<Version['status'], string> = {
	current: 'Current',
	preview: 'Preview',
	previous: 'Previous',
	legacy: 'Legacy',
};

/** Load all model families, sorted by `order` then family name. */
export async function getModels(): Promise<ModelEntry[]> {
	const models = await getCollection('models');
	return models.sort(
		(a, b) =>
			a.data.order - b.data.order ||
			a.data.family.localeCompare(b.data.family),
	);
}

/**
 * Resolve the effective stack for a version: a version may override individual
 * dimensions, otherwise it inherits the family default (defaults are observed
 * at the family/generation level — see the methodology page).
 */
export function resolveStack(
	model: ModelEntry,
	version?: Version,
): Record<DimensionKey, Choice[]> {
	const base = model.data.defaultStack;
	const override = version?.stack ?? {};
	const out = {} as Record<DimensionKey, Choice[]>;
	for (const { key } of DIMENSIONS) {
		out[key] = (override[key] ?? base[key] ?? []) as Choice[];
	}
	return out;
}

/** Does any version override the family default for a given dimension? */
export function versionDivergesFrom(
	model: ModelEntry,
	key: DimensionKey,
): boolean {
	return model.data.versions.some((v) => v.stack?.[key] != null);
}

/**
 * Count, per dimension, how many families pick each choice. Powers the
 * "the column collapses to one answer" convergence views.
 */
export function tallyDimension(
	models: ModelEntry[],
	key: DimensionKey,
): { name: string; count: number; share: number }[] {
	const counts = new Map<string, number>();
	for (const m of models) {
		const seen = new Set<string>();
		for (const choice of m.data.defaultStack[key] ?? []) {
			if (seen.has(choice.name)) continue;
			seen.add(choice.name);
			counts.set(choice.name, (counts.get(choice.name) ?? 0) + 1);
		}
	}
	const total = models.length;
	return [...counts.entries()]
		.map(([name, count]) => ({ name, count, share: count / total }))
		.sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** Stable slug for linking to a family. */
export function familySlug(model: ModelEntry): string {
	return model.id;
}
