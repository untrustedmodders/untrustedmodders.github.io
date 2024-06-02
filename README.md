# Hugo Website Installation and Server Setup Guide

This guide will walk you through the process of installing Hugo, a popular open-source static site generator, and running a local server to preview your website. Follow these steps to get your Hugo site up and running.

## Prerequisites

- **Git**: Ensure you have Git installed on your system. You can download it from git-scm.com.
- **Go (optional)**: Hugo is written in Go, but you don't need to install Go separately as Hugo is distributed as a standalone binary.

## Installation

### Step 1: Download Hugo

#### On Windows

1. Download: Visit the Hugo releases page and download the latest release for Windows (usually a `.zip` file).
2. Extract: Extract the downloaded `.zip` file to a directory of your choice.
3. Add to PATH: Add the Hugo binary to your system's PATH environment variable.
   - Open the Start Search, type in “env”, and select “Edit the system environment variables”.
   - In the System Properties window, click on the “Environment Variables” button.
   - In the Environment Variables window, find the Path variable in the “System variables” section, and click “Edit”.
   - Click “New” and add the directory where you extracted the Hugo binary.
   - Click OK on all windows to close them.

#### On macOS

1. Homebrew: If you have Homebrew installed, you can install Hugo with the following command:
   brew install hugo

2. Download: Alternatively, you can download the latest release from the Hugo releases page and follow similar steps as for Windows to extract and add to PATH.

#### On Linux

1. Snap: The easiest way to install Hugo on most Linux distributions is using Snap:
   sudo snap install hugo --channel=extended

2. Download: Alternatively, download the latest release from the Hugo releases page and extract the binary to `/usr/local/bin` or a directory of your choice, ensuring it’s in your PATH.

### Step 2: Verify Installation

Verify that Hugo is installed correctly by opening a terminal or command prompt and running:
hugo version
You should see output displaying the version of Hugo you installed.

## Running the Server

1. Start the Hugo server to preview your site locally:
   hugo server

2. Open your web browser and go to `http://localhost:1313` to view your site.

The server will automatically reload whenever you make changes to the content or configuration.

## Deployment

For deployment, follow the specific instructions for your hosting provider. Hugo can generate static files for deployment using:
   hugo
This command will create a `public` directory with your site's static files, which you can upload to your web host.

## Conclusion

You now have a Hugo site up and running locally. Explore Hugo’s documentation for more advanced features and customization options. Happy building!
