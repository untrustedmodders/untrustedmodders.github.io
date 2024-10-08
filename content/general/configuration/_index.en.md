---
title: Configuration
weight: 15
---

## Global plugify parameters

**Plugify** lets you define the following parameters in your `plugify.pconfig` (here, values are default).

Note that some of these parameters are explained in details in other sections of this documentation.

```json
{
    // The base directory where Plugify will look for and manage its addons
    "baseDir": "addons/plugify",

    // The severity level for logging. Options typically include "debug", "info", "warn", "error", "fatal", "verbose". To disable use "none".
    "logSeverity": "debug",

    // A list of repository URLs from which Plugify can fetch addon modules.
    // These repositories should provide JSON files with package definitions.
    "repositories": [
        "https://raw.githubusercontent.com/untrustedmodders/cpp-lang-module/main/cpp-lang-module.json",
        "https://raw.githubusercontent.com/untrustedmodders/csharp-lang-module/main/csharp-lang-module.json",
        "https://raw.githubusercontent.com/untrustedmodders/dynohook/main/dynohook.json",
        "https://raw.githubusercontent.com/untrustedmodders/dyncall/main/dyncall.json",
        "https://raw.githubusercontent.com/untrustedmodders/cs2-sdk-plugin/main/cs2sdk.json"
    ]
}
```

### Explanation of Configuration Options:

- **`baseDir`**: This sets the base directory where Plugify will store and manage its addons. The path should be relative to the application's root directory.

- **`logSeverity`**: Defines the level of detail in the logs. The `verbose` level provides detailed logging, useful during development. Other levels include `debug`, `info`, `warn`, `error` and `fatal` which reduce the verbosity progressively. To disable use `none`.

- **`repositories`**: This is a list of URLs pointing to JSON files that describe various addon modules. Plugify will fetch and use these modules. Each URL should point directly to a JSON file in a repository.

{{% notice note %}}
By adjusting these settings, you can customize how Plugify operates within your application, including where it stores addons, how much logging information it provides, and which repositories it fetches addons from.
{{% /notice %}}
