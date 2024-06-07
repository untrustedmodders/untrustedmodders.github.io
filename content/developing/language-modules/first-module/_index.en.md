---
title: Writing your first module
weight: 5
---

## Introduction

Creating a language module for the Plugify system involves defining a configuration file and ensuring your module integrates seamlessly with the Plugify core. Each language module should have a configuration file named `.pmodule`. This file contains essential information that the Plugify core uses to load and manage language modules. The `.pmodule` file is a JSON configuration file with a simple key-value structure. It provides crucial details about the language module, allowing seamless integration into the Plugify framework.

## Example .pmodule File

Below is an example of a `.pmodule` configuration file:

```json
{
    "fileVersion": 1,
    "version": 1,
    "versionName": "1.0",
    "friendlyName": "C++ language module",
    "language": "cpp",
    "description": "Adds support for C++ plugins",
    "createdBy": "untrustedmodders",
    "createdByURL": "https://github.com/untrustedmodders/",
    "docsURL": "https://github.com/untrustedmodders/cpp-lang-module/README.md",
    "downloadURL": "https://github.com/untrustedmodders/cpp-lang-module/releases/download/v1.0/cpp-lang-module.zip",
    "updateURL": "https://raw.githubusercontent.com/untrustedmodders/cpp-lang-module/main/cpp-lang-module.json",
    "supportedPlatforms": [],
    "forceLoad": false
}
```
## Explanation of Configuration Options

- **`fileVersion`**: The version number of the configuration file format.
- **`version`**: The version number of the language module.
- **`versionName`**: A human-readable version name, such as "1.0".
- **`friendlyName`**: A user-friendly name for the language module.
- **`language`**: The programming language supported by this module (e.g., "cpp" for C++).
- **`description`**: A brief description or overview of the language module.
- **`createdBy`**: The creator or author of the language module.
- **`createdByURL`**: The URL linking to the creator's profile or information.
- **`docsURL`**: The URL linking to the documentation for the language module.
- **`downloadURL`**: The URL for downloading the language module, typically a release package or ZIP file.
- **`updateURL`**: The URL for checking and fetching updates for the language module.
- **`supportedPlatforms`**: An array listing the platforms supported by the language module.
- **`forceLoad`**: A boolean indicating whether the language module should be forcibly loaded by the core.

## ILanguageModule Interface
The ILanguageModule interface defines the methods that should be implemented by user-written language modules. Below is an overview of the interface:

```c++
namespace plugify {
    /**
     * @class ILanguageModule
     * @brief Interface for user-implemented language modules.
     *
     * The ILanguageModule interface defines methods that should be implemented by user-written language modules.
     */
    class ILanguageModule {
    protected:
        ~ILanguageModule() = default;

    public:
        /**
         * @brief Initialize the language module.
         * @param provider Weak pointer to the Plugify provider.
         * @param module Reference to the language module being initialized.
         * @return Result of the initialization, either InitResultData or ErrorData.
         */
        virtual InitResult Initialize(std::weak_ptr<IPlugifyProvider> provider, const IModule& module) = 0;

        /**
         * @brief Shutdown the language module.
         */
        virtual void Shutdown() = 0;

        /**
         * @brief Handle plugin load event.
         * @param plugin Reference to the loaded plugin.
         * @return Result of the load event, either LoadResultData or ErrorData.
         */
        virtual LoadResult OnPluginLoad(const IPlugin& plugin) = 0;

        /**
         * @brief Handle plugin start event.
         * @param plugin Reference to the started plugin.
         */
        virtual void OnPluginStart(const IPlugin& plugin) = 0;

        /**
         * @brief Handle plugin end event.
         * @param plugin Reference to the ended plugin.
         */
        virtual void OnPluginEnd(const IPlugin& plugin) = 0;

        /**
         * @brief Handle method export event.
         * @param plugin Reference to the plugin exporting a method.
         */
        virtual void OnMethodExport(const IPlugin& plugin) = 0;
    };
}
```

Follow these steps to create a language module:
> Implement the ILanguageModule interface.
> Initialize variables and systems for managing, loading, starting, and ending plugins for your language.
> Export methods specified in the plugins from the OnPluginLoad, methods are imported during the OnMethodExport.
> Optionally, create function call wrappers using plugify::plugify-function library for dynamic generation of C functions.
> If necessary, use libraries like dyncall to dynamically generate function prototypes and call C functions using their addresses.
> Export an ILanguageModule* GetLanguageModule() method in your library, return an instance of your language module from this method.

## Steps to Create Your First Language Module

### 1. Set Up Your Development Environment

Ensure you have the necessary tools and libraries installed for developing your language module. This typically includes:

- A text editor or IDE.
- The appropriate compiler or interpreter for the language you are supporting.
- The Plugify framework installed and configured.

### 2. Use the Template Project

To simplify the process, you can clone the template project from the following repository: [untrustedmodders/template-lang-module](https://github.com/untrustedmodders/template-lang-module). This template already includes the necessary setup and uses CMake for building.

To clone the repository, run:
```sh
git clone https://github.com/untrustedmodders/template-lang-module.git
```

To configure and build, run:
```sh
mkdir build && cd build
cmake --preset Debug
cmake --build .
```

### 3. Define Your Language Module's Functionality

Write the source code for your language module. This code should include the logic required to load, manage, and execute plugins written in the supported language. Ensure that your module can interact with the Plugify core and other plugins as needed.

### 4. Create the .pmodule Configuration File

Create a `.pmodule` file in the root directory of your language module project. Use the example provided above as a template, and modify the values to suit your module.

### 5. Implement Marshaling Wrappers (if needed)

For many language modules, it might be necessary to create marshaling function wrappers to convert object types (e.g., `std::vector`, `std::string`) to the native types of the language. This ensures seamless integration and interaction with the plugin system. Read more about it (here)[en/developing/language-modules/marshalling].

### 6. Package Your Language Module

Package your language module files and the `.pmodule` file into a ZIP archive or other suitable format specified in the `downloadURL`.

### 7. Test Your Language Module

Before publishing your language module, test it thoroughly to ensure it works as expected. Check for any issues or missing dependencies.

### 8. Publish Your Language Module

Upload your language module package to a hosting service (e.g., GitHub releases) and update the `downloadURL` in your `.pmodule` file accordingly. Share your language module with the Plugify community!

### 9. Update Your Language Module

Maintain and update your language module as needed. Update the `version`, `versionName`, and other relevant fields in your `.pmodule` file for each new release. Ensure the `updateURL` points to the latest `.json` file for automatic updates.
