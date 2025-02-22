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
      title: 'shadcn-docs-starter',
      showTitle: false,
      darkModeToggle: true,
      logo: {
        light: '/plg-logo-text.svg',
        dark: '/plg-logo-text-white.svg',
      },
      nav: [{
        title: 'Docs',
        links: [{
          title: 'Getting Started',
          to: '/getting-started/introduction',
          description: 'Setup your first project with plugify.',
          icon: 'lucide:rocket',
        }, {
          title: 'Language Modules',
          to: '/languages',
          description: 'Quick start with the language modules.',
          icon: 'lucide:box',
        }, {
          title: 'For developers',
          to: '/developing/architecture',
          description: 'Write your first plugins & contribute to plugify.',
          target: '_self',
          icon: 'lucide:code',
        }, {
          title: 'SDK',
          to: '/games/source2/cs2',
          description: 'Discover the configurations and exposed APIs.',
          target: '_self',
          icon: 'lucide:gamepad-2',
        }],
      },
      {
        title: 'Generator',
        to: 'https://untrustedmodders.github.io/plugify-generator',
        target: '_self',
        showLinkIcon: true,
      }],
      links: [{
        icon: 'simple-icons:github',
        to: 'https://github.com/untrustedmodders/',
        target: '_blank',
      },
      {
        icon: 'simple-icons:discord',
        to: 'https://discord.gg/untrustedmodders',
        target: '_blank',
      }],
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
        pattern: 'https://github.com/untrustedmodders/untrustedmodders.github.io/tree/main/content/:path',
        text: 'Edit this page on GitHub',
        icon: 'lucide:square-pen',
        placement: ['docsFooter', 'toc'],
      },
    },
    footer: {
      credits: `© untrustedmodders 2023-${new Date().getFullYear()}`,
      links: [{
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
      }],
    },
    search: {
      enable: true,
      inAside: false,
    }
  }
});