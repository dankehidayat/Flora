---
name: Flora
description: A handloom readout — every measured value is a count of finished stripes on undyed cotton.
colors:
  cotton: "#f2efe4"
  warp: "#b0a695"
  ink: "#2b2622"
  ink-soft: "#6b6558"
  indigo: "#1f3a5f"
  indigo-deep: "#16293f"
  kebom: "#5f7355"
  sumatan: "#8c3a2b"
  slack: "#8f8674"
  drained: "#8a8170"
  selvedge: "#948b78"
  leader: "#a49a88"
typography:
  value:
    fontFamily: "Chivo, sans-serif"
    fontSize: "clamp(2.25rem, 10vw, 3rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  unit:
    fontFamily: "Chivo, sans-serif"
    fontSize: "0.4em of value, 0.75em of weft"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0"
    weft:
      fontFamily: "Chivo, sans-serif"
      fontSize: "1.3125rem"
      fontWeight: 700
      lineHeight: 1.2
      letterSpacing: "0"
    place:
      fontFamily: "Chivo, sans-serif"
      fontSize: "1.125rem"
      fontWeight: 700
      lineHeight: 1
      letterSpacing: "0"
    title:

    fontFamily: "Archivo, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
  absent:
    fontFamily: "Chivo, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
  prose:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  clock:
    fontFamily: "Chivo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0"
  wordmark:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.2em"
  sign:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.06em"
rounded:
  none: "0"
spacing:
  hairline: "1px"
  stripe-gap: "1px"
  decade-gap: "3px"
  cloth-x: "20px"
  band-block: "18px"
  head-gap: "10px"
  weft-row: "9px"
  weft-seam-above: "16px"
  weft-seam-below: "20px"
  place-gap: "20px"
  foot-gap: "32px"
  sign-block: "18px"
  hem: "44px"
components:
  band-live:
    backgroundColor: "{colors.cotton}"
    textColor: "{colors.indigo}"
    rounded: "{rounded.none}"
    height: "34px"
  band-unmeasured:
    backgroundColor: "{colors.slack}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    height: "34px"
  band-drained:
    backgroundColor: "{colors.drained}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.none}"
    height: "34px"
  weft-row:
    backgroundColor: "{colors.cotton}"
    textColor: "{colors.indigo}"
    rounded: "{rounded.none}"
    height: "34px"
  selvedge:
    backgroundColor: "{colors.cotton}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    height: "56px"
---

# Design System: Flora

## Overview

**Creative North Star: "The Counted Cloth"**

Flora is a field instrument rendered as handwoven cloth. The governing idea is that a
measurement is a *count*: a value is a run of finished stripes on an undyed cotton ground,
and an absent value is a warp left undyed. Everything follows from that — the palette is
natural dye on undyed cloth, the type is set like a countable quantity, the depth model is
flat because cloth is flat, and motion is discrete because a count either gains a stripe or
it does not.

The material character is woven, not printed-on-glass: taut warp, hard square stripe edges,
the fibre irregularity of a handloom accepted but never wobbled into decoration. Committed
on a restrained ground — indigo carries the measured bands across the large share of the
surface, the other dyes are rare accents that each do exactly one job, and the ground is
never dyed or tinted at all.

The imagery stance is **none**. No photography, no illustration, no icon set, no texture
raster, no device imagery, and no shipping rasters of any kind. An icon or a photograph of a
plant would assert something the device did not measure. The cloth is drawn with rules and
ink.

The motion grammar is **discrete and single-step**. A value grows by exactly the stripes the
device reported gaining, each new stripe settling once over 180ms. No tween carries a number
between two positions, because the device never measured the positions in between. A falling
value loses dye and animates nothing. Under reduced motion, arrival is a swap.

**The reusable signature:** the countable band — a labelled run of 100 unit stripes whose
filled count is the value, with an undyed remainder and two distinct absent states.

**Key Characteristics:**

- A value is a count of stripes, never a chart, gauge, dial, or gradient-filled bar.
- An unmeasured field is visibly unmeasured, and visibly different from a drained one.
- One saturated dye carries the measurement; the ground stays undyed.
- Labels ride hairline leaders at one constant size, so no label outranks another.
- English, plain, one-handed, legible at arm's length in direct sun.

