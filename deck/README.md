# The beginner's guide to AI in the newsroom

A deck for a one-hour session: 45 minutes of content, 15 of questions. For
Guardian journalists with little or no experience of AI.

Built from the [Guardian deck template](https://github.com/peter-guillam123/guardian-deck-template),
second edition, with the vibecoding workshop's components. The house rules
are in `CLAUDE.md`. There's an About page, `about.html`, with a diary.

## Presenting it

Serve the folder (`python3 -m http.server 8765`) and open it in a browser.
Arrow keys or space to advance, R to reset, G to show the grid, Cmd-P →
Save as PDF for one slide per page. Nothing advances itself. Every prompt
card copies on click.

## Running order

| Part | Time | Slides |
| --- | --- | --- |
| Cover and running order | 1 minute | 1–2 |
| Part one: the tools you can use | 5 minutes | 3–6 |
| Part two: searching with AI | 15 minutes | 7–14 |
| Part three: Gemini Notebook | 25 minutes | 15, more to come |
| Questions | 15 minutes | 16 |

## Still to do

- Part three, Gemini Notebook.
- Real screenshots for slide 9 (an AI Overview) and slide 13 (the Ask
  button under a YouTube video). They go in `images/`.
- Check on a staff account: that Gemini in Chrome is switched on for us,
  and that the Ask button shows under YouTube videos in the UK.
- Hosting: GitHub Pages, behind the light password gate the vibecoding
  deck uses, or internal only.

## Sources for slide 5

Checked through search on 23 November 2026, not by reading each page in full.

- Court order to keep ChatGPT chats, deleted ones included (May 2025; the
  duty to keep new chats ended on 9 October 2025):
  [Malwarebytes](https://www.malwarebytes.com/blog/news/2025/06/openai-forced-to-preserve-chatgpt-chats),
  [Simon Willison](https://simonwillison.net/2025/Jun/5/openai-court-order).
- Shared ChatGPT chats in Google results (July to August 2025):
  [TechCrunch](https://techcrunch.com/2025/07/31/your-public-chatgpt-queries-are-getting-indexed-by-google-and-other-search-engines),
  [Fast Company](https://www.fastcompany.com/91376687/google-indexing-chatgpt-conversations).
- Human review and retention on consumer Gemini:
  [Gemini Apps privacy hub](https://support.google.com/gemini/answer/13594961).
- What the Workspace agreement promises:
  [Generative AI in Google Workspace privacy hub](https://support.google.com/a/answer/15706919).

## Changelog

**23 November 2026, late.** Every search slide now says what the tool
reads: the web through Google's results, the page you have open, or the
words spoken in a video. It's the idea the written guide's ladder was
built on, and it was missing here. Slide 8 lines all four up, and its new
standfirst says why it matters: what a tool reads decides what it can
answer, and what you check the answer against.

**23 November 2026, night.** Slide 5 now says what can actually go wrong
on a free account: training, people reading your chats, chats kept after
you delete them, shared chats turning up in Google, and data protection.
Each is a real thing that happened or a company's own policy, not a
scare. The Guardian account sits beside them as the alternative.

**23 November 2026, evening.** Slide 4 now has four kinds of tool, not
three. The Gemini tools outside Workspace get their own card, because
they're covered by the same agreement even though they sit outside it, and
Google Search and YouTube get the fourth, because they're covered by
nothing.

**23 November 2026, later.** Reworked the cover. "Beginner's" is lower
case now, the title is smaller so it sits on two calm lines, and the line
under it is about the person rather than the contents: AI is moving so fast
that it can feel impossible to know where to start, and this is the first
step. The kicker no longer repeats the title.

**23 November 2026.** First cut. Sixteen slides: cover, running order,
part one on the tools and the rules, part two on four ways to search, an
opener for part three and the questions slide. The words in part one come
from the written guide to AI at work in the folder above, cut down for a
room.
