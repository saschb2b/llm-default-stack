import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

// Build Starlight sidebar groups (Models / Builders / Agents) from the model
// data files. Read at config-evaluation time, so the sidebar always matches the
// data without a hand-maintained list.

const DIR = path.resolve('src/data/models');

const KINDS = [
	{ kind: 'model', label: 'Models' },
	{ kind: 'product', label: 'Builders' },
	{ kind: 'agent', label: 'Agents' },
];

export function modelSidebarGroups() {
	const entries = fs
		.readdirSync(DIR)
		.filter((f) => f.endsWith('.yaml'))
		.map((file) => {
			const data = parse(fs.readFileSync(path.join(DIR, file), 'utf8'));
			return {
				id: file.replace(/\.yaml$/, ''),
				family: data.family,
				kind: data.kind ?? 'model',
				order: data.order ?? 99,
			};
		})
		.sort((a, b) => a.order - b.order || a.family.localeCompare(b.family));

	return KINDS.map(({ kind, label }) => ({
		label,
		collapsed: true,
		items: entries
			.filter((e) => e.kind === kind)
			.map((e) => ({ label: e.family, link: `/models/${e.id}/` })),
	})).filter((group) => group.items.length > 0);
}