*Surface composition for `/` is held in `.impeccable/surfaces/src-app-page-tsx.md`.*

## Colors

**Strategy: Committed, on a Restrained ground, with a raised floor.** Indigo carries the
measured bands across the large share of the surface; the remaining dyes are rare accents; the
ground is undyed cotton and is never tinted. Colorizing this surface meant **not adding hues
but lifting the pale half of the cloth**: every value that means "not a measurement" used to
sit between 1.09:1 and 2.25:1 on the ground, which is to say below the threshold of seeing, so
in direct sun the undyed remainder of a band, the leaders, and both absent states all
disappeared. Nothing that carries meaning is now below 2.09:1 on the ground, and no status
surface is below 2.9:1.

### Primary

- **Indigo** (`#1f3a5f`): the measurement itself — the filled stripes of a countable band and
  every measured value. 9.98:1 on cotton. The most saturated ink in the system, spent on the
  number and nothing else.
- **Indigo, deep** (`#16293f`): 12.82:1. The quiet half of a measurement — every unit — and the
  one heading on the page. Deeper than the value's own indigo, so it reads as a step down
  rather than a rival.

### Secondary

- **Sumatan** (`#8c3a2b`): the arrival flash, and only that. 6.62:1 on cotton, 3.17:1 against
  the undyed warp. It marks a reading that *changed* between two polls, never a first reading,
  and drains to indigo after one poll. It lands on the **stripe that changed** as well as on
  the number, because the stripe is the thing that changed.

### Tertiary

- **Kebom** (`#7a8c6e`): the weft's colour key — the connection tick, and nothing else. It
  describes the transport, never the soil, and is never used for text (at 3.14:1 on cotton it
  is a mark, not a reading).

### Neutral

- **Undyed cotton** (`#f2efe4`): the ground, and the explicit "nothing measured here" state.
- **Warp** (`#b0a695`): undyed warp, one step into the cloth. 2.09:1 on cotton — visibly cloth
  and never dye, and deep enough that the full 100-unit extent of a band is countable outdoors.
- **Weaver's ink** (`#2b2622`): every label and every heading that is not the page title.
  13.0:1 on cotton.
- **Ink, soft** (`#6b6558`): the one secondary text tone, 5.03:1 on cotton, used for the
  absent-state wording, the clock, and the foot note, and for the void of the disconnected
  tick. It is a hue-shifted warm gray, never a neutral gray.
- **Slack** (`#8f8674`, 3.13:1): the flat bar of a field the device never reported.
- **Drained** (`#8a8170`, 3.30:1): the ghost stripe left in a run the device has stopped
  reporting. It sits on the same undyed warp a live band uses, so the band keeps its full
  extent and its count of where the dye was.
- **Selvedge** (`#948b78`, 2.93:1) and **leader** (`#a49a88`, 2.41:1): hairlines only. The
  leader is the system's whole grammar — it points from a name to a number — so it is set where
  a 1px rule can actually be seen in sun, with the selvedge a step above it because it
  separates.

### Named Rules

**The Undyed Rule.** The ground is never dyed, tinted, or gradient-filled, and no background
treatment ever implies a value. A field not carrying a measurement stays undyed cloth.

**The One Flash Rule.** Sumatan marks exactly one thing: a reading that changed on this poll.
It never appears on a page's first reading, never persists past one poll, and is never a
warning colour, a threshold, or a resting state.

**The Sun Floor Rule.** Nothing that carries meaning sits below 3:1 on the ground, and no
non-text surface below 2.09:1. The design's binding constraint is direct sunlight at arm's
length; a value, a leader, or an absent state that cannot be seen outdoors is not finished,
however correct it is in a screenshot on a desk. This is the reason the undyed side of the
cloth is deeper than a first instinct for delicacy would make it, and it is the one rule that
overrides "the ground is never dyed."

**The Structure Before Tone Rule.** When two states are close in tone, they are told apart by
structure. Slack is a flat bar with no stripe at all; a drained run is 100 discrete stripes.
The connected tick is a filled square, the waiting tick a filled square in ash, the
disconnected tick a hollow void. Kebom and the void sit within 1.07:1 of each other in tone,
so no state on this page is ever carried by colour alone.

