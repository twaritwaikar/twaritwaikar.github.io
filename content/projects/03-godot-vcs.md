---
id: godot-vcs
filename: godot-vcs.cpp
title: Godot Engine VCS Integration
version: gsoc-2019-2020
status: LIVE
role: STUDENT / MENTOR
stack_line: C++, GSOC, GODOT, GIT
tags: [C++, GSOC, GODOT, GIT]
source: https://github.com/godotengine/godot-git-plugin
source_label: SOURCE
live: https://godotengine.org/article/gsoc-2019-progress-report-3#vcs-integration
live_label: GODOT BLOG
featured_image: /assets/godot-git-plugin.png
images:
  - /assets/gsoc.png
  - /assets/godot-git-plugin.png|I designed this myself in Adobe Illustrator!
links:
  - DOCS|https://github.com/godotengine/godot-git-plugin/wiki
highlights:
  - Selected by Godot Engine for Google Summer of Code 2019
  - Mentored a new Git expansion of this project in GSoC 2020
  - Former maintainer of the editor VCS feature set and godot-git-plugin
---

**godot-git-plugin** is a GDNative C++ plugin for Godot that uses libgit2 to expose a UI for staging, committing, and viewing diffs. GSoC 2019-2020 project.

If you are unfamiliar, **Google Summer of Code 2019** is a Google-sponsored program where open-source organizations host students for about three months. My proposal for version control system integration was selected by the [Godot Engine](https://godotengine.org/) organization. I later mentored a feature expansion of the same project in GSoC 2020. 

Since then, I became the (now former) maintainer of the VCS integration and [`godotengine/godot-git-plugin`](https://github.com/godotengine/godot-git-plugin).

## Features

Connect Git from **Project > Version Control > Version Control Settings** without leaving the editor.

![Version Control Settings: pick GitPlugin and connect](/assets/godot-vcs-settings.png)

Stage and unstage files from the Commit dock. Double-click a file to move it between the two lists.

![Stage and unstage files from the Commit dock](/assets/godot-vcs-stage.png)

Commit staged (or all unstaged) files from the same dock. `Ctrl+Enter` / `Cmd+Enter` commits instantly.

![Write a commit message and commit from the editor](/assets/godot-vcs-commit.png)

View diffs for files and commits. Both unified and split views are supported.

![Split diff of staged changes](/assets/godot-vcs-diff-files.png)

![Unified diff of a commit](/assets/godot-vcs-diff-unified.png)

![Split diff of the same commit](/assets/godot-vcs-diff-split.png)

Switch branches, manage remotes, and push/pull/fetch over HTTPS or SSH.

![Switch branches from the editor](/assets/godot-vcs-branches.png)

![Push, pull, and manage remotes without leaving Godot](/assets/godot-vcs-push-pull.png)

Commit history includes author and other metadata.

![Commit history with author metadata](/assets/godot-vcs-history.png)

No Git CLI access is required, which makes it ideal for non-technical users.

## Tech stack

- C++ with C interop
- [GDNative](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html)
- [libgit2](https://libgit2.org/)
