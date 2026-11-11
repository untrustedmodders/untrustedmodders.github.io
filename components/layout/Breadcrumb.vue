<template>
  <UiBreadcrumb>
    <UiBreadcrumbList>
      <template v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.title">
        <UiBreadcrumbItem>
          <!-- The first crumb has no page of its own. A link without an address makes Nuxt
               prefetch the payload of the full current URL and log NUXT_E7001 / NUXT_E7003. -->
          <span v-if="index === 0">
            {{ breadcrumb.title }}
          </span>
          <NuxtLinkLocale
            v-else
            :href="breadcrumb.href"
            class="hover:text-foreground transition-colors"
            :class="{ 'text-foreground': index === breadcrumbs.length - 1 }"
          >
            {{ breadcrumb.title }}
          </NuxtLinkLocale>
        </UiBreadcrumbItem>
        <UiBreadcrumbSeparator v-if="index !== breadcrumbs.length - 1" />
      </template>
    </UiBreadcrumbList>
  </UiBreadcrumb>
</template>

<script setup lang="ts">
const route = useRoute();

const breadcrumbs = useBreadcrumb(route.path);
</script>
