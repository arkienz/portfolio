// Writes public/licenses.txt from the installed packages' own license files, so the notices that
// ship with the site always match the code in it. Run by `npm run build`.
// Shipped to visitors: three (3D intro), tailwindcss (CSS), vite (module preload helper in the page script).
// Build-only tools (astro, typescript, wrangler...) never reach visitors and need no notice here.
import { readFileSync, writeFileSync } from 'node:fs';

// Guard: every runtime dependency must be reviewed (license read, allowed) before it can build.
// Adding a package means checking its license first and adding it here; otherwise the build stops.
const reviewed = {
  astro: 'MIT',
  tailwindcss: 'MIT',
  '@tailwindcss/vite': 'MIT',
  '@astrojs/sitemap': 'MIT',
  three: 'MIT',
};
const allowed = new Set(['MIT', 'ISC', 'BSD-2-Clause', 'BSD-3-Clause', 'Apache-2.0']);
const deps = Object.keys(JSON.parse(readFileSync('package.json', 'utf8')).dependencies ?? {});
for (const name of deps) {
  const { license } = JSON.parse(readFileSync(`node_modules/${name}/package.json`, 'utf8'));
  if (!(name in reviewed)) throw new Error(`${name} (${license}) is not reviewed: check its license and add it to scripts/licenses.mjs before using it`);
  if (license !== reviewed[name] || !allowed.has(license)) throw new Error(`${name}: license is now ${license}, was reviewed as ${reviewed[name]}; review it again`);
}

const shipped = [
  ['three', 'LICENSE'],
  ['tailwindcss', 'LICENSE'],
  ['vite', 'LICENSE.md', (t) => t.split('\n## ')[0]], // Vite's own MIT part; its bundled deps are build-time only
];

const parts = shipped.map(([name, file, trim = (t) => t]) => {
  const { version } = JSON.parse(readFileSync(`node_modules/${name}/package.json`, 'utf8'));
  const text = trim(readFileSync(`node_modules/${name}/${file}`, 'utf8')).trim();
  if (!/MIT License/.test(text)) throw new Error(`${name}: expected an MIT license, check it before shipping`);
  return `${name} ${version}\n${'-'.repeat(60)}\n${text}\n`;
});

writeFileSync(
  'public/licenses.txt',
  `Open-source software used on this site\n\n${parts.join('\n\n')}\n\n` +
    `Plus Jakarta Sans font\n${'-'.repeat(60)}\nSIL Open Font License 1.1, see /fonts/OFL.txt\n`,
);
console.log(`licenses.txt: ${shipped.map(([n]) => n).join(', ')}, Plus Jakarta Sans`);
