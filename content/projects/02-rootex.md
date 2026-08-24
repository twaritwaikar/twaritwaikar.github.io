---
id: rootex
filename: rootex.cpp
title: Rootex 3D Game Engine
version: v0.9
status: LIVE
role: LEAD
stack_line: C++, DX11, LUA
tags: [C++17, DIRECTX11, LUA]
source: https://github.com/sdslabs/Rootex
source_label: SOURCE
live: https://rootex.readthedocs.io/
live_label: DOCS
images:
  - /assets/rootex.png
  - /assets/rootex_editor_sponza_gif.gif
  - /assets/rootex_editor_gif.gif
  - /assets/rootex_physics_gif.gif
links:
  - View code|https://github.com/sdslabs/Rootex
  - View documentation|https://rootex.readthedocs.io/
architecture: Modified entity-component-system engine with DirectX 11 rendering, Bullet physics, OpenAL audio, and an embedded Lua gameplay API.
highlights:
  - Led a small team at SDSLabs, IIT Roorkee
  - Dear ImGui editor with live scene editing
  - Lua bindings via Sol3 for faster gameplay iteration
---

**Rootex Engine** is an advanced 3D game engine written in C++ made by a small team which I led at [SDSLabs, IIT Roorkee](https://sdslabs.co/). It comes with an editor written in C++ using [Dear ImGui](https://github.com/ocornut/imgui).

## Features

Rootex uses a modified version of the Entity-Component-System architecture, popular in game development for modularity and CPU cache locality.

Rootex uses DirectX 11 as its rendering backend, with effects such as dynamic phong lighting and particles.

Rootex integrates [Bullet 3D Physics](https://github.com/bulletphysics/bullet3) to simulate and visualize physics in the game world.

## Other features

- Audio engine based on OpenAL with 3D attenuation
- Lua scripting API for faster gameplay iteration
- Event-based programming model for internal and gameplay code

## Tech stack

- C++17 with embedded Lua
- DirectX 11, OpenAL, Sol3, Bullet3D, Dear ImGui, Gainput, Assimp, RmlUi

Third-party libraries and licenses are listed [in the repo](https://github.com/sdslabs/Rootex/tree/master/rootex/vendor) and in the editor.
