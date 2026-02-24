# CLAUDE.md - AI Assistant Guide for humanlup docs

## Repository Overview

This repository is **humanlup docs** — a personal documentation site built with Mintlify. It uses MDX (Markdown + JSX) for content pages, `docs.json` for all site configuration, and OpenAPI for auto-generated API reference documentation.

**Key Technologies:**
- Mintlify CLI (Node.js v19+)
- MDX (Markdown with React components)
- OpenAPI specification for API documentation
- Git for version control

## Project Structure

```
/
├── docs.json                    # Main configuration file (navigation, theme, branding)
├── index.mdx                    # Homepage/landing page
├── quickstart.mdx               # Getting started guide
├── development.mdx              # Dev environment setup
├── README.md                    # Repository readme
│
├── essentials/                  # Core reference pages
│   ├── markdown.mdx            # Markdown & MDX syntax
│   ├── code.mdx                # Code blocks & highlighting
│   ├── images.mdx              # Images, embeds, dark mode
│   ├── settings.mdx            # docs.json config reference
│   ├── navigation.mdx          # Sidebar & tab setup
│   └── reusable-snippets.mdx   # Snippet/component reuse
│
├── advanced/                    # Deeper topics
│   ├── components.mdx          # MDX components & agent tools
│   ├── seo-metadata.mdx        # SEO & metadata setup
│   └── versioning.mdx          # Multi-version docs
│
├── api-reference/               # API documentation
│   ├── introduction.mdx        # API docs overview
│   ├── authentication.mdx      # Bearer token auth
│   ├── openapi.json            # OpenAPI 3.1 specification
│   └── endpoint/               # Endpoint pages
│       ├── get.mdx
│       ├── create.mdx
│       ├── delete.mdx
│       └── webhook.mdx
│
├── snippets/                    # Reusable content snippets
│   └── snippet-intro.mdx
│
├── images/                      # Image assets
│   ├── hero-light.png
│   ├── hero-dark.png
│   └── checks-passed.png
│
├── logo/                        # Brand logos
│   ├── light.svg
│   └── dark.svg
│
└── favicon.svg                  # Site favicon
```

## Key Files and Their Purposes

### docs.json (Critical Configuration File)
The central configuration file that controls:
- **Navigation structure** - Defines all pages, tabs, and groupings
- **Theme and branding** - Colors, logos, and visual styling
- **Global settings** - Links, anchors, footer socials
- **Site metadata** - Name, schema, favicon

**Important:** Any new page MUST be added to `docs.json` navigation to be visible in the docs site.

### MDX Files
All content files use `.mdx` extension (Markdown + JSX):
- Support standard Markdown syntax
- Can embed React components (Cards, Accordions, Notes, Tips, etc.)
- Include frontmatter with `title`, `description`, and optional `icon`
- Use root-relative links for internal navigation (e.g., `/essentials/markdown`)

### OpenAPI Integration
- `api-reference/openapi.json` - Contains API specification
- Endpoint MDX files can reference OpenAPI operations using `openapi` frontmatter field
- Example: `openapi: 'GET /plants'` automatically generates API documentation

## Development Workflow

### Initial Setup

1. **Prerequisites:**
   - Node.js version 19 or higher
   - npm or yarn package manager

2. **Install Mintlify CLI:**
   ```bash
   npm i -g mintlify
   # OR
   yarn global add mintlify
   ```

3. **Start Development Server:**
   ```bash
   mintlify dev
   ```
   - Runs on `http://localhost:3000` by default
   - Use `--port` flag for custom port: `mintlify dev --port 3333`

### Local Development

- Edit MDX files directly in your editor
- Changes hot-reload in the browser
- Preview reflects production appearance
- Use `mintlify broken-links` to validate internal links

### Updating CLI

```bash
npm i -g mintlify@latest
# OR
yarn global upgrade mintlify
```

### Deployment

- Changes deploy automatically via Mintlify GitHub App
- Push to default branch triggers production deployment
- Verify deployment success by checking commit status on dashboard
- Manual deployment available through Mintlify dashboard

## Content Guidelines for AI Assistants

### Creating New Documentation Pages

1. **Always create MDX files, not MD files**
   - Use `.mdx` extension for all content

2. **Include proper frontmatter:**
   ```mdx
   ---
   title: 'Page Title'
   description: 'Brief description for SEO and previews'
   icon: 'icon-name'  # Optional: from icon library
   ---
   ```

3. **Add to docs.json navigation:**
   - Locate appropriate tab and group
   - Add file path (without extension) to `pages` array
   - Example: `"essentials/new-page"` for `essentials/new-page.mdx`

