// The theme sets <html lang> but no hreflang alternates or canonical link.
export default defineNuxtPlugin(() => {
  const head = useLocaleHead({ dir: false, lang: false, seo: true });

  // GitHub Pages 301s every slashless page URL (/ru -> /ru/), and i18n builds
  // the locale home URLs without the slash.
  const withSlash = (url?: string) => (url && !url.endsWith('/') ? `${url}/` : url);

  useHead(() => ({
    link: head.value.link?.map(link => ({ ...link, href: withSlash(link.href) })),
    meta: head.value.meta?.map(meta => (meta.property === 'og:url' ? { ...meta, content: withSlash(meta.content) } : meta)),
  }));
});
