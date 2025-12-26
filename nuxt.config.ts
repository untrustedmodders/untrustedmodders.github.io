// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  nitro: {
    static: true,
    prerender: {
      routes: ['/sitemap.xml', '/robots.txt'],
      ignore: ['/ru/sitemap.xml']
    }
  },
  site: {
    url: 'https://plugify.net', 
    name: 'Plugify - A Modern C++ Plugin and Package Manager with Multi-Language Support. Customizable. Compatible. Open Source.'
  },
  i18n: { 
    defaultLocale: 'en', 
    locales: [ 
      { 
        code: 'en', 
        name: 'English', 
        language: 'en-US', 
      },
      { 
        code: 'ru', 
        name: 'Russian', 
        language: 'ru-RU', 
      }, 
    ], 
  },
  sitemap: {
	hostname: 'https://plugify.net',
	i18n: true
  },
  compatibilityDate: '2025-12-26',
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['json', 'mermaid', 'xml', 'toml', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini', 'python', 'cpp', 'csharp', 'go', 'cmake', 'lua', 'rs', 'd'],
    },
  },
});