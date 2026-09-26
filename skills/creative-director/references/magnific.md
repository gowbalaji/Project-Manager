# Magnific — platform reference

Prices below were read from Magnific's own `simulate_cost` in September 2026. Treat them as a guide and always re-check with `simulate_cost` before spending — prices change and the tool is free.

## Tools by pipeline stage

| Stage | Tool | Cost |
|---|---|---|
| Balance | `account_balance` | free |
| Brief | `video_plan` (call first for any video) | ~16 credits |
| Model catalog | `video_models_list`, `images_models_list` (use `search` to keep output small) | free |
| Cost check | `simulate_cost` with `tool` + the exact `arguments` you will send | free |
| Stills | `images_generate` (`count` 1–8 for variants of one prompt) | paid |
| Video | `video_generate` | paid |
| Show results | `creations_show` then `creations_wait` | free |
| Review | `video_analyze` (questions, artefacts, continuity, compare up to 10 clips) | free |
| Continuity | `video_extract_frames` with `"last"` → next shot's `keyframes.start` | free |
| Join | `video_concatenate` (2–10 clips, in order) | check |
| Finish | `video_soundfx`, `video_music`, `video_color_grade`, `video_upscale`, `video_hdr`, `video_cut`, `video_speed` | check each |
| Lip-sync | `video_speak` (Omni Human etc.) — Seedance audio refs guide rhythm, they do not lip-sync | paid |

## Unlimited mode is web-only here

`account_balance` can report `isUnlimitedMode: true` with `unlimitedAppliesHere: false`. That means generations made through these tools **spend credits**, even though the same model may be free on the Magnific website. When the user has unlimited on their plan, offer this split: the skill plans, locks the look and writes the prompts; the user pastes final prompts into the Magnific website for models their unlimited covers. Tell the user before the first paid call in a session.

## Video model slugs (copy verbatim into `slug`)

| Model | Slug | Notes |
|---|---|---|
| Seedance 2.5 | `bytedance-seedance-pro-2.5` | Magnific's #1 pick. 4–30s. Resolutions `Draft`, `480p`, `720p`, `1080p`. Multishot up to 6 shots (`multi_prompt`). 52 `cameraMotion` presets. `noMusic` flag. |
| Seedance 2.0 | `bytedance-seedance-pro-2.0` | |
| Seedance 2.0 Fast | `bytedance-seedance-fast-2.0` | |
| Seedance 2.0 Mini | `bytedance-seedance-mini-2.0` | Cheap Seedance draft. |
| Kling 3.0 | `kling-30` | Cheapest good motion. |
| Kling 3.0 Turbo | `kling-30-turbo` | |
| Kling 3.0 Omni | `kling-omni3` | |
| Kling 3.0 Motion Control | `kling-motion-control-30` | Motion transfer (Genjutsu substitute). |
| Veo 3.1 / Fast / Lite | `google-veo3_1`, `google-veo3_1-fast`, `google-veo3_1-lite` | |
| Wan 3.0 / Prime | `wan-3-0`, `wan-3-0-prime` | Up to 30s. |
| Wan 2.2 Animate | `wan-2-2-animate` | Motion transfer, cheaper. |
| Runway Gen 4.5 / Act Two | `runway-gen45`, `runway-act-two` | |
| Omni Human lip-sync | `bytedance-omnihuman-lipsync` | |

If a slug is rejected, the error lists all valid slugs — use that list. `video_plan` has suggested slugs that do not exist (e.g. `kling-2-1`); check every suggested slug before costing.

## Seedance 2.5 limits on Magnific

- Image references: **30** (not 50 — other skills that assume 50 are wrong here)
- Video references: 10 · Audio references: 10 (2–30s each, mp3/wav) · Character and product refs supported
- References **cannot be combined** with `keyframes.start`/`end`. Choose one: a start frame (best for exact opening composition) or references (best for identity across a scene).
- Prompt max 10,000 characters.

## Measured costs (5-second clip, 16:9)

| Model / setting | Credits |
|---|---|
| Kling 3.0 | 450 |
| Seedance 2.0 Mini, 720p | 700 |
| Veo 3.1 Fast (8s) | 800 |
| Seedance 2.5, Draft | 1,000 |
| Seedance 2.5, 480p | 1,000 |
| Seedance 2.5, 720p | 2,200 |
| Seedance 2.5, 1080p | 3,950 |
| Still — Nano Banana Pro (`imagen-nano-banana-2`) | 75 |
| Still — Seedream 5 Pro (`seedream-5-pro`) | 100 |
| 2 variants in one call (`count: 2`) | 150 (Nano Banana Pro) / 200 (Seedream 5 Pro) |

A start keyframe did not change the Seedance 2.5 price, and 9:16 costs the same as 16:9.

Draft and 480p cost the same on Seedance 2.5 — use 480p for drafts, it is easier to judge.

## Stage defaults

- **Stills:** `seedream-5-pro` (default all-rounder) or `imagen-nano-banana-2` (Nano Banana Pro — cheaper here, strong on character consistency). Naming trap: `imagen-nano-banana-2` *is* Nano Banana Pro; Nano Banana 2 is `imagen-nano-banana-2-flash`.
- **Drafts:** Seedance 2.5 at `480p`, or Kling 3.0 for composition-only tests.
- **Finals:** Seedance 2.5 at `720p` for social, `1080p` for film. Pass the draft's `seed` so the final matches.
- **Ask threshold:** 1,000 credits per call.

## Call shapes

Cost check:
```json
{"tool": "video_generate", "arguments": {"slug": "bytedance-seedance-pro-2.5", "prompt": "...", "duration": 5, "resolution": "480p", "aspectRatio": "16:9"}}
```

Start frame from an approved still:
```json
{"slug": "...", "prompt": "...", "duration": 5, "resolution": "480p", "aspectRatio": "16:9",
 "keyframes": {"start": {"type": "image", "url": "<creation identifier>"}}}
```

References (no start frame): `"references": [{"type": "character", "url": "<identifier>"}, {"type": "image", "url": "<identifier>"}]`

Always pass creation `identifier`s or asset URLs, never `webUrl`. Once the user names a folder, pass `folderReference` on every call — it does not persist.
