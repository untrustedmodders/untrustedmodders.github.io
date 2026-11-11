<template>
  <div v-if="latest" class="not-prose my-6 space-y-6">
    <Alert v-if="index.mock" type="warning" icon="lucide:flask-conical">
      {{ $t('No builds have been published yet, so the versions and files below are examples.') }}
    </Alert>

    <div class="rounded-lg border p-4 md:p-6">
      <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span class="text-2xl font-semibold">{{ build.title }}</span>
        <span class="text-xl font-medium">{{ latest.version }}</span>
        <UiBadge>stable</UiBadge>
        <span class="text-sm text-muted-foreground">{{ latest.date }}</span>
        <NuxtLink :to="localePath(`${base}/changelog`)" class="ml-auto text-sm font-medium underline-offset-4 hover:underline">
          {{ $t('Changelog') }} →
        </NuxtLink>
      </div>
      <p class="mt-1 text-sm text-muted-foreground">{{ $t('for Counter-Strike 2') }}</p>

      <div class="mt-5 space-y-3">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span class="w-24 shrink-0 text-sm font-medium">{{ $t('OS') }}</span>
          <div class="flex flex-wrap gap-2">
            <UiButton
              v-for="o in OSES" :key="o" size="sm"
              :variant="os === o ? 'default' : 'outline'"
              @click="os = o"
            >
              <Icon :name="o === 'linux' ? 'simple-icons:linux' : 'simple-icons:windows'" class="mr-1.5 size-4" />
              {{ OS_LABEL[o] }}
            </UiButton>
          </div>
        </div>
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
          <span class="w-24 shrink-0 text-sm font-medium">{{ $t('Host') }}</span>
          <div class="flex flex-wrap items-center gap-2">
            <UiButton
              v-for="h in HOSTS" :key="h" size="sm"
              :variant="host === h ? 'default' : 'outline'"
              :disabled="!fileFor('full', h, os)"
              @click="host = h"
            >
              {{ HOST_LABEL[h] }}
            </UiButton>
            <NuxtLink :to="localePath(`${base}/installation`) + '#hosts'" class="text-sm text-muted-foreground underline-offset-4 hover:underline">
              {{ $t('Which one?') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <div v-if="file" class="mt-6 space-y-3">
        <a :href="file.url" class="block">
          <UiButton class="h-auto w-full justify-start whitespace-normal break-all py-2.5 text-left">
            <Icon name="lucide:download" class="mr-2 size-4 shrink-0" />
            {{ $t('Download') }} {{ file.name }}
            <span class="ml-auto shrink-0 pl-2 opacity-70">{{ formatSize(file.size) }}</span>
          </UiButton>
        </a>
        <div class="grid gap-2 text-sm md:grid-cols-2">
          <CopyLine label="sha256" :text="file.sha256" />
          <CopyLine label="curl" :text="`curl -LO ${file.url}`" />
        </div>
        <p v-if="host === 'metamod'" class="text-sm text-muted-foreground">
          {{ $t('Metamod:Source is not included, install it separately.') }}
        </p>
        <p v-if="hostOnly" class="text-sm text-muted-foreground">
          {{ $t('Updating an installed build? Packages are updated with mamba, and the host with the host-only archive:') }}
          <a :href="hostOnly.url" class="break-all font-mono text-xs text-foreground underline-offset-4 hover:underline">{{ hostOnly.name }}</a>
          <NuxtLink :to="localePath(`${base}/updating`)" class="ml-1 underline-offset-4 hover:underline">{{ $t('Updating') }} →</NuxtLink>
        </p>
      </div>
    </div>

    <details class="rounded-lg border px-4 py-3">
      <summary class="cursor-pointer text-sm font-medium">{{ $t('All files') }} ({{ latest.files.length }})</summary>
      <div class="mt-3 overflow-x-auto">
        <table class="w-full text-sm">
          <tbody>
            <tr v-for="f in latest.files" :key="f.name" class="border-t">
              <td class="py-1.5 pr-3"><a :href="f.url" class="break-all font-mono text-xs underline-offset-4 hover:underline">{{ f.name }}</a></td>
              <td class="whitespace-nowrap py-1.5 text-right text-muted-foreground">{{ formatSize(f.size) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>

    <div>
      <div class="mb-2 flex items-baseline justify-between gap-4">
        <h3 class="text-lg font-semibold">{{ $t("What's inside") }}</h3>
        <NuxtLink :to="localePath(`${base}/contents`)" class="text-sm font-medium underline-offset-4 hover:underline">
          {{ $t('Full contents') }} →
        </NuxtLink>
      </div>
      <div class="overflow-x-auto rounded-lg border">
        <table class="w-full text-sm">
          <tbody>
            <tr class="border-b">
              <td class="px-3 py-2">{{ $t('Plugify core') }}</td>
              <td class="px-3 py-2 font-mono">{{ latest.core }}</td>
              <td class="px-3 py-2" />
            </tr>
            <tr v-for="c in inside" :key="c.name" class="border-b last:border-0">
              <td class="px-3 py-2">{{ packageInfo(c.name).title }}</td>
              <td class="px-3 py-2 font-mono">{{ c.version }}</td>
              <td class="px-3 py-2 text-right">
                <NuxtLink v-if="packageInfo(c.name).to" :to="localePath(packageInfo(c.name).to!)" class="underline-offset-4 hover:underline">{{ $t('docs') }}</NuxtLink>
                <span v-if="packageInfo(c.name).to" class="text-muted-foreground"> · </span>
                <a :href="c.release_url" target="_blank" class="underline-offset-4 hover:underline">{{ $t('release notes') }} ↗</a>
              </td>
            </tr>
            <tr>
              <td class="px-3 py-2">{{ $t('Languages') }}</td>
              <td colspan="2" class="px-3 py-2">{{ languages.join(', ') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="dev || stable.length > 1" class="space-y-2 text-sm">
      <div v-if="dev" class="flex flex-wrap items-baseline gap-x-2">
        <span class="font-medium">{{ $t('Development build') }}:</span>
        <a :href="dev.url" target="_blank" class="font-mono underline-offset-4 hover:underline">{{ dev.version }}</a>
        <span class="text-muted-foreground">({{ dev.date }})</span>
      </div>
      <div v-if="stable.length > 1" class="flex flex-wrap items-baseline gap-x-2">
        <span class="font-medium">{{ $t('Previous versions') }}:</span>
        <template v-for="(r, i) in stable.slice(1, 4)" :key="r.version">
          <a :href="r.url" target="_blank" class="font-mono underline-offset-4 hover:underline">{{ r.version }}</a>
          <span v-if="i < stable.slice(1, 4).length - 1" class="text-muted-foreground">·</span>
        </template>
        <NuxtLink :to="localePath(`${base}/changelog`)" class="underline-offset-4 hover:underline">{{ $t('All versions') }} →</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HOSTS, OSES, HOST_PACKAGE, formatSize, packageInfo, useBuild } from '~/composables/useBuilds';
import type { BuildFile, Host, Os } from '~/composables/useBuilds';

const props = withDefaults(defineProps<{
  build?: string;
  base?: string;
}>(), {
  build: 'plugify-source2',
  base: '/builds/source2',
});

const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();
const { index, build, latest, stable, dev } = useBuild(props.build);

const OS_LABEL: Record<Os, string> = { linux: 'Linux', windows: 'Windows' };
const HOST_LABEL: Record<Host, string> = { launcher: 'Launcher', runtime: 'Runtime', metamod: 'Metamod' };

const fileFor = (v: BuildFile['variant'], h: Host, o: Os) =>
  latest?.files.find(f => f.variant === v && f.host === h && f.os === o);

const pick = <T extends string>(value: unknown, allowed: T[], fallback: T) =>
  allowed.includes(value as T) ? value as T : fallback;

const os = ref<Os>(pick(route.query.os, OSES, 'linux'));
const host = ref<Host>(pick(route.query.host, HOSTS, 'launcher'));

onMounted(() => {
  // Without an explicit choice in the link, preselect the visitor's OS
  if (!route.query.os && /windows/i.test(navigator.userAgent)) os.value = 'windows';
});

// Runtime exists only on Linux
watch(os, (o) => {
  if (!fileFor('full', host.value, o)) host.value = 'launcher';
});

// Keep the choice in the address so the link can be shared
watch([os, host], () => {
  router.replace({ query: { ...route.query, os: os.value, host: host.value } });
});

const file = computed(() => fileFor('full', host.value, os.value));
const hostOnly = computed(() => fileFor('host-only', host.value, os.value));

const inside = computed(() => {
  if (!latest) return [];
  const names = new Set([HOST_PACKAGE[host.value], ...latest.packages.plugins]);
  return latest.components.filter(c => names.has(c.name));
});

const languages = latest ? latest.packages.modules.map(n => packageInfo(n).lang ?? n) : [];
</script>
