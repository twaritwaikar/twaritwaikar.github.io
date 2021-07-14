---
layout: post
title: Rootex 3D Game Engine
---

<img src="/assets/rootex.png">

* [View code](https://github.com/sdslabs/Rootex){:target="_blank"}
* [View documentation](https://rootex.readthedocs.io/){:target="_blank"}

**Rootex Engine** is an advanced 3D game engine written in C++ made by a small team which I led at a programming club named [SDSLabs at IIT Roorkee](https://sdslabs.co/){:target="_blank"}. Rootex is supporting a work-in-progress game, which is planned to be released in 2021. It comes with an editor written also in C++ using [Dear ImGui](https://github.com/ocornut/imgui){:target="_blank"}.

## Features

![Rootex Editor Sponza Screenshot](/assets/rootex_editor_sponza_gif.gif)

Rootex uses a modified version of the Entity-Component-System architecture, now popular in the game development world because its ease of use, modularity and performance boost thanks to better CPU cache usage.

![Rootex Editor Editor Gif](/assets/rootex_editor_gif.gif)

Rootex uses DirectX 11 as its rendering backend and we keep adding rendering effects to it like dynamic phong lighting, particles effects, etc.

![Rootex Editor Physics Gif](/assets/rootex_physics_gif.gif)

Rootex has integrated [Bullet 3D Physics SDK](https://github.com/bulletphysics/bullet3){:target="_blank"} and uses it to simulate and visualize real-life-like physics in the game world.

## Other features

* Audio Engine based on OpenAL with 3D attenuation
* Lua scripting API exposed for faster gameplay development iterations
* Event based programming model used in both internal functions and gameplay functions

## Tech Stack

* Languages: C++17 with embedded Lua scripting
* DirectX11 for 3D rendering on Windows
* OpenAL for audio management
* Sol3 for creating Lua bindings for C++ code
* Bullet3D for 3D physics simulation
* Dear ImGui for creating editor GUI
* Gainput for input management
* Assimp for asset loading
* RmlUi for UI rendering using an HTML/CSS-like language
* and some other utility libraries

All 3rd party libraries and their licenses can be seen [here](https://github.com/sdslabs/Rootex/tree/master/rootex/vendor) or in the editor.

Rootex has been designed and developed completely inside [SDSLabs, IIT Roorkee](https://sdslabs.co/){:target="_blank"} and has been documented [here](https://rootex.readthedocs.io/){:target="_blank"}.
