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
      routes: ['/sitemap.xml', '/robots.txt']
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
  compatibilityDate: '2024-07-06',
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'yaml', 'bash', 'ini', 'python', 'cpp', 'csharp', 'go', 'cmake'],
    },
  },
});