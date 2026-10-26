# Simple ways to use AI at work

A practical guide for Guardian staff: small, useful things you can do with the AI tools the Guardian already provides, mostly Gemini in Google Workspace, sorted by the job in front of you. Nothing in it writes a story.

Built by Chris Moran with Claude, an AI model made by Anthropic. The About page says what that means and what to distrust.

## What's here

- `index.html`, `css/`, `js/`: the guide. Plain HTML, CSS and JavaScript. No build step, no dependencies.
  - `js/entries.js`: the tips. This is the file to edit.
  - `js/site.js`: everything else that is words: the masthead, tool cards, the nine jobs, section intros, habits, the check-everything rule, the ladder and the sources.
  - `js/app.js`: draws the page, runs the filters, keeps them in the address, copies prompts.
  - `js/plates.js`: the nine interactive plates.
  - `js/gate.js`: an optional password gate, off by default.
- `about.html`: what the guide is, how it was made, what to distrust, and the diary.
- `.github/workflows/pages.yml`: deploys to GitHub Pages on a push to `main`, once Pages is switched on for the repository.

## Run it

```bash
python3 -m http.server 8765
```

Then open http://localhost:8765. The Guardian fonts load from the Guardian's own servers, so you need to be online to see them; offline, the page falls back to Georgia.

## Review it

Add `?review` to the address:

```
http://localhost:8765/?review
```

This shows every `[VERIFY]` and `[TODO]` marker in the text, plus an availability note on each tip saying what still needs checking on a Guardian account. Readers never see any of this.

## Edit the entries

Open `js/entries.js`. Each entry is a block of plain fields with a comment at the top of the file explaining them. Keep the `jobs`, `tool`, `material` and `effort` ids to the lists in `js/site.js`. Leave `[VERIFY]` in any step where you are not sure of a button name, and `[TODO: what is needed]` for anything still to be supplied. To point at another tip, write `{tip:its-id}`; the page fills in the number.

## Send a filtered link

Filters live in the address, so you can send a desk a cut-down list:

```
?tool=sheets
?material=spreadsheet
?job=verify
?job=interviews&effort=1min
```

Every entry also has an anchor, for example `#sort-500-rows`.

## Switch on the password gate

Open the page, open the browser's developer console and run:

```js
await GATE.make('the password you want')
```

Paste the string it prints into `hash` in `js/gate.js` and set `enabled: true`. This stops casual visitors only; the page's text still reaches the browser.
