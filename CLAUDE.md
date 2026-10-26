# Simple ways to use AI at work

Kind: Work
Audience: Guardian journalists and editorial staff who rarely use AI; non-editorial staff second
Voice: plain instructional (short, direct, second person). The About page diary is in Chris's voice.
Design: Guardian (fonts from assets.guim.co.uk, cream paper, Guardian blue, yellow, red and green)

## What this is

A static, article-style guide of practical tips (74 at last count) for using
the AI tools the Guardian already provides, mostly Gemini in Google Workspace.
No number in the title: the count changes. Reads top to bottom, filters by job,
tool, material and effort, and carries the filters in the address. The main
way in is nine job tiles; "Or start with what you have" (materials) is second. Nine interactive plates. Phase 2 is a presenter view (`?present`),
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
- Readable at a glance, detail on demand: prefer a short summary with the
  detail behind a disclosure (a button with aria-expanded, or
  details/summary) over long visible text. The tools section shows four
  group cards; clicking one opens its apps in a panel placed under that
  card's row. The rules panel shows six headings with one line each.
- The rules panel is titled "Why using approved tools matters". It says: Workspace runs under the Guardian's Google
  agreement, amended for Gemini; content is not used for training outside
  the Guardian's domain and conversations are not reviewed outside it
  (wording from the internal Gemini FAQ: don't overstate it); Gemini only
  appears once you've done the AI Essentials training and read the
  acceptable use policy; never use free or personal accounts for work;
  anything you wouldn't keep in Drive or email doesn't go into an AI tool;
  the data privacy team's three rules (no opinions about individuals, no
  decisions about individuals without the privacy team, know your sources);
  new tools need budget and Tech Council approval. Links: acceptable use
  policy, GenAI principles, Editorial Code, Spike security guide.
- From the FAQ: external-facing translation must be checked by a human
  expert (policy). Notebooks can be shared with colleagues. Don't teach
  Slides image generation. Gems are retired but Skills are the same idea
  and tip 47 teaches them.
- Part one, "Searching with AI", is the only place the four search tools
  are introduced. The ladder plate opens that section (`plate` on the
  section in site.js) and each rung links to its tip. No separate
  searching section above the list.
- Ladder order, labelled by where each starts: 1 AI Overviews and 2 AI Mode
  "start from the web"; 3 Gemini Notebook "starts from your sources"
  (documents, web pages, YouTube videos: say sources, not documents) and
  stays there, so it is the easiest to check; 4 the Gemini app "starts
  anywhere": general questions, your files, the web, the strongest models
  and longer jobs. Its range makes it the hardest to check, so ask it to
  say where each fact came from. Don't describe the Gemini app as a
  documents tool. All Notebook tips carry rung 3 and all Gemini app tips
  rung 4.
- Evidence panels (`panels` in site.js) sit after an entry and carry
  figures with sources. The AI Overviews reliability panel follows tip 1;
  its figures come from the AI working group deck's "True enough?" slide.
  Neutral tone: give the figures, name the caveats, no advocacy.
- Multimodal: say where a tool takes a picture as well as words (tips 1,
  2, 37, 38, the ladder intro).
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
- Plates are code, never screenshots, never Google's logos. Their text is
  illustrative and says so.
- No static drawings. Chris removed them on 26 October 2026 because they
  weren't adding anything; the nine interactive plates stay. Don't add
  pictures back without asking. The old drawings (`js/sketches.js`) are in
  git history if ever wanted.

- Nine jobs, which are also the sections after "Searching with AI", in this
  order: Find a story, Research a subject, Get through documents, Work with
  numbers, Interviews and recordings, Check and verify, Organise your work,
  Before you file, Make it routine. An entry's first job is its section.
- Checking: one "Check everything" rule sits above the list (`checkRule` in
  site.js). Inside a tip, give only checks particular to that job (quote
  against the recording, figure against the document, place against a map).
- Unpublished work: any tip where you paste a draft, notes or a story into the
  Gemini app carries `care: CARE` ("The usual rules apply. If the story is
  highly sensitive and must not leak before publication, be careful what you
  paste in.").
- Cross-references use `{tip:entry-id}`, never a typed number, so renumbering
  is safe. Panels attach by entry id (`after: 'ai-overviews'`).
- The bespoke Guardian tools (Ask the Guardian, House, Guardian Angles) keep
  their tool cards but have no tips yet. Chris will come back to them.

## Where things live

- `js/entries.js`: the entries. Chris edits this directly; keep it readable.
- `js/site.js`: taxonomy, tools, sections, habits, ladder, "why these", sources.
- `js/app.js`, `js/plates.js`, `js/gate.js`, `css/style.css`.
- `about.html`: About page with the diary. Add an entry with each significant
  change, newest first, in Chris's voice.
- Run: `python3 -m http.server 8765`. Check in a real browser before saying done.

## Open with Chris

- Hosting: public Pages, the password gate (built, off) or internal.
- Transcription tools (`transcribe-a-recording`, `live-transcript`): names, links, steps.
- Tips for Ask the Guardian, House and Guardian Angles.
- The "why these" panel needs a Tech Council link or contact. ChatGPT
  Enterprise card needs how to check you're on the list.
- Availability checks listed under `?review`.
