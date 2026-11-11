<template>
  <!-- Only folders keep their icon: an icon on every page made the sidebar noisy -->
  <SmartIcon
    v-if="link.icon && link.children"
    :name="link.icon"
    class="min-w-4"
  />

  <!-- Long titles wrap to a second line instead of being cut with an ellipsis -->
  <span class="min-w-0 leading-snug [overflow-wrap:anywhere]">
    {{ link.title }}
  </span>

  <span v-for="(badge, i) in link.navBadges" :key="i">
    <Badge :variant="badge.variant" :type="badge.type" :size="badge.size ?? 'sm'">
      {{ badge.value }}
    </Badge>
  </span>
</template>

<script setup lang="ts">
import type { NavItem } from '@ztl-uwu/nuxt-content';

const { link } = defineProps<{
  link: NavItem;
}>();
</script>
