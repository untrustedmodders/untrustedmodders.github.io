<template>
  <li>
    <!-- Folder -->
    <div v-if="link.children">
      <template v-if="folderStyle === 'group'">
        <!-- A group heading must not look like one of its own items -->
        <div
          class="text-muted-foreground mt-5 flex items-center gap-2 rounded-md px-2 text-[11px] font-semibold uppercase tracking-wider outline-none"
          :class="[link.navTruncate !== false && 'min-h-8']"
        >
          <LayoutAsideTreeItemButton :link />
        </div>
        <!-- Items sit under their heading, set off by a line -->
        <div class="border-border ml-[15px] border-l pl-2">
          <LayoutAsideTree :links="link.children" :level="level" />
        </div>
      </template>
      <template v-else>
        <button
          class="text-foreground/80 hover:bg-muted hover:text-primary flex w-full cursor-pointer items-center gap-2 rounded-md p-2 text-left text-sm"
          :class="[link.navTruncate !== false && 'min-h-8']"
          @click="isOpen = !isOpen"
        >
          <SmartIcon
            v-if="folderStyle === 'tree'"
            name="lucide:chevron-down"
            class="transition-transform"
            :class="[!isOpen && '-rotate-90']"
          />
          <LayoutAsideTreeItemButton :link />
          <SmartIcon
            v-if="folderStyle === 'default'"
            name="lucide:chevron-down"
            class="ml-auto transition-transform"
            :class="[!isOpen && '-rotate-90']"
          />
        </button>
        <div v-show="isOpen">
          <LayoutAsideTree :links="link.children" :level="level + 1" />
        </div>
      </template>
    </div>
    <!-- Page -->
    <NuxtLinkLocale
      v-else
      :to="link._path"
      class="text-foreground/80 hover:bg-muted hover:text-primary flex items-center gap-2 rounded-md p-2 text-sm"
      :class="[
        isActive && 'bg-muted !text-primary font-medium',
        link.navTruncate !== false && 'min-h-8',
      ]"
    >
      <LayoutAsideTreeItemButton :link />
    </NuxtLinkLocale>
  </li>
</template>

<script setup lang="ts">
import type { NavItem } from '@ztl-uwu/nuxt-content';

const { link, level } = defineProps<{
  link: NavItem;
  level: number;
}>();

const { collapse, collapseLevel, folderStyle: defaultFolderStyle } = useConfig().value.aside;

const collapsed = useCollapsedMap();
const route = useRoute();

function defaultOpen() {
  if (route.path.includes(link._path))
    return true;
  if (link.collapse !== undefined)
    return !link.collapse;

  return level < collapseLevel && !collapse;
}

// Folders marked `collapse: true` (languages, standard plugins) follow the route:
// only the one that holds the current page is open.
const followsRoute = link.collapse === true;

const isOpen = ref(followsRoute ? defaultOpen() : (collapsed.value.get(link._path) || defaultOpen()));

watch(isOpen, (v) => {
  collapsed.value.set(link._path, v);
});

watch(() => route.path, () => {
  if (followsRoute)
    isOpen.value = defaultOpen();
});

function normalizePath(p: string) {
  const out = p.replace(/\/+$/, '');
  return out === '' ? '/' : out;
}
const isActive = computed(() => normalizePath(link._path) === normalizePath(route.path));

const folderStyle = computed(() => link.sidebar?.style ?? defaultFolderStyle);
</script>