**The Place, Not The Air Rule.** Altitude is woven apart from the three air conditions, and the
separation is made with position, interval and value size — never by softening the number or
by leaving it out. It reads off the same sensor as pressure, but it is a property of *where the
device stands* and the one reading here that does not change between polls; filing it as a
fourth condition made a fixed fact about the installation look like a fourth thing to judge.
Its absence still gets the shared absent wording, because a reading the device once reported
and has now stopped reporting is a different fact from a reading it never made.

## Typography

**Display / value face:** **Chivo** (600–800, tabular figures).
**Label / leader face:** **Archivo** (400–700).
Both self-hosted through `next/font`, subset to latin, and loaded at only the weights the page
uses — three each, with no 900 and no 500 shipped to a page whose one hard constraint is
payload on a phone in a field.

**Character:** counted, not styled. A value is set in one face at one size, and the size
carries the meaning — the largest ink on the page is the quantity that matters most, and
everything else steps down. Labels are set at a single constant size wherever they appear, so
no label outranks another by accident. Chivo is a sturdy, slightly squared grotesque
descending from industrial and signage lettering, which is why it is the value voice and not
a neutral interface sans; its tabular figures are load-bearing, because a changing count must
never shift width.

**The scale is a ladder, not a pile.** Every adjacent step is a real step —
`39 / 21 / 18 / 15 / 14 / 13` at a 390px phone — and no two roles share a size while doing
different jobs. Roles are separated by size, weight, face, case, tracking and hue together,
never by size alone. A first pass at this page had a 15px title and a 15px absent wording, and
11px and 12px labels; the collisions were invisible on a desk and were the reason the system
read as an undifferentiated grey field in sunlight.

### Hierarchy

- **Value** (Chivo 800, `clamp(2.25rem, 10vw, 3rem)`, line-height 1, `-0.025em`, tabular):
  the soil percentage. Right-aligned in a field of `4ch`, so digits sit on a common edge.
- **Unit** (Chivo 600, `0.4em` of the value and `0.75em` of the weft value, so one absolute
  size in both contexts): the `%`, `°C`, `hPa` and `m`. It is part of the quantity, so it keeps
  the quantity's hue in its deepest form, and it steps down in size and weight because it is
  the quieter half of one fact. Set at the value's own weight it was a number and a symbol
  shouting together, which is the difference between a counted quantity and a styled one.
- **Weft value** (Chivo 700, `1.3125rem`, tabular): the three air conditions, right-aligned in
  an `8ch` field wide enough for the longest reading, so all four weft values sit on one
  common right edge. The leaders are deliberately *not* all one length: a leader is the thread
  running from a name to a number, and the names differ, so the threads differ. An earlier
  version of this document claimed four equal leaders; they never were and could not be
  without allocating the label as a fixed field and letting the name stop naming.
- **Place value** (Chivo 700, `1.125rem`, tabular, indigo-deep): the altitude, and only the
  altitude. It is the rung below the weft value and the deepest half of the measurement dye —
  not the deepest tone on the page, which is reserved for absent wording, so a reading the
  device did make can never be misread as a reading it failed to make.
- **Title** (Archivo 700, `1.125rem`, indigo-deep): the page title, and the only heading. It
  carries its own weight, is not a kicker above anything, and it stays deliberately modest —
  the largest ink belongs to the measurement, not the heading. Its rank comes from hue rather
  than from size, because a hue step survives glare at a distance in a way three pixels of type
  size does not.
- **Label** (Archivo 600, `0.8125rem`, `0.08em`, uppercase): the probe name and the name of
  every weft reading. One size, all seven, always. This was 11px for the probes and 12px
  sentence-case for the air readings, so the system's own rule was being broken by its own CSS
  and the text that names what the number means was the smallest ink on the page. 13px is the
  floor; below it, nothing is readable outdoors.
- **Absent** (Chivo 600, `0.9375rem`, ink-soft): the wording that replaces a missing number,
  set in the value's own face and right-aligned into the value's own field, so a row's right
  edge reads as one family whether it holds a count or the words standing in for one. It
  borrows the value's shape and none of its weight or colour, and an absence that reflows the
  row it is standing in for is not occupying the value's space.
- **Prose** (Archivo 400, `0.875rem`, line-height 1.6, measure capped at 68ch): running text.
  The foot's paragraph is gone, so this role now has exactly one home, the 404's body.
