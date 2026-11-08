# Diwali wish — "The Big One"

Status: **v1 rendered** as hand-built 2D vector animation (the user chose this over AI generation). **0 credits spent.**

## How it's built

| File | What it does |
|---|---|
| `scene.html` | SVG scene + characters; `setTime(t)` draws any frame deterministically. Open in a browser to preview it playing live |
| `audio.py` | Synthesizes the whole soundtrack with numpy (sound effects, music, tabla, diya chimes): nothing to license |
| `render.js` | Playwright captures 690 frames at 30 fps, 1080×1920 → ffmpeg H.264 + AAC, loudness-normalized to -14 LUFS |
| `diwali-wish.mp4` | v1 output, flat cartoon: 23 s, 9:16 |
| `diwali-wish-comic.mp4` | Comic-book version: ink outlines, halftone, ray bursts, focus/speed lines, SFX lettering, narration boxes, punch-in camera, animated on twos |

Re-render with your own sender line (about 1 minute):

```
node render.js diwali-wish.mp4 "From the Balaji family"
node render.js diwali-wish-comic.mp4 "From the Balaji family" comic
```

Because the AI route was dropped, the cost estimate and AI-risk notes below are kept only for reference.

## What we keep from the reference, and what we change

The reference (Lenora 3D Shop, rocket chases the kids) works because of its **format**, not its characters:
one locked side-on wide shot, a flat ground line on a cream background, chibi characters, one cracker that
misbehaves, and a punchline at the end. We keep the format and change everything else: new characters,
a new cracker, a new gag, and a payoff that **is** the wish.

## Concept — "The Big One"

A boy sets up a huge red cracker to impress his little sister and their puppy. Everyone braces for a massive
bang. The fuse burns down, there's a long silence, and all it does is go *pfft*. They're disappointed.
Then it fires straight up into a slow golden shower of sparks and marigold petals, and a row of diyas along
the ground line lights up, one after another. The last frame holds as the background for the wish text.

Why this gag: the reference is a chase (fear, then escape). This one runs the other way (build-up, letdown,
then a surprise), so it can't be read as a copy. And the ending lands on light and warmth, which suits a wish
better than an explosion does.

## Format

| Item | Value |
|---|---|
| Aspect | 9:16 vertical (Reels / Shorts / WhatsApp status) |
| Length | ~23s = 4 × 5s shots + 3s end card |
| Look | flat 2D chibi cartoon, clean ink outlines, soft cel shading, cream paper background, a thin dark ground line in the lower-middle third. NOT 3D, NOT photoreal |
| Camera | locked-off side view in every shot, same framing (shots chain from each other's last frame) |
| Audio | sound effects from the model (fuse hiss, *pfft*, whoosh, crackle, kids' gasps and giggles), **no dialogue**; a festive music bed added in finishing |
| Wish text | added in post with ffmpeg, **not** generated: AI models garble lettering, and doing it in post is free, sharp and easy to change |

## Characters (default, replace if you want)

1. **Boy** (~8): curly black hair, orange kurta, white pyjama, bare feet. Confident, a show-off.
2. **Little sister** (~5): two pigtails with jasmine flowers, pink-and-gold pavadai (long skirt). Covers her ears.
3. **Puppy**: small fawn Indian street puppy, one floppy ear. Hides behind the sister.

Three designs that can't merge into each other: different heights, hair and colours.

## Shot list

| # | Time | What happens | Notes |
|---|---|---|---|
| 1 | 0–5s | Boy places a fat red cracker on the ground line (screen-left), proudly lights the fuse with a long sparkler stick, then runs back to the others (screen-right) | the only shot with a generated first frame |
| 2 | 5–10s | All three crouch screen-right: sister has her ears covered, puppy peeks out from behind her, boy grins. The fuse sparks and burns down to nothing. Silence; they lean forward | starts from the last frame of shot 1 |
| 3 | 10–15s | The cracker goes *pfft*, gives off a tiny grey puff and tips over. Their shoulders drop; the puppy trots over and sniffs it | starts from the last frame of shot 2 |
| 4 | 15–20s | The cracker shoots up out of frame, and a slow golden shower of sparks and marigold petals falls over the whole frame. Diyas along the ground line light up left to right. The kids jump and cheer, the puppy spins | starts from the last frame of shot 3 |
| End | 20–23s | Hold on shot 4's last frame, slightly dimmed; "Happy Diwali" plus the sender's name fades in | ffmpeg, free |

One action per shot, one camera register (locked) throughout, a fixed headcount of 3 (2 kids and 1 puppy,
nobody else).

## Cost estimate (Magnific numbers from the skill reference, re-checked with `simulate_cost` before any spend)

| Stage | Credits |
|---|---|
| video_plan | ~16 |
| Character refs: 3 × 2 variants | ~450 |
| Shot 1 first frame: 2 variants | ~200 |
| Drafts: 4 × Seedance 2.5, 480p, 5s | ~4,000 |
| Finals: 4 × Seedance 2.5, 720p, 5s | ~8,800 |
| End card and joining (ffmpeg, local) | 0 |
| **Total** | **~13,500** (roughly ₹600 at the chai-dawn rate) |

On Higgsfield the same plan comes to roughly 4 × 35 = 140 credits for 720p finals, plus drafts and stills.
Re-check before choosing.

## Risks, and how they're handled up front

- **Style drift toward 3D / Pixar**: every prompt gets a style anchor that says "flat 2D cartoon, NOT 3D".
- **Sparks and petals reading as decorative particles**: they come only from the cracker in shot 4, and they're
  named as its output.
- **The cracker changing size or colour across cuts**: chaining each shot from the previous one's last frame,
  plus a LOCKS line.
- **Text appearing in frame**: a NO ON-SCREEN TEXT block; the wish is added only in post.
- **The puppy's identity drifting** (animals drift more than people): its own reference, and it stays mid-size
  in the frame.

## Decisions

1. Characters: boy, sister, puppy (chosen).
2. Wish text: "Happy Diwali" + sender line. Sender line: "From Gowtham and Family".
3. Route: 2D vector, no generation (chosen).

## Known limits of v1

- No voices: gasps and cheers are acted by the faces only. Synthesized "voices" would sound robotic.
- The characters face front, with eyes that look toward the action. True side and 3/4 poses would need many more drawings.
