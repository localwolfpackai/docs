<p align="center">
  <img src="https://img.shields.io/badge/Lupo_Studios-Documentation-6D28D9?style=for-the-badge" alt="Lupo Studios" />
  <img src="https://img.shields.io/badge/Powered_by-Mintlify-07C983?style=for-the-badge" alt="Mintlify" />
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="MIT License" />
</p>

<h1 align="center">
  Lupo Studios Documentation
</h1>

<p align="center">
  <strong>Production-grade documentation built with Mintlify</strong><br/>
  Modern, fast, and developer-friendly docs with interactive API references, MDX components, and automatic deployment.
</p>

<p align="center">
  <a href="#quickstart">Quickstart</a> &bull;
  <a href="#project-structure">Structure</a> &bull;
  <a href="#development">Development</a> &bull;
  <a href="#deployment">Deployment</a> &bull;
  <a href="#contributing">Contributing</a>
</p>

---

## Quickstart

**Prerequisites:** Node.js v19+ installed on your machine.

```bash
# 1. Install the Mintlify CLI
npm i -g mintlify

# 2. Clone this repository
git clone https://github.com/localwolfpackai/docs.git
cd docs

# 3. Start the development server
mintlify dev
```

Open [http://localhost:3000](http://localhost:3000) to see your docs site.

## Project Structure

```
docs/
├── docs.json                    # Site configuration (navigation, theme, branding)
├── index.mdx                    # Homepage
├── quickstart.mdx               # Getting started guide
├── development.mdx              # Local development setup
│
├── essentials/                  # Core documentation guides
│   ├── markdown.mdx             # Markdown syntax reference
│   ├── code.mdx                 # Code block examples
│   ├── images.mdx               # Image and embed guide
│   ├── settings.mdx             # Configuration reference
│   ├── navigation.mdx           # Navigation setup
│   └── reusable-snippets.mdx    # Snippet reuse patterns
│
├── advanced/                    # Advanced topics
│   ├── components.mdx           # Interactive MDX components
│   ├── seo-metadata.mdx         # SEO optimization guide
│   └── versioning.mdx           # Multi-version docs
│
├── api-reference/               # API documentation
│   ├── introduction.mdx         # API overview
│   ├── authentication.mdx       # Auth guide
│   ├── openapi.json             # OpenAPI 3.1 specification
│   └── endpoint/                # Individual endpoint docs
│       ├── get.mdx
│       ├── create.mdx
│       ├── delete.mdx
│       └── webhook.mdx
│
├── snippets/                    # Reusable content fragments
│   └── snippet-intro.mdx
│
├── images/                      # Image assets
├── logo/                        # Brand logos (light + dark)
└── favicon.svg                  # Site favicon
```

## Development

### Local Preview

```bash
# Start dev server (default port 3000)
mintlify dev

# Use a custom port
mintlify dev --port 3333
```

### Validate Links

```bash
mintlify broken-links
```

### Update CLI

```bash
npm i -g mintlify@latest
```

### Key Files

| File | Purpose |
|------|---------|
| `docs.json` | Navigation structure, theme colors, branding, and site metadata |
| `*.mdx` | Documentation pages written in Markdown + React components |
| `openapi.json` | OpenAPI 3.1 specification for auto-generated API docs |

## Configuration

All site configuration lives in `docs.json`. Key sections:

- **`name`** - Site title displayed in the browser tab and header
- **`colors`** - Brand colors (primary, light, dark variants)
- **`navigation`** - Tab and page structure for the sidebar
- **`logo`** - Light and dark mode logo paths
- **`footer.socials`** - Social media links in the footer
- **`feedback`** - Enable suggest-edit and raise-issue buttons

See the [Global Settings](essentials/settings) page for the full configuration reference.

## Deployment

This project uses the **Mintlify GitHub App** for automatic deployment:

1. Install the Mintlify GitHub app from the [dashboard](https://dashboard.mintlify.com)
2. Push changes to the default branch
3. Deployment triggers automatically
4. Verify success by checking the commit status

Manual deployment is also available through the Mintlify dashboard.

### Vercel Compatibility

This documentation is designed to be deployment-ready. The `docs.json` configuration and MDX content are fully compatible with Mintlify's hosting infrastructure, which can be connected through Vercel for custom domain management.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| [Mintlify](https://mintlify.com) | Documentation framework and hosting |
| [MDX](https://mdxjs.com) | Markdown with React component support |
| [OpenAPI 3.1](https://www.openapis.org) | API specification and auto-generated docs |
| [Font Awesome](https://fontawesome.com) | Icon library for navigation and cards |

## Contributing

1. Create a feature branch from `main`
2. Make your changes in MDX files
3. Update `docs.json` navigation if adding new pages
4. Run `mintlify dev` to preview locally
5. Run `mintlify broken-links` to validate
6. Push and open a pull request

### Commit Convention

```
docs: Add new authentication guide
fix: Correct broken link in quickstart
feat: Add webhook documentation
refactor: Reorganize essentials section
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Mintlify auto-selects the next available port, or use `--port` flag |
| Sharp module error on darwin-arm64 | Remove mintlify (`npm remove -g mintlify`), upgrade to Node v19+, reinstall |
| Unknown errors | Delete `~/.mintlify` folder, then run `mintlify dev` again |
| Page shows 404 | Verify the page is listed in `docs.json` navigation |

---

<p align="center">
  <strong>Built by <a href="https://github.com/localwolfpackai">Lupo Studios</a></strong><br/>
  <sub>Crafting documentation that developers actually want to read.</sub>
</p>
