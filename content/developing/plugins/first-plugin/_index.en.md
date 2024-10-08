---
title: Writing your first plugin
weight: 5
---

Creating your first plugin for the Plugify ecosystem is a straightforward process. This guide will walk you through the steps to create a plugin and the necessary configuration file, known as a `.pplugin` file.

## Introduction

Each plugin within the Plugify ecosystem should have an associated configuration file named `.pplugin`. This configuration file contains essential information that both the core and language modules use during the plugin loading process.  
The `.pplugin` configuration file should be named exactly the same as the folder. The name of the plugin folder is allowed to contain alphanumeric characters (A-Z, a-z, and 0-9), special characters such as `$`, `#`, `@`, and hyphens (`-`), except spaces.  
Additionally, each plugin should be located in separate folder inside the `plugins` directory.  

1. Each plugin folder should contain all the necessary files for the plugin, including the `.pplugin` configuration file and all binary files. 

    > * plugins
    >   * plugin_name1
    >     * bin
    >        * plugin_name1.dll
    >        * plugin_name1.so
    >     * plugin_name1.pplugin

2. This organized structure ensures clarity and ease of management for plugins within the Plugify ecosystem.  

    > * plugins
    >   * plugin_name1
    >     * bin
    >        * plugin_name1.dll
    >        * plugin_name1.so
    >     * plugin_name1.pplugin
    >   * plugin_name2
	>     * configs
	>        * settings.txt
    >     * bin
    >        * plugin_name2.py
    >     * plugin_name2.pplugin
	
## Example .pplugin File

Below is an example of a `.pplugin` file:

```json
{
  "fileVersion": 1,
  "version": 1,
  "versionName": "1.0",
  "friendlyName": "Sample Plugin",
  "description": "This is a sample plugin.",
  "createdBy": "untrustedmodders",
  "createdByURL": "https://github.com/untrustedmodders/",
  "docsURL": "https://github.com/untrustedmodders/sample_plugin",
  "downloadURL": "https://github.com/untrustedmodders/sample_plugin/releases/download/v1.0/sample_plugin.zip",
  "updateURL": "https://raw.githubusercontent.com/untrustedmodders/sample_plugin/main/sample_plugin.json",
  "entryPoint": "bin/sample_plugin",
  "supportedPlatforms": [],
  "languageModule": {
    "name": "cpp"
  },
  "dependencies": [],
  "exportedMethods": []
}
```

## Explanation of Configuration Options

- **`fileVersion`**: The version number of the configuration file format.
- **`version`**: The version number of the plugin.
- **`versionName`**: A human-readable version name, such as "1.0".
- **`friendlyName`**: A user-friendly name for the plugin.
- **`description`**: A brief description or overview of the plugin.
- **`createdBy`**: The creator or author of the plugin.
- **`createdByURL`**: The URL linking to the creator's profile or information.
- **`docsURL`**: The URL linking to the documentation for the plugin.
- **`downloadURL`**: The URL for downloading the plugin, typically a release package or ZIP file.
- **`updateURL`**: The URL for checking and fetching updates for the plugin.
- **`supportedPlatforms`**: An array listing the platforms supported by the plugin. (Currently empty in this example.)
- **`entryPoint`**: The entry point or main executable for the plugin, specified as "bin/sample_plugin". (Depends on language module)
- **`languageModule`**: Information about the programming language module used. In this case, it's specified as "cpp" (C++).
- **`dependencies`**: A list of plugin references specifying the dependencies required for the plugin. This field is crucial for topological sorting to load plugins in the correct order of initialization.
- **`exportedMethods`**: An array describing functions/methods exposed by the plugin.

## Integration with Core and Language Modules
Upon loading a plugin, both the Plugify core and language modules use the information from the .pplugin configuration file. The core relies on the entry point and version to initiate and manage the plugin, while language modules may use additional parameters based on their specific requirements.
Ensure that each plugin's .pplugin file is accurately configured to guarantee a smooth integration process within the Plugify ecosystem.

## Language Module Restriction
Each plugin should specify the programming language it is written in. The language parameter in the .pplugin file corresponds to the type of language module used by the plugin. It is important to note that multiple language modules with the same language are not allowed. This ensures a clear and unambiguous association between plugins and their respective language modules.

## Dependency Management
The information provided in the dependencies field is used for dependency management. The Plugify core utilizes Topological Sorting to determine the correct order for loading plugins based on their dependencies. This ensures that plugins with dependencies are initialized in the appropriate sequence, avoiding potential initialization issues.

Here's the representation of dependency in JSON format along with descriptions for each field:

```json
{
    "name": "polyhook",
    "optional": false,
    "supportedPlatforms": ["windows", "linux"],
    "requestedVersion": 2
}
```

- **`name`**: The name of the plugin reference. This field identifies the dependency by its unique name within the Plugify ecosystem.
- **`optional`**: Indicates whether the plugin reference is optional. If set to true, the core system will consider the dependency as optional, and its absence won't prevent the plugin from loading. If set to false, the dependency is mandatory for the plugin to function correctly.
- **`supportedPlatforms`**: Specifies the platforms supported by the plugin reference. This field helps ensure that the dependency is compatible with the current platform during initialization.
- **`requestedVersion`**: An optional field representing the requested version of the plugin reference. If provided, the core system will validate that dependency matches the specified version. If not provided, any compatible version may be used.