- **Clock** (Chivo 600, `0.8125rem`, tabular): the device's own time in the selvedge.
- **Wordmark** (Archivo 700, `0.8125rem`, `0.2em`, uppercase): "Flora" in the selvedge.
- **Sign** (Archivo 700, `0.8125rem`, `0.06em`): the maker's mark at the hem. The same 13px
  rung as the label and the clock, in the darkest ink, right-anchored to the value edge. It is
  not the wordmark setting — the attribution is a kept brand commitment and is reproduced
  verbatim rather than recased — but it closes on the wordmark's own logic: the one piece of
  the maker's hand, at the end of the cloth.

### Named Rules

**The Fixed Place Rule.** Every measured quantity occupies a fixed decimal place and a fixed
width. A value changing between polls may not resize, reflow, or shift the layout around it;
its field is allocated before its content is known.

**The No Jargon Rule.** No part number, no protocol name, and no unit of measurement the
grower has no reason to know appears in the interface. Raw sensor values are fetched and
carried, and never displayed.

## Layout

One column, one cloth. A countable band is a full-width horizontal run of 100 unit stripes,
so the count is read left to right, the way cloth is read. Three probes are stacked bands,
never a grid of cards. Beneath them a selvedge seam — heavier than any rule inside either
group, and set against a gap roughly three times the one between two bands — closes the answer
and opens the context: the three conditions of the air packed tight, then the altitude alone
below them. The device's own clock lives in the selvedge — the cloth's edge line — not in a
header bar. The maker's mark lives at the hem, right-anchored to the same edge every value
ends on, and the hem is pinned to the fold rather than to wherever the last reading stopped.
The whole answer fits in the first viewport at phone size; no scroll is required to answer
"does the soil need water".

**The page descends.** Every quantity is a rung below the one above it: 39 for the soil, 21 for
the air, 18 for the place, 13 for the sign. Nothing on the page is set at a size that does not
say where it sits in that order.

**Spacing rhythm:** one 4px base step.

| Step | Value | Where |
|---|---|---|
| hairline | 1px | every rule, stripe gap, leader |
| stripe gap | 1px | between unit stripes inside a decade |
| decade gap | 3px | between decades — the only wider gap in the run |
| cloth-x | 20px (28px ≥480px) | cloth side margin |
| band-block | 18px | vertical padding of a band |
| head gap | 10px | label row to stripe run |
| weft-row | 9px | vertical padding of a weft row |
| weft-seam-above | 16px | last stripe run to the group seam |
| weft-seam-below | 20px | the group seam to the first air row |
| place gap | 20px | last air row to the altitude line |
| foot gap | 32px | the weft strip to the foot's selvedge rule |
| sign block | 18px | the foot's rule to the maker's mark |
| hem | 44px | below the maker's mark to the end of the cloth |
| warp height | 34px (44px ≥480px) | the band run itself |
| cloth measure | 720px max | the cloth's width |

Free space on a tall phone is absorbed by the weft strip's bottom margin, not by the foot's top
margin, so a cloth too short to fill the screen drops its sign to the fold while a cloth too
tall to fit keeps its 32px gap to the sign.

**Stripe measure:** 100 stripes, so one stripe is exactly one percentage point. At the 720px
desktop measure a stripe is about 5.6px and is unit-countable; at a 390px phone it is about
2.5px and is countable by decade, with the printed value as the authoritative number. This
limit is stated rather than hidden: a percentage cannot be both exactly 100 discrete units
and comfortably countable on a phone.

**Responsive behaviour:** the cloth is full-bleed and single-column at every width, because
the count is the message and a second column would halve it. What scales is the stripe unit,
the band height, and the value size — never the number of bands shown at once. **The count is
never shrunk into an unreadable miniature to fit a layout**: bands that do not fit are found
by scrolling, never by compressing.

## Elevation & Depth

**This system uses no shadows, no gradients, no glass, no blur, and no elevation of any
kind.** Cloth is flat, and the flatness is the discipline. Depth is conveyed by exactly two
things: ink density, and the count of stripes in a band. A surface either carries a
measurement or it is undyed ground; there is no third raised-panel state, and nothing lifts
on hover.

### Named Rules

