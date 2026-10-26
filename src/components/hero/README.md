# Native home-page Hero

`NativeHeroScene` replaces the hosted Unicorn Studio embed with an original WebGL2 renderer. It has no runtime dependencies beyond React and the browser. `public/images/hero/` contains the two existing portrait PNGs from Jade's scene, downloaded locally so the page does not depend on the scene host.

- `renderer.ts`: image upload, original desktop/mobile crop, pointer brush history, visibility/resize handling, and GPU resource cleanup.
- `shaders.ts`: independent portrait compositing, fading helmet reveal, and procedural glass ornaments. No Unicorn SDK, exported shaders, or scene JSON is shipped.
- `hero.module.css`: local portrait fallback if WebGL is unavailable or its context is lost.

The helmet brush eases in once per gesture (about 50 ms to 90% strength), holds for 200 ms, then eases out over 1.6 seconds. Its live endpoint follows every pointer event; connected segments are sampled at up to 30 Hz with 64 history slots. New segments inherit the brush strength instead of restarting a fade-in, preventing opacity pulses during continuous movement. Time-based sampling prevents high-frequency pointer events from shortening the tail. These timings are named constants at the top of `renderer.ts`. Pointer bounds are cached until scroll/resize. The reveal uses gently drifting noise, fine pigment grain, and a spreading wet edge to suggest a watercolor wash. These effects modify only the reveal mask: the helmet uses fixed image coordinates so its shape and lettering never warp. This is a procedural brush effect, not a fluid simulation.

The portrait artwork and primary framing match the reference. Ornament geometry, glass lighting, and the brush simulation are approximations; they are not a pixel-identical reproduction of Unicorn's proprietary renderer. Coarse pointers show the portrait without a touch interaction, preserving page scrolling. Reduced motion renders a still frame. Offscreen and hidden-tab animation is suspended.

The original integration remains recoverable from Git history. Removing the integration does not change or cancel the user's Unicorn billing subscription.
