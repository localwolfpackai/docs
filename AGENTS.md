# AGENTS.md

> Instructions for AI agents working in this repo.

## What this repo is

Personal documentation site for **humanlup**. Built with Mintlify. Uses MDX for content, `docs.json` for config, OpenAPI for API docs.

## Rules

**Do:**
- Read files before editing them
- Use `.mdx` for all content pages
- Include `title` and `description` in frontmatter
- Add new pages to `docs.json` navigation
- Use root-relative links: `/essentials/markdown` not `../markdown`
- Write in first person, casual tone — this is a personal site
- Use conventional commits: `docs:`, `fix:`, `feat:`

**Don't:**
- Create `.md` files (only `.mdx` renders as pages)
- Use relative links
- Forget to update `docs.json` when adding pages
- Commit secrets or tokens
- Force push to main

## File structure

```
/                      # Root pages + config
├── essentials/        # Core reference (markdown, code, images, settings, nav, snippets)
├── advanced/          # Deeper topics (components, SEO, versioning)
├── api-reference/     # API docs + OpenAPI spec
│   └── endpoint/      # Endpoint MDX files
├── snippets/          # Reusable content (not rendered as standalone pages)
├── images/            # Image assets
├── logo/              # Light + dark SVG logos
└── favicon.svg
```

## Page template

```mdx
---
title: 'Page Title'
description: 'What this page covers (50-160 chars)'
icon: 'font-awesome-icon-name'
---

Content here. Use Mintlify components where they help.
```

## Navigation

```
Toolkit tab
├── Start Here (index, quickstart, development)
├── Essentials (markdown, code, images, settings, navigation, reusable-snippets)
└── Going Deeper (components, seo-metadata, versioning)

API Reference tab
├── Overview (introduction, authentication)
└── Endpoints (get, create, delete, webhook)
```

## Available components

`<Note>`, `<Tip>`, `<Info>`, `<Warning>`, `<Card>`, `<CardGroup>`, `<Accordion>`, `<AccordionGroup>`, `<CodeGroup>`, `<Frame>`, `<ResponseField>`, `<Expandable>`, `<Latex>`

## Tone

Write like you're explaining something to yourself in six months. First person, casual, direct. Skip corporate filler. If something is a placeholder or you haven't set it up yet, just say so.
