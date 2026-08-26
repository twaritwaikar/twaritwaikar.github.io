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
featured_image: /assets/p4-fusion-hld.png|High-level design of the p4-fusion conversion algorithm
links:
  - SOURCEGRAPH BLOG|https://sourcegraph.com/blog/git-vs-perforce-salesforce-scalability-and-performance
highlights:
  - Converts large P4 monorepos into Git with far less wall-clock time than git-p4.py
  - Open-sourced at Salesforce and later integrated into Sourcegraph as their primary P4 clone path
  - Unlocked Sourcegraph on the Salesforce Perforce monorepo for thousands of developers and later used in internal tools
  - Collaborated with Sourcegraph to work on a [webinar](https://www.youtube.com/watch?v=LQe7PhP-El0) and a [blog post](https://sourcegraph.com/blog/git-vs-perforce-salesforce-scalability-and-performance) on their official site.
---

**p4-fusion** is a multi-threaded Perforce to Git conversion tool that I wrote and still maintain at Salesforce. It converts a large P4 monorepo into a Git repository with about 100x the performance of stock `git-p4.py`.

p4-fusion solves some of the most impactful scaling and performance limitations in git-p4.py (conversion tool that comes with Git) by:

* Using the [Helix Core C++ API](https://www.perforce.com/downloads/helix-core-c/c-api) to handle downloading CLs with more control over the memory and how it is committed to the Git repo without unnecessary memory copies and file I/O.
* Using [libgit2](https://libgit2.org/) to forward the file contents received from the Perforce server as-is to a Git repository, while avoiding memory copies as much as possible. This library allows creating commits from file contents existing plainly in memory.
* Using a custom wakeup-based threadpool implemented in C++11 that runs thread-local library contexts of the Helix Core C++ API to heavily multithread the changelist downloading process.

It became one of the most successful tools built at Salesforce for P4 migrations. It was later integrated into Sourcegraph and became their primary way of cloning Perforce code.

p4-fusion went on to be used internally for various conversion from Perforce to Git, not just at Salesforce but in [other corporations](https://github.com/salesforce/p4-fusion/issues?q=sort%3Aupdated-desc%20is%3Aissue%20state%3Aclosed) stuck in vendor lock-in with Helix Perforce.

> If you do work that requires converting between Perforce and Git, you should check out [p4-fusion](https://github.com/salesforce/p4-fusion). We were fortunate to work with [@TwaritW](https://x.com/TwaritW), who wrote this to address bottlenecks in git-p4 and bring [@Sourcegraph](https://x.com/sourcegraph) to a truly *massive* codebase.
>
> — [Beyang](https://x.com/beyang/status/1509205179639365634), March 30, 2022