**The Flat Cloth Rule.** If a proposed treatment needs a shadow, a glow, or a gradient to be
legible, the information hierarchy is wrong. Fix the hierarchy, not the treatment.

## Shapes

Square selvedges, everywhere. Every radius in the system is `0`. Stripes end square against
the cloth's edge; the only soft geometry permitted is the printed edge of the cloth itself
and the fibre irregularity of a weave, which may be suggested but never wobbled, frilled, or
feathered. No pills, no circles, no donut gauges, no rounded cards, no icon containers. The
connection tick is a 9px square. Unit stripes are one width within a band and align to a
single vertical rhythm across all bands, so different readings can be compared by eye without
a legend.

## Components

### The countable band

The system's one real component, and the product's whole answer. Three exist on `/` and they
are peers: same height, same value size, same label size, same order every poll.

- **Shape:** square (0px). Run height 34px on a phone, 44px from 480px.
- **Live:** 100 stripes of 1px gap inside 10 decades of 3px gap; filled stripes indigo,
  remainder undyed warp. Value printed right-aligned in `4ch` in indigo, with its `%` stepped
  down beside it.
- **Unmeasured:** the run becomes a flat bar of slack `#8f8674` with no stripe structure at
  all, so it can never be miscounted as a run of low values. Wording: "not measured".
- **Drained:** the run keeps its full 100-unit extent on the same undyed warp a live band uses,
  and the stripes the device last dyed survive as a countable ghost in drained `#8a8170` — the
  dye has washed out, and what is left is the cloth remembering where it was. No number is
  shown, because the device is not reporting one. Wording: "no longer reporting". This state
  was a pale slab at 1.45:1 that vanished outdoors and read as empty cloth; it now says what it
  means using the component's own grammar, and it is still unmistakably not a measurement
  because there is no indigo anywhere in it.
- **Waiting (before the first poll):** the warp is simply undyed and the wording is
  "waiting" — nothing is claimed and nothing is counted. Before distillation this state was
  expressed by a magic `newFrom={101}` and applied to the bands only, so during the first poll
  the bands said "waiting" while the weft rows said "not measured": two different claims about
  the same instant. One `pending` flag now drives both, and the wording comes from a single
  function so the two strips cannot drift again.
- **Arrival:** only newly dyed stripes animate, once, 180ms, `cubic-bezier(0.16, 1, 0.3, 1)`,
  from `scaleX(0.25)` and `opacity: 0`, and they arrive in sumatan alongside the number and
  drain to indigo on the next poll on their own. Under `prefers-reduced-motion` there is no
  animation.

### Leader row

Label, then a hairline leader that flexes, then the value. The leader is the whole device
vocabulary: it points from a name to a number without a legend and without a border box.

### The weft strip

The context, not the answer, woven in two lengths. It states what the air is doing and where
the device stands, never how the transport is doing. It carries no scale and no thresholds, and
no colour key for the soil — Kebom is not used here.

- **The seam:** a `1px` selvedge above the strip and the last band's own bottom rule removed
  below it, so the boundary between the answer and the context is one rule, in one place, in
  the tone that separates rather than the tone that points. The gap it sits in is roughly three
  times the gap between two soil bands.
- **The three conditions:** temperature, humidity and pressure, packed at one 9px cadence with
  no rule between them. They carried a leader-tone rule each, which made the strip read as a
  ruled table and put three more hairlines on a page that already had seven. They are peers
  already — one label size, one value size, one right edge — and proximity says so without a
  line.
- **The place:** altitude, alone, below the group, carrying no rule beneath it and set a rung
  down the value ladder in indigo-deep. A squint reads a closed block of three and then a
  single line, which is the whole of the distinction.

### The hem

The foot is one line and links nowhere. The maker's mark sits right-anchored to the value edge,
so the cloth is signed on the same edge every number in it ends on, and the hem is pinned to
the fold rather than to wherever the last reading happened to stop.

It used to carry three equal-weight left-ragged paragraphs held apart by ad-hoc inline margins,
and the only chromatic text among them was a link out to a site with nothing to do with a soil
reading — indigo and underlined, so it outranked the air values while explaining none of them.
The prose claim beside it restated what the interface already enforces by construction, which
is what a page says when it does not trust its own work. Both are gone. The Energy Monitor link
and its label were removed earlier for the same reason: a product page that advertises a
different product on its own foot describes itself by what it is not.

