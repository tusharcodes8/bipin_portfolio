export const SKILL_COLORS = [
  { key: 'blue', swatch: 'bg-blue-600', chip: 'bg-blue-50 text-blue-900 border-blue-200' },
  { key: 'green', swatch: 'bg-green-600', chip: 'bg-green-50 text-green-800 border-green-200' },
  { key: 'amber', swatch: 'bg-amber-500', chip: 'bg-amber-50 text-amber-800 border-amber-200' },
  { key: 'red', swatch: 'bg-red-600', chip: 'bg-red-50 text-red-800 border-red-200' },
  { key: 'purple', swatch: 'bg-purple-600', chip: 'bg-purple-50 text-purple-800 border-purple-200' },
  { key: 'teal', swatch: 'bg-teal-600', chip: 'bg-teal-50 text-teal-800 border-teal-200' },
  { key: 'pink', swatch: 'bg-pink-600', chip: 'bg-pink-50 text-pink-800 border-pink-200' },
  { key: 'slate', swatch: 'bg-slate-600', chip: 'bg-slate-50 text-slate-700 border-slate-200' },
];

export const getSkillColor = (key) =>
  SKILL_COLORS.find((c) => c.key === key) || SKILL_COLORS[0];
