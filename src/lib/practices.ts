/**
 * The "modern-practice checklist": contemporary React / Next / tooling idioms a
 * fresh scaffold can adopt or lag on. These definitions are general ecosystem
 * knowledge (sourced); each model records its own status against them in its
 * data file (`checklist`), and that part is observational.
 */
export type Practice = {
	id: string;
	label: string;
	group: string;
	/** One line: what adopting it looks like. */
	blurb: string;
	/** When it became the modern default / stable (for gauging the lag). */
	since?: string;
	source: string;
};

export const PRACTICES: Practice[] = [
	// React 19 idioms (React 19 stable Dec 2024)
	{
		id: 'react-compiler',
		label: 'React Compiler',
		group: 'React 19 idioms',
		blurb:
			'Leans on the compiler’s auto-memoization instead of hand-written useMemo/useCallback.',
		since: '2025-10',
		source: 'https://react.dev/learn/react-compiler',
	},
	{
		id: 'ref-as-prop',
		label: 'ref as a prop',
		group: 'React 19 idioms',
		blurb: 'Passes ref as an ordinary prop; no forwardRef wrapper.',
		since: '2024-12',
		source: 'https://react.dev/blog/2024/12/05/react-19',
	},
	{
		id: 'form-actions',
		label: 'Form Actions',
		group: 'React 19 idioms',
		blurb:
			'Forms via <form action={fn}> with useActionState / useFormStatus / useOptimistic.',
		since: '2024-12',
		source: 'https://react.dev/reference/react-dom/components/form',
	},
	{
		id: 'use-hook',
		label: 'use() + document metadata',
		group: 'React 19 idioms',
		blurb:
			'Uses the use() hook for promises/context and renders <title>/<meta> in components.',
		since: '2024-12',
		source: 'https://react.dev/reference/react/use',
	},

	// Server-first Next.js
	{
		id: 'app-router',
		label: 'App Router',
		group: 'Server-first Next.js',
		blurb: 'Scaffolds the App Router, not the legacy Pages Router.',
		since: '2023-05',
		source: 'https://nextjs.org/docs/app',
	},
	{
		id: 'rsc-default',
		label: 'Server Components by default',
		group: 'Server-first Next.js',
		blurb: 'Server Components by default; "use client" only at the interactive leaves.',
		since: '2023-05',
		source: 'https://nextjs.org/docs/app/getting-started/server-and-client-components',
	},
	{
		id: 'server-actions',
		label: 'Server Actions',
		group: 'Server-first Next.js',
		blurb: 'Mutations through Server Actions rather than client fetch to route handlers.',
		since: '2024-05',
		source: 'https://nextjs.org/docs/app/getting-started/updating-data',
	},

	// Tooling & types
	{
		id: 'tailwind-v4-config',
		label: 'Tailwind v4 CSS-first config',
		group: 'Tooling & types',
		blurb:
			'@import "tailwindcss" + @theme in CSS, not a JS tailwind.config with content globs.',
		since: '2025-01',
		source: 'https://tailwindcss.com/blog/tailwindcss-v4',
	},
	{
		id: 'ts-strict',
		label: 'TypeScript strict mode',
		group: 'Tooling & types',
		blurb: 'tsconfig "strict": true rather than loose defaults.',
		source: 'https://www.typescriptlang.org/tsconfig#strict',
	},
];

export const PRACTICE_BY_ID: Record<string, Practice> = Object.fromEntries(
	PRACTICES.map((p) => [p.id, p]),
);
