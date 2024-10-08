---
title: Installation
weight: 5
---

This guide will walk you through the installation process for Plugify on your CS2 server. Plugify requires Metamod to be installed as a loader on the server. Follow the steps below to get everything set up.

## Prerequisites

1. **Install Metamod:**
   [Metamod (> 2.0)](https://www.sourcemm.net/downloads.php/?branch=master) is required for loading Plugify. Follow the Metamod installation instructions [here](/en/metamod/installation/).

## Installation Steps

1. **Download Plugify:**
   Download the latest version of MMS2-Plugify from our download page [here](https://github.com/untrustedmodders/mms2-plugify).

2. **Extract Plugify:**
   Extract the downloaded archive into your server’s game folder. For example, if your server’s game folder is located at `../my_server/game/csgo`, extract the files there.

3. **Start/Restart the Server:**
   After extracting the files, start or restart your server to apply the changes.

4. **Validate the Installation:**
   To ensure that Plugify has been installed correctly, open your server console and type `meta list`. If you are not working directly on your server, use `rcon` to access the console. The output should look something like this:

```shell
meta list
Listing 1 plugin:
[01] Plugify (1.0.0.0) by untrustedmodders
```

{{% notice note %}}
Alternatively, you can verify the installation by using the `plugify version` command.
{{% /notice %}}
