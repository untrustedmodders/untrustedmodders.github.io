import { themes } from '~/lib/themes';

interface Config {
  theme?: string;
  radius: number;
}

// Replaces the composable of shadcn-docs-nuxt: the same API, plus the Plugify
// theme in the list of colours.
export function useThemes() {
  const { value: color } = useColorMode();
  const isDark = color === 'dark';

  const defaultTheme = useConfig().value.theme;
  // Not the theme's own 'theme' cookie: that one holds the old default (zinc)
  // for every past visitor, and this one is shared with api.plugify.net.
  const config = useCookie<Config>('plugify-theme', {
    ...sharedCookieOptions(),
    default: (): Config => ({
      theme: defaultTheme.color,
      radius: defaultTheme.radius,
    }),
  });
  // An empty or broken cookie parses to null; fall back to the defaults
  if (!config.value || typeof config.value !== 'object' || !themes.some(t => t.name === config.value.theme))
    config.value = { theme: defaultTheme.color, radius: defaultTheme.radius };

  const allColors = themes.map(t => t.name);

  const theme = computed(() => config.value?.theme ?? defaultTheme.color);
  const radius = computed(() => config.value?.radius ?? defaultTheme.radius);

  const themeClass = computed(() => `theme-${theme.value}`);

  function setTheme(themeName: string) {
    config.value = { theme: themeName, radius: radius.value };
  }

  function setRadius(newRadius: number) {
    config.value = { theme: theme.value, radius: newRadius };
  }

  function setClassTheme() {
    document.body.classList.remove(
      ...allColors.map(color => `theme-${color}`),
    );
    document.body.classList.add(themeClass.value);
  }

  const themePrimary = computed(() => {
    const t = themes.find(t => t.name === theme.value);
    return `hsl(${t?.cssVars[isDark ? 'dark' : 'light'].primary})`;
  });

  return {
    themeClass,
    theme,
    setTheme,
    radius,
    setRadius,
    setClassTheme,
    allColors,
    themePrimary,
  };
}
