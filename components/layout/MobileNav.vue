<template>
  <UiSheet :open="open" @update:open="onUpdateOpen">
    <UiSheetTrigger as-child>
      <UiButton
        variant="ghost"
        size="icon"
        class="shrink-0 md:hidden"
      >
        <Icon name="lucide:menu" size="18" />
      </UiButton>
    </UiSheetTrigger>
    <!-- Touch targets: the desktop sidebar sizes are too small for a finger -->
    <UiSheetContent
      side="left"
      data-mobile-nav
      class="flex w-[85%] flex-col pr-0 [&_a]:min-h-11 [&_a]:text-base [&_button]:min-h-11 [&_button]:text-base [&_li_.iconify]:size-5"
    >
      <LayoutHeaderLogo />
      <LayoutAside is-mobile class="min-h-0 flex-1" />
      <div class="flex flex-col gap-2 border-t pt-3 pr-6">
        <!-- External tools from the header dropdowns: on a phone they are one tap away -->
        <div v-if="tools.length" class="grid grid-cols-2 gap-2">
          <NuxtLinkLocale
            v-for="tool in tools"
            :key="tool.to"
            :to="tool.to"
            :target="tool.target"
            class="hover:bg-muted flex items-center justify-center gap-2 rounded-md border px-2"
          >
            <SmartIcon v-if="tool.icon" :name="tool.icon" :size="18" />
            {{ $t(tool.title) }}
          </NuxtLinkLocale>
        </div>
        <div v-if="links?.length" class="flex gap-1">
          <NuxtLinkLocale
            v-for="(link, i) in links"
            :key="i"
            :to="localePath(link?.to)"
            :target="link?.target"
          >
            <UiButton variant="ghost" size="icon" class="size-11">
              <SmartIcon v-if="link?.icon" :name="link.icon" :size="22" />
            </UiButton>
          </NuxtLinkLocale>
        </div>
      </div>
      <UiDialogTitle class="sr-only" />
      <UiDialogDescription class="sr-only" />
    </UiSheetContent>
  </UiSheet>
</template>

<script setup lang="ts">
const open = ref(false);
const { links, nav } = useConfig().value.header;
const tools = nav
  .flatMap((item: any) => item.links ?? [])
  .filter((link: any) => link.target === '_blank');
const { localePath } = useI18nDocs();

// Close sheet on navigation
watch(() => useRoute().path, () => {
  open.value = false;
});

// The menu follows the finger: drag right anywhere on the page to pull it out,
// drag left to push it back. Not tied to the screen edge: the edge swipe
// belongs to the browser's "back" gesture.
const SETTLE_MS = 200;
const LOCK_DISTANCE = 10;
const FLICK_MS = 250;
const FLICK_DISTANCE = 40;

let panel: HTMLElement | null = null;
let overlay: HTMLElement | null = null;
let startX = 0;
let startY = 0;
let startTime = 0;
let tracking = false;
let mode: 'opening' | 'closing' | null = null;

function grab() {
  panel = document.querySelector<HTMLElement>('[data-mobile-nav]');
  overlay = panel?.previousElementSibling as HTMLElement | null;
  return !!panel;
}

// x is the panel offset: 0 is fully open, -width is fully hidden
function place(x: number, animate: boolean) {
  if (!panel)
    return;
  const timing = `${SETTLE_MS}ms ease-out`;
  // The sheet's own slide animation would fight the inline transform
  panel.style.animation = 'none';
  panel.style.transition = animate ? `transform ${timing}` : 'none';
  panel.style.transform = `translateX(${x}px)`;
  if (overlay) {
    overlay.style.animation = 'none';
    overlay.style.transition = animate ? `opacity ${timing}` : 'none';
    overlay.style.opacity = String(1 + x / panel.offsetWidth);
  }
}

function closeAnimated() {
  if (!open.value || !grab()) {
    open.value = false;
    return;
  }
  place(-panel!.offsetWidth, true);
  setTimeout(() => {
    open.value = false;
  }, SETTLE_MS);
}

function onUpdateOpen(value: boolean) {
  if (value)
    open.value = true;
  else
    closeAnimated();
}

function scrollsHorizontally(target: EventTarget | null) {
  for (let el = target as HTMLElement | null; el && el !== document.body; el = el.parentElement) {
    if (el.scrollWidth > el.clientWidth + 1) {
      const overflow = getComputedStyle(el).overflowX;
      if (overflow === 'auto' || overflow === 'scroll')
        return true;
    }
  }
  return false;
}

function onTouchStart(e: TouchEvent) {
  mode = null;
  tracking = e.touches.length === 1
    && window.innerWidth < 768
    && !scrollsHorizontally(e.target)
    && !window.getSelection()?.toString()
    // A dialog other than the menu (search, theme) is open
    && (open.value || !document.querySelector('[role="dialog"]'));
  if (!tracking)
    return;
  startX = e.touches[0]!.clientX;
  startY = e.touches[0]!.clientY;
  startTime = e.timeStamp;
}

function onTouchMove(e: TouchEvent) {
  if (!tracking)
    return;
  const dx = e.touches[0]!.clientX - startX;
  const dy = e.touches[0]!.clientY - startY;

  if (!mode) {
    if (Math.abs(dy) > LOCK_DISTANCE && Math.abs(dy) >= Math.abs(dx)) {
      // A vertical scroll, leave it alone
      tracking = false;
      return;
    }
    if (Math.abs(dx) < LOCK_DISTANCE)
      return;
    if (open.value === dx > 0) {
      // Pulling an open menu further out, or pushing a closed one further in
      tracking = false;
      return;
    }
    mode = open.value ? 'closing' : 'opening';
    open.value = true;
  }

  if (e.cancelable)
    e.preventDefault();
  // The sheet is mounted a moment after `open` is set
  if (!panel?.isConnected && !grab())
    return;
  const width = panel!.offsetWidth;
  const x = mode === 'opening' ? dx - width : dx;
  place(Math.min(0, Math.max(-width, x)), false);
}

function onTouchEnd(e: TouchEvent) {
  if (!tracking || !mode)
    return;
  tracking = false;
  const dx = e.changedTouches[0]!.clientX - startX;
  const width = panel?.isConnected ? panel.offsetWidth : window.innerWidth;
  const flick = e.timeStamp - startTime < FLICK_MS && Math.abs(dx) > FLICK_DISTANCE;
  const done = flick || Math.abs(dx) > width / 3;

  if ((mode === 'opening') === done) {
    if (grab())
      place(0, true);
  }
  else {
    closeAnimated();
  }
  mode = null;
}

onMounted(() => {
  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', onTouchEnd, { passive: true });
  document.addEventListener('touchcancel', onTouchEnd, { passive: true });
});
onBeforeUnmount(() => {
  document.removeEventListener('touchstart', onTouchStart);
  document.removeEventListener('touchmove', onTouchMove);
  document.removeEventListener('touchend', onTouchEnd);
  document.removeEventListener('touchcancel', onTouchEnd);
});
</script>
