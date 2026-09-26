---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface brief — `/` (Flora dashboard)

**Route:** `src/app/page.tsx` (one page, plus `/api/sensor-data` read-only).
**Visitor mode:** Operate. The visitor completes one task: decide whether the soil needs water, now.
**Audience:** Indonesian growers and agronomists, one-handed, on a phone, outdoors in direct sun or indoors at home or in the office.
**Job / task:** Read the current condition of the plot's soil and air, then act. Read-only; the page sends nothing to the device.
**Proof / content:** Live readings from fixed Blynk pins (`v0`–`v3` air, `v4`–`v6` soil %, `v7`–`v9` raw), the device's own RTC clock, and connection state. Nothing else exists and nothing else may be implied.
**Constraints:** English throughout, by explicit user decision reversing an earlier Bahasa Indonesia commitment (see PRODUCT.md). Never display a number the device did not measure. No history, charts, thresholds, or alerting. No payload, no telemetry, no accounts. "PT. Labdha Teknika Nusantara" is removed; the name is Flora.
**Unresolved decisions:** No formal accessibility conformance target has been set. The outbound links are settled: `dankehidayat.my.id` stays in the foot, the Energy Monitor link and its label are removed. The API route resolves a failed pin fetch to `null` and the surface renders three distinct states (live / drained / unmeasured). A pin that stops reporting shows no number at all.

**Chosen direction:** Lurik / Tenun — the handwoven stripe as a count of measured things. **Memorable moment:** on the next poll a band grows exactly one finished stripe, so a value is never seen sliding between two numbers the device never measured.

## Direction contract

**THESIS.** A handloom readout: each value is a count of finished stripes, and a probe the device did not measure is a warp left undyed. It refuses the category default — a four-tile KPI card grid above three donut gauges, gradient-filled, in English.

**OWN-WORLD.** Undyed cotton ground with natural-dye indigo, kebom green, sumatan red and weaver's ink. Everything is warp and weft: bands instead of cards, a count instead of a chart, a selvedge line instead of a navbar rule, leader-line labels instead of a legend. No gradients, no glass, no shadows, no icon set. Flat printed ground, hard stripe edges, one ink doing one job.

**STORY.** The grower learns that this is their own plot, measured and nothing more; believes the number because it is countable and because an absent reading is visibly absent; and acts — waters, or does not — then closes the page.

**FIRST VIEWPORT.** One cloth, no scrolling to the answer. Three woven bands stacked top to bottom, one per probe, each a run of finished stripes stopping at the measured value, its label on a hairline leader at the band head. Beneath them a narrow weft strip carries the four air readings. The plot's own clock runs in the selvedge at the top edge. Highest-contrast ink on the largest band is the first thing the eye lands on.

**FORM.** Lurik / Tenun — the handwoven lurik and tenun warp-ikat stripe system. Position 5 of 7 on the ordered grounded list for hand 2, and the roll's assignment (THE ROLL); it won the round after one plain re-roll retired hand 1. Seed key `826820d7`. Build path: code-led, no comp owed.

**FINISH.** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

---

## Run status

Build complete for seed `826820d7` (kind `assigned`, build path code-led). FINISH discharged:
finish review run, verdict recorded, `DESIGN.md` carbonised from the built world, and the
sidecar `.impeccable/design.json` written. The surface ships no raster assets, so there is no
image provenance to record.

- Evidence: `.impeccable/review/desktop-live-1440.png`, `mobile-live-390.png`,
  `mobile-drained-390.png`, `mobile-unmeasured-390.png`, `mobile-signature-flash-390.png`.
- Detector: clean. `impeccable doctor`: no drift.

### Second pass — typeset, colorize, foot

Refinement of the incumbent world; no visual world was replaced.

- **Typeset.** The scale was a pile of adjacent values, not a ladder: a 15px title against a
  15px absent wording, 11px probe labels against 12px weft labels, 12px foot prose in the
  lightest weight on the page, and `%` set at the same 800 weight as the digits it follows. It
  is now `39 / 21 / 18 / 15 / 14 / 13` at a 390px phone with no two roles sharing a size
  while doing different jobs. Labels collapsed to one 13px size for all seven readings, which
  is the rule the CSS had been breaking. The absent wording moved into the value's own face
  and into the value's own right-aligned field, so a band no longer reflows when it flips to
  drained. Chivo 400/900 and Archivo 500 are no longer shipped.
- **Colorize.** Not more hue — a raised floor. Every value meaning "not a measurement" sat
  between 1.09:1 and 2.25:1 on the ground, so the undyed remainder of a band, both hairlines
  and both absent states disappeared in direct sun. Warp, slack, drained, leader and selvedge
  were deepened to 2.09:1–3.30:1; the title and every unit took the previously dead
  `--color-indigo-deep`; the foot link took the action's indigo. The drained state was rebuilt
  as a countable ghost on a full-extent run instead of a 1.45:1 pale slab, and the connection
  tick gained a third structural state so transport is never carried by colour alone.
  Two rules added: **The Sun Floor Rule** and **The Structure Before Tone Rule.**
- **Foot.** The Energy Monitor link and its label are removed by decision. `dankehidayat.my.id`
  and the attribution remain.