4. **Use root-relative links:**
   ```mdx
   [Link to page](/essentials/markdown)  # CORRECT
   [Link to page](../markdown)           # AVOID - slower performance
   ```

### MDX Components

Mintlify provides rich components for enhanced documentation:

**Callout Components:**
- `<Note>` - General information
- `<Tip>` - Helpful hints
- `<Info>` - Important information
- `<Warning>` - Cautionary notes

**Layout Components:**
- `<Card>` - Interactive card with icon, title, and link
- `<CardGroup cols={2}>` - Grid of cards
- `<Accordion>` - Collapsible sections
- `<AccordionGroup>` - Multiple accordions
- `<Frame>` - Image wrapper with styling
- `<CodeGroup>` - Tabbed code blocks

**Content Components:**
- `<Latex>` - Mathematical formulas
- Images support light/dark mode variants

**Example:**
```mdx
<CardGroup cols={2}>
  <Card title="Guide" icon="book" href="/guide">
    Detailed guide content
  </Card>
  <Card title="API" icon="code" href="/api">
    API documentation
  </Card>
</CardGroup>
```

### Code Blocks

Use language-specific syntax highlighting:

```mdx
\`\`\`javascript
const example = "code here";
\`\`\`

\`\`\`python
def example():
    return "code here"
\`\`\`
```

For multiple language examples, use `<CodeGroup>`:

```mdx
<CodeGroup>
\`\`\`bash npm
npm install package
\`\`\`

\`\`\`bash yarn
yarn add package
\`\`\`
</CodeGroup>
```

### Images

- Store in `/images/` directory
- Use relative paths from root: `/images/filename.png`
- Support light/dark mode variants:
  ```mdx
  <img className="block dark:hidden" src="/images/hero-light.png" />
  <img className="hidden dark:block" src="/images/hero-dark.png" />
  ```

### Reusable Snippets

- Store reusable content in `/snippets/` directory
- Include using MDX import syntax
- Follow DRY principles to avoid content duplication

## API Documentation Guidelines

### OpenAPI-Based Documentation

1. **Edit openapi.json** for API specifications
   - Define endpoints, schemas, authentication
   - Use standard OpenAPI 3.0+ format

2. **Create endpoint MDX files** that reference OpenAPI operations:
   ```mdx
   ---
   title: 'Get Plants'
   openapi: 'GET /plants'
   ---
   ```

3. **Authentication** is specified in openapi.json:
   ```json
   "security": [{ "bearerAuth": [] }]
   ```

### MDX Component Approach

Alternatively, use Mintlify's MDX components for API docs without OpenAPI specs.

## Configuration Management (docs.json)

### Navigation Structure

The `navigation` object controls the entire site structure:

```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "Tab Name",
        "groups": [
          {
            "group": "Group Name",
            "pages": ["path/to/page", "another/page"]
          }
        ]
      }
    ],
    "global": {
      "anchors": [/* external links */]
    }
  }
}
```

**Key Rules:**
- Page paths exclude `.mdx` extension
- Paths are root-relative from repository base
- Order in array determines display order
- Nested groups create hierarchical navigation

### Theme Customization

```json
{
  "theme": "mint",
  "colors": {
    "primary": "#16A34A",
    "light": "#07C983",
    "dark": "#15803D"
  }
}
```

### Branding Elements

```json
{
  "name": "Site Name",
  "logo": {
    "light": "/logo/light.svg",
    "dark": "/logo/dark.svg"
  },
  "favicon": "/favicon.svg"
}
```

## Git Workflow and Conventions

### Branch Strategy

- **Feature branches:** Use descriptive names with `claude/` prefix
- Current branch: `claude/claude-md-mhylzprgrvak9wo1-01BaybaRw8xCznaDuSq2HXZA`
- Always develop on designated feature branches
- Never push directly to main/master

### Commit Messages

Follow conventional commit format:
- `docs: Add new authentication guide`
- `fix: Correct broken link in quickstart`
- `feat: Add API webhook documentation`
- `refactor: Reorganize essentials section`
- `style: Update code formatting in examples`

### Push Requirements

- Use: `git push -u origin <branch-name>`
- Branch names must start with `claude/` and match session ID
- Retry on network errors (exponential backoff: 2s, 4s, 8s, 16s)

## Common Tasks for AI Assistants

### Task 1: Add a New Documentation Page

1. Create MDX file in appropriate directory
2. Add frontmatter with title, description, icon
3. Write content using MDX syntax and components
4. Update `docs.json` to include page in navigation
5. Test locally with `mintlify dev`
6. Validate links with `mintlify broken-links`
7. Commit and push changes