## Step-by-Step Guide to Creating Your First Plugin

### 1. Set Up Your Development Environment

Ensure you have the necessary tools and libraries installed for developing a plugin. This typically includes:

- A text editor or IDE.
- The appropriate language compiler or interpreter (e.g., GCC for C++, Mono for C# plugins, ect.).
- The Plugify framework installed and configured.

### 2. Create the Plugin Source Code

Write the source code for your plugin. This will depend on the language module specified in your `.pplugin` file. Each plugin source file is different and should be tailored to the specific language module for which it is created. For example, if you are writing a C++ plugin, you would create your source files accordingly, whereas a Python plugin would require Python scripts.

{{< tabs >}}
{{% tab name="c++" %}}
```c++
#include <plugify/cpp_plugin.h>
#include <plugin_export.h>
#include <iostream>

class ExamplePlugin : public plugify::IPluginEntry {
public:
	void OnPluginStart() override {
		std::cout << "Example Start!" << std::endl;
	}

	void OnPluginEnd() override {
		std::cout << "Example End!" << std::endl;
	}

	void MakePrint(int count, const std::string& message) {
		for (int i = 0; i < count; ++i) {
			std::cout << message << std::endl;
		}
	}
} g_examplePlugin;

EXPOSE_PLUGIN(PLUGIN_API, &g_examplePlugin)
```
{{% /tab %}}
{{% tab name="c#" %}}
```c#
using System;
using System.IO;
using Plugify;

namespace ExamplePlugin
{
	public class SamplePlugin : Plugin
	{
		void OnStart()
		{
			Console.Write($"{Name}: OnStart\n");
		}

		void OnEnd()
		{
			Console.Write($"{Name}: OnEnd\n");
		}
	}
}
```
{{% /tab %}}
{{% tab name="python" %}}
```python
from plugify.plugin import Plugin, PluginInfo

__plugin__ = PluginInfo('ExamplePlugin')

class ExamplePlugin(Plugin):
	def plugin_start(self):
		print('ExamplePlugin::plugin_start')

	def plugin_end(self):
		print('ExamplePlugin::plugin_end')
```
{{% /tab %}}
{{% tab name="go" %}}
```go
package main

import (
	"fmt"
	"plugify-plugin/plugify"
)

func init() {
	plugify.OnPluginStart(func() {
		fmt.Println("OnPluginStart")
	})

	plugify.OnPluginEnd(func() {
		fmt.Println("OnPluginEnd")
	})
}

func main() {}
```
{{% /tab %}}
{{< /tabs >}}

{{% attachments /%}}

Each plugin may require different process for compilation, it approximately look something like this:

{{< tabs >}}
{{% tab name="c++" %}}
```sh
mkdir build && cd build
cmake ..
cmake --build .
```
{{% /tab %}}
{{% tab name="c#" %}}
```sh
csc -target:library -out:ExamplePlugin.dll -reference:plugify/Plugify.dll ExamplePlugin.cs
```
{{% /tab %}}
{{% tab name="python" %}}
```sh
# Not need to build
```
{{% /tab %}}
{{% tab name="go" %}}
```sh
go build -buildmode=c-shared -o go_example_plugin.dll main.go
```
{{% /tab %}}
{{< /tabs >}}

### 3. Create the .pplugin Configuration File

Create a `.pplugin` file in the root directory of your plugin project. Use the example provided above as a template, and modify the values to suit your plugin.

### 4. Specify the Entry Point

Ensure the `entryPoint` field in your `.pplugin` file points to the main executable or script of your plugin. This is the entry point that Plugify will use to load your plugin. Each plugin's `entryPoint` is different and should be tailored to the specific language module for which it is created.

### 5. Define Dependencies

List any dependencies your plugin requires in the `dependencies` field. This ensures that Plugify loads these dependencies before your plugin.

### 6. Organize Your Plugin Directory

Place your plugin binary and its `.pplugin` file in the appropriate directory. Each plugin should be located in separate folder inside `plugins` directory.

### 7. Build and Package Your Plugin

Compile your plugin if necessary (e.g., for C++/C# plugins). Package your plugin files and the `.pplugin` file into a ZIP archive or similar format specified in the `downloadURL`.

### 8. Test Your Plugin

Before publishing your plugin, test it thoroughly to ensure it works as expected. Check for any issues or missing dependencies.

### 9. Publish Your Plugin

Upload your plugin package to a hosting service (e.g., GitHub releases) and update the `downloadURL` in your `.pplugin` file accordingly. Share your plugin with the our community!

### 10. Update Your Plugin

Maintain and update your plugin as needed. Update the `version`, `versionName`, and other relevant fields in your `.pplugin` file for each new release. Ensure the `updateURL` points to the latest `.json` file for automatic updates.

By following these steps, you can create and share your first plugin within the Plugify ecosystem. Happy coding!
