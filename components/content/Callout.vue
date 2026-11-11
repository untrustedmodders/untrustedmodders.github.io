<template>
  <Alert :icon :to :target :type="alertType">
    <slot />
  </Alert>
</template>

<script setup lang="ts">
type AlertType = 'default' | 'info' | 'warning' | 'success' | 'danger' | 'secondary';

const { type, color } = defineProps<{
  icon?: string;
  to?: string;
  target?: Target;
  type?: AlertType;
  color?: string;
}>();

// Pages written for Nuxt UI use `color`, the theme's Alert uses `type`
const colorToType: Record<string, AlertType> = {
  blue: 'info',
  amber: 'warning',
  red: 'danger',
  green: 'success',
};

const alertType = computed<AlertType>(() => type ?? (color ? colorToType[color] : undefined) ?? 'default');
</script>