### Task 2: Update Existing Content

1. Read the existing MDX file
2. Make targeted edits using Edit tool
3. Preserve frontmatter and formatting
4. Test changes locally
5. Commit with descriptive message

### Task 3: Add API Endpoint

1. Update `api-reference/openapi.json` with endpoint spec
2. Create MDX file in `api-reference/endpoint/`
3. Add frontmatter with `openapi` field referencing operation
4. Add to `docs.json` navigation under API Reference group
5. Test and commit

### Task 4: Reorganize Navigation

1. Edit `docs.json` navigation structure
2. Move/reorder pages in appropriate groups
3. Update any affected internal links in MDX files
4. Validate with `mintlify broken-links`
5. Test navigation in local preview

### Task 5: Update Theme/Branding

1. Edit `docs.json` for colors, logos, or metadata
2. Update logo files in `/logo/` if needed
3. Update favicon if needed
4. Test in both light and dark modes
5. Commit changes

## Best Practices for AI Assistants

### Content Quality

1. **First-person, casual voice** - This is a personal site. Write like you're explaining something to yourself in six months
2. **Clear, concise writing** - Documentation should be scannable
3. **Use appropriate components** - Cards for navigation, Accordions for detailed steps
4. **Code examples** - Always include practical examples
5. **Consistent formatting** - Follow existing patterns in the codebase
6. **SEO-friendly** - Meaningful titles and descriptions in frontmatter

### File Management

1. **Prefer editing over creating** - Update existing files when possible
2. **Consistent naming** - Use lowercase with hyphens: `api-authentication.mdx`
3. **Logical organization** - Group related content in appropriate directories
4. **Image optimization** - Use appropriate formats (SVG for logos, PNG for screenshots)

### Navigation

1. **Logical hierarchy** - Group related pages together
2. **Descriptive names** - Clear group and page titles
3. **Reasonable depth** - Avoid overly nested navigation
4. **Complete coverage** - All MDX files should be in navigation

### Testing

1. **Always test locally** - Run `mintlify dev` before pushing
2. **Check all links** - Use `mintlify broken-links` command
3. **Visual review** - Verify formatting, components render correctly
4. **Dark mode** - Test both light and dark themes if using images

### Git Hygiene

1. **Descriptive commits** - Explain what changed and why
2. **Atomic commits** - One logical change per commit
3. **Clean history** - Avoid force pushes and history rewrites
4. **Branch hygiene** - Work on designated feature branches only

## Troubleshooting

### Common Issues

1. **Port already in use:**
   - Mintlify auto-selects next available port
   - Or specify custom port: `mintlify dev --port 3333`

2. **Sharp module error on darwin-arm64:**
   - Remove mintlify: `npm remove -g mintlify`
   - Upgrade to Node.js v19+
   - Reinstall: `npm install -g mintlify`

3. **Unknown errors:**
   - Delete `~/.mintlify` folder
   - Run `mintlify dev` again

4. **Page shows 404:**
   - Verify `docs.json` includes page in navigation
   - Check file path matches navigation entry
   - Ensure `mintlify dev` runs from directory with `docs.json`

5. **Links not optimized:**
   - Use root-relative links: `/path/to/page`
   - Avoid relative links: `../page`

## Resources

- **Mintlify Documentation:** https://mintlify.com/docs
- **CLI Changelog:** https://www.npmjs.com/package/mintlify?activeTab=versions
- **Community:** https://mintlify.com/community
- **Dashboard:** https://dashboard.mintlify.com

## Version Information

- **Configuration:** Uses `docs.json` (modern format)
- **Legacy files:** `mint.json` is deprecated, use upgrade command if found
- **CLI version:** Keep updated with `npm i -g mintlify@latest`

## AI Assistant Quick Reference

**Before any major task:**
1. Read existing files to understand patterns
2. Check `docs.json` for navigation structure
3. Verify local development setup if testing required

**When creating content:**
1. Use MDX, not MD
2. Include complete frontmatter
3. Update docs.json navigation
4. Use Mintlify components for rich formatting
5. Test locally before committing

**When editing:**
1. Read file first
2. Preserve existing formatting and style
3. Maintain frontmatter structure
4. Update related navigation if needed

**When working with API docs:**
1. Understand OpenAPI spec structure
2. Keep openapi.json synchronized with endpoint MDX files
3. Follow authentication patterns in spec

**Git operations:**
1. Always work on feature branches starting with `claude/`
2. Use descriptive commit messages
3. Push with `-u` flag for new branches
4. Implement retry logic for network operations

---

**Last Updated:** 2026-02-24
**Repository:** localwolfpackai/docs
