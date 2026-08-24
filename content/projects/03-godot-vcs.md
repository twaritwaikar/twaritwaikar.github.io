---
id: godot-vcs
filename: godot-vcs.cpp
title: Godot Engine VCS Integration
version: gsoc-2019-2020
status: LIVE
role: STUDENT / MENTOR
stack_line: C++, CMAKE, GODOT
tags: [C++, CMAKE, GODOT]
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
  - Mentored the VCS Integration expansion in GSoC 2020
  - Former maintainer of the editor VCS feature and godot-git-plugin
---

**Google Summer of Code 2019** is a Google-sponsored program where open-source organizations host students for about three months.

My proposal for version control system integration was selected by the [Godot Engine](https://godotengine.org/) organization. I later mentored a feature expansion of the same project in GSoC 2020. I am a former maintainer of the VCS integration and [`godotengine/godot-git-plugin`](https://github.com/godotengine/godot-git-plugin).

## Features

- Stage files from the Godot Editor UI
- Commit staged files
- View diffs of modified files from the UI

## Tech stack

- C++ with C interop
- [GDNative](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html)
- [libgit2](https://libgit2.org/)
