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

- Tone: clarity first, and never patronise. Headings say plainly what the
  section is ("Searching with AI", not "Four places to ask"). Readers are
  staff who think AI is useless or don't know where to start; don't call
  them beginners. Never work backwards from assumed knowledge: each "why"
  line says what the thing is before what it's for ("Most AI tools offer
  more than one model. In Gemini you choose between...").
- Tools are listed in four groups: inside Google Workspace (apps used as
  normal, Gemini embedded), general AI tools (Gemini app, Notebook, Gemini
  in Chrome, ChatGPT Enterprise flagged as enterprise accounts only), built by the Guardian
  (Ask the Guardian, House, Guardian Angles, the two transcription tools)
  and open to anyone (Google Search, YouTube). Tools with no tips get no
  filter chip.
- The "why these" panel says: Workspace gives the same privacy as Drive and
  Gmail; never use free or personal accounts for work; anything you wouldn't
  keep in Drive or email doesn't go into an AI tool; new tools need budget
  and Tech Council approval.
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
- The "why these" panel needs a Tech Council link or contact. ChatGPT
  Enterprise card needs how to check you're on the list.
- Availability checks listed under `?review`.
