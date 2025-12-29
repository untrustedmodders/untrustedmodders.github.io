#!/usr/bin/env python3
"""Convert Markdown S2SDK guides to BBCode format for forum posting."""

import re
import os
from pathlib import Path

def remove_yaml_frontmatter(content):
    """Remove YAML front matter from markdown."""
    return re.sub(r'^---\n.*?\n---\n', '', content, flags=re.DOTALL)

def convert_headers(content):
    """Convert markdown headers to BBCode."""
    # # Header -> [size=24][b]Header[/b][/size]
    content = re.sub(r'^# (.+)$', r'[size=24][b]\1[/b][/size]', content, flags=re.MULTILINE)
    # ## Header -> [size=20][b]Header[/b][/size]
    content = re.sub(r'^## (.+)$', r'[size=20][b]\1[/b][/size]', content, flags=re.MULTILINE)
    # ### Header -> [size=16][b]Header[/b][/size]
    content = re.sub(r'^### (.+)$', r'[size=16][b]\1[/b][/size]', content, flags=re.MULTILINE)
    return content

def convert_inline_formatting(content):
    """Convert inline markdown formatting to BBCode."""
    # **bold** -> [b]bold[/b]
    content = re.sub(r'\*\*(.+?)\*\*', r'[b]\1[/b]', content)
    # *italic* -> [i]italic[/i]
    content = re.sub(r'\*(.+?)\*', r'[i]\1[/i]', content)
    # `inline code` -> [font=monospace]code[/font]
    content = re.sub(r'`(.+?)`', r'[font=monospace]\1[/font]', content)
    return content

def convert_links(content):
    """Convert markdown links to BBCode."""
    # [text](url) -> [url=url]text[/url]
    content = re.sub(r'\[([^\]]+)\]\(([^\)]+)\)', r'[url=\2]\1[/url]', content)
    return content

def convert_code_blocks(content):
    """Convert markdown code blocks to BBCode."""
    # ```language\ncode\n``` -> [code=language]code[/code]
    def replace_code_block(match):
        lang = match.group(1) if match.group(1) else ''
        code = match.group(2)
        if lang:
            return f'[code={lang}]{code}[/code]'
        else:
            return f'[code]{code}[/code]'

    content = re.sub(r'```(\w*)\n(.*?)\n```', replace_code_block, content, flags=re.DOTALL)
    return content

def convert_callouts(content):
    """Convert ::callout blocks to BBCode quotes."""
    # ::callout{...} content :: -> [quote][b]Info:[/b] content[/quote]
    def replace_callout(match):
        callout_content = match.group(1).strip()
        # Try to extract type from attributes
        type_match = re.search(r'type="(\w+)"', callout_content)
        color_match = re.search(r'color="(\w+)"', callout_content)
        icon_match = re.search(r'icon="([^"]+)"', callout_content)

        # Extract actual content (after the attributes line)
        lines = callout_content.split('\n')
        if len(lines) > 1:
            content_text = '\n'.join(lines[1:])
        else:
            content_text = callout_content

        # Determine callout title
        if type_match:
            title = type_match.group(1).capitalize()
        elif color_match:
            title = color_match.group(1).capitalize()
        else:
            title = "Info"

        return f'[quote][b]{title}:[/b] {content_text}[/quote]'

    content = re.sub(r'::callout\{[^\}]*\}\n(.*?)::', replace_callout, content, flags=re.DOTALL)
    return content

def convert_tabs(content):
    """Convert ::tabs blocks to spoilers."""
    # ::tabs{...} ... :: -> flatten with [spoiler=Language]...[/spoiler]
    def replace_tabs(match):
        tabs_content = match.group(1)
        result = []

        # Find all ::div blocks within tabs
        div_pattern = r'::div\{label="([^"]+)"[^\}]*\}\s*\n(.*?)(?=\n\s*::div|\n\s*::$)'
        divs = re.finditer(div_pattern, tabs_content, flags=re.DOTALL)

        for div_match in divs:
            label = div_match.group(1)
            div_content = div_match.group(2).strip()
            # Remove the closing :: markers
            div_content = re.sub(r'\s*::$', '', div_content)
            result.append(f'[spoiler={label}]\n{div_content}\n[/spoiler]')

        return '\n\n'.join(result)

    # Match tabs blocks more accurately
    content = re.sub(r'::tabs(?:\{[^\}]*\})?\s*\n(.*?)(?=\n[^\s:]|\Z)', replace_tabs, content, flags=re.DOTALL)
    return content

def convert_lists(content):
    """Convert markdown lists to BBCode."""
    lines = content.split('\n')
    result = []
    in_list = False
    list_type = None  # 'ul' or 'ol'

    i = 0
    while i < len(lines):
        line = lines[i]

        # Check for bullet list (-)
        if re.match(r'^- ', line):
            if not in_list or list_type != 'ul':
                if in_list:
                    result.append('[/list]')
                result.append('[list]')
                in_list = True
                list_type = 'ul'
            item = re.sub(r'^- ', '', line)
            result.append(f'[*]{item}')
        # Check for numbered list (1. 2. etc)
        elif re.match(r'^\d+\. ', line):
            if not in_list or list_type != 'ol':
                if in_list:
                    result.append('[/list]')
                result.append('[list=1]')
                in_list = True
                list_type = 'ol'
            item = re.sub(r'^\d+\. ', '', line)
            result.append(f'[*]{item}')
        else:
            if in_list:
                result.append('[/list]')
                in_list = False
                list_type = None
            result.append(line)

        i += 1

    if in_list:
        result.append('[/list]')

    return '\n'.join(result)

def convert_markdown_to_bbcode(content):
    """Convert markdown content to BBCode."""
    # Remove YAML front matter
    content = remove_yaml_frontmatter(content)

    # Convert tabs before other conversions
    content = convert_tabs(content)

    # Convert callouts
    content = convert_callouts(content)

    # Convert code blocks (before inline code)
    content = convert_code_blocks(content)

    # Convert headers
    content = convert_headers(content)

    # Convert links
    content = convert_links(content)

    # Convert inline formatting
    content = convert_inline_formatting(content)

    # Convert lists (do this last to avoid interfering with other conversions)
    content = convert_lists(content)

    return content

def main():
    # Define paths
    source_dir = Path(r'D:\untrustedmodders.github.io\content\ru\6.plugins\5.s2sdk\3.guides')
    output_dir = Path(r'D:\untrustedmodders.github.io\tmp')

    # Create output directory if it doesn't exist
    output_dir.mkdir(parents=True, exist_ok=True)

    # List of files to convert
    files_to_convert = [
        '1.console-commands.md',
        '2.console-variables.md',
        '3.game-events.md',
        '4.global-listeners.md',
        '5.entity-schemas.md',
        '6.user-messages.md',
        '7.cs_script-integration.md',
        '8.handle-system.md',
        '9.check-transmit.md',
        '10.gamedata.md',
        '11.panorama-vote.md'
    ]

    print("Starting conversion of S2SDK guides to BBCode...")

    for filename in files_to_convert:
        source_file = source_dir / filename

        if not source_file.exists():
            print(f"WARNING: File not found: {source_file}")
            continue

        # Read source file
        with open(source_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Convert to BBCode
        bbcode_content = convert_markdown_to_bbcode(content)

        # Write output file
        output_file = output_dir / filename.replace('.md', '.txt')
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(bbcode_content)

        print(f"[OK] Converted: {filename} -> {output_file.name}")

    print(f"\n[DONE] Conversion complete! Files saved to: {output_dir}")

if __name__ == '__main__':
    main()