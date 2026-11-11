<template>
  <div v-if="latest" class="not-prose my-6 overflow-x-auto rounded-lg border">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b bg-muted/40 text-left">
          <th class="px-3 py-2 font-medium">{{ $t('Component') }}</th>
          <th class="px-3 py-2 font-medium">{{ $t('Package') }}</th>
          <th class="px-3 py-2 font-medium">{{ $t('Version') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-3 py-2">{{ $t('Plugify core') }}</td>
          <td class="px-3 py-2 font-mono text-xs">libplugify</td>
          <td class="px-3 py-2 font-mono">{{ latest.core }}</td>
        </tr>
        <tr v-for="c in rows" :key="c.name" class="border-b last:border-0">
          <td class="px-3 py-2">
            <NuxtLink v-if="packageInfo(c.name).to" :to="localePath(packageInfo(c.name).to!)" class="underline-offset-4 hover:underline">
              {{ packageInfo(c.name).title }}
            </NuxtLink>
            <template v-else>{{ packageInfo(c.name).title }}</template>
            <span class="text-muted-foreground"> · {{ kindLabel(c) }}</span>
          </td>
          <td class="px-3 py-2 font-mono text-xs">{{ c.name }}</td>
          <td class="px-3 py-2 font-mono">
            <a :href="c.release_url" target="_blank" class="underline-offset-4 hover:underline">{{ c.version }}</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { HOST_PACKAGE, packageInfo, useBuild } from '~/composables/useBuilds';
import type { BuildComponent, Host } from '~/composables/useBuilds';

const props = withDefaults(defineProps<{
  build?: string;
}>(), {
  build: 'plugify-source2',
});

const { t } = useI18n();
const localePath = useLocalePath();
const { latest } = useBuild(props.build);

const ORDER = { host: 0, module: 1, plugin: 2 };
const rows = computed(() => [...(latest?.components ?? [])].sort((a, b) => ORDER[a.kind] - ORDER[b.kind]));

const kindLabel = (c: BuildComponent) => {
  if (c.kind === 'host') {
    const hosts = (Object.keys(HOST_PACKAGE) as Host[]).filter(h => HOST_PACKAGE[h] === c.name);
    return `${t('host')} (${hosts.join(', ')})`;
  }
  return c.kind === 'module' ? t('language module') : t('plugin');
};
</script>
