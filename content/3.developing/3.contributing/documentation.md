---
title: "Documentation"
date: 2024-06-01
---

There are several areas in Plugify where you can contribute, and we appreciate every contribution! To contribute to Plugify, please use [GitHub's pull request functionality](https://github.com/your-username/plugify/pulls). You can read more about pull requests on the [GitHub help page](https://help.github.com/articles/using-pull-requests/).

When creating a pull request, please always provide a reason for the changes you made. We will then review, discuss, and merge or close it.

If you successfully contribute to Plugify, we will gladly add you to our [credits page](/getting-started/credits) (if you want).

## Contributing to the Source Code

If you want to contribute to the source code, you can simply create a pull request. But before creating a new pull request, please consider these two points:

1. Test the changes you have made.
2. Try to roughly meet our coding convention. We are recommeding use our [Clang-Format](https://clang.llvm.org/docs/ClangFormat.html) and [Clang-Tidy](https://clang.llvm.org/extra/clang-tidy/) configs to automatically adjust style.

## Contributing to the Wiki

Contributing to this wiki will also be done via pull requests. We are using [Hugo](https://gohugo.io/) to create the wiki. Therefore, you can find markdown files in Plugify's [documentation repository](https://github.com/untrustedmodders/plugify-website/tree/main/content). Markdown files in that directory are usually simple wiki pages like this one.

The source code is documented using Doxygen. Doxygen configuration files are located in the `docs` directory. The documentation is mostly auto-generated, so these files only contain a few directives. For example:

```c++
/**
 * @file
 * @brief Brief description of the file.
 */

/** 
 * @brief Brief description of the function.
 *
 * Detailed description of the function.
 */
void exampleFunction();
```

The Doxygen directives tell the tool to parse the source code and look for Doxygen comments in the doc strings of the C++ objects (e.g., functions and classes). However, in some cases, you have to manually document specific things. In that case, you can simply extend or replace the Doxygen configuration file for the module you want to edit.

Before creating a pull request, you should also test if the HTML output of your change is correct and looks good. To do so, you can build an offline copy of the wiki. Building an offline copy is very simple.
```sh
cd build
cmake .. -DPLUGIFY_BUILD_DOCS=ON
cmake --build . --target docs
```
The API reference is created in HTML format in the build/docs/html directory. To navigate it with your favorite browser:
```sh
cd build
your_favorite_browser docs/html/index.html
```

If we have merged your pull request, our CI/CD pipeline will be triggered and a new build will be created. As soon as the new build has been finished, it is used to update the wiki that gets published automatically. The whole process usually takes 10-15 minutes.

{{% notice warning %}}
If you have made a change to the source code documentation directly in the source code, you have to regenerate the documentation using Doxygen.
{{% /notice %}}

{{% notice note %}}
Always regenerating the documentation and typing the long build command can get very annoying. But luckily, you can create aliases in your shell configuration file (e.g., .bashrc or .zshrc). Just add alias docbuild='cd docs && doxygen Doxyfile'. Then you only need to enter docbuild in your terminal to build the offline documentation.
{{% /notice %}}