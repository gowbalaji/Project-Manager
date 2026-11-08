# Diwali family: character sheet prompts (2D illustrated style)

Style reference: `refs/style-ref.jpg` (hand-drawn 2D, sketchy ink, flat painted colour, big almond eyes, muted palette).

## How to run these

Each prompt uses two image references:
- **@style** = `refs/style-ref.jpg`. It controls the drawing style only, not the face or the outfit.
- **@photo** = a clear, front-facing photo of that person: good daylight, no sunglasses, face filling about a third of the frame.

Order: **Mother → Father → Twin A → Twin B (made from Twin A's sheet) → Family lineup.** Generate 2–4 variants of each
and pick before moving on. Twin B is built from Twin A's sheet, so their faces come out identical.

Use a model that takes several image references (Nano Banana Pro / GPT Image class). Text in the brackets
`[ ]` is a default: edit it to your real outfits.

---

## Shared blocks (already pasted into every prompt below)

**STYLE:** Match the drawing style of @style exactly: a hand-drawn 2D character illustration in the look of modern
animated-feature concept art. Loose, confident sketchy ink linework in dark brown-black with visible overshoot
strokes; flat painted colour with soft dry-brush texture and a few loose strokes for fabric folds; minimal shading in
one slightly darker tone. Stylised proportions: slender elongated neck, small pointed chin, large almond eyes with a
thick black upper lash line, bold expressive brows, small nose, warm brown skin with peach blush on cheeks and nose
tip. Muted, earthy palette. NOT photoreal, NOT 3D, NOT anime, NOT chibi.

**SHEET:** A character turnaround sheet in one image: 3 panels side by side on a plain flat off-white background,
no scenery, no props, no text, no labels, no cast shadows. Panel 1: full body, front view, standing straight, arms
relaxed at the sides. Panel 2: full body, back view. Panel 3: head-and-shoulders close-up, front view, soft closed-mouth
smile. Same character, same outfit, same scale in every panel.

---

## 1. Mother

References: **@photo** = front-facing photo (pink saree, main identity), **@photo2** = laughing photo (smile only),
**@style** = `refs/style-ref.jpg`. The photos are kept out of this repo on purpose.

```
Character turnaround sheet of a South Indian mother, drawn in the style of @style.

IDENTITY (most important): she is the woman in @photo, translated into the illustration style and clearly recognisable as her. Keep her real features: a soft oval face with full cheeks and a rounded chin, warm medium-brown skin (keep this exact depth of skin tone, do NOT lighten it), dark brown eyes with a gentle, slightly hooded shape, straight natural brows, a small rounded nose with a tiny gold nose stud on her left nostril, full lips, and black hair pulled back from the forehead into a low bun. A tiny dark bindi. Her natural build, not slimmed. Use @photo2 only for how her smile looks: a wide, warm, open laugh. @style controls the drawing style only; it must NOT change her face shape, chin, skin tone or body build.

OUTFIT (the same saree as in @photo): a soft pastel-pink saree with darker rose-pink floral and leaf motifs washed through the fabric, a scalloped embroidered pink border lined with tiny sparkling stones, the pallu draped over her left shoulder; a matching light-pink blouse with short sleeves and scalloped sleeve edges. Jasmine flowers around the low bun, gold jhumka drop earrings, a thin gold chain with a small beaded pendant, a thin gold bangle on each wrist.

STYLE: match the drawing style of @style: hand-drawn 2D character illustration in the look of modern animated-feature concept art. Loose, confident sketchy ink linework in dark brown-black with visible overshoot strokes; flat painted colour with soft dry-brush texture and a few loose strokes for fabric folds; minimal shading in one slightly darker tone. Large expressive eyes with a thick black upper lash line and peach blush on cheeks and nose tip, but her own face shape and proportions. Muted, earthy palette. NOT photoreal, NOT 3D, NOT anime, NOT chibi.

SHEET: 3 panels side by side on a plain flat off-white background, no scenery, no props, no text, no labels, no cast shadows. Panel 1: full body, front view, standing straight, arms relaxed at her sides. Panel 2: full body, back view, showing the bun with jasmine and the saree pallu. Panel 3: head-and-shoulders close-up, front view, warm open smile as in @photo2. Same character, same outfit, same scale in every panel.
```

**Check:** show the close-up panel to someone who knows her, without telling them who it is. If they don't say
her name, the likeness failed: regenerate before making any other sheet.

## 2. Father

```
Character turnaround sheet of a South Indian father, drawn in the style of @style.

IDENTITY: his face shape, eyes, nose, hairline, hairstyle, facial hair, skin tone and build come from @photo, translated into the illustration style. He must be recognisable as the man in @photo. @style controls the drawing style only, never his face.

OUTFIT: [a cream silk shirt with full sleeves rolled once at the cuff], [a cream silk veshti with a thin gold border], [a gold-bordered angavastram over the left shoulder], a simple steel wristwatch on the left wrist, [a thin sandal-paste line on the forehead], bare feet.

STYLE: match the drawing style of @style exactly: hand-drawn 2D character illustration in the look of modern animated-feature concept art. Loose, confident sketchy ink linework in dark brown-black with visible overshoot strokes; flat painted colour with soft dry-brush texture and a few loose strokes for fabric folds; minimal shading in one slightly darker tone. Stylised proportions adapted for a man: long neck, defined jaw, large almond eyes, bold expressive brows, small nose, warm brown skin. Muted, earthy palette. NOT photoreal, NOT 3D, NOT anime, NOT chibi.

SHEET: 3 panels side by side on a plain flat off-white background, no scenery, no props, no text, no labels, no cast shadows. Panel 1: full body, front view, standing straight, arms relaxed at his sides. Panel 2: full body, back view. Panel 3: head-and-shoulders close-up, front view, warm closed-mouth smile. Same character, same outfit, same scale in every panel.
```

## 3. Twin A

```
Character turnaround sheet of a [6]-year-old South Indian girl, drawn in the style of @style.

IDENTITY: her face shape, eyes, nose, hairline, hair length, skin tone and build come from @photo, translated into the illustration style with child proportions (bigger head relative to the body, rounder cheeks, shorter limbs). She must be recognisable as the girl in @photo. @style controls the drawing style only, never her face.

OUTFIT: a [mango-yellow] silk pattu pavadai (long skirt) with a broad gold border at the hem, a matching [mango-yellow] blouse with puff sleeves, [two short braids tied with mango-yellow ribbons and a small string of jasmine], small gold stud earrings, thin glass bangles, a small black bindi, bare feet.

STYLE: match the drawing style of @style exactly: hand-drawn 2D character illustration in the look of modern animated-feature concept art. Loose, confident sketchy ink linework in dark brown-black with visible overshoot strokes; flat painted colour with soft dry-brush texture and a few loose strokes for fabric folds; minimal shading in one slightly darker tone. Large almond eyes with lashes, bold little brows, small nose, warm brown skin with peach blush. Muted, earthy palette. NOT photoreal, NOT 3D, NOT anime, NOT chibi.

SHEET: 3 panels side by side on a plain flat off-white background, no scenery, no props, no text, no labels, no cast shadows. Panel 1: full body, front view, standing straight, arms relaxed at her sides. Panel 2: full body, back view, showing the braids and ribbons. Panel 3: head-and-shoulders close-up, front view, happy closed-mouth smile. Same character, same outfit, same scale in every panel.
```

## 4. Twin B (references: @twinA = the chosen Twin A sheet, @style)

```
Character turnaround sheet of Twin A's identical twin sister, drawn in the style of @style.

IDENTITY: an exact copy of the girl in @twinA: the same face, eyes, nose, smile, skin tone, hair length, height and build, pixel-for-pixel the same character design. The ONLY differences are the outfit colour and the ribbon colour below.

OUTFIT: identical design to @twinA but in [peacock-teal]: a [peacock-teal] silk pattu pavadai with the same broad gold border, a matching [peacock-teal] blouse with puff sleeves, [two short braids tied with peacock-teal ribbons and a small string of jasmine], the same gold stud earrings, glass bangles, small black bindi, bare feet.

STYLE: identical drawing style, linework, colour treatment and proportions to @twinA and @style. NOT photoreal, NOT 3D, NOT anime, NOT chibi.

SHEET: the same layout as @twinA: 3 panels side by side on a plain flat off-white background, no scenery, no props, no text, no labels, no cast shadows. Panel 1: full body, front view. Panel 2: full body, back view. Panel 3: head-and-shoulders close-up, front view, happy closed-mouth smile. Same scale as @twinA.
```

## 5. Family lineup (references: the 4 chosen sheets, @style)

```
One full-body family lineup in the style of @style: the four characters from @mother, @father, @twinA and @twinB standing side by side, front view, on a plain flat off-white background, no scenery, no text, no labels, no cast shadows.

Left to right: @mother, @twinA, @twinB, @father. The twins stand in front of and between the parents, reaching about their parents' waist [adjust to real heights]. Mother is about a head shorter than father.

Every character is a 100% match to their own sheet: same face, hair, outfit, colours and proportions. Exactly four people. The twins have identical faces and differ only by outfit colour: mango-yellow on the left, peacock-teal on the right.

Same drawing style as @style: loose sketchy ink linework, flat dry-brush colour, muted palette. NOT photoreal, NOT 3D.
```

---

## Check each sheet before moving on

1. Recognisable as the person in the photo? (Show it to someone who knows them.)
2. Drawn in the style of `style-ref.jpg`, not drifted to Pixar-3D or anime?
3. Outfit identical in the front and back panels?
4. Twins: same face, different colour only?
5. No text or labels on the image?

---

## Option B: one family sheet from the group selfie (current approach)

References: **@photo** = the family selfie (left to right: father, Twin A, mother, Twin B; background people ignored),
**@style** = `refs/style-ref.jpg`. The photo is kept out of this repo on purpose.

Changes from the per-person plan:
- The twins look different in the selfie (round face with hair pulled back vs longer face with loose waves), so each
  is drawn from her own face. Twin B is NOT copied from Twin A unless they turn out to be identical.
- Both parents wear glasses in the selfie: father gold-rimmed rectangular, mother thin silver rimless.
- Layout: one image with 4 full-body front views on top and 4 face close-ups below. No back views; add them later
  per person if the video needs turns.

The full prompt was shared in chat on 2026-11-08; regenerate it from the details above if needed.
