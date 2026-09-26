# Creative Director — production log

## Chai at dawn (skill test) — 2026-09-26
Platform: Magnific (Premium+) | Credits 272,730 → 265,694 | Spent by this production: 2,716 (~₹122) | Unexplained account spend during the session: 4,320 (not from this production)

Shots: 0 final, 2 drafts (480p), 0 failed generations. Stopped by the user after the drafts.

| Stage | Credits |
|---|---|
| video_plan | 16 |
| Character refs (2 × 2 variants, Nano Banana Pro) | 300 |
| First frames (2 × 2 variants, Seedream 5 Pro) | 400 |
| Drafts (2 × Seedance 2.5, 480p, 5s) | 2,000 |

Failures and fixes:
- Shot 1: pour stopped at 3.2s → cause: prompt contradicted itself ("pour the whole shot" vs "tumblers meet at the end") → fix: make CRITICAL blocks agree with ACTION TIMING.
- Shot 2: "Ah" before the line → cause: prompt asked for an exhale and a breath before the line → fix: no audible cues near dialogue; "no vocal sounds before the line" in THE SCRIPT.
- Shot 2: analysis tool reported burned-in subtitles → user checked: none. Analysis tools can mistake speech for captions; confirm before paying to fix.
- Shot 2: her eyeline did not point at the vendor → cause: look direction written screen-relative ("camera-left") but vendor placed character-relative ("behind her right shoulder"); the first frame already had it wrong → fix: both screen-relative, check eyelines at the still stage.
- video_plan suggested a model slug that does not exist (kling-2-1) → always validate against the catalog.
- creations_wait once returned an empty result for a finished image → confirm with creations_get; never regenerate on that alone.

Rules learned for next time:
- Check eyelines and directions on the first-frame stills — fixing them there costs 100 credits, not 1,000+.
- Build the review checklist from the prompt's own CRITICAL blocks and timing; ask the analysis tool to quote speech.
- Reconcile balance after every paid stage.
