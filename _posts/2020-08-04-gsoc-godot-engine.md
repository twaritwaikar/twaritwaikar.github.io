---
layout: post
title: Version Control Integration project in Google Summer of Code 2019 at Godot Engine
---

<img src="/assets/godot.png">
<img src="/assets/gsoc.png">

* [View official Godot Engine news blog post](https://godotengine.org/article/gsoc-2019-progress-report-3#vcs-integration){:target="_blank"}
* [View plugin code](https://github.com/godotengine/godot-git-plugin){:target="_blank"}
* [View feature code](https://github.com/godotengine/godot/pull/31461){:target="_blank"}
* [View documentation](https://github.com/godotengine/godot-git-plugin/wiki){:target="_blank"}

**Google Summer of Code 2019** is a program conducted by Google which allows open-source organization to hire students to work on their projects related to the organization for around 3 months. This program is sponsored by Google.

My proposal for adding a version control system integration was selected by the [Godot Engine organization](https://godotengine.org/){:target="_blank"} which maintains the fully-featured and fully open-sourced C++ based [Godot game engine](https://github.com/godotengine/godot){:target="_blank"}. I am now maintaining the VCS integration feature in the Godot Engine organization.

## Features

* Ability to stage files from Godot Editor UI
* Ability to commit staged files
* Ability to view diffs of modified files from UI

## Tech Stack

* C++ with C interop
* [GDNative](https://docs.godotengine.org/en/stable/tutorials/plugins/gdnative/gdnative-cpp-example.html) with GDNative API for C++
* [libgit2](https://libgit2.org/), a C library that simulates Git in code.

Godot Engine is maintained by the [Godot Engine organization](https://godotengine.org/).
