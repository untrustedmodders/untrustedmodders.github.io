---
title: Commands
weight: 20
---

## Plugin Manager

Load plugin manager with plugins and language modules:
```shell
plugify load
```

Load plugin manager with plugins and language modules ignoring missing or conflict packages:
```shell
plugify load --ignore
```

Unload plugin manager:
```shell
plugify unload
```

## Search for plugins

Show information about a module:
```shell
plugify plugin _plugin_name_
```

Show information about a plugin:
```shell
plugify module _plugin_name_
```

List running modules:
```shell
plugify modules
```

List running plugins:
```shell
plugify plugins
```

## Misc

Show help:
```shell
plugify help
```

Version information:
```shell
plugify version
```

## Package Manager

Like other package managers, plugify can synchronize package lists with the software repositories to allow the user to download and install packages with a simple command by solving all required dependencies.

## Install packages
You can install a single package or multiple packages using ```plugify``` command in this fashion:
```shell
plugify install _package_name1_ _package_name2_ ...
```
To install a single package or multiple packages from file manifest:
```shell
plugify install --file D:/_package_file_.json
```
To install a single package or multiple packages from HTTP manifest:
```shell
plugify install --link https://website.com/_package_file_.json
```
To install missing packages to resolve all of current dependencies:
```shell
plugify install --missing
```

## Update packages
To update a single package or multiple packages:
```shell
plugify update _package_name1_ _package_name2_ ...
```
To update all installed packages:
```shell
plugify update --all
```

## Remove an installed package
To remove a single package or multiple packages, leaving all of its dependencies installed:
```shell
plugify remove _package_name1_ _package_name2_ ...
```
To remove all installed packages:
```shell
plugify remove --all
```
To remove a conflicted packages with unresolved dependencies:
```shell
plugify remove --conflict
```

## Search for packages

Print all local packages:
```shell
plugify list
```

Print all remote packages:
```shell
plugify query
```

You can search for remote packages by name:
```shell
plugify search _package_name_
```

You can search for local packages by name:
```shell
plugify show _package_name_
```

## Manage packages

You can snapshot installed packages into manifest file. File will be automatically generated at the base directory.
```shell
plugify snapshot
```

This command is essential for adding packages that are not in the default repositories. Developers create and maintain these repositories and allow others to add them via URLs. Since these are unofficial repositories, add them from trusted sources to avoid potential security threats.
```shell
plugify repo https://website.com/_package_file_.json
```
