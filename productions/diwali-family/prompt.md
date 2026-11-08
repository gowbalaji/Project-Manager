# Diwali family wish: the flowerpot moment (image-to-video, 5s, 9:16)

## 1. The start-frame photo (this decides the result)

- **When:** at dusk (blue hour, about 15 minutes after sunset). The sky still has deep blue in it. Use **no flash**:
  flash flattens faces, and the model copies that light into every frame.
- **Framing:** vertical, phone at the twins' eye level, about 1.5–2 m away. All four faces in the **upper-middle**
  of the frame, large and sharp. Diyas and the rangoli across the bottom edge.
- **Positions:** twins crouching in front, side by side. Mother kneeling behind the **screen-left** twin, father
  behind the **screen-right** twin, arms around the girls. *If your photo has a different arrangement, edit the
  GEOMETRY line in the prompt to match the photo exactly.*
- **The anar:** stand an **unlit** flowerpot cracker on the ground about 2 m behind the family, visible in the gap
  between the parents. It's a prop only: don't light it for the photo.
- **Sparklers:** either the twins hold burning sparklers in the photo, or they hold nothing. Never unlit ones,
  because the model then has to invent the ignition. If they hold nothing, use the "no sparklers" lines below.
- **Faces:** everyone looking toward the camera or slightly at each other, soft smiles, eyes open. Take 10 shots
  and pick the sharpest.

## 2. Prompt

```
5-second single continuous shot, 9:16 vertical, real-time, no cuts, no slow motion.

Open exactly on the start frame: the same family of four (father, mother and their identical twin daughters) on the front doorstep of their home at dusk. 100% match to the start frame: same faces, hair, outfits, jewellery and positions. Exactly four people; no one else appears at any point.

THE TWINS: two separate little girls with identical faces and matching outfits, side by side in the foreground, each holding her own burning sparkler. They remain two distinct children in every frame: they never merge, never swap places, never duplicate.

GEOMETRY: the twins crouch in the foreground. The mother kneels behind the twin on screen-left, the father kneels behind the twin on screen-right, the parents' arms around the girls. A row of lit clay diyas and a rangoli lie on the ground in front of them. An unlit flowerpot firework stands on the ground about two metres behind them, in the gap between the parents.

ACTION:
0.0-1.5s: everyone holds the pose with soft smiles; the sparklers fizz; the diya flames flicker.
1.5-3.0s: the flowerpot firework ignites and sprays a golden fountain of sparks about 1.5 metres high behind the family; warm golden light flares across all four faces from behind and above.
3.0-5.0s: the twins turn toward each other and laugh; the mother and father look at each other and smile. Nobody stands up; hands and arms stay where they are.

CAMERA: slow push-in of about 15 cm across the whole shot, at the twins' eye level, locked and steady, no shake, no orbit.

LIGHT: warm amber light from the diyas below and the golden fountain behind, deep blue dusk sky above. Sparks follow real gravity: they arc up and fall back, and never touch anyone.

STYLE: photoreal, natural skin texture, true-to-life colour, cinematic shallow depth of field, 24fps natural motion blur, no flicker, no warping, no morphing.

NO ON-SCREEN TEXT: no captions, titles, subtitles, watermarks or logos anywhere in frame.
```

**No sparklers in the photo?** Replace `each holding her own burning sparkler` with `each with her hands resting on her knees`, and replace `the sparklers fizz;` with nothing.

**Negative prompt** (if the model has a field for one):

```
extra person, third child, merged faces, face change, different face, twins swapping, extra fingers, extra limbs, sparks touching skin, fire on clothing, text, captions, watermark, logo, cartoon, 3D render
```

## 3. Settings

- Mode: **image-to-video**, start frame = your photo. Duration 5s, 9:16, highest resolution the plan allows.
- If the model has a "prompt enhancer" or "auto-optimise" toggle, **turn it off**: it rewrites timing and adds
  things you didn't ask for.

## 4. Check each result before you regenerate

1. Still exactly 4 people? Twins still two different children, not merged, not swapped?
2. Faces match your photo from the first frame to the last?
3. Does the fountain start around 1.5s and stay **behind** the family?
4. Do the twins turn to each other, and the parents look at each other?
5. Any text, extra fingers, or sparks landing on someone?

| If you see | Change this one thing |
|---|---|
| Twins merge or one gets cloned | Use a photo with a small gap between the girls, and closer framing |
| Faces drift | Closer framing (faces bigger), fewer moving parts: drop the sparklers |
| The fountain appears in front of them or nowhere | Make the anar more visible in the photo, then regenerate |
| People stand up or wave arms | Keep the "Nobody stands up" line; shorten the 3.0–5.0s beat to "smile at each other" only |

Add "Happy Diwali — From Gowtham and Family" afterwards in an editor (or send me the clip and I'll add the
end card). Don't ask the model to write it.
