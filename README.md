
# ![HL](https://img.shields.io/badge/DOCS-HumanLup-000000?style=for-the-badge)

Knowledge base for AI agent tooling, dev workflows, and infinite llm learning. 

## What is this?

This is my documentation site. I built it with [Mintlify](https://mintlify.com) to keep track of:

- **AI agent workflows** — Claude Code, MCP servers, skills.sh, agent patterns
- **Dev environment setup** — the CLI tools, configs, and shortcuts I rely on
- **Reference pages** — markdown syntax, components, code blocks, nav config
- **API patterns** — OpenAPI specs, auth flows, endpoint documentation

It's not a product. It's my workshop. If you're reading this, you either are me or you found something useful.

---

## Run it locally

```bash
npm i -g mintlify
git clone https://github.com/localwolfpackai/docs.git
cd docs
mintlify dev
```

→ [localhost:3000](http://localhost:3000)

---

## Project layout

```
docs/
├── docs.json              # The one config file that runs everything
├── index.mdx              # Homepage
├── quickstart.mdx         # 60-second setup guide
├── development.mdx        # Dev environment details
│
├── essentials/            # Core reference pages
│   ├── markdown.mdx       # MDX syntax
│   ├── code.mdx           # Code blocks & highlighting
│   ├── images.mdx         # Images, embeds, dark mode
│   ├── settings.mdx       # docs.json config reference
│   ├── navigation.mdx     # Sidebar & tab setup
│   └── reusable-snippets.mdx
│
├── advanced/              # Deeper topics
│   ├── components.mdx     # Agent skills + MDX components
│   ├── seo-metadata.mdx   # SEO setup
│   └── versioning.mdx     # Multi-version docs (for later)
│
├── api-reference/         # API docs
│   ├── introduction.mdx
│   ├── authentication.mdx
│   ├── openapi.json       # OpenAPI 3.1 spec
│   └── endpoint/          # Individual endpoint pages
│
├── snippets/              # Reusable content
├── images/                # Screenshots & assets
├── logo/                  # Light + dark logos
└── favicon.svg
```

---

## How it works

- Every page is an `.mdx` file (Markdown + React components)
- `docs.json` controls navigation, colors, logos, and everything else
- Push to `main` and Mintlify deploys automatically via GitHub app
- `mintlify broken-links` validates all internal links

---

## Stack

| What | Why |
|------|-----|
| [Mintlify](https://mintlify.com) | Docs framework. Handles hosting, search, theming |
| [MDX](https://mdxjs.com) | Markdown with React components baked in |
| [OpenAPI 3.1](https://www.openapis.org) | Auto-generated API docs from a spec file |
| [Claude Code](https://claude.ai) | My AI coding agent |
| [skills.sh](https://skills.sh) | Agent skill packages |

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Port 3000 in use | It auto-picks the next one, or `mintlify dev --port 3333` |
| Sharp module error | `npm remove -g mintlify` → upgrade to Node v19+ → reinstall |
| Random weirdness | Delete `~/.mintlify` folder and try again |
| Page 404 | Make sure it's in `docs.json` navigation |

---

![HL](https://img.shields.io/badge/HL-HumanLup-000000?style=for-the-badge)
