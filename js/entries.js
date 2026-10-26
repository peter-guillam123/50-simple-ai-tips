/* Simple ways to use AI at work: the entries.
 *
 * This is the file to edit. The page draws everything from it: the list,
 * the filters, the counts and (later) the presenter view.
 *
 * Each entry looks like this:
 *
 *   id          anchor for the link (#sort-500-rows). Lower case, hyphens.
 *   number      in reading order, 1 upwards
 *   section     ladder (Searching with AI), or one of the nine jobs:
 *               find-story, research, documents, numbers, interviews,
 *               verify, organise, before-filing, routine
 *   title       verb-led, says plainly what you do. The accent must appear in it.
 *   accent      the word or phrase set in italics
 *   why         says what the thing is before what it is for
 *   tool        exactly one tool id (see js/site.js for the list)
 *   rung        1 to 4 if the tool sits on the ladder, otherwise leave out
 *   where       where the feature lives, in plain words
 *   steps       three or four short steps
 *   prompt      the text to copy and paste. Empty if there is nothing to paste.
 *   alsoWorks   one line on the alternative route, or empty
 *   tip         one extra line, or empty
 *   care        a warning, shown apart from the tip. Use CARE for any tip
 *               where you paste in unpublished work.
 *   jobs        one or two job ids; the first is the entry's own section
 *   material    exactly one material id
 *   effort      1min, 5min or setup
 *   plate       the id of an interactive plate, or leave out
 *   availability  { status: ok | check | todo, note: what to check }
 *   sources     ids from the sources list in js/site.js
 *
 * Markers you can leave in any text:
 *   [VERIFY]         a button or menu name I could not confirm on a Guardian account
 *   [TODO: ...]      something only Chris can fill in
 *   {tip:some-id}    becomes a link reading "tip 12", numbered for you
 * Readers never see the first two. Add ?review to the page address to see them.
 *
 * Checking: the page carries one rule above the list, "check everything".
 * Inside a tip, only give a check that is particular to that job.
 */

var CARE = 'The usual rules apply. If the story is highly sensitive and must not leak before publication, be careful what you paste in.';

