# AGENTS.md

> Rules for AI agents working in this repo.

## What this repo is

Personal documentation site for **humanlup**. Built with Mintlify. MDX for content, `docs.json` for config, OpenAPI for API docs.

## Rules

**Do:**
- Read files before editing them
- Use `.mdx` for all content pages
- Include `title`, `description`, and `"og:image"` in frontmatter
- Add new pages to `docs.json` navigation
- Use root-relative links: `/essentials/markdown` not `../markdown`
- Write in first person, casual tone. No em dashes. Human and conversational.
- Use conventional commits: `docs:`, `fix:`, `feat:`, `refactor:`

**Don't:**
- Create `.md` content files (only `.mdx` renders as pages)
- Use relative links (slower performance)
- Forget to update `docs.json` when adding pages
- Commit secrets, tokens, or `.env` files
- Force push to main

## Structure

```
/
├── docs.json              # Navigation, theme, branding, metadata
├── claude-code/           # AI coding guides (5 pages, written for non-devs)
├── essentials/            # Core reference (markdown, code, images, settings, nav, snippets)
├── advanced/              # Deeper topics (components, SEO, versioning)
├── api-reference/         # API docs + OpenAPI spec
│   └── endpoint/          # get, create, delete, webhook
├── snippets/              # Reusable content (imported as components, not standalone)
├── images/                # Hero images, screenshots
└── logo/                  # Light + dark SVG logos
```

## Navigation

```
Toolkit tab:        Start Here | Essentials | Going Deeper
Claude Code tab:    Getting Started | Using It Well
API Reference tab:  Overview | Endpoints
```

## Page template

```mdx
---
title: 'Page Title'
description: 'What this page covers (50-160 chars)'
icon: 'font-awesome-icon-name'
"og:image": "/images/hero-light.png"
---

Content here. Use Mintlify components where they help.
```

## Components

`<Note>`, `<Tip>`, `<Info>`, `<Warning>`, `<Card>`, `<CardGroup>`, `<Accordion>`, `<AccordionGroup>`, `<CodeGroup>`, `<Frame>`, `<Steps>`, `<Step>`

## Tone

Write like you're explaining something to yourself in six months. First person, casual, direct. Human and conversational. Skip jargon when a simpler word works.
