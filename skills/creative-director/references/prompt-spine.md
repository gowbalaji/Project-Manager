# Prompt spine

Every video prompt follows the same slot order. The order is the point: identity and staging come before action, so the model has placed everyone before anything moves, and the locks at the end restate what must not drift. Write only what produces a visible pixel or an audible sound — mood words without a physical description are ignored by the model and waste prompt length.

Deliver each shot as: numbered reference list (in attach order) → bold title with runtime → one fenced code block with the prompt, references tagged inline (`@image1`, or the platform's own reference naming).

## Slots (in this order)

1. **HEADER** — shot count, total seconds, per-shot timecodes that sum exactly, cut policy ("hard cuts, no transitions"), speed policy ("real-time, no slow motion" — carve slow motion out by timecode only).
2. **STYLE** — look in one paragraph. For photoreal: `8K photorealism, organic film grain, high dynamic range. NOT a 3D render, NOT a game engine, NOT a cartoon.` Add skin (`pore-level texture, no smoothing`) and cadence (`24fps, natural motion blur, no flicker, no warping, no morphing`). For stylised work, name the style positively and negate photoreal.
3. **NO ON-SCREEN TEXT** — `No on-screen text of any kind: no captions, subtitles, titles, watermarks, logos, UI overlays.` Always include; speech especially pulls in captions. Text that physically exists in the world (a sign, a T-shirt print) is described as an object in Assets or Geometry.
4. **CRITICAL BLOCKS** (max 4, most important first) — `THE [THING] — CRITICAL:` plus one exhaustive paragraph for anything the model tends to drop. Common: `THE SCRIPT` (any speech — always first), `ONE MOUTH SPEAKS AT A TIME` (2+ people with dialogue), `NOBODY ELSE IS IN THE FRAME`, `THE GEOMETRY` (a position that must not flip), `TWO DISTINCT DESIGNS` (similar characters must not merge).
5. **ASSETS** — one line per reference: height · build and skin · face · hair · permanent markers · wardrobe (one clause per garment) · voice (if they speak: register, texture, pace) · `THIS SCENE:` what they do here · `100% match to the reference.` 60–110 words per character. Scope non-character refs: `@image4 = the location — controls geography, materials and light direction only.`
6. **GEOMETRY MAP** — who is where: lateral position (screen-left/centre/right), depth plane (foreground/mid/background), what is off-frame and where. Label every direction as screen-relative or character-relative.
7. **FIRST FRAME** — what is already happening at frame one. `Already mid-motion, no empty establishing hold.` If using a start keyframe: `Open on the composition of the start frame exactly.`
8. **LENS** — one lens per shot, in field-of-view degrees with mm in brackets; no focal drift mid-shot. 84° (24mm) full-body action · 63° (35mm) walking alongside · 47° (50mm) medium/two-shot · 29° (85mm) bust · 18° (120mm) emotional close-up · 12° (200mm) insert.
9. **CAMERA** — one register: locked-off · gentle handheld · heavy handheld · violent handheld. Dialogue defaults to locked-off or gentle (a moving camera competes with the mouth). On platforms with camera-motion presets, pick one preset that matches instead of describing a complex move.
10. **LIGHT & COLOUR** — direction, quality, temperature of the key, and a counter-note. Colour in three bands (~70/20/10), each naming a source visible in frame. No fixture names.
11. **ATMOSPHERE** — clean air or even density across the whole frame. No fog, haze, god rays or floating particles as decoration; vapour only when something in frame makes it (steam off a cup, breath in the cold).
12. **ACTION TIMING** — timecoded beats. Every visible person gets an action in every beat; a listener gets `says nothing in this beat:` plus what they do instead (otherwise the model gives them words). Hard cuts written inline at their timecode.
13. **PHYSICS** — weight and contact: `chair takes her weight, hair lags the turn, grounded contact shadows. Nothing floats, nothing slides.` Use measurables: km/h, cm, kg.
14. **ACTING** — `natural blinking, brow micro-expression matched to each line, eyes on each other, never into the lens.`
15. **AUDIO** — diegetic by default; name each sound's source. For speech: each line verbatim again, with its delivery (volume, pace, pitch, stressed word, emotion, breath, distance). End diegetic prompts with: `No music, no score, no humming, no ambient pad, no voices beyond the scripted lines.` Use the platform's no-music flag too. With an attached audio track: `The attached audio is the sole audio source; generate no other sound.`
16. **LOCKS** — a positive chain of what must hold: action order, identities, positions, wardrobe, light direction, same across all cuts.

## Dialogue rules

- The words in THE SCRIPT are verbatim: no fixed grammar, no added fillers, no synonyms. Punctuation is performance (… trails off, — cuts off).
- Words appear three times: THE SCRIPT (words only), ACTION TIMING (bound to a body), AUDIO (with delivery). Never put delivery notes inside THE SCRIPT — they get spoken.
- Budget ~2.5 words per second of runtime including reactions and pauses. If it doesn't fit, split the shot or cut lines — never ask the model to speak faster.
- Flag numbers, acronyms and invented names; write them as spoken ("twenty twenty-six").

## Length

A four-shot, four-reference prompt lands around 900–1,400 words. Every fact lives in one slot, except dialogue. Check the platform's prompt length limit (Magnific Seedance 2.5: 10,000 characters).

## Iterations

Once a prompt is approved, every tweak ships as the full revised prompt, not a partial patch. Change one variable per retry so you can tell what fixed it.
