import redirects from './data/redirects.json';

// Pages that moved when the docs were regrouped by audience. Every old address
// (and its /ru twin) is prerendered as a redirect so external links keep working.
const redirectRules = Object.fromEntries(
  Object.entries(redirects as Record<string, string>).flatMap(([from, to]) => [
    [from, { redirect: `${to}/` }],
    [`/ru${from}`, { redirect: `/ru${to}/` }],
  ]),
);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['shadcn-docs-nuxt'],
  modules: [
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],
  nitro: {
    prerender: {
      routes: ['/robots.txt', ...Object.keys(redirectRules)],
      ignore: ['/ru/sitemap.xml']
    }
  },
  routeRules: redirectRules,
  site: {
    url: 'https://plugify.net',
    name: 'Plugify',
    // GitHub Pages serves every page as a directory and 301s the slashless URL
    trailingSlash: true
  },
  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: 'append'
      }
    }
  },
  i18n: {
    baseUrl: 'https://plugify.net',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        language: 'en-US',
      },
      {
        code: 'ru',
        name: 'Русский',
        language: 'ru-RU',
      },
    ],
  },
  icon: {
    clientBundle: {
      scan: {
        globInclude: ['**/*.{vue,jsx,tsx,md,mdc,mdx,yml,yaml}', 'app.config.ts'],
      },
      // Used by the shadcn-docs-nuxt theme, which the scanner skips (node_modules)
      icons: [
        'lucide:arrow-left', 'lucide:arrow-right', 'lucide:arrow-up', 'lucide:arrow-up-right',
        'lucide:bookmark', 'lucide:check', 'lucide:chevron-down', 'lucide:chevron-right',
        'lucide:chevron-up', 'lucide:chevrons-down-up', 'lucide:chevrons-up-down', 'lucide:circle-x',
        'lucide:clipboard', 'lucide:external-link', 'lucide:file', 'lucide:folder', 'lucide:languages',
        'lucide:loader', 'lucide:loader-circle', 'lucide:menu', 'lucide:monitor', 'lucide:moon',
        'lucide:paintbrush', 'lucide:search', 'lucide:square-pen', 'lucide:sun', 'lucide:terminal',
        'lucide:x', 'lucide:refresh-ccw',
      ],
      sizeLimitKb: 1024,
    },
  },
  // The site only uses system fonts; without this every build polls all font providers
  fonts: {
    providers: {
      google: false,
      googleicons: false,
      bunny: false,
      fontshare: false,
      fontsource: false,
      adobe: false,
    },
  },
  vite: {
    optimizeDeps: {
      // Vite's dev scanner picks up the theme's build-time tailwind plugin as a
      // client dependency and then fails to bundle its native oxide binary
      exclude: ['@tailwindcss/vite'],
    },
  },
  compatibilityDate: '2025-12-26',
  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['json', 'jsonc', 'mermaid', 'xml', 'toml', 'js', 'ts', 'shell', 'markdown', 'yaml', 'bash', 'c', 'cpp', 'csharp', 'python', 'go', 'cmake', 'lua', 'rs', 'd'],
    },
  },
});
