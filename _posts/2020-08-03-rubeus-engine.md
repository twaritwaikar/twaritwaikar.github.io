---
layout: post
title: Rubeus 2D Game Engine
---

![](/assets/rubeus.png)

* [View code](https://github.com/sdslabs/Rubeus){:target="_blank"}
* [View user guides](https://github.com/sdslabs/Rubeus/wiki){:target="_blank"}
* [View API documentation](https://blog.sdslabs.co/Rubeus-Docs/html/index.html){:target="_blank"}
* [View SDSLabs v1.0 release blog](https://blog.sdslabs.co/2018/12/making-a-game-engine-from-scratch){:target="_blank"}
* [View SDSLabs v2.0 release blog](https://blog.sdslabs.co/2019/10/announcing-rubeus-engine-2){:target="_blank"}

**Rubeus Engine** is a simple, cross-platform, 2D game engine written in C++17 using OpenGL 3.3. The main objective of making this engine is to provide a simple and fast API to help people realize their game ideas efficiently. 

I was the original author of the v1.0 release.

![Rubeus rendered image](/assets/rubeus_render.png)

Rubeus uses [broCLI](https://github.com/sdslabs/broCLI), a Go based CLI tool that helps create the project structure for using Rubeus. broCLI was later superceded by a separate project manager released with Rubeus v2.0.

[Rubeus v1.0 was released](https://blog.sdslabs.co/2018/12/making-a-game-engine-from-scratch){:target="_blank"} on 22nd December 2018 and around 10 months later on October 13th 2019, [Rubeus v2.0 was launched](https://blog.sdslabs.co/2019/10/announcing-rubeus-engine-2){:target="_blank"}.

## Main features

* Colour and image textured 2D sprites
* Collision detection and resolution of boxes, circles and planes.
* Cueing music and sound effects with a single line of code.
* Taking user inputs through mouse and keyboard.
* Easy first look CLI interface for a beginner.

## Tech stack

* Language: C++17
* GLFW with OpenGL 3.3 for 2D rendering and cross-platform input and window management
* SFML for audio
* DevIL for image loading and manipulations
* Dear ImGui for project manager UI released in v2.0
* and some other utility libraries

Rubeus has been designed and developed completely inside [SDSLabs, IIT Roorkee](https://sdslabs.co/){:target="_blank"} and has been documented [here](https://blog.sdslabs.co/Rubeus-Docs/html/index.html){:target="_blank"}.
