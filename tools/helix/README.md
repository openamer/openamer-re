# helix — OpenAmer's own JavaScript surface scanner

`helix_scan.py` is the second engine in this repository, and the first one written
for OpenAmer rather than inherited from upstream. It has no dependencies beyond
Python's standard library and no external decompiler, which is the point: on a
machine with no Ghidra, Hopper, IDA, JADX or Kuna installed, the upstream
providers report `provider_unavailable` and nothing can be inspected at all.

A JavaScript or Electron surface is still readable there, because reading it
needs no engine — only the archive format and the bundle.

## What it reports

| Fact                        | How it is derived                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| JavaScript modules          | `.js`, `.mjs`, `.cjs` members, packed in the ASAR payload or stored beside it in `<archive>.unpacked/` |
| IPC channels                | literal first arguments of `ipcMain.handle/on` and `ipcRenderer.invoke/send/on`                        |
| Paired channels             | channels that appear on both the main and the renderer side                                            |
| One-sided channels          | channels with only one side present — reported, never silently dropped                                 |
| Unresolved call sites       | calls whose channel is computed at runtime; the blind spot is counted, not hidden                      |
| contextBridge surface       | `exposeInMainWorld` names and their member keys, reported **per nesting depth**                        |
| BrowserWindow constructions | `new …BrowserWindow(`                                                                                  |

## Why a depth histogram instead of one member count

Asking "how many members does this bridge expose" has no single answer. On the
OpenAmer desktop archive the same literal yields 83 keys at depth 1, 142 up to
depth 2 and 171 in total. Two tools can both be correct and disagree by 40%,
because they stop at different depths. `helix_scan` therefore prints the
distribution and lets the reader compare like with like.

## Usage

```bash
python tools/helix/helix_scan.py path/to/app.asar
python tools/helix/helix_scan.py path/to/dist --json
OPENAMER_ASAR=path/to/app.asar python -m pytest tools/helix/test_helix_scan.py -q
```

On the OpenAmer desktop archive this reports 22 modules, 122 literal channels,
108 of them paired on both sides, and a bridge depth histogram of
`{1: 83, 2: 59, 3: 29}`.

## What it deliberately does not do

- it never resolves a computed channel expression, so a name built at runtime is
  invisible and is counted under `unresolved_call_sites`
- it does not evaluate control flow: a channel in unreachable code still counts
- it does not follow a spread or a getter when enumerating bridge members
- it does not decompile native code, read .NET metadata, APK, firmware, GGUF,
  SQLite, WASM or EVM bytecode

For those, use the upstream providers. This tool covers the path OpenAmer walks
daily and states its blind spots in every report.
