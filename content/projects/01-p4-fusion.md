---
id: p4-fusion
filename: p4-fusion.cpp
title: Fast P4 to Git convertor
version: v1.0.0
status: LIVE
featured: true
role: AUTHOR
stack_line: C++, P4, GIT
tags: [C++, PERFORCE, GIT]
source: https://github.com/salesforce/p4-fusion
source_label: SOURCE
live: https://www.youtube.com/watch?v=LQe7PhP-El0
live_label: WEBINAR
links:
  - View webinar|https://www.youtube.com/watch?v=LQe7PhP-El0
  - Sourcegraph blog|https://sourcegraph.com/blog/git-vs-perforce-salesforce-scalability-and-performance
  - View code|https://github.com/salesforce/p4-fusion
architecture: High-performance C++ converter from Perforce depots to Git repositories, designed for Salesforce-scale monorepos.
throughput: ~100x vs stock git-p4.py
highlights:
  - Converts large P4 monorepos into Git with far less wall-clock time than git-p4.py
  - Open-sourced at Salesforce and later integrated into Sourcegraph as their primary P4 clone path
  - Used as a production migration tool across large internal codebases
---

**p4-fusion** is a fast Perforce to Git conversion tool that I wrote and open-sourced at Salesforce. It converts a large P4 monorepo into a Git repository with 100x the performance of the standard `git-p4.py` tool distributed with Git.

It became one of the most successful tools built at Salesforce for P4 migrations. It was later integrated into Sourcegraph and became their primary way of cloning Perforce code.
