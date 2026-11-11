<template>
  <div class="flex min-w-0 items-center gap-2 rounded-md border bg-muted/40 px-2 py-1.5">
    <span class="shrink-0 text-xs text-muted-foreground">{{ label }}</span>
    <code class="min-w-0 flex-1 truncate font-mono text-xs" :title="text">{{ text }}</code>
    <button type="button" class="shrink-0 text-muted-foreground hover:text-foreground" :aria-label="$t('Copy')" @click="copy">
      <Icon :name="copied ? 'lucide:check' : 'lucide:clipboard'" class="size-4" />
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  text: string;
}>();

const copied = ref(false);

async function copy() {
  try {
    await navigator.clipboard.writeText(props.text);
    copied.value = true;
    setTimeout(() => (copied.value = false), 2000);
  } catch {
    // Clipboard blocked (insecure context, denied permission); the text stays selectable
  }
}
</script>
