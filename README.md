<div align="center">

# humanlup docs

**Personal knowledge base for AI agent tooling, dev workflows, and the stuff I actually use to ship solo.**

[![Built with Mintlify](https://img.shields.io/badge/built%20with-Mintlify-06B6D4?style=flat-square)](https://mintlify.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![Pages](https://img.shields.io/badge/pages-25-06B6D4?style=flat-square)](#site-structure)

</div>

---

This is my workshop, not a product. A single place to keep track of the tools, configs, patterns, and workflows I rely on day to day as a solo builder working with AI agents.

If you're here, you either are me, or you found something useful. Either way, welcome.

## Quick start

```bash
npm i -g mintlify
git clone https://github.com/localwolfpackai/docs.git
cd docs
mintlify dev
```

Open [localhost:3000](http://localhost:3000). That's it.

## Site structure

The site has three main tabs and 25 pages across 6 sections.

```
Toolkit                 Claude Code              API Reference
  Start Here              Getting Started          Overview
    index                   overview                 introduction
    quickstart              agents                   authentication
    development                                    Endpoints
  Essentials              Using It Well              get
    markdown                skills                   create
    code                    workflows                delete
    images                  tips                     webhook
    settings
    navigation
    reusable-snippets
  Going Deeper
    components
    seo-metadata
    versioning
```

## What's in here

| Section | What it covers |
|---------|---------------|
| **Start Here** | Homepage, 60-second setup, local dev environment |
| **Claude Code** | What it is, how agents work, skills and slash commands, daily workflows, tips and troubleshooting. Written for non-devs. |
| **Essentials** | Markdown syntax, code blocks, images, site config, navigation, reusable snippets |
| **Going Deeper** | MDX components, SEO metadata, multi-version docs |
| **API Reference** | OpenAPI 3.1 spec, bearer auth, endpoint docs (auto-generated) |
| **Snippets** | Reusable content blocks shared across pages |

## Repo layout

```
/
├── docs.json                # Navigation, theme, branding. The one config file.
├── CLAUDE.md                # AI assistant context (read every session)
├── AGENTS.md                # Rules for AI agents working in this repo
├── .gitignore               # node_modules, .mintlify, OS files, .env
│
├── claude-code/             # AI coding tool guides (5 pages, ~5.7k words)
├── essentials/              # Core reference (6 pages)
├── advanced/                # Deeper topics (3 pages)
├── api-reference/           # API docs + OpenAPI spec
│   └── endpoint/            # Individual endpoint pages
├── snippets/                # Reusable content (not standalone pages)
├── images/                  # Hero images, screenshots
├── logo/                    # Light + dark SVGs
│
├── index.mdx                # Homepage
├── quickstart.mdx           # Setup guide
├── development.mdx          # Dev environment
├── repo-map.html            # Visual repo dashboard (standalone, open in browser)
└── favicon.svg
```

## How it works

Every page is an `.mdx` file. The sidebar, tabs, colors, and everything else are controlled by `docs.json`. Push to `main` and Mintlify deploys automatically via GitHub app.

## Stack

| Tool | Role |
|------|------|
| [Mintlify](https://mintlify.com) | Docs framework, hosting, search, theming |
| [MDX](https://mdxjs.com) | Markdown with React components |
| [OpenAPI 3.1](https://www.openapis.org) | Auto-generated API documentation |
| [Claude Code](https://code.claude.com) | AI coding agent |
| [skills.sh](https://skills.sh) | Agent skill packages |

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 3000 in use | Auto-picks next port, or `mintlify dev --port 3333` |
| Sharp module error (macOS) | Uninstall, upgrade to Node 18+, reinstall |
| Random weirdness | Delete `~/.mintlify` and try again |
| Page 404 | Check that `docs.json` navigation includes the page path |
| Stale local preview | Run `npm i -g mintlify@latest` to update the CLI |

## Contributing

This is a personal repo. If you want to suggest a fix, open an issue. PRs from strangers are unlikely to be merged unless they fix something clearly broken.

---

Built by [@localwolfpackai](https://github.com/localwolfpackai)
