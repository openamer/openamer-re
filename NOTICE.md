# NOTICE — attribution and provenance

OpenAmer RE (`openamer-re`) is a modified fork of **REA** by morluto.

- Upstream project: https://github.com/morluto/rea
- Upstream package: `rea-agents` (npm)
- Upstream license: MIT
- Fork base: `rea-agents` v6.8.0
- Fork maintained by: OpenAmer (https://github.com/openamer)

## What was changed in this fork

1. **Product identity** (`src/identity.ts`): display name, CLI binary (`oare`),
   MCP server key (`openamer-re`), config file name (`openamer-re.json`) and
   bundled skill name (`openamer-reverse-engineer`).
2. **Packaging metadata** (`package.json`, `server.json`): package name,
   description, repository and registry identifiers.
3. **Bundled agent skill**: renamed and re-scoped to the OpenAmer workflow.
4. **OpenAmer integration** (added): MCP registration profile with bounded tool
   families, an OpenAmer skill wrapper, and an Evidence→episodic-memory bridge
   so analysis findings enter OpenAmer's long-term memory.

## What was NOT changed

The analysis engines, provider adapters, evidence contracts, tool contracts and
their semantics are upstream code, unmodified except where the identity above
is referenced. Capability parity with upstream REA v6.8.0 is therefore structural,
not re-implemented.

## MIT license obligation

The upstream MIT copyright notice and permission notice are retained verbatim in
`LICENSE`. `licenses/` and `THIRD_PARTY_NOTICES.md` are retained unmodified.
