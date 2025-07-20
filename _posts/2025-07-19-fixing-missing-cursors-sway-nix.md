---
layout: post
title:  "Fix Missing Cursors in Sway on NixOS"
date:   2025-07-19 21:00:00 +0200
categories: sway nixos
---

> Sorry, not the editor Cursor...

When I moved from [GNOME Desktop](https://www.gnome.org/) to [Sway](https://swaywm.org/) on my NixOS machine I noticed that my cursor was missing in [LibreWolf](https://librewolf.net/) (Firefox with more privacy). This wasn't an issue on GNOME, which I previously used.

I searched the internet a little, but didn't find anything covering Sway, NixOS and missing cursors.

I tested which cursors were missing using [MDN CSS Cursor](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor) and realized that a lot of them were missing.

I like the default cursors on GNOME, so I found out that they were called `Adwaita`.

## Solution

To ensure that those cursors were available I added the following to my nix configuration.

```nix
  programs.sway = {
    enable = true;
    wrapperFeatures.gtk = true;
    extraPackages = with pkgs; [
      adwaita-icon-theme
      # I have more packages here, but I omitted them for brevity
    ];
  };
```

Then I configured sway using
```sway
seat seat0 xcursor_theme Adwaita 24
```

After reloading sway (or signing out and then in again) the issue was solved.


## Metadata
```
$ sway --version
sway version 1.10.1
```

`NixOS 25.05`
