import index from '#builds';

export type Host = 'launcher' | 'runtime' | 'metamod';
export type Os = 'linux' | 'windows';

export interface BuildComponent {
  name: string;
  kind: 'host' | 'module' | 'plugin';
  version: string;
  repo: string;
  release_url: string;
}

export interface BuildFile {
  name: string;
  // `full` is a new installation, `host-only` updates the host of an installed build
  variant: 'full' | 'host-only';
  host: Host;
  os: Os;
  size: number;
  sha256: string;
  url: string;
}

export interface BuildRelease {
  version: string;
  channel: 'stable' | 'dev';
  tag: string;
  date: string;
  url: string;
  changelog: string;
  core: string;
  // conda channel of the build, listed first in the pack's .condarc
  channel_url: string;
  // Dependencies of the plugify-source2-modules and plugify-source2-plugins meta-packages
  packages: { modules: string[]; plugins: string[] };
  components: BuildComponent[];
  files: BuildFile[];
}

export interface Build {
  title: string;
  games: string[];
  repo: string;
  releases: BuildRelease[];
}

export interface BuildsIndex {
  schema: number;
  mock?: boolean;
  updated: string;
  builds: Record<string, Build>;
}

export const HOSTS: Host[] = ['launcher', 'runtime', 'metamod'];
export const OSES: Os[] = ['linux', 'windows'];

// Which host package each pack host is made from
export const HOST_PACKAGE: Record<Host, string> = {
  launcher: 'plugify-source2-launcher',
  runtime: 'plugify-source2-launcher',
  metamod: 'plugify-metamod-loader',
};

// Display names and doc pages of known packages; anything else is shown by package name
const PACKAGES: Record<string, { title: string; to?: string; lang?: string }> = {
  'plugify-source2-launcher': { title: 'S2-Launcher', to: '/builds/hosts/s2-launcher/overview' },
  'plugify-metamod-loader': { title: 'MM-Loader', to: '/builds/hosts/metamod-plugin/overview' },
  'plugify-plugin-s2sdk': { title: 'Source 2 SDK (s2sdk)', to: '/plugins/s2sdk/features' },
  'plugify-plugin-polyhook': { title: 'PolyHook', to: '/plugins/polyhook/features' },
  'plugify-plugin-configs': { title: 'Configs', to: '/plugins/config-system/features' },
  'plugify-plugin-permissions': { title: 'Permissions', to: '/plugins/permissions/features' },
  'plugify-plugin-dyncall': { title: 'DynCall', to: '/plugins/dyncall/features' },
  'plugify-plugin-translations': { title: 'Translations' },
  'permissions-storage': { title: 'Permissions Storage' },
  'permissions-connector-s2': { title: 'Permissions Connector (Source 2)' },
  'plugify-module-cpp': { title: 'C++', to: '/plugins/languages/cpp/quick-start', lang: 'C++' },
  'plugify-module-dotnet': { title: 'C# (.NET)', to: '/plugins/languages/csharp/quick-start', lang: 'C#' },
  'plugify-module-python3': { title: 'Python', to: '/plugins/languages/python/quick-start', lang: 'Python' },
  'plugify-module-v8': { title: 'JavaScript (V8)', to: '/plugins/languages/javascript/quick-start', lang: 'JavaScript' },
  'plugify-module-golang': { title: 'Go', to: '/plugins/languages/golang/quick-start', lang: 'Go' },
  'plugify-module-lua': { title: 'Lua', to: '/plugins/languages/lua/quick-start', lang: 'Lua' },
  'plugify-module-rust': { title: 'Rust', to: '/plugins/languages/rust/quick-start', lang: 'Rust' },
};

export const packageInfo = (name: string) => PACKAGES[name] ?? { title: name };

export const formatSize = (bytes: number) => `${Math.round(bytes / 1_000_000)} MB`;

// Packages of the build: modules, then plugins
export const releasePackages = (release: BuildRelease) =>
  [...release.packages.modules, ...release.packages.plugins];

// Hosts whose version differs from the previous release, i.e. when the host-only archive is needed
export const hostChanged = (release: BuildRelease, previous?: BuildRelease) => !!previous
  && release.components.some(c => c.kind === 'host' && previous.components.find(p => p.name === c.name)?.version !== c.version);

export function useBuild(id: string) {
  const build = index.builds[id];
  const releases = build?.releases ?? [];
  const stable = releases.filter(r => r.channel === 'stable');
  return {
    index,
    build,
    releases,
    stable,
    latest: stable[0],
    dev: releases.find(r => r.channel === 'dev'),
  };
}
