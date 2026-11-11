<template>
  <UiAlert
    class="transition-all [&:not(:first-child)]:mt-5"
    :class="[
      typeTwClass[type],
      to && 'hover:bg-muted/50 cursor-pointer',
      inStack && 'm-0 rounded-none border-none',
    ]"
    @click="alertClick"
  >
    <SmartIcon v-if="icon && title" :name="icon" :size="16" />
    <UiAlertTitle v-if="title" class="font-semibold">
      {{ title }}
    </UiAlertTitle>
    <UiAlertDescription>
      <div class="flex flex-row gap-2">
        <SmartIcon v-if="icon && !title" :name="icon" :size="16" class="mb-[2px] min-w-5 self-center" />
        <span class="w-full" :class="[to && 'pr-3']">
          <slot />
        </span>
      </div>
      <SmartIcon v-if="to && showLinkIcon" name="lucide:arrow-up-right" class="absolute right-4 top-4" />
    </UiAlertDescription>
  </UiAlert>
</template>

<script setup lang="ts">
const {
  to,
  target,
  type = 'default',
  external = undefined,
  inStack = false,
  showLinkIcon = true,
} = defineProps<{
  title?: string;
  icon?: string;
  type?: 'default' | 'info' | 'warning' | 'success' | 'danger' | 'secondary';
  to?: string;
  target?: Target;
  external?: boolean;
  inStack?: boolean;
  showLinkIcon?: boolean;
}>();

// Tinted background and border, body text in the normal foreground colour:
// coloured text on a coloured background was unreadable in the dark theme.
const typeTwClass = {
  default: '',
  info: 'border-blue-500/40 bg-blue-500/10 text-foreground [&_.inline-code]:bg-blue-500/15 [&_.iconify]:text-blue-500 [&_strong]:text-blue-700 dark:[&_strong]:text-blue-300',
  note: 'border-sky-500/40 bg-sky-500/10 text-foreground [&_.inline-code]:bg-sky-500/15 [&_.iconify]:text-sky-500 [&_strong]:text-sky-700 dark:[&_strong]:text-sky-300',
  example: 'border-violet-500/40 bg-violet-500/10 text-foreground [&_.inline-code]:bg-violet-500/15 [&_.iconify]:text-violet-500 [&_strong]:text-violet-700 dark:[&_strong]:text-violet-300',
  warning: 'border-amber-500/40 bg-amber-500/10 text-foreground [&_.inline-code]:bg-amber-500/15 [&_.iconify]:text-amber-500 [&_strong]:text-amber-700 dark:[&_strong]:text-amber-300',
  success: 'border-green-500/40 bg-green-500/10 text-foreground [&_.inline-code]:bg-green-500/15 [&_.iconify]:text-green-500 [&_strong]:text-green-700 dark:[&_strong]:text-green-300',
  danger: 'border-red-500/40 bg-red-500/10 text-foreground [&_.inline-code]:bg-red-500/15 [&_.iconify]:text-red-500 [&_strong]:text-red-700 dark:[&_strong]:text-red-300',
  secondary: 'bg-muted/50',
};

async function alertClick() {
  const localePath = useLocalePath();

  if (to) {
    const localeTo = localePath(to);
    if (target) {
      await navigateTo(localeTo, {
        external: external ?? to.startsWith('http'),
        open: { target },
      });
    } else {
      await navigateTo(localeTo, {
        external: external ?? to.startsWith('http'),
      });
    }
  }
}
</script>
