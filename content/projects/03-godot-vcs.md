---
id: godot-vcs
filename: godot-vcs.cpp
title: Godot Engine VCS Integration
version: gsoc-2019
status: LIVE
role: GSOC
stack_line: C++, LIBGIT2, GODOT
tags: [C++, LIBGIT2, GODOT]
source: https://github.com/godotengine/godot-git-plugin
source_label: PLUGIN
live: https://godotengine.org/article/gsoc-2019-progress-report-3#vcs-integration
live_label: GODOT BLOG
images:
  - /assets/godot.png
  - /assets/gsoc.png
links:
  - Godot news post|https://godotengine.org/article/gsoc-2019-progress-report-3#vcs-integration
  - Plugin code|https://github.com/godotengine/godot-git-plugin
  - Engine PR|https://github.com/godotengine/godot/pull/31461
  - Documentation|https://github.com/godotengine/godot-git-plugin/wiki
architecture: GDNative C++ plugin over libgit2, with editor UI for staging, committing, and viewing diffs inside Godot.
highlights:
  - Selected by Godot Engine for Google Summer of Code 2019
  - Stage, commit, and inspect diffs from the editor
  - Still maintaining the feature in the Godot organization
---

**Google Summer of Code 2019** is a Google-sponsored program where open-source organizations host students for about three months.

My proposal for version control system integration was selected by the [Godot Engine](https://godotengine.org/) organization. I continue to maintain the VCS integration feature.

## Features

- Stage files from the Godot Editor UI
- Commit staged files
- View diffs of modified files from the UI

## Tech stack

- C++ with C interop
- [GDNative](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html)
- [libgit2](https://libgit2.org/)