The foot's bottom rule is gone too. It sat below the last element of the document, separating
the cloth from an absence.

### The selvedge

The cloth's top edge: the wordmark, a leader, the connection mark, and the device's own clock.
It is not a navbar and has no menu, no glass, and no shadow.

The mark carries **two** states, not three. A filled square in kebom when the pins answered, a
hollow square when they did not. It used to carry a third state for "still waiting", which was
surplus: before the first poll every band already read "waiting" and its warp was undyed, so
the mark repeated what the cloth said four lines below it. Dropping it also fixed a real defect
— the waiting mark was slack and the live mark was kebom, and those two greys measured
**1.005:1** against each other. The same tone, separated only by hue, which is nothing at all
once sunlight flattens it.

What survives is told apart by shape, which sunlight cannot flatten. Kebom was also deepened to
`#5f7355` for this mark: at 3.14:1 a 9px square had no margin left once glare took its
contrast, and it now sits at 4.48:1 while staying 2.23:1 clear of indigo.

## Do's and Don'ts

### Do:

- **Do** set every measured value as a countable run of stripes whose filled count is the
  value, with the unit stated once beside it in a quieter size and weight than the number.
- **Do** leave an unmeasured field undyed, slack, or drained, and say in words that the device
  did not report it.
- **Do** keep "never reported" and "stopped reporting" visually and verbally distinct.
- **Do** label every reading on a hairline leader at one constant label size, so the three
  probes read as peers and no label outranks another.
- **Do** separate what is a condition from what is a place with structure — interval, position
  and value size — and never by weakening a number the device did report.
- **Do** let a value land in a single discrete step, one stripe per reported point, in a
  fixed decimal place.
- **Do** spend indigo on the measurement and keep the ground undyed, so the eye lands on the
  number first at arm's length in sun.
- **Do** hold every meaning-bearing mark at or above the Sun Floor, and tell close states apart
  by structure rather than by tone.
- **Do** load only the font weights the page uses, and keep each role on one size, one weight,
  and one face across every screen and state.
- **Do** write plain English with no unexplained technical vocabulary, and a full stop
  as the decimal separator (`29.4 °C`). *This guardrail previously forbade English and
  required a comma decimal separator for Indonesian. Both were reversed by explicit user
  decision; see PRODUCT.md.*

### Don't:

- **Don't** add cards, panels, tiles, charts, sparklines, trends, history, thresholds, or
  alerts. Lean is the constraint, not a missing feature.
- **Don't** use gradients, glass, backdrop blur, drop shadows, hover lift, or any radius.
- **Don't** let a failed pin render as `0` inside the rhythm, or keep showing its last value
  as though it were current — a number the device is not reporting is not shown at all.
- **Don't** tween, ease, or interpolate a value between two counts.
- **Don't** use colour as a verdict: no red for "dry", no green for "healthy", no badge that
  tells the grower what to do. The product reports measurements and does not decide.
- **Don't** use icons as labels, and don't use photography, illustration, or texture rasters.
- **Don't** add a second dye to a field that carries no measurement.
- **Don't** let the stripes wobble, feather, or gradient-fade into craft decoration, and don't
  wrap the count into a miniature to save space.
- **Don't** flash a reading that has just arrived for the first time; only a *change* flashes.
- **Don't** let a unit, an absent wording, or a title be set at the same size as the role it
  sits beside, and don't let an absence reflow the row it is standing in for.
- **Don't** lighten the cloth's undyed side for delicacy. A leader or a remainder that is
  beautiful on a desk and invisible at noon in a field is a defect.
- **Don't** restore "PT. Labdha Teknika Nusantara" anywhere, metadata included, and don't
  reintroduce a language the product has not been told to speak. *The previous wording of this
  line was "Don't ship English" — that was a user-confirmed commitment, since reversed.*
- **Don't** let the foot grow a second line, a link, or a claim. The cloth is the answer; the
  hem is a maker's mark, and anything added there is competing with a soil reading for
  attention it has not earned.
- **Don't** rule every row. Proximity groups peers; a rule is for a boundary, and a page of
  hairlines is a page whose groups are indistinguishable from its members.
