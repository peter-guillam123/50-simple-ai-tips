# 50 simple ways to use AI at work

Kind: Work
Audience: Guardian journalists and editorial staff who rarely use AI; non-editorial staff second
Voice: plain instructional (short, direct, second person). The About page diary is in Chris's voice.
Design: Guardian (fonts from assets.guim.co.uk, cream paper, Guardian blue, yellow, red and green)

## What this is

A static, article-style guide of 50 practical tips for using the AI tools the
Guardian already provides, mostly Gemini in Google Workspace. Reads top to
bottom, filters by job, tool, material and effort, and carries the filters in
the address. Nine interactive plates. Phase 2 is a presenter view (`?present`),
not built yet.

## The rules that matter

- Nothing that writes articles or publishable copy. Nothing that raises
  responsible-use questions (images of real people, voice cloning,
  confidential source material in external tools).
- Every entry recommends one best tool. Alternatives go in one "Also works" line.
- The in-house transcription tool is always the recommended tool for
  transcription.
- Examples use real, public UK material. Political examples stay balanced.
- Do not invent interface labels. Mark anything unconfirmed `[VERIFY]` and
  anything only Chris can supply `[TODO: ...]`. Readers never see markers;
  `?review` shows them.
- Taxonomy ids in `js/site.js` are fixed. Do not add values without asking.
- Entry text 80 to 120 words across why, steps and tip. Three or four steps.
- Plates and drawings are code, never screenshots, never Google's logos. Their
  text is illustrative and says so.

## Where things live

- `js/entries.js`: the 50 entries. Chris edits this directly; keep it readable.
- `js/site.js`: taxonomy, tools, sections, habits, ladder, "why these", sources.
- `js/app.js`, `js/plates.js`, `js/sketches.js`, `js/gate.js`, `css/style.css`.
- `about.html`: About page with the diary. Add an entry with each significant
  change, newest first, in Chris's voice.
- Run: `python3 -m http.server 8765`. Check in a real browser before saying done.

## Open with Chris

- Hosting: public Pages, the password gate (built, off) or internal.
- Transcription tools (entries 30, 31): names, links, steps.
- The "why these" panel uses tones A, B and C in that order; C needs a contact.
- Availability checks listed under `?review`.
