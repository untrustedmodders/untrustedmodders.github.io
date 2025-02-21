<template>
  <section class="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
    <NuxtLink
        v-if="announcement"
        :to="announcement.to"
        :target="announcement.target"
        class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium"
    >
      <template v-if="announcement.icon">
        <SmartIcon :name="announcement.icon" :size="16" />
        <UiSeparator class="mx-2 h-4" orientation="vertical" />
      </template>
      <span class="sm:hidden">{{ announcement.title }}</span>
      <span class="hidden sm:inline">
        {{ announcement.title }}
        <span v-if="loading">
          <Icon name="lucide:refresh-ccw" class="mr-2 size-4 animate-spin" />
        </span>
        <span v-else-if="!error">
          {{ release?.tag }}
        </span>
      </span>
      <Icon name="lucide:arrow-right" class="ml-1 size-4" />
    </NuxtLink>

    <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h1>
    <span class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
      <ContentSlot :use="$slots.description" unwrap="p" />
    </span>

    <section class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
      <NuxtLink
          v-for="(action, i) in actions"
          :key="i"
          :to="action.to"
          :target="action.target"
      >
        <UiButton :variant="action.variant">
          <SmartIcon v-if="action.leftIcon" :name="action.leftIcon" class="mr-1" />
          {{ action.name }}
          <SmartIcon v-if="action.rightIcon" :name="action.rightIcon" class="ml-1" />
        </UiButton>
      </NuxtLink>
    </section>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  git: {
    owner: string;
    repo: string;
  }
  announcement?: {
    to?: string;
    target?: Target;
    icon?: string;
    title: string;
  };
  actions: [{
    name: string;
    leftIcon?: string;
    rightIcon?: string;
    variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    to: string;
    target?: Target;
  }];
}>();
defineSlots();

interface GitHubRelease {
  name: string;
  tag: string;
  url: string;
}

const release = ref<GitHubRelease | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchLatestRelease = async () => {
  loading.value = true;
  error.value = null;
  release.value = null;

  try {
    const response = await fetch(`https://api.github.com/repos/${props.git.owner}/${props.git.repo}/releases/latest`);
    if (!response.ok) throw new Error(`GitHub API responded with status: ${response.status}`);

    const data = await response.json();
    release.value = {
      name: data.name,
      tag: data.tag_name,
      url: data.html_url
    };
  } catch (err) {
    error.value = 'Failed to load latest release';
  } finally {
    loading.value = false;
  }
};

// Fetch release on component mount and watch for prop changes
onMounted(fetchLatestRelease);
watch(() => [props.git.owner, props.git.repo], fetchLatestRelease);
</script>
