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

```
Character turnaround sheet of a South Indian mother, drawn in the style of @style.

IDENTITY: her face shape, eyes, nose, lips, hairline, hairstyle, skin tone and build come from @photo, translated into the illustration style. She must be recognisable as the woman in @photo. @style controls the drawing style only, never her face.

OUTFIT: [a deep maroon Kanchipuram silk saree with a broad gold zari border, matching maroon blouse with elbow-length sleeves], [jasmine flowers in a low bun], small gold jhumka earrings, a thin gold chain, gold bangles on both wrists, a small red bindi.

STYLE: match the drawing style of @style exactly: hand-drawn 2D character illustration in the look of modern animated-feature concept art. Loose, confident sketchy ink linework in dark brown-black with visible overshoot strokes; flat painted colour with soft dry-brush texture and a few loose strokes for fabric folds; minimal shading in one slightly darker tone. Stylised proportions: slender elongated neck, small pointed chin, large almond eyes with a thick black upper lash line, bold expressive brows, small nose, warm brown skin with peach blush on cheeks and nose tip. Muted, earthy palette. NOT photoreal, NOT 3D, NOT anime, NOT chibi.

SHEET: 3 panels side by side on a plain flat off-white background, no scenery, no props, no text, no labels, no cast shadows. Panel 1: full body, front view, standing straight, arms relaxed at her sides. Panel 2: full body, back view, showing the bun and the saree pallu. Panel 3: head-and-shoulders close-up, front view, soft closed-mouth smile. Same character, same outfit, same scale in every panel.
```

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

OUTFIT: a [rose-pink] silk pattu pavadai (long skirt) with a broad gold border at the hem, a matching [rose-pink] blouse with puff sleeves, [two short braids tied with rose-pink ribbons and a small string of jasmine], small gold stud earrings, thin glass bangles, a small black bindi, bare feet.

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

Every character is a 100% match to their own sheet: same face, hair, outfit, colours and proportions. Exactly four people. The twins have identical faces and differ only by outfit colour: rose-pink on the left, peacock-teal on the right.

Same drawing style as @style: loose sketchy ink linework, flat dry-brush colour, muted palette. NOT photoreal, NOT 3D.
```

---

## Check each sheet before moving on

1. Recognisable as the person in the photo? (Show it to someone who knows them.)
2. Drawn in the style of `style-ref.jpg`, not drifted to Pixar-3D or anime?
3. Outfit identical in the front and back panels?
4. Twins: same face, different colour only?
5. No text or labels on the image?
