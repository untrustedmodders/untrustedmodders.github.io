---
title: Building
weight: 20
---

On this page, you will learn how to build the Plugify binaries (`plugify.so` or `plugify.dll`) on your own. This allows you to run tests or contribute to the C++ side of Plugify by applying fixes, making improvements, or exposing useful features to the broader system.

Linux
-----

To build Plugify on Linux, you need the following requirements:

* [CMake 3.14 or later](https://cmake.org/download/)
* [Git](https://git-scm.com/downloads)
* [GCC 11.4 or later](https://gcc.gnu.org/)

Once you have installed the requirements, follow these steps to build Plugify:

1. Clone the [Plugify repository](https://github.com/untrustedmodders/cs2-plugify).
2. Install CURL: `sudo apt-get install -y libcurl4-openssl-dev`.
3. Navigate to the repository's root directory.
4. Create a build directory: `mkdir build && cd build`.
5. Configure the build using CMake presets: `cmake --preset Release`.
6. Build the project: `cmake --build .`.

{{% notice note %}}
By default, CMake uses all available CPU cores to speed up the build process. You can customize this by modifying the CMake presets.
{{% /notice %}}

If the build finishes successfully, it will say something like this: `[100%] Built target plugify`.

The compiled binaries are stored in `build/Linux`.

Windows
-------

To build Plugify on Windows, you need the following requirements:

* [CMake 3.14 or later](https://cmake.org/download/)
* [Git](https://git-scm.com/downloads)
* [Visual Studio 2022 or later](https://visualstudio.microsoft.com/vs/older-downloads/)
* [Microsoft Build Tools (optional, to build directly via command line)](https://visualstudio.microsoft.com/visual-cpp-build-tools/)

Once you have installed the requirements, follow these steps to build Plugify:

1. Clone the [Plugify repository](https://github.com/your-username/plugify).
2. Navigate to the repository's root directory.
3. Open the `CMakeLists.txt` file located in the build directory.
4. Switch the build mode to `Release`.
5. Press `F7` to start the build.

If the build finishes successfully, it will say something like: `========== Build: 3 succeeded, 0 failed, 0 up-to-date, 1 skipped ==========`.

You can also use the Microsoft Build Tools to build the project directly from the command line by running `cmake --build .`.

The compiled binaries are stored in `build/Windows`.

MacOS
-----

To build Plugify on MacOS, you need the following requirements:

* [CMake 3.14 or later](https://cmake.org/download/)
* [Git](https://git-scm.com/downloads)
* [Xcode](https://developer.apple.com/xcode/)

Once you have installed the requirements, follow these steps to build Plugify:

1. Clone the [Plugify repository](https://github.com/your-username/plugify).
2. Install CURL: `brew install curl`.
3. Navigate to the repository's root directory.
4. Create a build directory: `mkdir build && cd build`.
5. Configure the build using CMake presets: `cmake --preset Release`.
6. Build the project: `cmake --build .`.

{{% notice note %}}
By default, CMake uses all available CPU cores to speed up the build process. You can customize this by modifying the CMake presets.
{{% /notice %}}

If the build finishes successfully, it will say something like this: `[100%] Built target plugify`.

The compiled binaries are stored in `build/MacOS`.

Using CMake Presets
-------------------

CMake presets provide a convenient way to manage build configurations. A typical `CMakePresets.json` file might look like this:

```json
{
  "version": 3,
  "cmakeMinimumRequired": {
    "major": 3,
    "minor": 14,
    "patch": 0
  },
  "configurePresets": [
	{
	  "name": "default",
	  "displayName": "Default Config",
	  "description": "Default build using Ninja generator",
	  "generator": "Ninja",
	  "binaryDir": "${sourceDir}/build/${hostSystemName}/${presetName}",
	  "hidden": true
	},
	{
	  "name": "Debug",
	  "displayName": "Debug",
	  "inherits": "default",
	  "cacheVariables": { "CMAKE_BUILD_TYPE": "Debug" }
	},
	{
	  "name": "Release",
	  "displayName": "Release",
	  "inherits": "default",
	  "cacheVariables": { "CMAKE_BUILD_TYPE": "RelWithDebInfo" }
	}
  ],
  "buildPresets": [
	{
	  "name": "Debug",
	  "configurePreset": "Debug"
	},
	{
	  "name": "Release",
	  "configurePreset": "Release"
	}
  ]
}
```
