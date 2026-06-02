/**
 * Current latest *major* version of the libraries the explorer tracks, so we
 * can show how far behind the version a model emits is — the "permanent version
 * lag" the article describes. These move; keep them sourced and current.
 */
export type LibInfo = {
	/** Latest stable major version, as a string for display + comparison. */
	latest: string;
	/** When that major went stable (YYYY-MM), if known. */
	released?: string;
	source: string;
};

export const LATEST: Record<string, LibInfo> = {
	Vite: {
		latest: '8',
		released: '2026-03',
		source: 'https://vite.dev/blog/announcing-vite8',
	},
	'Next.js': {
		latest: '16',
		released: '2025-10',
		source: 'https://nextjs.org/blog/next-16',
	},
	React: {
		latest: '19',
		released: '2024-12',
		source: 'https://react.dev/versions',
	},
	Tailwind: {
		latest: '4',
		released: '2025-01',
		source: 'https://tailwindcss.com/blog/tailwindcss-v4',
	},
	Express: {
		latest: '5',
		released: '2025-12',
		source: 'https://github.com/expressjs/express/releases',
	},
	Zod: {
		latest: '4',
		released: '2025-05',
		source: 'https://zod.dev/v4',
	},
};

export type Lag = {
	latest: string;
	released?: string;
	source: string;
	/** Whole majors behind the latest (0 = current). null if not comparable. */
	majorsBehind: number | null;
};

/** Compare an emitted major version against the tracked latest. */
export function lagFor(name: string, emitted: string): Lag | null {
	const lib = LATEST[name];
	if (!lib) return null;
	const e = parseInt(emitted, 10);
	const l = parseInt(lib.latest, 10);
	const majorsBehind =
		Number.isNaN(e) || Number.isNaN(l) ? null : Math.max(0, l - e);
	return { latest: lib.latest, released: lib.released, source: lib.source, majorsBehind };
}
