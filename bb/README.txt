================================================================================
S2SDK Russian Guides - BBCode Conversion
================================================================================

Date: 2025-12-29
Source: D:\untrustedmodders.github.io\content\ru\6.plugins\5.s2sdk\3.guides
Output: D:\untrustedmodders.github.io\tmp

================================================================================
CONVERTED FILES (11 total)
================================================================================

1.  1.console-commands.txt       (8.0 KB)  - Консольные команды
2.  2.console-variables.txt      (9.2 KB)  - Консольные переменные
3.  3.game-events.txt            (13 KB)   - Игровые события
4.  4.global-listeners.txt       (2.2 KB)  - Глобальные слушатели
5.  5.entity-schemas.txt         (26 KB)   - Схемы сущностей
6.  6.user-messages.txt          (50 KB)   - User Messages
7.  7.cs_script-integration.txt  (12 KB)   - Интеграция CS_Script
8.  8.handle-system.txt          (37 KB)   - Система хендлов
9.  9.check-transmit.txt         (36 KB)   - Check Transmit
10. 10.gamedata.txt              (58 KB)   - Система GameData
11. 11.panorama-vote.txt         (37 KB)   - Система голосования Panorama

Total size: ~287 KB

================================================================================
CONVERSION RULES APPLIED
================================================================================

Markdown Element              BBCode Equivalent
----------------              -----------------
# Header                   -> [size=24][b]Header[/b][/size]
## Header                  -> [size=20][b]Header[/b][/size]
### Header                 -> [size=16][b]Header[/b][/size]
**bold**                   -> [b]bold[/b]
*italic*                   -> [i]italic[/i]
`inline code`              -> [font=monospace]code[/font]
```code block```           -> [code=language]...[/code]
[link](url)                -> [url=url]link[/url]
::callout{}                -> [quote][b]Type:[/b] content[/quote]
::tabs{} with ::div{}      -> [spoiler=Language]code[/spoiler]
- bullet list              -> [list][*]item[/list]
1. numbered list           -> [list=1][*]item[/list]

================================================================================
NOTES
================================================================================

- YAML front matter has been removed from all files
- All code examples are preserved inside [code] blocks with language tags
- Multi-language code tabs are converted to spoiler sections
- Callout boxes are converted to quotes with bold titles
- All internal links and references are converted to BBCode URL tags
- Tables remain as plain text (BBCode has limited table support)

================================================================================
USAGE
================================================================================

These .txt files are ready to be posted on forums that support BBCode.
Simply copy the content and paste into your forum post.

For best results:
1. Use the forum's "Preview" function before posting
2. Check code blocks render correctly
3. Verify spoiler tags work as expected
4. Test links are clickable

================================================================================
CONVERSION SCRIPT
================================================================================

The conversion was performed using:
- Python script: convert_to_bbcode.py
- Located in: D:\untrustedmodders.github.io\tmp\
- Can be reused for future conversions

To reconvert files, run:
  python "D:\untrustedmodders.github.io\tmp\convert_to_bbcode.py"

================================================================================