// The theme's app.vue only sets <body> attributes, so pages ship without
// <html lang>, hreflang alternates and a canonical link.
export default defineNuxtPlugin((nuxtApp) => {
  const route = useRoute();

  // GitHub Pages 301s every slashless page URL (/ru -> /ru/), and i18n builds
  // the locale home URLs without the slash.
  const withSlash = (url?: string) => (url && !url.endsWith('/') ? `${url}/` : url);

  // $localeHead only computes the tags; useLocaleHead() would also inject them
  // itself under the same ids, and those would win over the fixed-up copies.
  useHead(() => {
    void route.fullPath;
    const head = nuxtApp.$localeHead({ lang: true, seo: true });
    return {
      htmlAttrs: { lang: head.htmlAttrs.lang },
      link: head.link.map(link => ({ ...link, href: withSlash(link.href) })),
      meta: head.meta.map(meta => (meta.property === 'og:url' ? { ...meta, content: withSlash(meta.content) } : meta)),
    };
  });
});
