<template>
  <div class="group-has-[div]:!mt-0 [&:not(:first-child)]:mt-5">
    <NuxtLinkLocale :to class="group/lang block">
      <UiCard class="hover:bg-muted relative h-full overflow-hidden transition-all">
        <div class="relative z-10 flex items-center gap-3 p-4">
          <SmartIcon :name="icon" :size="28" class="shrink-0" />
          <span class="text-base font-semibold leading-none tracking-tight">{{ title }}</span>
        </div>
        <!-- The same icon, large and faded, fills the empty right side. -->
        <SmartIcon
          :name="icon"
          :size="88"
          class="pointer-events-none absolute -right-3 top-1/2 -translate-y-1/2 -rotate-12 opacity-10 transition-all duration-300 group-hover/lang:scale-110 group-hover/lang:opacity-25"
        />
      </UiCard>
    </NuxtLinkLocale>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  icon: string;
  to: string;
}>();
</script>
