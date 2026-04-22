# CLAUDE.md

## What this is

**humanlup docs** is a personal documentation site built with Mintlify. MDX for content, `docs.json` for config, OpenAPI for API docs.

## Voice and tone

First person, casual, human. Write like you're explaining something to yourself in six months. No corporate filler. No em dashes. If something is a placeholder, say so.

IMPORTANT: All content pages use `.mdx`, never `.md`. Every new page MUST be added to `docs.json` navigation or it won't appear.

## Project structure

```
/
├── docs.json                # CRITICAL: nav, theme, branding, metadata
├── index.mdx                # Homepage
├── quickstart.mdx           # 60-second setup
├── development.mdx          # Dev environment
├── claude-code/             # AI coding tool guides (written for non-devs)
│   ├── overview.mdx         # What Claude Code is, install, setup
│   ├── agents.mdx           # Agent loop, subagents, Plan Mode, SDK
│   ├── skills.mdx           # Slash commands, custom skills, MCP, hooks
│   ├── workflows.mdx        # Daily patterns, debugging, git, context mgmt
│   └── tips.mdx             # Gotchas, errors, troubleshooting, security
├── essentials/              # Core reference (markdown, code, images, settings, nav, snippets)
├── advanced/                # Deeper topics (components, SEO, versioning)
├── api-reference/           # API docs + openapi.json
│   └── endpoint/            # get, create, delete, webhook
├── snippets/                # Reusable content (not standalone pages)
│   ├── snippet-intro.mdx
│   └── prerequisites.mdx
├── images/                  # hero-light.png, hero-dark.png, checks-passed.png
└── logo/                    # light.svg, dark.svg
```

## Navigation (docs.json)

```
Toolkit tab:        Start Here | Essentials | Going Deeper
Claude Code tab:    Getting Started | Using It Well
API Reference tab:  Overview | Endpoints
```

Page paths in docs.json exclude the `.mdx` extension. Order in array = display order.

## Current theme

```json
{ "primary": "#06B6D4", "light": "#22D3EE", "dark": "#0891B2" }
```

## Frontmatter template

```mdx
---
title: 'Page Title'
description: 'Brief description for SEO (50-160 chars)'
icon: 'font-awesome-icon-name'
"og:image": "/images/hero-light.png"
---
```

## Components to use

`<Note>`, `<Tip>`, `<Info>`, `<Warning>`, `<Card>`, `<CardGroup cols={2}>`, `<Accordion>`, `<AccordionGroup>`, `<CodeGroup>`, `<Frame>`, `<Steps>`, `<Step>`

Use root-relative links: `/essentials/markdown` not `../markdown`

## Build and deploy

```bash
npm i -g mintlify        # install
mintlify dev             # local server on :3000
mintlify broken-links    # validate links
```

Push to `main` to deploy. Mintlify GitHub app handles it automatically.

## Git conventions

- Conventional commits: `docs:`, `fix:`, `feat:`, `refactor:`, `style:`
- Feature branches: `claude/` prefix
- Never force push to main
- IMPORTANT: Do not commit `.env` files or secrets

## Key rules

- IMPORTANT: Always read files before editing
- Prefer editing existing files over creating new ones
- Include `og:image` in frontmatter for pages likely to be shared
- Use Mintlify components (Cards, Accordions, Steps) for visual hierarchy
- Snippets go in `/snippets/` and are imported as components
- Keep this file under 100 lines. Use skills for domain-specific knowledge.
