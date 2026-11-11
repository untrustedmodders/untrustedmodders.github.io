<template>
  <div class="not-prose my-6 space-y-6">
    <section v-for="(r, i) in releases" :key="r.tag" class="rounded-lg border p-4">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <a :href="r.url" target="_blank" class="text-lg font-semibold underline-offset-4 hover:underline">{{ r.version }}</a>
        <UiBadge :variant="r.channel === 'stable' ? 'default' : 'secondary'">{{ r.channel }}</UiBadge>
        <span class="text-sm text-muted-foreground">{{ r.date }}</span>
        <span class="text-sm text-muted-foreground">· {{ $t('core') }} {{ r.core }}</span>
      </div>

      <p v-if="previousOf(r, i)" class="mt-2 text-sm">
        <template v-if="hostChanged(r, previousOf(r, i))">
          <Icon name="lucide:triangle-alert" class="mr-1 inline size-4 align-text-bottom" />
          {{ $t('The host changed: update packages with mamba, then extract the host-only archive.') }}
        </template>
        <template v-else>{{ $t('Packages only: mamba update is enough.') }}</template>
      </p>

      <table v-if="changes(r, i).length" class="mt-3 w-full text-sm">
        <tbody>
          <tr v-for="c in changes(r, i)" :key="c.name" class="border-t">
            <td class="py-1.5 pr-3">{{ packageInfo(c.name).title }}</td>
            <td class="py-1.5 font-mono">
              <span class="text-muted-foreground">{{ c.from ?? $t('none') }}</span> → {{ c.to ?? $t('removed') }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="r.changelog" class="mt-3 text-sm [&_h3]:!mt-2 [&_h3]:!text-base">
        <MDC :value="r.changelog" tag="div" />
      </div>

      <details class="mt-3">
        <summary class="cursor-pointer text-sm font-medium">{{ $t('Files') }} ({{ r.files.length }})</summary>
        <ul class="mt-2 space-y-1">
          <li v-for="f in r.files" :key="f.name" class="flex flex-wrap justify-between gap-x-3 text-sm">
            <a :href="f.url" class="break-all font-mono text-xs underline-offset-4 hover:underline">{{ f.name }}</a>
            <span class="text-muted-foreground">{{ formatSize(f.size) }}</span>
          </li>
        </ul>
      </details>
    </section>
  </div>
</template>

<script setup lang="ts">
import { formatSize, hostChanged, packageInfo, useBuild } from '~/composables/useBuilds';
import type { BuildRelease } from '~/composables/useBuilds';

const props = withDefaults(defineProps<{
  build?: string;
}>(), {
  build: 'plugify-source2',
});

const { releases } = useBuild(props.build);

// Composition changes against the next older release of the same channel
// (the dev build is compared with the latest stable)
const previousOf = (release: BuildRelease, i: number) =>
  releases.slice(i + 1).find(r => release.channel === 'dev' || r.channel === release.channel);

function changes(release: BuildRelease, i: number) {
  const previous = previousOf(release, i);
  if (!previous) return [];
  const before = new Map(previous.components.map(c => [c.name, c.version]));
  const after = new Map(release.components.map(c => [c.name, c.version]));
  return [...new Set([...before.keys(), ...after.keys()])]
    .filter(name => before.get(name) !== after.get(name))
    .map(name => ({ name, from: before.get(name), to: after.get(name) }));
}
</script>
