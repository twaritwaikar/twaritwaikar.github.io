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
  - GameFromScratch review|https://www.youtube.com/watch?v=e0ueoZaNTw0
architecture: High-performance C++17 ECS with cache-friendly memory layout, DirectX 11 rendering, Bullet physics, OpenAL audio, and an embedded Lua gameplay API.
highlights:
  - Led a small team at SDSLabs, IIT Roorkee
  - CPU and cache-efficient ECS mixed with careful C++ memory management
  - Featured on GameFromScratch
---

**Rootex Engine** is a high-performance C++17 3D game engine made by a small team I led at [SDSLabs, IIT Roorkee](https://sdslabs.co/). Performance comes from a CPU- and cache-efficient ECS plus careful memory management, with a healthy amount of object orientation. It ships with an editor written in C++ using [Dear ImGui](https://github.com/ocornut/imgui).

It was [featured on GameFromScratch](https://www.youtube.com/watch?v=e0ueoZaNTw0).

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
