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
featured_image: /assets/my-tool.png|Hero screenshot
images:
  - /assets/my-tool.png|Hero screenshot
  - /assets/my-tool-2.png|Debug view
links:
  - Extra writeup|https://example.com/blog
highlights:
  - Highlight one
  - Highlight two
---

Short card description goes here.

## Details

Longer story, lists, and `code` all work in the modal.

![Screenshot](/assets/my-tool.png)

https://x.com/username/status/1234567890
```

`status` may be `LIVE`, `OFFLINE`, `PRIVATE`, or `BUILD_FAIL`.

Set `featured: true` on exactly one project to pin it on the home "latest deployment" card.

Put screenshots in `public/assets/` and reference them as `/assets/filename.png`. Append `|Subtitle` to add a caption under the image in the popup (`/assets/shot.png|Level 2`). YouTube watch, share, or embed URLs in `images` or `featured_image` render as embeds in the project modal. Twitter/X status URLs work the same way. A tweet URL on its own line in the writeup (or `![Tweet](https://x.com/user/status/123)`) also becomes an embed. In the writeup, `![Subtitle](/assets/shot.png)` shows that subtitle under the image. `featured_image` is the media at the top of the popup; if omitted, the first `images` entry is used. Other `images` appear in the gallery below the writeup.

An optional fenced code block at the **end** of the file becomes the snippet in the project modal:

````markdown
```cpp
int main() { return 0; }
```
````

### Resume PDF

The live PDF is served at [`/resume.pdf`](https://twarit.cc/resume.pdf). [`/resume`](https://twarit.cc/resume) redirects there.

Replace `public/assets/Twarit_Waikar_Resume.pdf` to update it. `content/site.md` should keep `resume: /resume.pdf`.

## Deploy

Pushes to `master` build with GitHub Actions and publish to GitHub Pages (custom domain `twarit.cc`). In repo **Settings → Pages**, the source must be **GitHub Actions**.
