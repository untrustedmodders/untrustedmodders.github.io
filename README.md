# plugify.net

Documentation site for [Plugify](https://github.com/untrustedmodders/plugify), published at https://plugify.net.

Built with Nuxt and the [shadcn-docs-nuxt](https://github.com/ZTL-UwU/shadcn-docs-nuxt) theme. Pages live in `content/` (English) and `content/ru/` (Russian).

## Development

Requires Node.js 20 (see `.nvmrc`).

```bash
npm ci
npm run dev
```

The dev server runs on http://localhost:3000.

## Checks

```bash
npm run check
```

Runs, in order:

- `check:manifests` — validates every `.pplugin` / `.pmodule` / `.pconfig` example in the docs against the Plugify JSON schemas;
- `check:i18n` — every English page has a Russian counterpart with the same structure (known gaps are listed in `scripts/i18n-baseline.json`);
- `generate` — builds the static site into `.output/public`;
- `check:links` — every internal link resolves in the built site.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`: the checks above, then deployment to GitHub Pages. Pull requests run the same checks without deploying.
