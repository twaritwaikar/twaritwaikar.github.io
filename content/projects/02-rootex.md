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
featured_image: https://www.youtube.com/watch?v=e0ueoZaNTw0
images:
  - /assets/rootex.png|Designed the logo myself in Adobe Illustrator
  - /assets/rootex_editor_sponza_gif.gif|Best render of this model in Rootex
  - /assets/rootex_editor_gif.gif|Fully-functional UI with lots of buttons :P
  - /assets/rootex_physics_gif.gif|Balls
links:
  - GameFromScratch REVIEW|https://www.youtube.com/watch?v=e0ueoZaNTw0
highlights:
  - Fully featured, 3D, DirectX 11, Windows-only game engine with an exhaustive game editor UI
  - Led a small team at SDSLabs, IIT Roorkee
  - CPU and cache-efficient ECS mixed with careful C++ memory management
  - Featured on GameFromScratch
---

**Rootex Engine** is a high-performance C++17 3D game engine made by a small team I led at [SDSLabs, IIT Roorkee](https://sdslabs.co/). Performance comes from a CPU-and-cache-efficient ECS architecture plus careful memory management, with a healthy amount of object orientation. It ships with an editor written in C++ using [Dear ImGui](https://github.com/ocornut/imgui).

We were also [featured on GameFromScratch](https://www.youtube.com/watch?v=e0ueoZaNTw0)!

This project went on to become my most locally popular project to the point that people came up to me (from college) talking about it :P

## Features

* Based on the popular Entity-Component-System architecture
  * Allows performance benefits due to better CPU cache usage. However over-optimizations are not the goal
  * Uses an impure ECS where components can have functions
* Full editor implemented in ImGui
* 3D DirectX 11 renderer
  * High resolution textures for Diffuse, Normal, Specular and Light mapping
  * Post processing effects like gaussian blur, bloom, Adaptive SSAO, FXAA, including ad-hoc sepia, black-and-white, tonemapping
  * Effekseer Particle effects integration available for high quality VFX
  * Environment effects like Sky sphere, sky reflections, refractions and depth fog
  * Supports basic transform and skeletal animations
  * Mildly configurable CPU based particle effects, custom shader, LOD generation
* Allows writing/debugging UI overlays in an HTML/CSS-like language and Lua in place of JS
* Physics engine powered by Bullet Physics 3
* OpenAL-Soft based audio engine supporting 3D attenuation and stereo sound
* Lua scripting engine with functionality exposed for easy game curation
  * Uses an object-oriented approach with Lua scripting for making intuitive scope declarations and reducing garbage generation
  * Lua debugger integration
  * Equipped with a tweening API provided by [flux](https://github.com/rxi/flux)
* Applies the event-based programming paradigm for better maitainability of game code
* Being developed for an actual game
  * Some game-specific features are also present like the Inky [Lua runtime integration](https://github.com/astrochili/narrator/) which allows writing dialogue in the [Ink language](https://www.inklestudios.com/ink/) and running them inside Rootex.
* [Hosted documentation](https://rootex.readthedocs.io)

## Other features

- Audio engine based on OpenAL with 3D attenuation
- Lua scripting API for faster gameplay iteration
- Event-based programming model for internal and gameplay code

## Tech stack

- C++17 with embedded Lua
- DirectX 11, OpenAL, Sol3, Bullet3D, Dear ImGui, Gainput, Assimp, RmlUi

## Devlogs

![Effekseer particle effects running in Rootex after GameFromScratch covered the library](https://x.com/TwaritW/status/1371254261284139008)

![Automatic LOD meshes, generated with meshoptimizer](https://x.com/TwaritW/status/1369729426036977664)

![Reversing time in the physics simulation](/assets/rootex_time_reversal.mp4)

![Lottie vector animations through RmlUi, exportable from After Effects](https://x.com/TwaritW/status/1321478443335233536)

![Forward+ style static lighting — 1,000 lights at roughly the unlit framerate](https://x.com/TwaritW/status/1311971765501927425)

![CPU-based particle systems](https://x.com/TwaritW/status/1244988087211442177)

![3D particles a day later](https://x.com/TwaritW/status/1245484671246323714)

![First 3D mesh in Rootex: the Utah teapot](https://x.com/TwaritW/status/1214597795912380416)
