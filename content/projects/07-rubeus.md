---
id: rubeus
filename: rubeus.cpp
title: Rubeus 2D Game Engine
version: v2.0
status: LIVE
role: AUTHOR
stack_line: C++17, OPENGL, GLFW
tags: [C++17, OPENGL, GLFW]
source: https://github.com/sdslabs/Rubeus
source_label: SOURCE
live: https://blog.sdslabs.co/2018/12/making-a-game-engine-from-scratch
live_label: BLOG
featured_image: /assets/rubeus.png
images:
  - /assets/rubeus.png
  - /assets/rubeus_render.png
links:
  - USER MANUAL|https://github.com/sdslabs/Rubeus/wiki
  - DOCS|https://blog.sdslabs.co/Rubeus-Docs/html/index.html
  - RELEASE V1.0|https://blog.sdslabs.co/2018/12/making-a-game-engine-from-scratch
  - RELEASE V2.0|https://blog.sdslabs.co/2019/10/announcing-rubeus-engine-2
highlights:
  - Original author of the v1.0 release at SDSLabs
  - Colour and image textured 2D sprites
  - Collision for boxes, circles, and planes
---

**Rubeus Engine** is a simple, cross-platform 2D game engine written in C++17 using OpenGL 3.3. The goal is a simple, fast API for turning game ideas into playable prototypes.

I was mainly using it to learn how to make a cross-platform 2D engine on C++17, GLFW, and OpenGL 3.3 with sprites, collision, audio, and a beginner-friendly CLI workflow. This was my first time making a game engine.

Rubeus uses [broCLI](https://github.com/sdslabs/broCLI), a Go CLI that scaffolds Rubeus projects. broCLI was later superseded by a project manager shipped with Rubeus v2.0.

v1.0 shipped on 22 December 2018. v2.0 launched on 13 October 2019.

## Main features

- Colour and image textured 2D sprites
- Collision detection and resolution of boxes, circles, and planes
- Music and sound effects with a single line of code
- Mouse and keyboard input
- Beginner-friendly CLI

## Tech stack

- C++17
- GLFW with OpenGL 3.3
- SFML for audio
- DevIL for image loading
- Dear ImGui for the v2.0 project manager
