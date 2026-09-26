# Higgsfield — platform reference

Prices below were read with `generate_video` / `generate_image` and `get_cost: true` in September 2026. Always re-check before spending — it is free and submits nothing.

## Tools by pipeline stage

| Stage | Tool | Cost |
|---|---|---|
| Balance / plan | `balance`, `show_plans_and_credits` | free |
| Multi-step planning | `get_workflow_instructions` (call with no argument first for multi-shot videos) | free |
| Model catalog | `models_explore` (`list` with `type`, `get` with `model_id`, `recommend`) | free |
| Cost check | `generate_video` / `generate_image` with `params.get_cost: true` | free |
| Upload refs | `media_upload_widget` (local files), `media_import_url` (web) → use the returned `media_id` | free |
| Stills | `generate_image` (`count` 1–4 for variants of one prompt); `generate_image_batch` for different prompts | paid |
| Video | `generate_video`; `generate_video_batch` for 2–12 different shots | paid |
| Wait / show | `jobs_wait` (≤12 jobs), then one `show_generation_by_ids` | free |
| Review | `video_analysis_create` / `video_analysis_status` | check |
| Motion transfer | `generate_video` with `hf_mult_motion_control` (Genjutsu) | paid |
| Finish | `upscale_video`, `dubbing`, `generate_audio` | check each |

On a transport timeout the job may already exist — never resubmit blindly; check with the returned job ID first.

## Unlimited generations

Some models carry `supports_unlim`. Leave `use_unlim` unset: if the user holds an allowance, the tool returns a question instead of charging — relay it. Set `use_unlim: true` only when the user explicitly asks.

## Video model IDs (`params.model`)

| Model | ID | Notes |
|---|---|---|
| Seedance 2.5 | `seedance_2_5` | 4–30s, 480p/720p/1080p. `mode`: `t2v`, `omni_reference`, `video_edit`, `video_extension`. |
| Seedance 2.0 / Mini | `seedance_2_0`, `seedance_2_0_mini` | Mini = cheapest Seedance draft. |
| Kling 3.0 / Turbo | `kling3_0`, `kling3_0_turbo` | Multi-shot, audio. `sound: "off"` lowers cost. |
| Cinema Studio 3.0 | `cinematic_studio_3_0` | Higgsfield-only cinematic model. |
| Veo 3.1 / Lite | `veo3_1`, `veo3_1_lite` | |
| Wan 3.0 / Prime | `wan3_0`, `wan3_0_prime` | Up to 30s. |
| MiniMax H3 | `minimax_h3` | 2K, keyframes + mixed refs. |
| Genjutsu motion / replace | `hf_mult_motion_control`, `hf_mult_replace_object` | Motion transfer and object swap. |
| Marketing Studio | `marketing_studio_video` | Product ads, UGC; 12–15s. |

Reference limits per model: run `models_explore` `get` for the model — do not assume Magnific's numbers apply.

## Image model IDs for stills

`nano_banana_pro` (character consistency), `seedream_v5_pro`, `gpt_image_2_5` (general default), `soul_2` / `soul_cinematic` (Higgsfield-only portrait and cinematic looks), `nano_banana_2` (fast, cheap drafts).

## Measured costs (5-second clip, 16:9)

| Model / setting | Credits |
|---|---|
| Seedance 2.0 Mini, 720p | 5 |
| Kling 3.0 (std, sound on) | 8.75 |
| Seedance 2.5, 720p | 35 |
| Seedance 2.5, 1080p | 60 |

Plan pricing (USD, Sept 2026): Plus $49/mo or $39/mo yearly for 1,000 credits; Ultra $129/mo or $99/mo yearly for 3,000 credits.

## Stage defaults

- **Stills:** `nano_banana_pro` for characters, `seedream_v5_pro` for scenes.
- **Drafts:** Seedance 2.5 at `480p`, or `seedance_2_0_mini` for composition-only tests.
- **Finals:** Seedance 2.5 at `720p` / `1080p`.
- **Ask threshold:** 30 credits per call.

## Call shape

```json
{"params": {"model": "seedance_2_5", "prompt": "...", "duration": 5, "resolution": "480p",
  "aspect_ratio": "16:9", "medias": [{"role": "start_image", "value": "<media_id or job_id>"}],
  "get_cost": true}}
```

Remove `get_cost` to submit. `medias[].value` must be a media ID or job ID, never an https URL.
