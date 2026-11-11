import { readFile } from 'node:fs/promises';
import { addTemplate, addTypeTemplate, defineNuxtModule, useLogger } from '@nuxt/kit';

// Release index published by the plugify-builds distribution repository
const INDEX_URL = 'https://untrustedmodders.github.io/plugify-builds/index.json';

// Fetches the builds index once per build and exposes it as `#builds`. When the
// index is unreachable the committed snapshot is used, so the site still builds.
export default defineNuxtModule({
  meta: { name: 'builds' },
  async setup(_options, nuxt) {
    const logger = useLogger('builds');
    const snapshot = new URL('../data/builds.snapshot.json', import.meta.url);

    let data: unknown;
    try {
      const response = await fetch(INDEX_URL, { signal: AbortSignal.timeout(15_000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      data = await response.json();
      logger.info(`Builds index loaded from ${INDEX_URL}`);
    } catch (err) {
      logger.warn(`Builds index unavailable (${(err as Error).message}), using data/builds.snapshot.json`);
      data = JSON.parse(await readFile(snapshot, 'utf8'));
    }

    const template = addTemplate({
      filename: 'builds-data.mjs',
      getContents: () => `export default ${JSON.stringify(data)};`,
    });
    nuxt.options.alias['#builds'] = template.dst;
    addTypeTemplate({
      filename: 'types/builds.d.ts',
      getContents: () => `declare module '#builds' {\n  const data: import('~/composables/useBuilds').BuildsIndex;\n  export default data;\n}\n`,
    });
  },
});
