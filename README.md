# twarit.cc

Personal site for [Twarit Waikar](https://twarit.cc). Brutalist React/Vite frontend. All copy lives in markdown under `content/`.

## Local

```bash
npm install
npm run dev
```

Opens at http://localhost:3000/. Markdown edits hot-reload.

```bash
npm run build
npm run preview
```

## Adding content

You should not need to touch React for new copy. Edit files in `content/`.

### Profile, site, contact, stack

| File | Purpose |
| --- | --- |
| `content/site.md` | Brand, email, social URLs, avatar, resume path, footer, home tiles |
| `content/profile.md` | Name, role, tagline, bio, education, terminal boot lines |
| `content/contact.md` | Contact heading and intro |
| `content/stack.md` | Tech list. Use `## Category` then `- item` |

`site.md` and `profile.md` use YAML front matter between `---` fences. The markdown body of `profile.md` is the bio (paragraphs, links, bold).

### New job / experience

Add `content/experience/06-short-name.md`. Filename order is display order (`01-` first).

```markdown
---
period: 2024—PRES
role: Title
company: Company
location: CITY
---

- Bullet one
- Bullet two
```

If you skip bullets, the body is used as a paragraph.

### New project

Add `content/projects/06-short-name.md`. Lower numbers appear first. The first paragraph is the card blurb. The rest of the body is the detail modal (headings, lists, links, images).

```markdown
---
id: my-tool
filename: my-tool.cpp
title: My Tool
version: v1.0.0
status: LIVE
featured: false
role: AUTHOR
stack_line: C++, RUST
tags: [C++, RUST]
source: https://github.com/you/my-tool
source_label: SOURCE
live: https://example.com
live_label: LIVE
images:
  - /assets/my-tool.png
links:
  - Extra writeup|https://example.com/blog
architecture: One-line architecture note
highlights:
  - Highlight one
  - Highlight two
---

Short card description goes here.

## Details

Longer story, lists, and `code` all work in the modal.

![Screenshot](/assets/my-tool.png)
```

`status` may be `LIVE`, `OFFLINE`, `PRIVATE`, or `BUILD_FAIL`.

Set `featured: true` on exactly one project to pin it on the home "latest deployment" card.

Put screenshots in `public/assets/` and reference them as `/assets/filename.png`.

An optional fenced code block at the **end** of the file becomes the snippet in the project modal:

````markdown
```cpp
int main() { return 0; }
```
````

### Resume PDF

Replace `public/assets/Twarit_Waikar_Resume.pdf` and keep `resume:` in `content/site.md` pointing at that path.

## Deploy

Pushes to `master` build with GitHub Actions and publish to GitHub Pages (custom domain `twarit.cc`).
