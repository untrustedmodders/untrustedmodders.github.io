---
title: Commands
weight: 20
---

## Plugin Manager

Load plugin manager with plugins and language modules:
```shell
plg load
```

Load plugin manager with plugins and language modules ignoring missing or conflict packages:
```shell
plg load --ignore
```

Unload plugin manager:
```shell
plg unload
```

## Search for plugins

Show information about a module:
```shell
plg plugin _plugin_name_
```

Show information about a plugin:
```shell
plg module _plugin_name_
```

List running modules:
```shell
plg modules
```

List running plugins:
```shell
plg plugins
```

## Misc

Show help:
```shell
plg help
```

Version information:
```shell
plg version
```

## Package Manager

Like other package managers, plg can synchronize package lists with the software repositories to allow the user to download and install packages with a simple command by solving all required dependencies.

## Install packages
You can install a single package or multiple packages using ```plugify``` command in this fashion:
```shell
plg install _package_name1_ _package_name2_ ...
```
To install a single package or multiple packages from file manifest:
```shell
plg install --file D:/_package_file_.json
```
To install a single package or multiple packages from HTTP manifest:
```shell
plg install --link https://website.com/_package_file_.json
```
To install missing packages to resolve all of current dependencies:
```shell
plg install --missing
```

## Update packages
To update a single package or multiple packages:
```shell
plg update _package_name1_ _package_name2_ ...
```
To update all installed packages:
```shell
plg update --all
```

## Remove an installed package
To remove a single package or multiple packages, leaving all of its dependencies installed:
```shell
plg remove _package_name1_ _package_name2_ ...
```
To remove all installed packages:
```shell
plg remove --all
```
To remove a conflicted packages with unresolved dependencies:
```shell
plg remove --conflict
```

## Search for packages

Print all local packages:
```shell
plg list
```

Print all remote packages:
```shell
plg query
```

You can search for remote packages by name:
```shell
plg search _package_name_
```

You can search for local packages by name:
```shell
plg show _package_name_
```

## Manage packages

You can snapshot installed packages into manifest file. File will be automatically generated at the base directory.
```shell
plg snapshot
```

This command is essential for adding packages that are not in the default repositories. Developers create and maintain these repositories and allow others to add them via URLs. Since these are unofficial repositories, add them from trusted sources to avoid potential security threats.
```shell
plg repo https://website.com/_package_file_.json
```
