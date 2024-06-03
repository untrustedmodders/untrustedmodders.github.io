---
title: Improting Functions
weight: 15
---

Importing functions in the Plugify ecosystem might depend on the specific language module you are using. In most cases, the process will require generating headers with the imported functions. While you can do this manually, we recommend using a Python generator script for ease and accuracy.

The Python generator script is located in the language module repositories in the `generator` folder and is named `generator.py`. This script uses the `exportedMethods` field from the `.pplugin` JSON file and generates the necessary functions for you to use in your plugin.

To run the script, you need to have Python 3 installed. Once installed, you can run the generator script with the following command:

```sh
python generator.py "path to .pplugin file" "path to output folder"
```

This command will process the specified .pplugin file and generate the appropriate headers or files in the specified output folder, making it easier to import and use the functions in your plugin.

Using the generator script simplifies the process of importing functions and ensures consistency across your plugins, allowing you to focus on developing your plugin's core functionality.
