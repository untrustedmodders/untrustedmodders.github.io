# S2SDK Russian Guides BBCode Conversion - Summary

## Task Completed Successfully

All 11 Russian S2SDK guide files have been converted from Markdown to BBCode format for forum posting.

## Files Converted

| # | Source File | Output File | Size | Topic |
|---|-------------|-------------|------|-------|
| 1 | 1.console-commands.md | 1.console-commands.txt | 8.0 KB | Console Commands |
| 2 | 2.console-variables.md | 2.console-variables.txt | 9.2 KB | Console Variables |
| 3 | 3.game-events.md | 3.game-events.txt | 13 KB | Game Events |
| 4 | 4.global-listeners.md | 4.global-listeners.txt | 2.2 KB | Global Listeners |
| 5 | 5.entity-schemas.md | 5.entity-schemas.txt | 26 KB | Entity Schemas |
| 6 | 6.user-messages.md | 6.user-messages.txt | 50 KB | User Messages |
| 7 | 7.cs_script-integration.md | 7.cs_script-integration.txt | 12 KB | CS_Script Integration |
| 8 | 8.handle-system.md | 8.handle-system.txt | 37 KB | Handle System |
| 9 | 9.check-transmit.md | 9.check-transmit.txt | 36 KB | Check Transmit |
| 10 | 10.gamedata.md | 10.gamedata.txt | 58 KB | GameData System |
| 11 | 11.panorama-vote.md | 11.panorama-vote.txt | 37 KB | Panorama Vote System |

**Total:** 11 files, ~287 KB

## Output Location

```
D:\untrustedmodders.github.io\tmp\
```

## Conversion Details

### Markdown to BBCode Mappings

| Markdown Syntax | BBCode Output |
|----------------|---------------|
| `# Header` | `[size=24][b]Header[/b][/size]` |
| `## Header` | `[size=20][b]Header[/b][/size]` |
| `### Header` | `[size=16][b]Header[/b][/size]` |
| `**bold**` | `[b]bold[/b]` |
| `*italic*` | `[i]italic[/i]` |
| `` `code` `` | `[font=monospace]code[/font]` |
| ` ```language` | `[code=language]...[/code]` |
| `[text](url)` | `[url=url]text[/url]` |
| `::callout{}` | `[quote][b]Type:[/b] content[/quote]` |
| `::tabs{} + ::div{}` | `[spoiler=Language]...[/spoiler]` |
| `- list` | `[list][*]item[/list]` |
| `1. list` | `[list=1][*]item[/list]` |

### Features

✅ YAML front matter removed
✅ Code blocks preserved with language tags
✅ Multi-language tabs converted to spoilers
✅ Callout boxes converted to quotes
✅ All links converted to BBCode URLs
✅ Lists properly formatted
✅ Inline formatting preserved
✅ Russian text encoding handled correctly

## Conversion Script

A reusable Python script was created at:
```
D:\untrustedmodders.github.io\tmp\convert_to_bbcode.py
```

To reconvert or process additional files:
```bash
python "D:\untrustedmodders.github.io\tmp\convert_to_bbcode.py"
```

## Quality Assurance

- All 11 files successfully converted without errors
- Output files verified for proper BBCode syntax
- Russian characters (Cyrillic) properly preserved
- Code examples intact and readable
- File sizes reasonable for forum posting

## Usage Instructions

1. Navigate to `D:\untrustedmodders.github.io\tmp\`
2. Open any `.txt` file
3. Copy the entire content
4. Paste into a BBCode-compatible forum
5. Use forum preview to verify formatting
6. Post when satisfied with appearance

## Additional Files Created

- `README.txt` - Detailed conversion documentation
- `CONVERSION_SUMMARY.md` - This summary document
- `convert_to_bbcode.py` - Reusable conversion script

## Notes

- Tables are not converted (limited BBCode support)
- Some complex nested structures simplified
- All essential content preserved
- Ready for immediate forum posting

---

**Conversion Date:** 2025-12-29
**Tool Used:** Custom Python script with regex-based conversion
**Status:** ✅ Complete and verified