# AGENTS.md - AI Agent Contribution Guide

> **For AI assistants and automated agents working on this repository.**
> This document provides the context, rules, and patterns needed to make safe, consistent contributions.

## Repository Identity

- **Project**: Lupo Studios Documentation
- **Framework**: Mintlify (MDX-based documentation platform)
- **Config Format**: `docs.json` (not the deprecated `mint.json`)
- **Content Format**: MDX (Markdown + JSX/React components)
- **API Spec**: OpenAPI 3.1 at `/api-reference/openapi.json`

## Ground Rules

### Do

- **Read before writing.** Always read a file before editing it. Understand the existing patterns.
- **Use MDX, not MD.** All content pages use the `.mdx` extension.
- **Include frontmatter.** Every page needs `title` and `description`. Add `icon` for pages in the essentials or advanced groups.
- **Update navigation.** When adding a new page, add it to `docs.json` navigation or it won't appear in the sidebar.
- **Use root-relative links.** Write `/essentials/markdown` not `../markdown`. Root-relative links are faster and more reliable.
- **Use Mintlify components.** Use `<Note>`, `<Tip>`, `<Warning>`, `<Info>`, `<Card>`, `<CardGroup>`, `<Accordion>`, `<CodeGroup>`, `<Frame>`, `<ResponseField>`, `<Expandable>`, and `<Latex>` where appropriate.
- **Test locally.** Run `mintlify dev` to preview changes and `mintlify broken-links` to validate links.
- **Write descriptive commit messages.** Follow the format: `docs:`, `fix:`, `feat:`, `refactor:`, `style:`.

### Don't

- **Don't create standalone MD files.** Only `.mdx` files are rendered as pages.
- **Don't use relative links.** Avoid `../page` style links. Always use root-relative paths.
- **Don't forget `docs.json`.** Pages not in navigation won't show in the sidebar (though they're still searchable).
- **Don't use the deprecated `mint.json`.** This project uses the modern `docs.json` format.
- **Don't commit secrets.** No API keys, tokens, or credentials in any file.
- **Don't force push to main.** Work on feature branches prefixed with `claude/`.

## File Organization

```
/                        # Root - config files and top-level pages
├── essentials/          # Core how-to guides (markdown, code, images, settings, nav, snippets)
├── advanced/            # Advanced topics (components, SEO, versioning)
├── api-reference/       # API docs (intro, auth, OpenAPI spec, endpoint pages)
│   └── endpoint/        # Individual endpoint MDX files
├── snippets/            # Reusable content fragments (not rendered as pages)
├── images/              # Image assets (PNG, JPG)
├── logo/                # Brand logos (SVG, light + dark variants)
└── favicon.svg          # Site favicon
```

## Page Template

When creating a new documentation page:

```mdx
---
title: 'Page Title'
description: 'A clear description for SEO and previews (50-160 characters)'
icon: 'font-awesome-icon-name'
---

## First Section

Content here using standard Markdown and Mintlify components.

<Tip>
  Helpful tip for the reader.
</Tip>

## Second Section

More content with code examples:

```python
def example():
    return "Hello"
```
```

## Navigation Structure

The navigation is defined in `docs.json` under `navigation.tabs`:

```
Guides Tab
├── Get Started (index, quickstart, development)
├── Essentials (markdown, code, images, settings, navigation, reusable-snippets)
└── Advanced (components, seo-metadata, versioning)

API Reference Tab
├── API Documentation (introduction, authentication)
└── Endpoint Examples (get, create, delete, webhook)
```

To add a page, create the `.mdx` file and add its path (without extension) to the appropriate `pages` array in `docs.json`.

## API Documentation Pattern

For OpenAPI-based endpoint pages:

```mdx
---
title: 'Endpoint Title'
openapi: 'METHOD /path'
description: 'What this endpoint does'
icon: 'icon-name'
---

<Info>
  Contextual information about when and why to use this endpoint.
</Info>

## Usage Notes

- Important behavioral details
- Error conditions
- Rate limiting notes
```

## Component Quick Reference

| Component | Use For |
|-----------|---------|
| `<Note>` | General supplementary information |
| `<Tip>` | Helpful suggestions and best practices |
| `<Info>` | Important contextual information |
| `<Warning>` | Cautionary messages about potential issues |
| `<Card>` | Clickable navigation element with icon |
| `<CardGroup cols={N}>` | Responsive grid of cards |
| `<Accordion>` | Collapsible content section |
| `<AccordionGroup>` | Multiple collapsible sections |
| `<CodeGroup>` | Tabbed code blocks for multiple languages |
| `<Frame>` | Styled image wrapper with optional caption |
| `<ResponseField>` | API response property documentation |
| `<Expandable>` | Nested expandable content within ResponseField |
| `<Latex>` | Mathematical formula rendering |

## Git Workflow

1. **Branch**: Create from main with `claude/` prefix
2. **Develop**: Make changes on the feature branch
3. **Test**: Run `mintlify dev` and `mintlify broken-links`
4. **Commit**: Use conventional commit messages
5. **Push**: `git push -u origin <branch-name>`
6. **PR**: Open a pull request against main

## Quality Checklist

Before committing, verify:

- [ ] All new pages have complete frontmatter (`title`, `description`)
- [ ] All new pages are added to `docs.json` navigation
- [ ] All internal links use root-relative paths
- [ ] No broken links (run `mintlify broken-links`)
- [ ] Code examples have language identifiers for syntax highlighting
- [ ] Images have `alt` attributes for accessibility
- [ ] No secrets or credentials in any file
- [ ] Commit message follows conventional format

---

*This guide is maintained by Lupo Studios. For questions about the documentation framework, see [Mintlify Docs](https://mintlify.com/docs).*
