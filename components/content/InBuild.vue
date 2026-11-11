<template>
  <Alert v-if="included" type="info" icon="lucide:package-check">
    <strong>{{ $t('Included in') }} {{ build.title }}.</strong>
    {{ $t('If you installed the build, this package is already there. The steps below are for installing it on its own.') }}
    <NuxtLink :to="localePath(base)" class="font-medium underline underline-offset-4">{{ $t('Download the build') }} →</NuxtLink>
  </Alert>
</template>

<script setup lang="ts">
import { HOST_PACKAGE, releasePackages, useBuild } from '~/composables/useBuilds';

const props = withDefaults(defineProps<{
  package: string;
  build?: string;
  base?: string;
}>(), {
  build: 'plugify-source2',
  base: '/builds/source2',
});

const localePath = useLocalePath();
const { build, latest } = useBuild(props.build);

const included = !!latest
  && (Object.values(HOST_PACKAGE).includes(props.package) || releasePackages(latest).includes(props.package));
</script>
