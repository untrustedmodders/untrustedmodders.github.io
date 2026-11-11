import { themes as baseThemes } from 'shadcn-docs-nuxt/lib/themes';

// The Plugify theme from api.plugify.net (plugify-api, assets/css/themes.css).
// The colours themselves live in assets/css/tailwind.css; this entry only
// feeds the swatch in the theme customizer.
export const plugifyTheme = {
  name: 'plugify',
  label: 'Plugify',
  activeColor: {
    light: '155 65% 30%',
    dark: '155 61% 44%',
  },
  cssVars: {
    light: { primary: '155 65% 30%' },
    dark: { primary: '155 61% 44%' },
  },
};

export const themes = [plugifyTheme, ...baseThemes];
