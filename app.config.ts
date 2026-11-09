export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'plugify',
      description: 'A Modern C++ Plugin and Package Manager with Multi-Language Support. Customizable. Compatible. Open Source.',
      ogImage: '/hero.png',
      ogImageComponent: 'ShadcnDocs',
      ogImageColor: 'light',
    },
    theme: {
      customizable: true,
      color: 'zinc',
      radius: 0.5,
    },
    header: {
      title: 'Plugify',
      showTitle: false,
      darkModeToggle: true,
      logo: {
        light: '/plg-logo-text.svg',
        dark: '/plg-logo-text-white.svg',
      },
      nav: [
        {
          title: 'Docs',
          links: [
            {
              title: 'Introduction',
              to: '/introduction/quick-start',
              description: 'Learn about Plugify, its purpose, and key features.',
              icon: 'lucide:rocket'
            }, {
              title: 'Essentials',
              to: '/essentials/installation',
              description: 'A high-level overview of Plugify\'s core components.',
              icon: 'lucide:package'
            }, {
              title: 'Use Cases',
              to: '/use-cases/integrations',
              description: 'Explore real-world applications and scenarios for Plugify.',
              icon: 'lucide:briefcase'
            }, {
              title: 'Languages',
              to: '/languages/languages',
              description: 'See supported programming languages and compatibility details.',
              icon: 'lucide:code'
            }, {
              title: 'Developer Guides',
              to: '/developer-guides/writing-language-module',
              description: 'Step-by-step guides for developers integrating Plugify.',
              icon: 'lucide:hammer'
            }
          ],
        },
        {
          title: 'Guides',
          to: '/plugins/s2sdk/guides',
        },
        {
          title: 'Generator',
          to: 'https://gen.plugify.net/',
          target: '_blank',
          showLinkIcon: true,
        },
        {
          title: 'Hub',
          to: 'https://api.plugify.net/',
          target: '_blank',
          showLinkIcon: true,
        }
      ],
      links: [
        {
          icon: 'simple-icons:discord',
          to: 'https://discord.gg/rX9TMmpang',
          target: '_blank',
        }, {
          icon: 'simple-icons:github',
          to: 'https://github.com/untrustedmodders/',
          target: '_blank',
        }
      ],
    },
    aside: {
      useLevel: true,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
      editLink: {
        enable: true,
        pattern: 'https://github.com/untrustedmodders/untrustedmodders.github.io/edit/main/content/:path',
        text: 'Edit this page on GitHub',
        icon: 'lucide:square-pen',
        placement: ['docsFooter', 'toc'],
      },
      codeIcon: {
        'package.json': 'vscode-icons:file-type-node',
        'tsconfig.json': 'vscode-icons:file-type-tsconfig',
        '.npmrc': 'vscode-icons:file-type-npm',
        '.editorconfig': 'vscode-icons:file-type-editorconfig',
        '.eslintrc': 'vscode-icons:file-type-eslint',
        '.eslintrc.cjs': 'vscode-icons:file-type-eslint',
        '.eslintignore': 'vscode-icons:file-type-eslint',
        'eslint.config.js': 'vscode-icons:file-type-eslint',
        'eslint.config.mjs': 'vscode-icons:file-type-eslint',
        'eslint.config.cjs': 'vscode-icons:file-type-eslint',
        '.gitignore': 'vscode-icons:file-type-git',
        'yarn.lock': 'vscode-icons:file-type-yarn',
        '.env': 'vscode-icons:file-type-dotenv',
        '.env.example': 'vscode-icons:file-type-dotenv',
        '.vscode/settings.json': 'vscode-icons:file-type-vscode',
        'nuxt': 'vscode-icons:file-type-nuxt',
        '.nuxtrc': 'vscode-icons:file-type-nuxt',
        '.nuxtignore': 'vscode-icons:file-type-nuxt',
        'nuxt.config.js': 'vscode-icons:file-type-nuxt',
        'nuxt.config.ts': 'vscode-icons:file-type-nuxt',
        'nuxt.schema.ts': 'vscode-icons:file-type-nuxt',
        'tailwind.config.js': 'vscode-icons:file-type-tailwind',
        'tailwind.config.ts': 'vscode-icons:file-type-tailwind',
        'vue': 'vscode-icons:file-type-vue',
        'ts': 'vscode-icons:file-type-typescript',
        'tsx': 'vscode-icons:file-type-typescript',
        'mjs': 'vscode-icons:file-type-js',
        'cjs': 'vscode-icons:file-type-js',
        'js': 'vscode-icons:file-type-js',
        'jsx': 'vscode-icons:file-type-js',
        'md': 'vscode-icons:file-type-markdown',
        'mdc': 'vscode-icons:file-type-markdown',
        'css': 'vscode-icons:file-type-css',
        'py': 'vscode-icons:file-type-python',
        'npm': 'vscode-icons:file-type-npm',
        'pnpm': 'vscode-icons:file-type-pnpm',
        'npx': 'vscode-icons:file-type-npm',
        'yarn': 'vscode-icons:file-type-yarn',
        'bun': 'vscode-icons:file-type-bun',
        'deno': 'vscode-icons:file-type-deno',
        'yml': 'vscode-icons:file-type-yaml',
        'json': 'vscode-icons:file-type-json',
        'pplugin': 'vscode-icons:file-type-json',
        'pmodule': 'vscode-icons:file-type-json',
        'pconfig': 'vscode-icons:file-type-json',
        'cpp': 'vscode-icons:file-type-cpp3',
        'python': 'vscode-icons:file-type-python',
        'go': 'vscode-icons:file-type-go',
        'cs': 'vscode-icons:file-type-csharp2',
        'd': 'vscode-icons:file-type-dlang',
        'rs': 'vscode-icons:file-type-rust',
        'so': 'vscode-icons:file-type-binary',
        'dll': 'vscode-icons:file-type-binary',
        'terminal': 'lucide:terminal',
      },
    },
    footer: {
      credits: `Copyright © 2023-${new Date().getFullYear()} Plugify - MIT License`,
      links: [{
        icon: 'simple-icons:discord',
        to: 'https://discord.gg/rX9TMmpang',
        target: '_blank',
      }, {
        icon: 'simple-icons:github',
        to: 'https://github.com/untrustedmodders',
        target: '_blank',
      }],
    },
    toc: {
      enable: true,
      title: 'On This Page',
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: 'https://github.com/untrustedmodders/plugify',
        target: '_blank',
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://github.com/untrustedmodders/plugify/issues',
        target: '_blank',
      }, {
        title: 'Become a Sponsor',
        icon: 'lucide:hand-heart',
        to: 'https://github.com/orgs/untrustedmodders/sponsoring',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    }
  }
});