- Verified: `impeccable detect` clean on the type and layout scopes; `doctor` reports no drift;
  eslint and `tsc --noEmit` clean. Inspected at 390, 320 and 1440 in the live, drained,
  unmeasured, flash, offline and 404 states. The whole answer plus the weft strip ends 246px
  above the fold on a 390×844 phone.
- `next build` fails on `/_global-error` prerender with `Cannot read properties of null
  (reading 'useContext')`. Verified pre-existing: the identical failure reproduces at HEAD with
  every change of this pass reverted. Not introduced here, and not fixed here.

Open, and not settled by this pass: the formal accessibility conformance target, and the
question of whether a device-reported `0` is a measurement — see below.

### Third pass — layout: the foot, the weft, the altitude

`layout` on the incumbent world. No visual world was replaced, and no reading was added,
removed, or reworded — the two copy removals below are the user's explicit decision, recorded
here because PRODUCT.md previously promised the opposite for one of them.

**Diagnosis, from rendered evidence at 390, 320 and 1440.** The squint test failed the
secondary: `SOIL 3` and `ALTITUDE` were the same visual object, because the four air rows
continued the band rhythm with only a value-size change and nothing marked the boundary
between the answer and the context. The foot was three equal-weight left-ragged paragraphs
held apart by inline `marginTop: 8 / 16` — off-scale magic numbers, no hierarchy, no anchor —
plus a `border-bottom` drawing a rule at the page hem with nothing after it. The author's site
was rendered indigo and underlined, the only chromatic text outside a measurement, so it
outranked three air readings while explaining none of them. `globals.css` asserted that all
four weft leaders were the same length; they cannot be, the labels differ. Every weft row also
carried a leader-tone rule, turning the strip into a ruled table and putting ten hairlines on
a 390px page.

**The spatial thesis.** The three bands do not move. The three air conditions become a closed
group, opened by a selvedge-tone seam that replaces the last band's own bottom rule and sits
in a gap ~3x the one between two bands. Altitude leaves the peer list and becomes a lone line
below that group, a rung down the value ladder in indigo-deep. The foot becomes one line,
right-anchored to the value edge, with the hem pinned to the fold. The page now descends:
`39` soil → `21` air → `18` place → `13` sign.

- **Weft strip.** Seam above, one rule, in the tone that separates. Rows unruled — proximity,
  not hairlines. Altitude separated by the strip's largest interval, no rule beneath, at
  `1.125rem` in `--color-indigo-deep`. Every row is now the same `WeftRow` component, so a row
  cannot acquire an absent state, a fixed place, or a spoken form the rows around it lack.
- **The Place, Not The Air Rule** added to DESIGN.md. Its absence still draws the shared absent
  wording: a reading the device once reported and has now stopped reporting is a different
  fact from one it never made.
- **Hem.** `dankehidayat.my.id` and the prose claim are removed. The foot's bottom rule is
  removed. The cloth is now a flex column that is never shorter than the screen; free space is
  absorbed by the weft's bottom margin rather than the foot's top margin, so a short cloth
  drops its sign to the fold and a tall one keeps its 32px gap.
- **Leader floor** 12px → 20px. The absent wording is wide enough to crush the leader to its
  floor, so the thread vanished exactly when the row was least normal. Checked at 320px
  against the longest label and the widest absent wording: 236px of a 280px cloth.
- **`.foot-note` → `.prose`**, because the foot has no note left and the class now has one
  home, the 404's body. Its rule and measure are unchanged.

**Two decisions, both the user's, not the design's:** the outbound link to the author's site is
removed as out of nowhere, and `COPY.foot` is removed outright. The foot therefore has no
second line, no link, and no claim. If either is ever wanted back, the answer is a shorter
sentence than the one that was cut — but nothing is added here.

- Evidence: `.impeccable/review/mobile-live-390.png`, `desktop-live-1440.png`,
  `mobile-narrow-320.png`, `mobile-drained-390.png`, `mobile-unmeasured-390.png`,
  `mobile-offline-390.png`, `mobile-404-390.png`.
- Detector: clean on the layout scope and on all of `src/app`. eslint and `tsc --noEmit` clean.
  Inspected at 390, 320 and 1440 in the live, drained, unmeasured, offline and 404 states; the
  answer, the weft and the sign all finish inside a 390x844 first viewport.

**Observed on live hardware, unchanged by this pass.** The device still reports `v5: 0` and
`v6: 0` with raw `v8: 4095` and `v9: 4095`, and the device RTC still reads 20 November 2025.
Both are firmware questions and are untouched here.

**Observed on live hardware, out of scope for this pass, needs a decision.** The real Blynk
endpoint currently returns `v5: 0` and `v6: 0` with raw `v8: 4095` and `v9: 4095`, and the page
renders those as `0 %` in full indigo. 4095 is the 12-bit ADC rail, so those probes are reading
the rail rather than soil. PRODUCT.md records a failed fetch as resolving to `0`; the route
code actually returns `null` on every transport failure, so the risk as written is stale and
the live `0` is coming from the device, not from the transport. Deciding what a rail-reading
probe should display is a firmware-contract question and was deliberately not changed here.
The device RTC is also reading 20 November 2025.