window.ENTRIES = [

  /* ==================================================================
     Searching with AI
     ================================================================== */

  {
    id: 'ai-overviews',
    number: 1,
    section: 'ladder',
    title: 'When to use AI Overviews',
    accent: 'AI Overviews',
    why: 'When you search Google, an AI-written summary now often appears at the top of the results. That is an AI Overview. It gives instant orientation on a general question: a term you half know, a date, who holds a job now.',
    tool: 'search',
    rung: 1,
    where: 'An ordinary Google search. The overview sits at the top of the results.',
    steps: [
      'Type the question into Google as you normally would.',
      'Read the overview at the top, then the links under it.',
      'For anything you need to rely on, click through to the sources it links.'
    ],
    prompt: 'What is a section 114 notice?',
    alsoWorks: '',
    tip: 'No overview? The question was probably too specific. Try AI Mode ({tip:ai-mode}). You can search with a picture too: the camera icon in the search box takes a photo and asks about it.',
    jobs: ['research'],
    material: 'question',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'ai-mode',
    number: 2,
    section: 'ladder',
    title: 'When to use AI Mode',
    accent: 'AI Mode',
    why: 'AI Mode is a separate tab on Google that answers in a conversation rather than a list of links. It handles questions with several parts, follow-ups and comparisons, and it can read a PDF you upload.',
    tool: 'search',
    rung: 2,
    where: 'The AI Mode tab on a results page, or google.com/aimode.',
    steps: [
      'On a Google results page, click the AI Mode tab [VERIFY], or go to google.com/aimode.',
      'Ask the whole question in one go, parts and all.',
      'Follow up in the same box. It remembers the thread.',
      'Click the sources it lists before you rely on a figure.'
    ],
    prompt: 'Which English councils have issued section 114 notices since 2018, and what reasons did each give?',
    alsoWorks: '',
    tip: 'You can upload a PDF or a photo here too (the + button) and ask about it alongside the web.',
    jobs: ['research'],
    material: 'question',
    effort: '1min',
    availability: { status: 'check', note: 'AI Mode charts started with US finance and sports queries. Do not promise charts unless confirmed in the UK.' },
    sources: ['aimode-charts']
  },

  {
    id: 'gemini-notebook',
    number: 3,
    section: 'ladder',
    title: 'When to use Gemini Notebook',
    accent: 'Gemini Notebook',
    why: 'Gemini Notebook is a research tool that answers only from sources you give it: documents, web pages or YouTube videos. It footnotes every answer, and nothing from the wider web creeps in, so every claim can be traced. Start with one source: a budget report, a court ruling, an inquiry.',
    tool: 'notebook',
    rung: 3,
    where: 'notebooklm.google (it redirects) > New notebook > add sources.',
    steps: [
      'Go to notebooklm.google. It redirects to Gemini Notebook: same tool, new name.',
      'Click New notebook and add the source: upload a document, or paste a web or YouTube link.',
      'Ask in the chat panel. Every answer carries numbered citations.',
      'Click a citation to see the passage it came from.'
    ],
    prompt: 'What does this report say caused the funding gap? Cite the page for each reason.',
    alsoWorks: '',
    tip: 'It only knows what you gave it. If the answer is not in your sources, it should say so.',
    jobs: ['documents', 'research'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['notebook-rename']
  },

  {
    id: 'gemini-app',
    number: 4,
    section: 'ladder',
    title: 'When to use the Gemini app',
    accent: 'Gemini app',
    why: 'The Gemini app is Google’s chat, the equivalent of ChatGPT, and the most capable of the four. Ask it anything, with or without your own files. It can use the web, your Workspace and what it already knows, and its strongest models take on longer jobs.',
    tool: 'gemini',
    rung: 4,
    where: 'gemini.google.com, signed in with your Guardian account.',
    steps: [
      'Go to gemini.google.com and check the account in the top corner is your Guardian one.',
      'Ask your question, or attach a file first with the + button.',
      'For a harder question, choose Thinking in the model picker ({tip:flash-or-thinking}).',
      'Ask it to say which facts came from your file and which from elsewhere. Check the outside ones.'
    ],
    prompt: 'Here is this council’s budget report. How does its funding gap compare with other English councils of a similar size, and is the reason it gives for the gap typical? Say which figures come from the report and which from elsewhere.',
    alsoWorks: 'AI Mode, with the report uploaded through the + button, for a quicker answer with fewer follow-ups.',
    tip: 'Some sites block it from reading their pages [VERIFY: name one or two], so paste the text in rather than the link.',
    jobs: ['research'],
    material: 'document',
    effort: '5min',
    availability: { status: 'check', note: 'Find one or two common sites that block Gemini so the entry can name them.' },
    sources: []
  },

  {
    id: 'flash-or-thinking',
    number: 5,
    section: 'ladder',
    title: 'Choose a faster or a more careful model',
    accent: 'faster or a more careful model',
    why: 'Most AI tools offer more than one model, the engine behind the answers. In Gemini you choose between Flash, which is fast and fine for simple jobs, and Thinking, which is slower but works through numbers, logic and comparisons step by step.',
    tool: 'gemini',
    rung: 4,
    where: 'The model picker at the top of the Gemini app.',
    steps: [
      'Open the model picker at the top of the chat. The two you need are Flash and Thinking [VERIFY the exact labels].',
      'Flash for tidying, summarising and looking things up.',
      'Thinking for sums, comparisons and anything with logic in it.',
      'If an answer feels thin, switch and ask again.'
    ],
    prompt: 'Is £40m a big share of this council’s budget? Show the sum.',
    alsoWorks: '',
    tip: 'Thinking takes longer and shows its working. Read the working, not just the answer.',
    jobs: ['research', 'numbers'],
    material: 'question',
    effort: '1min',
    availability: { status: 'check', note: 'Confirm the model labels staff see in the Guardian picker (brief says Flash 3.6 and Thinking 3.8).' },
    sources: []
  },

  /* ==================================================================
     Find a story
     ================================================================== */

  {
    id: 'report-to-stories',
    number: 6,
    section: 'find-story',
    title: 'Turn a long report into a list of possible stories',
    accent: 'possible stories',
    why: 'Gemini Notebook can read a long report the day it lands and point you to the parts a reader would care about, with the page for each. You still read those pages; it tells you where to start.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with the report added as a source.',
    steps: [
      'Make a new notebook and upload the report.',
      'Tell it who your readers are, then ask the question below.',
      'Click each citation and read the passage in full.',
      'Follow up on anything that looks like a story: who is affected, and by how much?'
    ],
    prompt: 'I report for a general UK audience. What in this report would surprise them, anger them or affect them directly? List each point with its page number.',
    alsoWorks: '',
    tip: 'Works on National Audit Office, select committee, regulator and public inquiry reports, and on company annual reports.',
    jobs: ['find-story', 'documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-ideas']
  },

  {
    id: 'committee-evidence',
    number: 7,
    section: 'find-story',
    title: 'Find the submissions worth reading in a committee’s written evidence',
    accent: 'worth reading',
    why: 'Select committees publish written evidence from charities, companies, regulators and academics, often dozens of submissions to one inquiry. Gemini Notebook can read them together and point you to the ones that say something new, with the page for each.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with the submissions added.',
    steps: [
      'Download the submissions from the inquiry’s page on committees.parliament.uk.',
      'Add them to a new notebook. There is a limit on sources per notebook [VERIFY the number].',
      'Ask the question below.',
      'Open each submission it names and read it yourself.'
    ],
    prompt: 'Across these submissions, which ones disagree with the government’s position, back a claim with new figures, or describe a problem nobody else mentions? Give the author and the page for each.',
    alsoWorks: '',
    tip: 'Works on consultation responses and public inquiry evidence too, and on submissions to US congressional and Australian Senate inquiries.',
    jobs: ['find-story', 'documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['bay-city-news']
  },

  {
    id: 'hearing-video-news',
    number: 8,
    section: 'find-story',
    title: 'Find the news in a hearing you did not watch',
    accent: 'did not watch',
    why: 'Committee hearings run for hours and the news is often one exchange. Give the Gemini app the YouTube link and it can list the moments worth checking, with timestamps, so a three-hour hearing takes ten minutes to search.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app, with the hearing’s YouTube link.',
    steps: [
      'Copy the YouTube link to the hearing.',
      'Paste it into the Gemini app with the question below.',
      'Go to each timestamp it gives and watch that part yourself.'
    ],
    prompt: 'This is a recording of a committee hearing. List every moment where a witness discloses a figure or a date, contradicts an earlier statement, declines to answer or is pressed hard, each with its timestamp.',
    alsoWorks: 'YouTube’s Ask button, if it appears under the video ({tip:ask-a-video}).',
    tip: 'US congressional committees post most hearings on YouTube. UK hearings are on parliamentlive.tv, which it cannot read [VERIFY], so use the published transcript in Gemini Notebook instead.',
    jobs: ['find-story', 'interviews'],
    material: 'video-audio',
    effort: '1min',
    availability: { status: 'check', note: 'Confirm whether the Gemini app can read parliamentlive.tv links, and which UK committees also post on YouTube.' },
    sources: ['connecticut-public', 'hearst-meetings']
  },

  {
    id: 'rank-releases',
    number: 9,
    section: 'find-story',
    title: 'Rank a pile of press releases or research abstracts by news value',
    accent: 'by news value',
    why: 'A morning’s press releases, or the abstracts in this week’s journals, can be ranked by how much they would matter to your readers. The Gemini app gives you a quick first sort, not an editor’s judgement.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app, with the releases or abstracts pasted in.',
    steps: [
      'Paste in the releases or abstracts, up to about twenty.',
      'Say who your readers are and what counts as news for them.',
      'Ask for a ranking with a reason for each.',
      'Read the top three in full, and glance at the bottom three in case it missed something.'
    ],
    prompt: 'I write for a general UK audience. Rank these press releases by how newsworthy they would be for them, with one line on why for each.',
    alsoWorks: '',
    tip: '',
    jobs: ['find-story'],
    material: 'document',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-ideas']
  },

  {
    id: 'find-angles',
    number: 10,
    section: 'find-story',
    title: 'Find angles you have not thought of',
    accent: 'angles',
    why: 'The Gemini app has read far more coverage than any of us, which makes it good at suggesting angles you have not tried. It does not know your readers or what we have already run unless you tell it.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app.',
    steps: [
      'Describe the story in two or three sentences.',
      'Say who reads you and what has already been covered.',
      'Ask for angles other desks might take: business, politics, environment, consumer.',
      'Pick one and test it the usual way: who would you ring?'
    ],
    prompt: 'Ofwat has let water companies in England and Wales raise bills by an average of 36% over five years. We have covered the announcement. Suggest five angles a business, politics, environment, health or consumer reporter might take.',
    alsoWorks: '',
    tip: 'Ask for the obvious angles too, then rule them out. It saves you pitching one your editor has already seen.',
    care: CARE,
    jobs: ['find-story'],
    material: 'question',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-ideas']
  },

  {
    id: 'what-changed',
    number: 11,
    section: 'find-story',
    title: 'Spot what changed between this year’s report and last year’s',
    accent: 'what changed',
    why: 'Gemini Notebook can compare two versions of a document and list what is new, what has gone and what has been reworded. It works on annual reports, manifestos, policies and bills at each stage.',
    tool: 'notebook',
    rung: 3,
    where: 'A notebook with both documents loaded.',
    steps: [
      'Make a notebook with both documents as sources.',
      'Name them clearly (“2025 report”, “2026 report”) so the answer can tell them apart.',
      'Ask for what is new, what is gone and what is reworded.',
      'Check each change it lists against both documents.'
    ],
    prompt: 'Compare these two documents. What’s new, what’s gone, and what’s been reworded?',
    alsoWorks: 'Upload both to the Gemini app.',
    tip: 'Ask for the changes as a table with three columns: old wording, new wording, what it means.',
    jobs: ['find-story', 'documents'],
    material: 'document',
    effort: '5min',
    plate: 'diff',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'morning-news-digest',
    number: 12,
    section: 'find-story',
    title: 'Get a morning digest of your beat',
    accent: 'morning digest',
    why: 'A scheduled action is a prompt the Gemini app runs for you at a set time, without you asking. A rough digest of your beat, every weekday, before you get in.',
    tool: 'gemini',
    rung: 4,
    where: 'Ask in the Gemini app (“every weekday at 7am…”). Manage at gemini.google.com/scheduled.',
    steps: [
      'In the Gemini app, put the schedule in the prompt itself: “Every weekday at 7am…”',
      'Confirm when it asks.',
      'Manage or stop it at gemini.google.com/scheduled.',
      'Treat it as pointers to stories, not the story.'
    ],
    prompt: 'Every weekday at 7am, give me the five most important overnight news stories about NHS waiting times in England, with links to each source.',
    alsoWorks: '',
    tip: 'It runs within an hour of the time you set. You can have up to 10 active.',
    jobs: ['find-story', 'routine'],
    material: 'question',
    effort: 'setup',
    plate: 'digest',
    availability: { status: 'check', note: 'Availability on our Workspace edition.' },
    sources: ['scheduled-actions']
  },

  /* ==================================================================
     Research a subject
     ================================================================== */

  {
    id: 'explain-it-like-im-new',
    number: 13,
    section: 'research',
    title: 'Learn a new beat’s jargon in ten minutes',
    accent: 'jargon',
    why: 'The Gemini app can explain a technical subject at whatever level you ask for, and list the terms you will hear most. Useful on your first day on a new beat, or before a briefing on a subject you have never covered.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app.',
    steps: [
      'Say who you are, what you need to understand and by when.',
      'Ask for the explanation at the level you want.',
      'Ask for the five terms you will hear most.',
      'Look each one up in a proper source before you use it.'
    ],
    prompt: 'Explain gilt yields to a sharp 16-year-old, then list the five terms I’ll hear most.',
    alsoWorks: '',
    tip: 'Then ask it to argue with itself: “What would an economist say is wrong with that explanation?”',
    jobs: ['research'],
    material: 'question',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'backgrounder-in-ten-minutes',
    number: 14,
    section: 'research',
    title: 'Commission a cited background briefing while you do something else',
    accent: 'background briefing',
    why: 'Deep Research is a mode in the Gemini app. Give it a topic and it reads dozens of sources and writes a briefing with citations while you do something else. Ten minutes rather than a morning.',
    tool: 'gemini',
    rung: 4,
    where: 'Gemini app > Tools (or +) > Deep Research.',
    steps: [
      'In the Gemini app, click Tools (or +) and choose Deep Research [VERIFY].',
      'Describe the briefing you want, with the period and the country.',
      'Approve the plan it shows you, then go and do something else.',
      'Open the sources it cites, not just the report.'
    ],
    prompt: 'A cited briefing on the history of fines on English water companies since privatisation.',
    alsoWorks: 'Gemini Notebook’s “start from a question” option, which keeps the sources.',
    tip: 'A researcher’s first draft: good on shape, never to be quoted.',
    jobs: ['research'],
    material: 'question',
    effort: '5min',
    availability: { status: 'check', note: 'The Deep Research quota on our edition.' },
    sources: ['deep-research-limits']
  },

  {
    id: 'timeline-from-cuttings',
    number: 15,
    section: 'research',
    title: 'Build a dated timeline of a long-running story from cuttings',
    accent: 'dated timeline',
    why: 'Gemini Notebook can turn a pile of cuttings into an instant chronology for a long-running story, with every date pointing back to the cutting it came from.',
    tool: 'notebook',
    rung: 3,
    where: 'A notebook with the cuttings as sources.',
    steps: [
      'Add the cuttings as sources: paste each article’s text, or its link.',
      'Ask for a dated timeline, citing each entry.',
      'Ask for it as a table if you want it in Sheets.'
    ],
    prompt: 'Make a dated timeline of every key event in these sources, citing each one.',
    alsoWorks: '',
    tip: 'Dates in cuttings are often relative (“last Tuesday”), so check any that matter against the cutting’s own date.',
    jobs: ['research', 'organise'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'court-judgment',
    number: 16,
    section: 'research',
    title: 'Understand a court judgment: who won, on what grounds, and the key paragraphs',
    accent: 'court judgment',
    why: 'Judgments are long, and the ruling is often near the end. Gemini Notebook can tell you who won, on what grounds and which paragraphs matter, with a citation for each, so you go straight to the passages you need.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with the judgment added.',
    steps: [
      'Download the judgment, for instance from the National Archives’ Find Case Law service.',
      'Add it to a new notebook.',
      'Ask the question below.',
      'Read the paragraphs it cites, and quote the judgment, never the summary.'
    ],
    prompt: 'Who won this case, on what grounds, and what did the judge say about the key issue? Give the paragraph number for each point.',
    alsoWorks: '',
    tip: 'Ask what the judge rejected too. The arguments that lost are often the story.',
    jobs: ['research', 'documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'scientific-paper',
    number: 17,
    section: 'research',
    title: 'Explain a scientific or medical paper in plain English, with its limits',
    accent: 'with its limits',
    why: 'A study can be hard going if it is outside your field. Gemini Notebook can explain what it found in plain English, how many people it covered and what the authors say it cannot show, with the page for each.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with the paper added.',
    steps: [
      'Add the paper as a PDF, or paste its link.',
      'Ask the question below.',
      'Read the limitations section yourself.',
      'Ring an independent expert before you report it.'
    ],
    prompt: 'In plain English: what did this study find, how many people or cases did it cover, how was it funded, and what do the authors say it cannot show? Cite the page for each.',
    alsoWorks: '',
    tip: 'Ask whether it is peer reviewed or a preprint. The answer changes how you report it.',
    jobs: ['research'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-ideas']
  },

  {
    id: 'company-filings',
    number: 18,
    section: 'research',
    title: 'Profile a company or charity from its own filings',
    accent: 'own filings',
    why: 'Annual accounts and charity reports say a lot about who runs an organisation and where its money goes. Gemini Notebook can pull that out of filings you have downloaded, with the page for each point.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with the filings added.',
    steps: [
      'Download the accounts from Companies House, or the annual report from the Charity Commission.',
      'Add two or three years of them to a new notebook.',
      'Ask the question below.',
      'Check names and figures against the filings themselves.'
    ],
    prompt: 'From these filings: who are the directors or trustees, how have income, spending and pay changed year by year, and are there payments to related parties? Give the document and page for each.',
    alsoWorks: '',
    tip: 'Several years together let you ask what changed, which is usually the story.',
    jobs: ['research', 'documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'party-positions',
    number: 19,
    section: 'research',
    title: 'Put every party’s position on an issue in one table',
    accent: 'one table',
    why: 'Gemini Notebook can set out each party’s position on an issue side by side, with a citation for every line. Because it answers only from what you load, the table is as balanced as the sources you give it.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with each party’s manifesto or policy paper added.',
    steps: [
      'Add the manifesto or policy paper from every party you will cover, not a selection.',
      'Ask for the table below.',
      'Click the citations for any line you will use.'
    ],
    prompt: 'Make a table of each party’s commitments on social care: the promise, any cost or date given, and the page.',
    alsoWorks: '',
    tip: 'Ask it to mark where a party says nothing on the subject. A blank is information too.',
    jobs: ['research'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'read-in-another-language',
    number: 20,
    section: 'research',
    title: 'Read a source in another language',
    accent: 'in another language',
    why: 'The Gemini app can translate a foreign report or article so you can use it for background, and tell you which parts matter to your story.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app. Paste the text or upload the file.',
    steps: [
      'Paste the text, or upload the file, into the Gemini app.',
      'Ask for a translation and for the parts that matter to you.',
      'For anything you will quote or publish, get a human expert to check it. That is Guardian policy, not a suggestion.'
    ],
    prompt: 'Translate this Le Monde article and tell me which parts concern the UK.',
    alsoWorks: 'Gemini in Chrome, on the page itself.',
    tip: 'Ask for a summary first and the full translation second. You may not need the second.',
    jobs: ['research'],
    material: 'document',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: ['gemini-faq-internal']
  },

  {
    id: 'ask-the-page',
    number: 21,
    section: 'research',
    title: 'Compare the web pages you have open',
    accent: 'web pages you have open',
    why: 'Gemini in Chrome sits in your browser and can read the page you are on, or several open tabs at once. Useful for comparing official guidance, rules or prices across sites without copying anything out.',
    tool: 'chrome',
    where: 'The Gemini icon at the top of Chrome, or right-click > Ask Gemini.',
    steps: [
      'Click the Gemini icon at the top of Chrome, or right-click anywhere on the page and choose Ask Gemini.',
      'Ask about this page, or name the other tabs you have open.',
      'Switch tabs and it keeps the thread.'
    ],
    prompt: 'Compare the eligibility rules on these three gov.uk pages.',
    alsoWorks: 'Paste the links into the Gemini app.',
    tip: 'The page has to be open in the tab. If a site makes you log in first, log in, then ask.',
    jobs: ['research'],
    material: 'web-page',
    effort: '1min',
    availability: { status: 'check', note: 'Is Gemini in Chrome enabled for Guardian accounts? It rolled out to UK desktop users; admins can switch it off.' },
    sources: ['chrome-uk', 'chrome-admin']
  },

  /* ==================================================================
     Get through documents
     ================================================================== */

  {
    id: 'ask-a-report-anything',
    number: 22,
    section: 'documents',
    title: 'Get answers from a long report, with the page for each one',
    accent: 'with the page for each one',
    why: 'Gemini Notebook answers questions about a document you would otherwise skim, and gives the page for every answer. A 300-page report becomes something you can question like a colleague who has read it.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook > New notebook > upload the PDF > ask in the chat.',
    steps: [
      'Open Gemini Notebook, click New notebook and upload the PDF.',
      'Wait for the source to finish loading (a tick appears beside it).',
      'Ask in the chat panel.',
      'Click the citation numbers to see the passages it used.'
    ],
    prompt: 'Which of this report’s recommendations are aimed at the Treasury?',
    alsoWorks: 'Open the PDF in Drive and use the Gemini panel, for a quick summary without making a notebook.',
    tip: 'Upload the whole report, not a chapter. The answer is often in the annex.',
    jobs: ['documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['drive-audio']
  },

  {
    id: 'every-answer-has-a-receipt',
    number: 23,
    section: 'documents',
    title: 'Check any answer against the passage it came from',
    accent: 'the passage it came from',
    why: 'Every answer in Gemini Notebook carries numbered citations. Click one and it shows the exact passage the answer came from, so checking takes seconds rather than a search through the PDF.',
    tool: 'notebook',
    rung: 3,
    where: 'Click any numbered citation in a Notebook answer.',
    steps: [
      'Ask any question in a notebook.',
      'Click a numbered citation in the answer.',
      'Read the highlighted passage in the source panel.',
      'If it does not say what the answer says, do not use the answer.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'Make this a reflex. One mismatch in a thread of answers is normal, and it is the one you would have quoted.',
    jobs: ['documents', 'verify'],
    material: 'document',
    effort: '1min',
    plate: 'receipt',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'document-to-data-table',
    number: 24,
    section: 'documents',
    title: 'Pull every date, figure or commitment out of a document into a table',
    accent: 'into a table',
    why: 'Gemini Notebook can turn a document into a table: you name the columns, it finds the facts. Commitments scattered through a white paper become rows you can sort and export to Sheets.',
    tool: 'notebook',
    rung: 3,
    where: 'Notebook > Studio panel > Data table, then describe the columns.',
    steps: [
      'In a notebook with the document loaded, open the Studio panel.',
      'Choose Data table [VERIFY] and describe the columns you want.',
      'Wait for the grid, then Export to Sheets.',
      'Spot-check two rows against the document.'
    ],
    prompt: 'Table every commitment in this white paper: commitment, department, deadline, page.',
    alsoWorks: '',
    tip: 'Data tables do not link back to pages the way chat answers do, so the spot-check matters.',
    jobs: ['documents', 'numbers'],
    material: 'document',
    effort: '5min',
    plate: 'table',
    availability: { status: 'ok', note: '' },
    sources: ['notebook-tables', 'notebook-tables-2']
  },

  {
    id: 'find-every-mention',
    number: 25,
    section: 'documents',
    title: 'Find every mention of a person or company across a pile of documents',
    accent: 'every mention',
    why: 'When you have a pile of documents, from a disclosure, an inquiry’s evidence or a year of board minutes, Gemini Notebook can find every mention of a person, company or place across all of them, with the document and page for each.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with all the documents added.',
    steps: [
      'Add every document to one notebook. Name them clearly so the answers can tell them apart.',
      'Ask the question below.',
      'Open each citation and read the passage around it.'
    ],
    prompt: 'List every mention of [the company] across these documents, with the document name, page and one line of context for each.',
    alsoWorks: '',
    tip: 'Ask for other spellings and abbreviations too. Companies and people turn up under more than one name.',
    jobs: ['documents', 'research'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['quintype-notebooklm']
  },

  {
    id: 'foi-response',
    number: 26,
    section: 'documents',
    title: 'Read an FOI response quickly: what was released and what was withheld',
    accent: 'what was withheld',
    why: 'An FOI response can arrive as a long PDF of letters, tables and redactions. Gemini Notebook can tell you what was released, what was withheld and under which exemption, so you know what to challenge.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with the response and your original request added.',
    steps: [
      'Add your original request and the response to a new notebook.',
      'Ask the question below.',
      'Read the released documents yourself: the detail is in them, not in the summary.'
    ],
    prompt: 'Compare the response with my request. What was released, what was withheld or redacted, and which exemptions were cited for each part? Give the page.',
    alsoWorks: '',
    tip: 'Ask which parts of the request were not answered at all. That is the start of your internal review.',
    jobs: ['documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'map-a-report',
    number: 27,
    section: 'documents',
    title: 'Get a map of a long report before you read it',
    accent: 'map',
    why: 'Gemini Notebook can draw a mind map of a document: its chapters and themes as a branching diagram. It shows the shape of a report before you read it, so you know which chapter to read properly.',
    tool: 'notebook',
    rung: 3,
    where: 'Notebook > Studio > Mind map.',
    steps: [
      'In a notebook with the report loaded, open the Studio panel.',
      'Click Mind map [VERIFY]. There is nothing to type.',
      'Click any branch to ask about that part.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'A good place to start. Not a substitute for reading the chapter you will write about.',
    jobs: ['documents'],
    material: 'document',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'listen-on-the-way-in',
    number: 28,
    section: 'documents',
    title: 'Listen to a summary of a report on the way in',
    accent: 'Listen',
    why: 'An Audio Overview is a spoken summary of your sources, done as a conversation between two synthetic voices. Twelve minutes on your report during the commute beats not having opened it.',
    tool: 'notebook',
    rung: 3,
    where: 'Notebook > Studio > Audio Overview > Customise.',
    steps: [
      'In the Studio panel, find Audio Overview.',
      'Click Customise first and say what to focus on.',
      'Press play, or download it for the journey.'
    ],
    prompt: 'Focus on the funding chapters and skip the methodology.',
    alsoWorks: 'Drive’s PDF viewer has an Audio Overview button for a single PDF.',
    tip: 'Two synthetic voices chatting. Fine for the gist, never for a quote.',
    jobs: ['documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['drive-audio']
  },

  /* ==================================================================
     Work with numbers
     ================================================================== */

  {
    id: 'formula-without-the-maths',
    number: 29,
    section: 'numbers',
    title: 'Get a spreadsheet formula by describing the result you want',
    accent: 'spreadsheet formula',
    why: 'Gemini in Sheets can write a formula from a plain English description, and explain what it does. You do not need to know the formula language.',
    tool: 'sheets',
    where: 'Sheets > Gemini side panel.',
    steps: [
      'Open the sheet and click the Gemini star (top right) to open the side panel.',
      'Describe the result you want in plain English.',
      'Copy the formula it gives into a cell. It explains what the formula does.',
      'Check the result on a few rows you can count by hand.'
    ],
    prompt: 'Count how many rows in column C mention flooding.',
    alsoWorks: '',
    tip: 'Ask it to explain the formula line by line. Next time you may not need to ask.',
    jobs: ['numbers'],
    material: 'spreadsheet',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'sort-500-rows',
    number: 30,
    section: 'numbers',
    title: 'Sort hundreds of rows into categories with one formula',
    accent: 'one formula',
    why: 'The AI function in Sheets tags every row in a column without you reading them all. Five hundred entries from the MPs’ register of interests sorted into donations, gifts, paid work and overseas visits in a couple of minutes.',
    tool: 'sheets',
    where: 'Sheets: type =AI( in an empty cell, or Insert > Function > AI.',
    steps: [
      'Click the first empty cell in a new column beside your data.',
      'Type the formula below, then drag it down the column.',
      'Spot-check five rows before you rely on it.'
    ],
    prompt: '=AI("Is this a donation, a gift or hospitality, paid work, an overseas visit or other?", A2)',
    alsoWorks: 'Attach the sheet from Drive in the Gemini app and ask it to categorise each row.',
    tip: 'Give it a short list of categories in the question, as here. An open question gives you 500 different answers.',
    jobs: ['numbers', 'organise'],
    material: 'spreadsheet',
    effort: '5min',
    plate: 'rows',
    availability: { status: 'check', note: 'Needs an eligible edition. Admin or language settings can block it.' },
    sources: ['sheets-ai']
  },

  {
    id: 'pdf-table-to-spreadsheet',
    number: 31,
    section: 'numbers',
    title: 'Turn a table in a PDF into a spreadsheet',
    accent: 'into a spreadsheet',
    why: 'Government reports often lock their tables inside PDFs. Take a screenshot of the table and the Gemini app turns it into rows you can paste straight into Sheets.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app. Paste or upload the screenshot.',
    steps: [
      'Screenshot the table (Shift+Cmd+4 on a Mac, Windows+Shift+S on Windows).',
      'Paste it into the Gemini app with the prompt below.',
      'Copy the result and paste it into Sheets.',
      'Check every figure against the original. Numbers are where it slips.'
    ],
    prompt: 'Turn this table into rows I can paste into Sheets. Keep every figure exactly as shown.',
    alsoWorks: '',
    tip: 'Totals are the quick check. If the column adds up to the figure in the PDF, the rows are probably right.',
    jobs: ['numbers'],
    material: 'photo',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-sheets']
  },

  {
    id: 'ask-your-spreadsheet',
    number: 32,
    section: 'numbers',
    title: 'Ask a spreadsheet which rows stand out, and chart them',
    accent: 'stand out',
    why: 'Gemini in Sheets can answer questions about your data, find the biggest rises and falls, and draw a chart, all from the side panel. Useful for seeing the shape of a dataset before you call the graphics desk.',
    tool: 'sheets',
    where: 'Sheets > Gemini side panel.',
    steps: [
      'Open the side panel (the star, top right).',
      'Ask the question. Name the columns if the headers are unclear.',
      'For a chart, say so. You can insert it into the sheet.',
      'Check the top row against the data before you use it.'
    ],
    prompt: 'Which five trusts had the biggest rise in waiting times? Chart it.',
    alsoWorks: 'Attach the sheet from Drive in the Gemini app.',
    tip: 'Name the column in the question if the headers are vague. “Column F, the 2026 figure” beats “the latest figure”.',
    jobs: ['numbers', 'find-story'],
    material: 'spreadsheet',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'clean-messy-data',
    number: 33,
    section: 'numbers',
    title: 'Clean up messy data: names spelled three ways, dates in four formats',
    accent: 'messy data',
    why: 'Public data is often messy: the same council spelled three ways, dates in four formats, headings split over two rows. Gemini in Sheets can write the formulas that tidy it, so you can see exactly what changed.',
    tool: 'sheets',
    where: 'Sheets > Gemini side panel.',
    steps: [
      'Make a copy of the sheet first, and work on the copy.',
      'Open the side panel and describe the mess, with an example.',
      'Ask for a formula in a new column, not for the data to be changed in place.',
      'Compare a sample of old and new rows by hand.'
    ],
    prompt: 'Column B has council names spelled in different ways, such as “Birmingham CC” and “Birmingham City Council”. Write a formula for column C that gives one standard name for each.',
    alsoWorks: 'Paste a sample into the Gemini app and ask for the steps.',
    tip: '',
    jobs: ['numbers'],
    material: 'spreadsheet',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-sheets']
  },

  {
    id: 'check-a-sum',
    number: 34,
    section: 'numbers',
    title: 'Check a percentage or a sum before it goes in your copy',
    accent: 'a percentage or a sum',
    why: 'A wrong percentage is one of the commonest corrections. The Gemini app, set to Thinking, will work through a sum step by step and show its working, so you can check the method as well as the answer.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app, with Thinking chosen in the model picker.',
    steps: [
      'Choose Thinking in the model picker ({tip:flash-or-thinking}).',
      'Paste the two figures, where they come from, and your sentence.',
      'Ask it to check the sum and show the working.',
      'Follow the working line by line. If a step looks wrong, it probably is.'
    ],
    prompt: 'Spending rose from £412m to £468m. My sentence says this is a rise of 12%. Is that right? Show the working.',
    alsoWorks: '',
    tip: 'When the figures are themselves percentages, ask for the change in percentage points as well as per cent.',
    jobs: ['numbers', 'verify'],
    material: 'question',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'count-the-words',
    number: 35,
    section: 'numbers',
    title: 'Count words or mentions in a speech, exactly',
    accent: 'exactly',
    why: 'Gemini Notebook can run small programs to count things exactly rather than guess. Counting is the difference between a figure you can print and one you cannot.',
    tool: 'notebook',
    rung: 3,
    where: 'The Notebook chat, after adding the speech text.',
    steps: [
      'Add the speech as a source: paste the text, or upload the transcript.',
      'Ask it to count using code, not to estimate.',
      'Ask for the result as a table.',
      'Check one count yourself with Ctrl+F in the source.'
    ],
    prompt: 'Using code, count the 20 words Andy Burnham used most in this speech, ignoring common words like “the” and “and”.',
    alsoWorks: 'The Gemini app on Thinking, or Sheets.',
    tip: 'Ask what method it used. If it says it estimated, ask again and insist on code.',
    jobs: ['numbers', 'documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'check', note: 'Is code execution available on our tier? If not, switch the recommended tool to the Gemini app on Thinking. The illustration should be a real, date-stamped word count from a public speech, with a link to the source. [TODO: generate it]' },
    sources: ['notebook-code']
  },

  {
    id: 'reshape-data',
    number: 36,
    section: 'numbers',
    title: 'Turn a wide table into a long one, and check nothing was lost',
    accent: 'check nothing was lost',
    why: 'Some analysis needs data in a different shape: one row per year instead of one column per year. The Gemini app can explain how to reshape it in Sheets, and how to check nothing was lost on the way.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app, or the Sheets side panel.',
    steps: [
      'Describe your columns and the shape you want, or paste the first few rows.',
      'Ask for the steps in Sheets, not for the reshaped data itself.',
      'Follow the steps on a copy of the sheet.',
      'Check the totals match before and after.'
    ],
    prompt: 'My sheet has one row per council and one column for each year from 2015 to 2025. How do I turn it into three columns: council, year, value? Then tell me how to check nothing was lost.',
    alsoWorks: '',
    tip: '',
    jobs: ['numbers'],
    material: 'spreadsheet',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-sheets']
  },

  /* ==================================================================
     Interviews and recordings
     ================================================================== */

  {
    id: 'transcribe-a-recording',
    number: 37,
    section: 'interviews',
    title: 'Transcribe an interview',
    accent: 'Transcribe',
    why: 'The Guardian’s own transcription tool is built for our work, so it is the first stop for any recording.',
    tool: 'transcription',
    where: 'The Guardian transcription tool [TODO: name, link and how to get access].',
    steps: [
      'Open the Guardian transcription tool [TODO: name and link].',
      'Upload your recording [TODO: upload steps, file-size and language limits].',
      'Wait for the transcript, then search it for the quotes you need.',
      'Check every quote you use against the audio.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'This is the one job where we point you to the in-house tool and nowhere else.',
    jobs: ['interviews'],
    material: 'video-audio',
    effort: '5min',
    availability: { status: 'todo', note: 'Name, link, access route, upload steps, and any file-size or language limits.' },
    sources: ['transcription-tool']
  },

  {
    id: 'live-transcript',
    number: 38,
    section: 'interviews',
    title: 'Get a live transcript of a press conference as it happens',
    accent: 'live transcript',
    why: 'Live transcription of a press conference, webinar or stream playing in your browser, so you can search and quote as it happens.',
    tool: 'live-transcription',
    where: 'A Chrome extension [TODO: name and install link].',
    steps: [
      'Install the extension in Chrome [TODO: name and install link].',
      'Open the stream or webinar in a tab.',
      'Start the extension [TODO: how to start and stop it].',
      'Search the text as it scrolls. Check quotes against the recording afterwards.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'Live transcripts are rough. Use them to find the moment, then check the words against the recording.',
    jobs: ['interviews'],
    material: 'video-audio',
    effort: 'setup',
    availability: { status: 'todo', note: 'Name, install route, which sites it works on.' },
    sources: ['live-transcription-tool']
  },

  {
    id: 'jump-to-the-moment',
    number: 39,
    section: 'interviews',
    title: 'Find the moment something is said in a two-hour hearing',
    accent: 'the moment',
    why: 'YouTube’s Ask button can tell you where in a long video something is said, with a timestamp you can click. A two-hour select committee hearing takes two minutes to search.',
    tool: 'youtube',
    where: 'The Ask button under the video.',
    steps: [
      'Click Ask under the video.',
      'Ask where something is said.',
      'Click the timestamp in the answer. The player jumps there.',
      'Listen to the exact words.'
    ],
    prompt: 'When does the minister talk about prisons?',
    alsoWorks: 'Add the video to a notebook and ask there ({tip:check-quote-against-recording}).',
    tip: 'Ask for every mention, not just the first: “each time the minister mentions prisons, with timestamps”.',
    jobs: ['interviews', 'verify'],
    material: 'video-audio',
    effort: '1min',
    plate: 'moment',
    availability: { status: 'check', note: 'Confirm the Ask button appears for UK staff on desktop.' },
    sources: ['youtube-ask']
  },

  {
    id: 'ask-a-video',
    number: 40,
    section: 'interviews',
    title: 'Ask a YouTube video what it covers',
    accent: 'what it covers',
    why: 'YouTube has an Ask button under many videos. It summarises the video and answers questions about it, working from the words spoken in it, so you know whether a long briefing is worth watching.',
    tool: 'youtube',
    where: 'Below the player, between Share and Download.',
    steps: [
      'Open the video on YouTube in a desktop browser.',
      'Find the Ask button below the player, between Share and Download [VERIFY it shows for UK staff].',
      'Ask for a summary, or a specific question.',
      'Watch the moments it points to before you quote.'
    ],
    prompt: 'Summarise the key points of this hearing, with a timestamp for each.',
    alsoWorks: 'No Ask button? Paste the link into the Gemini app with the same question.',
    tip: 'The button appears on some videos and not others. Public videos only.',
    jobs: ['interviews', 'research'],
    material: 'video-audio',
    effort: '1min',
    availability: { status: 'check', note: 'Confirm the Ask button appears for UK staff on desktop.' },
    sources: ['youtube-ask', 'youtube-ask-search-us']
  },

  {
    id: 'interviewee-notebook',
    number: 41,
    section: 'interviews',
    title: 'Prepare questions for an interview from everything they have said before',
    accent: 'everything they have said before',
    why: 'Gemini Notebook can hold everything an interviewee has said: cuttings, past interviews, speeches, videos. Ask it what they have never been asked and where their position has moved, with a citation for each.',
    tool: 'notebook',
    rung: 3,
    where: 'A new notebook, one per interviewee.',
    steps: [
      'Start a new notebook, one per interviewee.',
      'Add cuttings, past interviews, speeches, videos and anything they have written.',
      'Ask what they have never been asked, and where their position moved.',
      'Build your questions from the citations.'
    ],
    prompt: 'What has she never been asked about housing? Where has her position shifted over time? Cite each.',
    alsoWorks: '',
    tip: 'Keep the notebook after the interview. The next time she is in the news, you start from here.',
    jobs: ['interviews', 'research'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'rehearse-interview',
    number: 42,
    section: 'interviews',
    title: 'Rehearse a tough interview with a press officer who will not answer',
    accent: 'will not answer',
    why: 'Gemini Live, the spoken version of the Gemini app, can play the person you are about to question: a press officer who dodges, a chief executive who changes the subject. Practising your follow-ups out loud makes the real ones easier.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app on your phone > Live.',
    steps: [
      'Open the Gemini app and tap Live.',
      'Tell it the role to play and how evasive to be.',
      'Ask your questions. Push when it dodges.',
      'Afterwards, ask which of your questions it found easiest to avoid.'
    ],
    prompt: 'Play a press officer for a water company that has just been fined. Answer my questions the way a cautious press officer would, and avoid a straight answer unless I pin you down.',
    alsoWorks: 'Type it in the Gemini app if you cannot talk out loud.',
    tip: 'Play a role, not a real person. Do not ask it to imitate someone by name.',
    care: CARE,
    jobs: ['interviews'],
    material: 'question',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-prompts']
  },

  {
    id: 'pull-quotes',
    number: 43,
    section: 'interviews',
    title: 'Pull every quote on a subject from your transcript, with timestamps',
    accent: 'every quote',
    why: 'Once you have a transcript, Gemini Notebook can pull out every quote on a subject with its timestamp, so you find the best line fast. It works from the transcript, so it is only as good as the transcription.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with your transcript added.',
    steps: [
      'Add the transcript from the Guardian transcription tool ({tip:transcribe-a-recording}).',
      'Ask the question below.',
      'Listen to each quote you might use at its timestamp. AI tools have been found inventing quotes, so the recording is the only proof.'
    ],
    prompt: 'List every quote in this transcript about the closure, word for word, with its timestamp.',
    alsoWorks: '',
    tip: 'Ask it to mark anything it has paraphrased rather than quoted. Then check those first.',
    care: 'Not for interviews with confidential sources. And if the story is highly sensitive and must not leak before publication, think hard before you load it.',
    jobs: ['interviews'],
    material: 'video-audio',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['genai-newsroom-quotes']
  },

  {
    id: 'quiz-yourself',
    number: 44,
    section: 'interviews',
    title: 'Test yourself on the facts before an interview',
    accent: 'Test yourself',
    why: 'Gemini Notebook can make flashcards or a quiz from your sources, and only your sources. A way to make the facts stick before you walk in.',
    tool: 'notebook',
    rung: 3,
    where: 'The interviewee notebook > Studio > Flashcards or Quiz.',
    steps: [
      'In the interviewee notebook ({tip:interviewee-notebook}), open the Studio panel.',
      'Choose Flashcards or Quiz [VERIFY] and say what to cover: her voting record, her key statements, the dates that matter.',
      'Run through them on the way to the interview.'
    ],
    prompt: 'Make 15 flashcards on her voting record and key statements, with page references.',
    alsoWorks: '',
    tip: 'Fifteen cards is about right. More than 30 and you will not finish them.',
    jobs: ['interviews'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  /* ==================================================================
     Check and verify
     ================================================================== */

  {
    id: 'where-did-that-number-come-from',
    number: 45,
    section: 'verify',
    title: 'Trace a statistic back to where it started',
    accent: 'where it started',
    why: 'Follow a statistic back to its original source before you repeat it. The 10,000 steps figure is widely reported to come from the name of a 1960s Japanese pedometer, not a study.',
    tool: 'search',
    rung: 2,
    where: 'AI Mode.',
    steps: [
      'Open AI Mode and paste the figure and where you saw it.',
      'Ask for the original source, not a report of it.',
      'Open the source and find the number on the page.'
    ],
    prompt: 'Where does the “10,000 steps a day” figure come from? Link the original source.',
    alsoWorks: 'The Gemini app.',
    tip: 'If it cannot find an original, that is worth knowing too.',
    jobs: ['verify', 'research'],
    material: 'question',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'reverse-image-search',
    number: 46,
    section: 'verify',
    title: 'Search with a photo to see where else it has appeared',
    accent: 'where else it has appeared',
    why: 'Reverse image search is the method verification teams use most. Google Lens takes a photo and finds where else it has appeared online, so you can see whether a picture from today’s story is really from years ago.',
    tool: 'search',
    where: 'The camera icon in the Google search box, or Google Lens on your phone.',
    steps: [
      'Click the camera icon in the Google search box and upload the image, or paste its address.',
      'Look through the matches for the earliest copy you can find.',
      'Open the earliest copies and check their dates and context.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'Crop to the most distinctive part of the image and search again. It often finds matches the full picture missed.',
    jobs: ['verify'],
    material: 'photo',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: ['becid-osint']
  },

  {
    id: 'geolocate-photo',
    number: 47,
    section: 'verify',
    title: 'Get leads on where a photo was taken, then confirm them on a map',
    accent: 'where a photo was taken',
    why: 'The latest AI models have become much better at working out where a photo was taken. Bellingcat’s October 2026 tests found the best of them narrowing down locations faster than a person in some conditions, and still concluded that humans remain key.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app, with the photo attached.',
    steps: [
      'Attach the photo and ask the question below.',
      'Ask it to list every clue it used: signs, buildings, plants, road markings, the sun.',
      'Check each clue yourself in Google Maps or Street View before you rely on the location.'
    ],
    prompt: 'Where was this photo taken? Work step by step: list each clue in the picture, what it suggests, and how confident you are. Give your best guess and two alternatives.',
    alsoWorks: '',
    tip: 'Treat its answer as leads. A location is confirmed only when you can match it yourself.',
    jobs: ['verify'],
    material: 'photo',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['bellingcat-2026', 'ebu-geolocation']
  },

  {
    id: 'contradicting-statements',
    number: 48,
    section: 'verify',
    title: 'Check whether two statements contradict each other',
    accent: 'contradict',
    why: 'When a minister’s words at a press conference differ from the written statement, the difference can be the story. Gemini Notebook can compare the two and show you where the wording changes, with a citation for each.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with both versions added.',
    steps: [
      'Add the transcript or video of what was said, and the written statement.',
      'Name them clearly, such as “Press conference” and “Statement”.',
      'Ask the question below.',
      'Check each difference against the recording.'
    ],
    prompt: 'Compare what was said at the press conference with the written statement. Where do they differ in wording, figures or commitments? Cite both for each difference.',
    alsoWorks: '',
    tip: 'Works for a company’s results call and its published results too.',
    jobs: ['verify', 'documents'],
    material: 'document',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['medium-factcheck']
  },

  {
    id: 'check-quote-against-recording',
    number: 49,
    section: 'verify',
    title: 'Check a quote against the recording',
    accent: 'against the recording',
    why: 'A quote that has been passed around can drift from what was said. Add the video to Gemini Notebook and it can find where the words appear, with a timestamp, so you can listen to the original.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with the YouTube video added as a source.',
    steps: [
      'In a notebook, click Add source and paste the YouTube link [VERIFY].',
      'Ask where the quote appears.',
      'Go to that point in the video and listen to the exact words.'
    ],
    prompt: 'Where in this video does the speaker say something like “the system is broken”? Give the timestamp and the exact words.',
    alsoWorks: 'YouTube’s Ask button ({tip:jump-to-the-moment}).',
    tip: 'The video needs captions; automatic ones count [VERIFY]. If it cannot find the quote, it may never have been said that way.',
    jobs: ['verify', 'interviews'],
    material: 'video-audio',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'check-figures-in-copy',
    number: 50,
    section: 'verify',
    title: 'Check every figure in your copy against the source document',
    accent: 'every figure',
    why: 'Before you file, Gemini Notebook can check whether the report you are quoting supports each figure in your copy, and on which page. It catches the transposed digit and the figure from the wrong year.',
    tool: 'notebook',
    rung: 3,
    where: 'Gemini Notebook, with the source report added.',
    steps: [
      'Add the report your figures come from.',
      'Paste the paragraphs with figures into the chat.',
      'Ask the question below.',
      'For any figure it cannot find, go back to the report yourself.'
    ],
    prompt: 'Here are paragraphs from my draft. For each figure, say whether this report supports it and give the page. Flag any figure you cannot find.',
    alsoWorks: '',
    tip: 'It checks against the document, not the world. If the report is wrong, so are you.',
    care: CARE,
    jobs: ['verify', 'before-filing'],
    material: 'notes',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'red-team-story',
    number: 51,
    section: 'verify',
    title: 'Ask what the subject, a critic or a lawyer would challenge in your story',
    accent: 'would challenge',
    why: 'The Gemini app can read your draft as a hostile reader would: the subject, a rival, a lawyer. It lists what they would challenge, which tells you where you need more evidence before your editor asks.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app, with your draft pasted in.',
    steps: [
      'Paste in your draft.',
      'Ask the question below.',
      'Go through the list and decide which points need another call, a document or a change.'
    ],
    prompt: 'Read this draft as the company it is about would. What would they challenge, what is asserted without evidence, and which claims rest on a single source?',
    alsoWorks: '',
    tip: 'Then ask again as a reader who agrees with the company. It is a good test of fairness. It does not replace the legal read.',
    care: CARE,
    jobs: ['verify', 'before-filing'],
    material: 'notes',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['bradshaw-prompts']
  },

  /* ==================================================================
     Organise your work
     ================================================================== */

  {
    id: 'one-topic-everywhere',
    number: 52,
    section: 'organise',
    title: 'Find everything you have on a story across email, Chat and Drive',
    accent: 'email, Chat and Drive',
    why: 'Once you connect your Workspace apps, one question to the Gemini app pulls together the emails, Chat messages and documents you have on a story, without opening three apps.',
    tool: 'gemini',
    rung: 4,
    where: 'Gemini app > Settings > Apps. Then ask.',
    steps: [
      'In the Gemini app, open Settings, then Apps [VERIFY].',
      'Turn on Gmail, Google Drive and Google Chat. Chat is off by default.',
      'Leave the other toggles alone [TODO: IT guidance on which toggles staff should turn on].',
      'Back in the chat, name the apps in your question.'
    ],
    prompt: 'Find everything I have on the Thames Water story (emails, Chat messages and documents) and list it newest first, with links.',
    alsoWorks: 'Ask Gemini in Drive, for documents only.',
    tip: 'Name the apps in the question. It searches more carefully when you do, and tells you which it used.',
    jobs: ['organise'],
    material: 'email-chat',
    effort: 'setup',
    plate: 'converge',
    availability: { status: 'check', note: 'Admin setting must be on for Workspace apps and for Chat. A 16 October 2026 option connects Workspace data to other Google services and can affect model training. Confirm with IT exactly which toggles to turn on.' },
    sources: ['chat-data-source', 'workspace-apps-admin', 'workspace-apps-note']
  },

  {
    id: 'ask-your-inbox',
    number: 53,
    section: 'organise',
    title: 'Find an email by describing it',
    accent: 'an email',
    why: 'Gmail can now answer a question about your inbox, so you can find a message without remembering the words in it. Useful for the embargo time, the press office reply or the attachment someone sent in June.',
    tool: 'gmail',
    where: 'The Gmail search box, or the Gemini side panel (the star icon, top right).',
    steps: [
      'In Gmail, type a question into the search box instead of keywords, and read the answer above the results [VERIFY].',
      'Or open the Gemini side panel (the star, top right) and ask there.',
      'Open the email it cites before you rely on a detail.'
    ],
    prompt: 'When did the press office last send embargoed figures, and what was the embargo time?',
    alsoWorks: 'The Gemini app with Gmail connected ({tip:one-topic-everywhere}).',
    tip: 'The embargo time in the answer is only as good as the message it came from.',
    jobs: ['organise'],
    material: 'email-chat',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'ask-your-drive',
    number: 54,
    section: 'organise',
    title: 'Find a document by describing it',
    accent: 'a document',
    why: 'Drive can now find a file from a description, when you have forgotten its title and its folder. Say what it was about, roughly when, and who wrote it, and it does the searching.',
    tool: 'drive',
    where: 'Drive > Ask Gemini.',
    steps: [
      'Open Drive and click Ask Gemini near the top [VERIFY placement].',
      'Describe the file: what it was about, roughly when, who wrote it, and whether it was a doc, a sheet or a deck.',
      'Open the result and check it is the one.'
    ],
    prompt: 'Find the planning doc for last year’s election-night coverage.',
    alsoWorks: 'The Gemini app with Drive connected ({tip:one-topic-everywhere}).',
    tip: 'Add who shared it, or roughly when. Two details beat one.',
    jobs: ['organise'],
    material: 'document',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: ['ask-gemini-drive']
  },

  {
    id: 'catch-up-thread',
    number: 55,
    section: 'organise',
    title: 'Catch up on a long email thread with a press office or source',
    accent: 'long email thread',
    why: 'Gemini in Gmail turns a 40-email chain into three lines, so you can reply without re-reading the lot. Useful when you come back to a story after a week away.',
    tool: 'gmail',
    where: 'Open the thread > Gemini side panel > summarise.',
    steps: [
      'Open the thread.',
      'Click the Gemini star (top right) to open the side panel.',
      'Choose Summarise this email [VERIFY], or type the question below.'
    ],
    prompt: 'What’s been agreed in this thread, and what’s still open?',
    alsoWorks: '',
    tip: 'Ask “who still owes a reply?” next. Summaries drop the caveats, so if the thread decided something that matters, read the message that decided it.',
    jobs: ['organise'],
    material: 'email-chat',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'catch-up-chat-space',
    number: 56,
    section: 'organise',
    title: 'Catch up on a busy desk Chat space',
    accent: 'busy desk Chat space',
    why: 'Gemini in Google Chat can summarise a space, so you skip scrolling back through 200 messages after a day off or a week away.',
    tool: 'chat',
    where: 'Ask Gemini in Chat.',
    steps: [
      'Open the space.',
      'Click the Gemini icon at the top [VERIFY].',
      'Ask for a summary since a date, or since you last looked. Then ask who was asked to do what.'
    ],
    prompt: 'Summarise what’s been decided in this space since Monday.',
    alsoWorks: 'The Gemini app with Chat connected: “Summarise my unread Chat messages from today.”',
    tip: 'It summarises the space you are in, not every space. Repeat it in each busy one.',
    jobs: ['organise'],
    material: 'email-chat',
    effort: '1min',
    availability: { status: 'check', note: 'Confirm Ask Gemini in Chat is on for Guardian accounts.' },
    sources: ['chat-data-source']
  },

  {
    id: 'notes-to-table',
    number: 57,
    section: 'organise',
    title: 'Turn messy meeting or interview notes into a table',
    accent: 'into a table',
    why: 'Gemini in Docs can turn scribbled notes into a structure you can use, and a list of what you still have to chase.',
    tool: 'docs',
    where: 'Docs > Gemini side panel, with the notes in the doc.',
    steps: [
      'Paste your notes into a Google Doc.',
      'Open the Gemini panel (the star, top right).',
      'Ask for the table, naming the columns.',
      'Insert it, then fix anything it guessed.'
    ],
    prompt: 'Turn these notes from the select committee hearing into a table: witness, what they said, any figure or date, follow-up.',
    alsoWorks: 'Paste the notes into the Gemini app.',
    tip: 'The blank cells are the useful part. They show what you did not write down.',
    jobs: ['organise'],
    material: 'notes',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'photograph-a-page',
    number: 58,
    section: 'organise',
    title: 'Photograph a printed handout or court list and get the text',
    accent: 'get the text',
    why: 'The Gemini app on your phone can turn a photo of a printed page into editable text: a statement handed out at a press conference, a court list, a page of a report with no digital copy.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app on your phone > camera or upload.',
    steps: [
      'Open the Gemini app on your phone.',
      'Tap the camera, or + to upload a photo you have already taken.',
      'Ask it to type up the text exactly.',
      'Copy the result into a note and read it against the page.'
    ],
    prompt: 'Type up the text in this photo exactly, keeping the line breaks.',
    alsoWorks: 'Google Lens > Text.',
    tip: 'Hold the phone flat and get the whole page in. Half a page gives you half the text and no warning.',
    jobs: ['organise', 'documents'],
    material: 'photo',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'notebook-for-your-beat',
    number: 59,
    section: 'organise',
    title: 'Keep a notebook for your beat and feed it every week',
    accent: 'for your beat',
    why: 'A standing Gemini notebook, fed each week with reports, statements, transcripts and releases, becomes a memory for your beat. By spring it answers questions nobody else on the desk can.',
    tool: 'notebook',
    rung: 3,
    where: 'One notebook per beat. Add sources as they arrive.',
    steps: [
      'Make one notebook for your beat and name it.',
      'Each week, add the new reports, statements, transcripts and releases.',
      'Ask it questions that span months.'
    ],
    prompt: 'What has Ofwat said about Thames Water’s finances since January?',
    alsoWorks: '',
    tip: 'There is a limit on sources per notebook [VERIFY the number], so start a fresh one each year.',
    jobs: ['organise', 'research'],
    material: 'document',
    effort: 'setup',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'share-a-notebook',
    number: 60,
    section: 'organise',
    title: 'Share a notebook with your desk on a running story',
    accent: 'with your desk',
    why: 'A Gemini notebook can be shared with colleagues, so everyone on a running story asks questions of the same documents. When someone adds a new filing, the whole desk can question it.',
    tool: 'notebook',
    rung: 3,
    where: 'The Share button in a notebook [VERIFY].',
    steps: [
      'Open the notebook and click Share [VERIFY].',
      'Add colleagues by their Guardian email address, and choose whether they can add sources or only ask.',
      'Tell the desk what is in it and what is not.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'Only share inside the Guardian, and only with people who should see every document in it.',
    jobs: ['organise'],
    material: 'document',
    effort: 'setup',
    availability: { status: 'check', note: 'Confirm the sharing options on a staff account.' },
    sources: ['gemini-faq-internal']
  },

  {
    id: 'write-foi-request',
    number: 61,
    section: 'organise',
    title: 'Write a short, precise FOI request',
    accent: 'FOI request',
    why: 'The Gemini app can help you turn a question into a short, specific FOI request. The Information Commissioner warns that AI-written requests tend to be too long and too broad, so the work is in cutting it down.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app.',
    steps: [
      'Say what you want to find out, from which public body and for what period.',
      'Ask for the request below.',
      'Cut anything vague, and make sure it asks for information, not opinions.',
      'Read the final wording carefully before you send it.'
    ],
    prompt: 'Draft a short FOI request to the Ministry of Justice for the number of prisoners released in error in England and Wales, by month and by prison, for 2024 and 2025. Ask for data only. Keep it under 100 words.',
    alsoWorks: '',
    tip: 'Sending the same request to every NHS trust or police force? Keep the wording identical so the answers compare.',
    jobs: ['organise'],
    material: 'question',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['ico-foi', 'foi-scotland']
  },

  {
    id: 'track-foi-requests',
    number: 62,
    section: 'organise',
    title: 'Keep track of your FOI requests and their deadlines',
    accent: 'deadlines',
    why: 'FOI requests are easy to lose track of. Gemini in Sheets can build you a tracker with the deadline worked out for each request, so you know when to chase and when to ask for an internal review.',
    tool: 'sheets',
    where: 'Sheets > Gemini side panel.',
    steps: [
      'Open a new sheet and the Gemini side panel.',
      'Ask for the tracker below.',
      'Add each request as you send it.',
      'Check the deadline against the public body’s own acknowledgement.'
    ],
    prompt: 'Make a table to track FOI requests: public body, date sent, reference, what I asked for, deadline (20 working days after the date sent), status. Add a formula for the deadline.',
    alsoWorks: '',
    tip: 'Bank holidays do not count as working days. Check the formula handles them, or adjust by hand.',
    jobs: ['organise'],
    material: 'spreadsheet',
    effort: 'setup',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'take-notes-for-me',
    number: 63,
    section: 'organise',
    title: 'Get notes taken in internal meetings',
    accent: 'notes taken',
    why: 'Google Meet can take notes during a call. It writes a summary and a list of actions and files them in Drive for everyone who attended.',
    tool: 'meet',
    where: 'In a Meet call, the Take notes for me option.',
    steps: [
      'Join or start the call in Meet.',
      'Click the pencil icon, Take notes with Gemini, at the top right [VERIFY placement].',
      'Click Start taking notes. Everyone on the call is told.',
      'After the call, the notes doc appears in Drive and goes to the organiser.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'Internal meetings only. Not for interviews.',
    jobs: ['organise'],
    material: 'meeting',
    effort: '1min',
    availability: { status: 'check', note: 'Depends on edition. Confirm on a normal staff account.' },
    sources: ['ask-gemini-meet']
  },

  {
    id: 'what-did-i-miss',
    number: 64,
    section: 'organise',
    title: 'Catch up on a meeting you joined late',
    accent: 'joined late',
    why: 'If Meet is taking notes, you can ask it privately what has happened so far. Nobody else on the call sees the question or the answer.',
    tool: 'meet',
    where: 'The Ask Gemini box, bottom left of the Meet window.',
    steps: [
      'Make sure note-taking is already running ({tip:take-notes-for-me}).',
      'Find the Ask Gemini box, bottom left of the Meet window [VERIFY].',
      'Ask. Only you see the answer.'
    ],
    prompt: 'What have I missed?',
    alsoWorks: '',
    tip: 'It answers from the notes so far, so the first few minutes of a call may be thin.',
    jobs: ['organise'],
    material: 'meeting',
    effort: '1min',
    availability: { status: 'check', note: 'Depends on edition. Hosts can switch it off.' },
    sources: ['ask-gemini-meet']
  },

  /* ==================================================================
     Before you file
     ================================================================== */

  {
    id: 'what-am-i-missing',
    number: 65,
    section: 'before-filing',
    title: 'List the questions your story has not answered yet',
    accent: 'not answered yet',
    why: 'The Gemini app can read your notes and list the questions a reader or editor would ask that you have not answered. It is the colleague who reads your notes and asks the obvious thing.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app, with your notes pasted in.',
    steps: [
      'Paste your notes into the Gemini app. Leave out source names.',
      'Ask for the unanswered questions.',
      'Ring the ones that matter and go and answer them.'
    ],
    prompt: 'Here are my notes on this story. What obvious questions haven’t I answered yet?',
    alsoWorks: '',
    tip: 'Do this before you file, not after the editor does. The questions are the same.',
    care: CARE,
    jobs: ['before-filing'],
    material: 'notes',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'second-pair-of-eyes',
    number: 66,
    section: 'before-filing',
    title: 'Proofread your copy',
    accent: 'Proofread',
    why: 'Google Docs can check your copy for typos, doubled words and grammar slips before you file: the ones your eyes have stopped seeing. It suggests; you decide.',
    tool: 'docs',
    where: 'Docs > Tools > Proofread.',
    steps: [
      'In your doc, open Tools, then Proofread [VERIFY menu path].',
      'Go through the suggestions one at a time. Accept or ignore each.',
      'Keep your voice. It is a check, not a rewrite.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'It has not read the Guardian style guide. For that, see {tip:style-check}.',
    jobs: ['before-filing'],
    material: 'notes',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'hear-your-draft',
    number: 67,
    section: 'before-filing',
    title: 'Hear your copy read aloud to catch clunky sentences',
    accent: 'read aloud',
    why: 'Google Docs can read your copy aloud. Your ears catch clunky sentences that your eyes skip, and a sentence you cannot say in one breath needs cutting.',
    tool: 'docs',
    where: 'Docs > Tools > Listen.',
    steps: [
      'Open Tools, then Listen [VERIFY menu path].',
      'Press play and follow the highlight.',
      'Mark anywhere you stumble. That is the sentence to fix.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'Put headphones on and read along. It is quicker than reading it twice.',
    jobs: ['before-filing'],
    material: 'notes',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'talk-it-through',
    number: 68,
    section: 'before-filing',
    title: 'Talk through your angle out loud on a walk',
    accent: 'out loud',
    why: 'Gemini Live is the spoken version of the Gemini app: you talk, it talks back. A sounding board for testing your angle out loud before you write it.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app on your phone > Live.',
    steps: [
      'Open the Gemini app on your phone and tap Live.',
      'Tell it the story and ask it to question you.',
      'Talk. Interrupt. Argue back.',
      'Ask for a summary at the end and send it to yourself.'
    ],
    prompt: 'I’m working on a story about universities closing courses. Ask me questions until the angle is sharper.',
    alsoWorks: '',
    tip: 'It needs headphones and a quiet enough street. It does not need you to type.',
    care: CARE,
    jobs: ['before-filing', 'find-story'],
    material: 'question',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'style-check',
    number: 69,
    section: 'before-filing',
    title: 'Check your copy against Guardian style',
    accent: 'Guardian style',
    why: 'The Gemini app can check your copy against the rules you give it: numbers, capitals, titles, dates. The BBC built a tool to do this in-house; you can do a simple version by pasting in the rules that trip you up.',
    tool: 'gemini',
    rung: 4,
    where: 'The Gemini app, or a skill you have saved.',
    steps: [
      'Copy the style guide entries you most often get wrong.',
      'Paste them into the Gemini app with your copy.',
      'Ask for a list of problems with the fix for each, not a rewrite.'
    ],
    prompt: 'Check this copy against these Guardian style rules: [paste rules]. List each problem, the rule it breaks and the fix. Do not rewrite anything else.',
    alsoWorks: '',
    tip: 'Save it as a skill and it is one click every time ({tip:weekly-chore-to-skill}).',
    care: CARE,
    jobs: ['before-filing'],
    material: 'notes',
    effort: '1min',
    availability: { status: 'ok', note: '' },
    sources: ['nieman-three-newsrooms']
  },

  /* ==================================================================
     Make it routine
     ================================================================== */

  {
    id: 'how-you-like-things',
    number: 70,
    section: 'routine',
    title: 'Tell Gemini how you like your answers',
    accent: 'how you like your answers',
    why: 'Standing instructions are preferences Gemini remembers across Workspace: British spelling, Guardian style, always answer in bullets. Set them once and every answer follows them.',
    tool: 'gmail',
    where: 'Any Workspace Gemini panel > menu > Settings > Personalisation.',
    steps: [
      'In Gmail (or any Workspace app), open the Gemini side panel: the star, top right.',
      'Open the panel’s menu, then Settings, then Personalisation [VERIFY].',
      'Type your standing instructions and save.',
      'They now apply in Gmail, Docs, Sheets, Drive, Chat and Slides.'
    ],
    prompt: 'Always use British English and Guardian style, and keep summaries to five bullets.',
    alsoWorks: 'Ask Gemini in the panel to remember an instruction.',
    tip: 'Keep them short. Three rules beat 30.',
    jobs: ['routine'],
    material: 'question',
    effort: 'setup',
    availability: { status: 'check', note: 'Custom instructions in Workspace rolled out from 2 September 2026. Confirm on a staff account. Also decide whether this entry should use a new “workspace” tool value.' },
    sources: ['custom-instructions']
  },

  {
    id: 'weekly-chore-to-skill',
    number: 71,
    section: 'routine',
    title: 'Save a check you do every week as a skill',
    accent: 'as a skill',
    why: 'A skill is a saved set of instructions you can run whenever you need it, like a recipe. Write it once, use it every week.',
    tool: 'gemini',
    rung: 4,
    where: 'Gemini app > Skills. Workspace skills are separate and called with an @mention.',
    steps: [
      'In the Gemini app, open Skills [VERIFY path] and click New.',
      'Name it, then paste the instructions: what to do, what to check against, how to answer.',
      'Save it. Call it whenever you need it.',
      'Workspace skills (in Docs, Gmail and others) are made separately and called with an @mention.'
    ],
    prompt: 'Check any text I give you against these Guardian style rules: [paste rules]. List each problem with the fix.',
    alsoWorks: 'Workspace skills via @mention. They do not sync with the Gemini app, so make them separately.',
    tip: 'Used Gems? Skills are the same idea under a new name. Gems are being retired from 17 November 2026, so make new ones as skills.',
    jobs: ['routine'],
    material: 'question',
    effort: 'setup',
    plate: 'skill',
    availability: { status: 'check', note: 'Skills rolled out to the Gemini app from 13 October 2026 and to Workspace apps from 5 October (scheduled release from 19 October), completing by mid-November. Do not teach Gems.' },
    sources: ['skills', 'skills-transition']
  },

  {
    id: 'inbox-and-diary',
    number: 72,
    section: 'routine',
    title: 'Get your inbox and diary summarised before you get in',
    accent: 'inbox and diary',
    why: 'The same idea as the morning digest ({tip:morning-news-digest}), pointed at your own inbox and calendar instead of the news.',
    tool: 'gemini',
    rung: 4,
    where: 'A scheduled action in the Gemini app. Needs Gmail and Calendar connected.',
    steps: [
      'Connect Gmail and Calendar first ({tip:one-topic-everywhere}).',
      'Ask for the schedule in the Gemini app, as in the morning digest.',
      'Read it the next morning. If it is too long, change the wording.'
    ],
    prompt: 'Every weekday at 8am, summarise my unread emails that need a reply and list today’s meetings.',
    alsoWorks: '',
    tip: 'It only sees what you connected. If the diary is wrong, check your connected apps before you blame the digest.',
    jobs: ['routine', 'organise'],
    material: 'email-chat',
    effort: 'setup',
    availability: { status: 'check', note: 'Availability of scheduled actions on our Workspace edition.' },
    sources: ['scheduled-actions']
  },

  {
    id: 'one-off-schedule',
    number: 73,
    section: 'routine',
    title: 'Schedule a one-off: the coverage of a hearing, the morning after',
    accent: 'one-off',
    why: 'A scheduled action can run once, at a time you choose. Set it before you go home and a list of the coverage is waiting when you come in. Useful the morning after a hearing, a judgment or a big announcement.',
    tool: 'gemini',
    rung: 4,
    where: 'Ask in the Gemini app, with the date and time in the prompt. Manage at gemini.google.com/scheduled.',
    steps: [
      'Put the date and time in the prompt itself.',
      'Say exactly what to look for and what to leave out.',
      'Confirm when it asks.',
      'Read the pieces it links to. The list is a pointer, not a summary you can use.'
    ],
    prompt: 'Tomorrow at 7am, find the coverage of today’s Treasury committee hearing with the Bank of England governor. List each story with its outlet, headline and link, and one line on its angle.',
    alsoWorks: '',
    tip: 'It runs within an hour of the time you set.',
    jobs: ['routine', 'find-story'],
    material: 'question',
    effort: 'setup',
    availability: { status: 'check', note: 'Availability of scheduled actions on our Workspace edition.' },
    sources: ['scheduled-actions']
  },

  {
    id: 'build-a-tiny-tool',
    number: 74,
    section: 'routine',
    title: 'Build a small calculator for a figure you work out often',
    accent: 'small calculator',
    why: 'Canvas is a mode in the Gemini app that builds a small working app from a sentence, with no code to write. A calculator for a sum you do every week is a good first one.',
    tool: 'gemini',
    rung: 4,
    where: 'Gemini app > + > Canvas.',
    steps: [
      'In the Gemini app, click + and choose Canvas [VERIFY].',
      'Describe the tool in one sentence.',
      'Try it. Ask for changes in plain English.',
      'Test it on a sum you have already done by hand before you trust it.'
    ],
    prompt: 'Build me a calculator: I enter a total spend and a population, and it shows the spend per head, rounded to the nearest pound.',
    alsoWorks: 'The vibecoding workshop deck has the full session.',
    tip: 'If it breaks, say what you saw, not what you think went wrong. “The button does nothing” is enough.',
    jobs: ['routine', 'numbers'],
    material: 'question',
    effort: '5min',
    availability: { status: 'ok', note: '' },
    sources: ['vibecoding-deck']
  }
];
