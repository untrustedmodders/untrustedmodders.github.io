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
          title: 'Introduction',
          to: '/introduction/quick-start',
          description: 'Learn about Plugify, its purpose, and key features.',
          icon: 'lucide:rocket'
        }, {
          title: 'Essentials',
          to: '/overview/installation',
          description: 'A high-level overview of Plugify\'s core components.',
          icon: 'lucide:package'
        }, {
          title: 'Use Cases',
          to: '/use-cases/integrations',
          description: 'Explore real-world applications and scenarios for Plugify.',
          target: '_self',
          icon: 'lucide:briefcase'
        }, {
          title: 'Languages',
          to: '/languages/languages',
          description: 'See supported programming languages and compatibility details.',
          target: '_self',
          icon: 'lucide:code'
        }, {
          title: 'Developer Guides',
          to: '/developer-guides/writing-language-module',
          description: 'Step-by-step guides for developers integrating Plugify.',
          target: '_self',
          icon: 'lucide:hammer'
        }],
      },
      {
        title: 'API Hub',
        to: 'https://untrustedmodders.github.io/plugify-hubapi/',
        target: '_self',
        showLinkIcon: true,
      }],
      links: [{
        icon: 'simple-icons:discord',
        to: 'https://discord.gg/untrustedmodders',
        target: '_blank',
      }, {
        icon: 'simple-icons:github',
        to: 'https://github.com/untrustedmodders/',
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
      credits: `Copyright © 2023-${new Date().getFullYear()} Plugify - MIT License`,
      links: [{
        icon: 'simple-icons:discord',
        to: 'https://discord.gg/untrustedmodders',
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