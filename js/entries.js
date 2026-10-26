/* 50 simple ways to use AI at work: the entries.
 *
 * This is the file to edit. The page draws everything from it: the list,
 * the filters, the counts and (later) the presenter view.
 *
 * Each entry looks like this:
 *
 *   id          anchor for the link (#sort-500-rows). Lower case, hyphens.
 *   number      1 to 50, in reading order
 *   section     one of: ladder, find, documents, av, numbers, tidy, automate
 *   title       verb-led, concrete. The accent phrase must appear in it.
 *   accent      the word or phrase set in italics
 *   why         one line on what you get
 *   tool        exactly one tool id (see js/site.js for the list)
 *   rung        1 to 4 if the tool sits on the ladder, otherwise leave out
 *   where       where the feature lives, in plain words
 *   steps       three or four short steps
 *   prompt      the text to copy and paste. Empty if there is nothing to paste.
 *   alsoWorks   one line on the alternative route, or empty
 *   tip         one extra line, or empty
 *   jobs        one or two job ids
 *   material    exactly one material id
 *   effort      1min, 5min or setup
 *   plate       the id of an interactive plate, or leave out
 *   sketch      a frame and variant from js/sketches.js, like chat/file, or leave out
 *   availability  { status: ok | check | todo, note: what to check }
 *   sources     ids from the sources list in js/site.js
 *
 * Markers you can leave in any text:
 *   [VERIFY]         a button or menu name I could not confirm on a Guardian account
 *   [TODO: ...]      something only Chris can fill in
 * Readers never see them. Add ?review to the page address to see them highlighted.
 */

window.ENTRIES = [

  /* ------------------------------------------------------------------
     Pick the right tool
     ------------------------------------------------------------------ */

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
      'Treat it as a first look, not the answer. Click through before you quote anything.'
    ],
    prompt: 'What is a section 114 notice?',
    alsoWorks: '',
    tip: 'No overview? The question was probably too specific. Try AI Mode (tip 2). You can search with a picture too: the camera icon in the search box takes a photo and asks about it.',
    jobs: ['find'],
    material: 'question',
    effort: '1min',
    sketch: 'search/overview',
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
    jobs: ['find'],
    material: 'question',
    effort: '1min',
    sketch: 'search/aimode',
    availability: { status: 'check', note: 'AI Mode charts started with US finance and sports queries. Do not promise charts unless confirmed in the UK.' },
    sources: ['aimode-charts']
  },

  {
    id: 'gemini-app',
    number: 3,
    section: 'ladder',
    title: 'When to use the Gemini app',
    accent: 'Gemini app',
    why: 'The Gemini app is Google’s chat, the equivalent of ChatGPT. It is the place for long working sessions: your own files, your Workspace, a conversation that builds. Some websites block it from reading their pages.',
    tool: 'gemini',
    rung: 3,
    where: 'gemini.google.com, signed in with your Guardian account.',
    steps: [
      'Go to gemini.google.com and check the account in the top corner is your Guardian one.',
      'Attach a file with the + button, or paste the text straight in.',
      'Ask, then keep asking. This is a conversation, not a search.'
    ],
    prompt: 'Explain the funding gap in this council budget report in plain English and list the five biggest savings.',
    alsoWorks: 'AI Mode, for shorter questions with no files.',
    tip: 'Some sites block it from reading their pages [VERIFY: name one or two], so paste the text in rather than the link.',
    jobs: ['find', 'interrogate'],
    material: 'question',
    effort: '1min',
    sketch: 'chat/file',
    availability: { status: 'check', note: 'Find one or two common sites that block Gemini so the entry can name them.' },
    sources: []
  },

  {
    id: 'gemini-notebook',
    number: 4,
    section: 'ladder',
    title: 'When to use Gemini Notebook',
    accent: 'Gemini Notebook',
    why: 'Gemini Notebook is a research tool that answers only from documents you give it, and footnotes every answer. Nothing from the wider web creeps in, so every claim can be traced to a page.',
    tool: 'notebook',
    rung: 4,
    where: 'notebooklm.google (it redirects) > New notebook > add sources.',
    steps: [
      'Go to notebooklm.google. It redirects to Gemini Notebook: same tool, new name.',
      'Click New notebook and add your sources: upload the PDFs, or paste links.',
      'Ask in the chat panel. Every answer carries numbered citations.',
      'Click a citation to see the passage it came from.'
    ],
    prompt: 'What did councillors say about the funding gap?',
    alsoWorks: '',
    tip: 'It only knows what you gave it. If the answer is not in the sources, it should say so.',
    jobs: ['interrogate'],
    material: 'document',
    effort: '5min',
    sketch: 'notebook/sources',
    availability: { status: 'ok', note: '' },
    sources: ['notebook-rename']
  },

  {
    id: 'flash-or-thinking',
    number: 5,
    section: 'ladder',
    title: 'Flash or Thinking?',
    accent: 'Flash or Thinking',
    why: 'Most AI tools offer more than one model, the engine behind the answers. In Gemini you choose between Flash, which is fast and fine for simple jobs, and Thinking, which is slower but works through numbers, logic and comparisons step by step.',
    tool: 'gemini',
    rung: 3,
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
    jobs: ['count', 'explain'],
    material: 'question',
    effort: '1min',
    sketch: 'chat/model',
    availability: { status: 'check', note: 'Confirm the model labels staff see in the Guardian picker (brief says Flash 3.6 and Thinking 3.8).' },
    sources: []
  },

  /* ------------------------------------------------------------------
     Find anything
     ------------------------------------------------------------------ */

  {
    id: 'one-topic-everywhere',
    number: 6,
    section: 'find',
    title: 'Everything on one topic, across email, chat and Drive',
    accent: 'email, chat and Drive',
    why: 'One question pulls together the emails, Chat messages and documents you have on a story, without opening three apps.',
    tool: 'gemini',
    rung: 3,
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
    jobs: ['find', 'catch-up'],
    material: 'email-chat',
    effort: 'setup',
    plate: 'converge',
    availability: { status: 'check', note: 'Admin setting must be on for Workspace apps and for Chat. A 16 October 2026 option connects Workspace data to other Google services and can affect model training. Confirm with IT exactly which toggles to turn on.' },
    sources: ['chat-data-source', 'workspace-apps-admin', 'workspace-apps-note']
  },

  {
    id: 'ask-your-inbox',
    number: 7,
    section: 'find',
    title: 'Ask your inbox',
    accent: 'inbox',
    why: 'Find things without remembering the right search terms.',
    tool: 'gmail',
    where: 'The Gmail search box, or the Gemini side panel (the star icon, top right).',
    steps: [
      'In Gmail, type a question into the search box instead of keywords, and read the answer above the results [VERIFY].',
      'Or open the Gemini side panel (the star, top right) and ask there.',
      'Open the email it cites before you trust a detail.'
    ],
    prompt: 'When did the press office last send embargoed figures, and what was the embargo time?',
    alsoWorks: 'The Gemini app with Gmail connected (tip 6).',
    tip: 'It finds the email. You still read it. The embargo time in the answer is only as good as the message it came from.',
    jobs: ['find'],
    material: 'email-chat',
    effort: '1min',
    sketch: 'mail/search',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'ask-your-drive',
    number: 8,
    section: 'find',
    title: 'Ask your Drive',
    accent: 'Drive',
    why: 'Find a document by describing it, when you have forgotten the title and the folder.',
    tool: 'drive',
    where: 'Drive > Ask Gemini.',
    steps: [
      'Open Drive and click Ask Gemini near the top [VERIFY placement].',
      'Describe the file: what it was about, roughly when, who wrote it, and whether it was a doc, a sheet or a deck.',
      'Open the result and check it is the one.'
    ],
    prompt: 'Find the planning doc for last year’s election-night coverage.',
    alsoWorks: 'The Gemini app with Drive connected (tip 6).',
    tip: 'Add who shared it, or roughly when. Two details beat one.',
    jobs: ['find'],
    material: 'document',
    effort: '1min',
    sketch: 'drive/find',
    availability: { status: 'ok', note: '' },
    sources: ['ask-gemini-drive']
  },

  {
    id: 'catch-up-thread',
    number: 9,
    section: 'find',
    title: 'Catch me up on this thread',
    accent: 'this thread',
    why: 'Turns a 40-email chain into three lines, so you can reply without re-reading the lot.',
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
    jobs: ['catch-up'],
    material: 'email-chat',
    effort: '1min',
    sketch: 'mail/thread',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'catch-up-chat-space',
    number: 10,
    section: 'find',
    title: 'Catch up on a busy Chat space',
    accent: 'busy Chat space',
    why: 'Skip scrolling back through 200 messages after a day off or a week away.',
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
    jobs: ['catch-up'],
    material: 'email-chat',
    effort: '1min',
    sketch: 'mail/space',
    availability: { status: 'check', note: 'Confirm Ask Gemini in Chat is on for Guardian accounts.' },
    sources: ['chat-data-source']
  },

  {
    id: 'ask-the-page',
    number: 11,
    section: 'find',
    title: 'Ask the page you’re on',
    accent: 'the page',
    why: 'Summarise a long page, or compare up to 10 open tabs, without leaving the browser.',
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
    jobs: ['interrogate'],
    material: 'web-page',
    effort: '1min',
    sketch: 'chat/browser',
    availability: { status: 'check', note: 'Is Gemini in Chrome enabled for Guardian accounts? It rolled out to UK desktop users; admins can switch it off.' },
    sources: ['chrome-uk', 'chrome-admin']
  },

  {
    id: 'where-did-that-number-come-from',
    number: 12,
    section: 'find',
    title: 'Where did that number come from?',
    accent: 'that number',
    why: 'Follow a statistic back to its original source before you repeat it. The 10,000 steps figure is widely reported to come from the name of a 1960s Japanese pedometer, not a study.',
    tool: 'search',
    rung: 2,
    where: 'AI Mode.',
    steps: [
      'Open AI Mode and paste the figure and where you saw it.',
      'Ask for the original source, not a report of it.',
      'Open the source and find the number on the page before you use it.'
    ],
    prompt: 'Where does the “10,000 steps a day” figure come from? Link the original source.',
    alsoWorks: 'The Gemini app.',
    tip: 'If it cannot find an original, that is worth knowing too.',
    jobs: ['find'],
    material: 'question',
    effort: '5min',
    sketch: 'search/trace',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'backgrounder-in-ten-minutes',
    number: 13,
    section: 'find',
    title: 'A backgrounder in ten minutes',
    accent: 'ten minutes',
    why: 'Deep Research is a mode in the Gemini app. Give it a topic and it reads dozens of sources and writes a briefing with citations while you do something else. Ten minutes rather than a morning.',
    tool: 'gemini',
    rung: 3,
    where: 'Gemini app > Tools (or +) > Deep Research.',
    steps: [
      'In the Gemini app, click Tools (or +) and choose Deep Research [VERIFY].',
      'Describe the briefing you want, with the period and the country.',
      'Approve the plan it shows you, then go and do something else.',
      'Read the sources it cites, not just the report.'
    ],
    prompt: 'A cited briefing on the history of fines on English water companies since privatisation.',
    alsoWorks: 'Gemini Notebook’s “start from a question” option, which keeps the sources.',
    tip: 'A researcher’s first draft: good on shape, never to be quoted.',
    jobs: ['find', 'prepare'],
    material: 'question',
    effort: '5min',
    sketch: 'chat/research',
    availability: { status: 'check', note: 'The Deep Research quota on our edition.' },
    sources: ['deep-research-limits']
  },

  /* ------------------------------------------------------------------
     Get through documents
     ------------------------------------------------------------------ */

  {
    id: 'ask-a-report-anything',
    number: 14,
    section: 'documents',
    title: 'Ask a 300-page report anything',
    accent: 'anything',
    why: 'Answers in seconds from a document you would otherwise skim, with the page each one came from.',
    tool: 'notebook',
    rung: 4,
    where: 'Gemini Notebook > New notebook > upload the PDF > ask in the chat.',
    steps: [
      'Open Gemini Notebook, click New notebook and upload the PDF.',
      'Wait for the source to finish loading (a tick appears beside it).',
      'Ask in the chat panel.',
      'Click the citation numbers to see the passages it used.'
    ],
    prompt: 'Which of this report’s recommendations are aimed at the Treasury?',
    alsoWorks: 'Upload the PDF to the Gemini app, or use the Gemini panel in Drive’s PDF viewer.',
    tip: 'Upload the whole report, not a chapter. The answer is often in the annex.',
    jobs: ['interrogate'],
    material: 'document',
    effort: '5min',
    sketch: 'notebook/answer',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'every-answer-has-a-receipt',
    number: 15,
    section: 'documents',
    title: 'Every answer comes with a receipt',
    accent: 'receipt',
    why: 'Every answer in Gemini Notebook carries numbered citations. Click one and it shows the exact passage the answer came from, so checking takes seconds rather than a search through the PDF.',
    tool: 'notebook',
    rung: 4,
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
    jobs: ['interrogate'],
    material: 'document',
    effort: '1min',
    plate: 'receipt',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'summarise-a-pdf-in-drive',
    number: 16,
    section: 'documents',
    title: 'Summarise a PDF where it sits',
    accent: 'where it sits',
    why: 'Open a PDF in Drive and Gemini can summarise it right there, or turn it into a short spoken summary, called an Audio Overview. The file never moves.',
    tool: 'drive',
    where: 'Open a PDF in Drive > the Audio Overview button in the top bar, or the Gemini panel.',
    steps: [
      'Open the PDF in Drive (double-click it).',
      'Click the Gemini panel [VERIFY], or the Audio Overview button in the top bar.',
      'Ask for a summary, or press play and listen.',
      'Open the file itself for anything you will quote.'
    ],
    prompt: 'Summarise this in five bullets for someone who has two minutes.',
    alsoWorks: '',
    tip: 'The Audio Overview is two synthetic voices talking. Fine on the train, never a source for a quote.',
    jobs: ['catch-up', 'interrogate'],
    material: 'document',
    effort: '1min',
    sketch: 'drive/pdf',
    availability: { status: 'check', note: 'English PDFs only at launch. Confirm the button is visible on our tier.' },
    sources: ['drive-audio']
  },

  {
    id: 'document-to-data-table',
    number: 17,
    section: 'documents',
    title: 'Turn a document into a data table',
    accent: 'data table',
    why: 'Gemini Notebook can turn a document into a table: you name the columns, it finds the facts. Commitments scattered through a white paper become rows you can sort and export to Sheets.',
    tool: 'notebook',
    rung: 4,
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
    jobs: ['organise', 'interrogate'],
    material: 'document',
    effort: '5min',
    plate: 'table',
    availability: { status: 'ok', note: '' },
    sources: ['notebook-tables', 'notebook-tables-2']
  },

  {
    id: 'count-the-words',
    number: 18,
    section: 'documents',
    title: 'Count the words in a speech',
    accent: 'in a speech',
    why: 'Gemini Notebook can run small programs to count things exactly rather than guess. Counting is the difference between a figure you can print and one you cannot.',
    tool: 'notebook',
    rung: 4,
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
    jobs: ['count'],
    material: 'document',
    effort: '5min',
    availability: { status: 'check', note: 'Is code execution available on our tier? If not, switch the recommended tool to the Gemini app on Thinking. The illustration should be a real, date-stamped word count from a public speech, with a link to the source. [TODO: generate it]' },
    sources: ['notebook-code']
  },

  {
    id: 'what-changed',
    number: 19,
    section: 'documents',
    title: 'What changed between versions?',
    accent: 'changed',
    why: 'Compare this year’s report with last year’s, or a draft with the final text.',
    tool: 'notebook',
    rung: 4,
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
    jobs: ['interrogate'],
    material: 'document',
    effort: '5min',
    plate: 'diff',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'timeline-from-cuttings',
    number: 20,
    section: 'documents',
    title: 'A timeline from a pile of cuttings',
    accent: 'timeline',
    why: 'An instant chronology for a long-running story, with every date pointing back to the cutting it came from.',
    tool: 'notebook',
    rung: 4,
    where: 'A notebook with the cuttings as sources.',
    steps: [
      'Add the cuttings as sources: paste each article’s text, or its link.',
      'Ask for a dated timeline, citing each entry.',
      'Ask for it as a table if you want it in Sheets.'
    ],
    prompt: 'Make a dated timeline of every key event in these sources, citing each one.',
    alsoWorks: '',
    tip: 'Dates in cuttings are often relative (“last Tuesday”), so check any that matter against the cutting’s own date.',
    jobs: ['organise'],
    material: 'document',
    effort: '5min',
    sketch: 'notebook/timeline',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'map-a-report',
    number: 21,
    section: 'documents',
    title: 'Map a sprawling report',
    accent: 'Map',
    why: 'Gemini Notebook can draw a mind map of a document: its chapters and themes as a branching diagram. It shows the shape of a report before you read it, so you know which chapter to read properly.',
    tool: 'notebook',
    rung: 4,
    where: 'Notebook > Studio > Mind map.',
    steps: [
      'In a notebook with the report loaded, open the Studio panel.',
      'Click Mind map [VERIFY]. There is nothing to type.',
      'Click any branch to ask about that part.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'A good place to start. Not a substitute for reading the chapter you will write about.',
    jobs: ['interrogate'],
    material: 'document',
    effort: '1min',
    sketch: 'notebook/mindmap',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'listen-on-the-way-in',
    number: 22,
    section: 'documents',
    title: 'Listen to it on the way in',
    accent: 'Listen',
    why: 'An Audio Overview is a spoken summary of your sources, done as a conversation between two synthetic voices. Twelve minutes on your report during the commute beats not having opened it.',
    tool: 'notebook',
    rung: 4,
    where: 'Notebook > Studio > Audio Overview > Customise.',
    steps: [
      'In the Studio panel, find Audio Overview.',
      'Click Customise first and say what to focus on.',
      'Press play, or download it for the journey.'
    ],
    prompt: 'Focus on the funding chapters and skip the methodology.',
    alsoWorks: 'Drive’s Audio Overview for a single PDF (tip 16).',
    tip: 'Two synthetic voices chatting. Fine for the gist, never for a quote.',
    jobs: ['catch-up'],
    material: 'document',
    effort: '5min',
    sketch: 'notebook/audio',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'interviewee-notebook',
    number: 23,
    section: 'documents',
    title: 'The interviewee notebook',
    accent: 'interviewee',
    why: 'Load cuttings, past interviews and speeches, then build your questions from them.',
    tool: 'notebook',
    rung: 4,
    where: 'A new notebook, one per interviewee.',
    steps: [
      'Start a new notebook, one per interviewee.',
      'Add cuttings, past interviews, speeches and anything they have written.',
      'Ask what they have never been asked, and where their position moved.',
      'Build your questions from the citations.'
    ],
    prompt: 'What has she never been asked about housing? Where has her position shifted over time? Cite each.',
    alsoWorks: '',
    tip: 'Keep the notebook after the interview. The next time she is in the news, you start from here.',
    jobs: ['prepare'],
    material: 'document',
    effort: '5min',
    sketch: 'notebook/questions',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'quiz-yourself',
    number: 24,
    section: 'documents',
    title: 'Quiz yourself before the interview',
    accent: 'Quiz',
    why: 'Gemini Notebook can make flashcards or a quiz from your sources, and only your sources. A way to make the facts stick before you walk in.',
    tool: 'notebook',
    rung: 4,
    where: 'The same notebook > Studio > Flashcards or Quiz.',
    steps: [
      'In the interviewee notebook, open the Studio panel.',
      'Choose Flashcards or Quiz [VERIFY] and say what to cover: her voting record, her key statements, the dates that matter.',
      'Run through them on the way to the interview.'
    ],
    prompt: 'Make 15 flashcards on her voting record and key statements, with page references.',
    alsoWorks: '',
    tip: 'Fifteen cards is about right. More than 30 and you will not finish them.',
    jobs: ['prepare'],
    material: 'document',
    effort: '5min',
    sketch: 'notebook/cards',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'notebook-for-your-beat',
    number: 25,
    section: 'documents',
    title: 'A notebook for your beat',
    accent: 'your beat',
    why: 'A standing notebook you feed weekly with minutes, agendas and releases. By spring it answers questions nobody else on the desk can.',
    tool: 'notebook',
    rung: 4,
    where: 'One notebook per patch. Add sources as they arrive.',
    steps: [
      'Make one notebook for your patch and name it.',
      'Each week, add the new minutes, agendas and releases as they arrive.',
      'Ask it questions that span months.'
    ],
    prompt: 'What has the council said about the leisure centre since January?',
    alsoWorks: '',
    tip: 'Share it with your desk, so everyone asks the same pile of documents [VERIFY the sharing setting]. There is a limit on sources per notebook [VERIFY the number], so start a fresh one each year.',
    jobs: ['prepare', 'find'],
    material: 'document',
    effort: 'setup',
    sketch: 'notebook/beat',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  /* ------------------------------------------------------------------
     Video, audio and meetings
     ------------------------------------------------------------------ */

  {
    id: 'ask-a-video',
    number: 26,
    section: 'av',
    title: 'Ask a video to summarise itself',
    accent: 'summarise itself',
    why: 'YouTube has an Ask button under many videos. It summarises the video and answers questions about it, working from the words spoken in it.',
    tool: 'youtube',
    where: 'Below the player, between Share and Download.',
    steps: [
      'Open the video on YouTube in a desktop browser.',
      'Find the Ask button below the player, between Share and Download [VERIFY it shows for UK staff].',
      'Ask for a summary, or a specific question.',
      'Watch the moments it points to before you quote.'
    ],
    prompt: 'Summarise the key points of this hearing.',
    alsoWorks: 'Paste the link into the Gemini app (tip 28).',
    tip: 'The button only appears on some videos. If it is missing, tip 28 does the same job.',
    jobs: ['catch-up'],
    material: 'video-audio',
    effort: '1min',
    sketch: 'player/ask',
    availability: { status: 'check', note: 'Confirm the Ask button appears for UK staff on desktop.' },
    sources: ['youtube-ask', 'youtube-ask-search-us']
  },

  {
    id: 'jump-to-the-moment',
    number: 27,
    section: 'av',
    title: 'Jump to the moment',
    accent: 'the moment',
    why: 'Ask where something is said and get a timestamp, so a two-hour hearing takes two minutes.',
    tool: 'youtube',
    where: 'The Ask button.',
    steps: [
      'Click Ask under the video.',
      'Ask where something is said.',
      'Click the timestamp in the answer. The player jumps there.',
      'Listen to the exact words.'
    ],
    prompt: 'When does the minister talk about prisons?',
    alsoWorks: '',
    tip: 'Ask for every mention, not just the first: “each time the minister mentions prisons, with timestamps”.',
    jobs: ['find'],
    material: 'video-audio',
    effort: '1min',
    plate: 'moment',
    availability: { status: 'check', note: 'Same check as tip 26.' },
    sources: ['youtube-ask']
  },

  {
    id: 'paste-the-link',
    number: 28,
    section: 'av',
    title: 'No Ask button? Paste the link',
    accent: 'Paste the link',
    why: 'Works on public videos when the button is not there, including most committee streams and press conferences.',
    tool: 'gemini',
    rung: 3,
    where: 'The Gemini app. Paste the YouTube address into the prompt.',
    steps: [
      'Copy the video’s address from the browser bar.',
      'Paste it into the Gemini app with your question.',
      'Ask for claims with timestamps so you can check each one.'
    ],
    prompt: 'Summarise this video and list each claim with its timestamp.',
    alsoWorks: '',
    tip: 'Public videos only. Private or unlisted ones will not load.',
    jobs: ['catch-up'],
    material: 'video-audio',
    effort: '1min',
    sketch: 'chat/link',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'video-as-a-source',
    number: 29,
    section: 'av',
    title: 'A video as a notebook source',
    accent: 'notebook source',
    why: 'Add a hearing or press conference to a notebook, question it alongside your documents, and quote it by timestamp.',
    tool: 'notebook',
    rung: 4,
    where: 'Notebook > Add source > YouTube link.',
    steps: [
      'In a notebook, click Add source and choose YouTube [VERIFY].',
      'Paste the link.',
      'Ask about it alongside your documents.',
      'Ask for exact words, then check them against the video.'
    ],
    prompt: 'What did the chief executive say about bonuses? Give me the exact words.',
    alsoWorks: '',
    tip: 'The video needs captions. Automatic ones count [VERIFY].',
    jobs: ['interrogate'],
    material: 'video-audio',
    effort: '5min',
    sketch: 'notebook/video',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'transcribe-a-recording',
    number: 30,
    section: 'av',
    title: 'Transcribe a recording',
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
    jobs: ['transcribe'],
    material: 'video-audio',
    effort: '5min',
    sketch: 'player/transcript',
    availability: { status: 'todo', note: 'Name, link, access route, upload steps, and any file-size or language limits.' },
    sources: ['transcription-tool']
  },

  {
    id: 'live-transcript',
    number: 31,
    section: 'av',
    title: 'A live transcript as it happens',
    accent: 'live',
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
    jobs: ['transcribe'],
    material: 'video-audio',
    effort: 'setup',
    sketch: 'player/live',
    availability: { status: 'todo', note: 'Name, install route, which sites it works on.' },
    sources: ['live-transcription-tool']
  },

  {
    id: 'take-notes-for-me',
    number: 32,
    section: 'av',
    title: 'Take notes for me',
    accent: 'Take notes',
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
    jobs: ['transcribe', 'catch-up'],
    material: 'meeting',
    effort: '1min',
    sketch: 'meet/notes',
    availability: { status: 'check', note: 'Depends on edition. Confirm on a normal staff account.' },
    sources: ['ask-gemini-meet']
  },

  {
    id: 'what-did-i-miss',
    number: 33,
    section: 'av',
    title: 'Joined late? Ask what you missed',
    accent: 'what you missed',
    why: 'If Meet is taking notes, you can ask it privately what has happened so far. Nobody else on the call sees the question or the answer.',
    tool: 'meet',
    where: 'The Ask Gemini box, bottom left of the Meet window.',
    steps: [
      'Make sure Take notes for me is already running (tip 32).',
      'Find the Ask Gemini box, bottom left of the Meet window [VERIFY].',
      'Ask. Only you see the answer.'
    ],
    prompt: 'What have I missed?',
    alsoWorks: '',
    tip: 'It answers from the notes so far, so the first few minutes of a call may be thin.',
    jobs: ['catch-up'],
    material: 'meeting',
    effort: '1min',
    sketch: 'meet/ask',
    availability: { status: 'check', note: 'Depends on edition. Hosts can switch it off.' },
    sources: ['ask-gemini-meet']
  },

  /* ------------------------------------------------------------------
     Numbers and spreadsheets
     ------------------------------------------------------------------ */

  {
    id: 'sort-500-rows',
    number: 34,
    section: 'numbers',
    title: 'Sort 500 rows with one formula',
    accent: 'one formula',
    why: 'Tag every row in a spreadsheet without reading them all. Five hundred planning applications sorted while the kettle boils.',
    tool: 'sheets',
    where: 'Sheets: type =AI( in an empty cell, or Insert > Function > AI.',
    steps: [
      'Click the first empty cell in a new column beside your data.',
      'Type the formula below, then drag it down the column.',
      'Spot-check five rows before you rely on it.'
    ],
    prompt: '=AI("Is this planning application residential, commercial or other?", A2)',
    alsoWorks: 'Attach the sheet from Drive in the Gemini app and ask it to categorise each row.',
    tip: 'Give it a short list of categories in the question, as here. An open question gives you 500 different answers.',
    jobs: ['organise'],
    material: 'spreadsheet',
    effort: '5min',
    plate: 'rows',
    availability: { status: 'check', note: 'Needs an eligible edition. Admin or language settings can block it.' },
    sources: ['sheets-ai']
  },

  {
    id: 'formula-without-the-maths',
    number: 35,
    section: 'numbers',
    title: 'The formula without the maths',
    accent: 'without the maths',
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
    tip: '',
    jobs: ['count'],
    material: 'spreadsheet',
    effort: '1min',
    sketch: 'sheet/formula',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'ask-your-spreadsheet',
    number: 36,
    section: 'numbers',
    title: 'Ask your spreadsheet a question',
    accent: 'a question',
    why: 'Questions, summaries and charts from the side panel.',
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
    jobs: ['count'],
    material: 'spreadsheet',
    effort: '1min',
    sketch: 'sheet/chart',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'pdf-table-to-spreadsheet',
    number: 37,
    section: 'numbers',
    title: 'PDF table to spreadsheet',
    accent: 'PDF table',
    why: 'Screenshot a table from a report and get rows you can paste.',
    tool: 'gemini',
    rung: 3,
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
    jobs: ['organise'],
    material: 'photo',
    effort: '1min',
    sketch: 'chat/image',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  /* ------------------------------------------------------------------
     Tidy, translate and explain
     ------------------------------------------------------------------ */

  {
    id: 'photograph-a-page',
    number: 38,
    section: 'tidy',
    title: 'Photograph a page, get the text',
    accent: 'get the text',
    why: 'A printed notice, agenda or book page becomes editable text.',
    tool: 'gemini',
    rung: 3,
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
    jobs: ['transcribe', 'organise'],
    material: 'photo',
    effort: '1min',
    sketch: 'phone/camera',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'notes-to-table',
    number: 39,
    section: 'tidy',
    title: 'Messy notes to a tidy table',
    accent: 'tidy table',
    why: 'Scribbled meeting notes become a structure you can use, and a list of what you still have to chase.',
    tool: 'docs',
    where: 'Docs > Gemini side panel, with the notes in the doc.',
    steps: [
      'Paste your notes into a Google Doc.',
      'Open the Gemini panel (the star, top right).',
      'Ask for the table, naming the columns.',
      'Insert it, then fix anything it guessed.'
    ],
    prompt: 'Turn these council meeting notes into a table: item, decision, vote, follow-up.',
    alsoWorks: 'Paste the notes into the Gemini app.',
    tip: 'The blank cells are the useful part. They show what you did not write down.',
    jobs: ['organise'],
    material: 'notes',
    effort: '1min',
    sketch: 'doc/table',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'second-pair-of-eyes',
    number: 40,
    section: 'tidy',
    title: 'A second pair of eyes',
    accent: 'pair of eyes',
    why: 'Proofreading suggestions on your own draft before you file, for the typo and the doubled word your eyes have stopped seeing.',
    tool: 'docs',
    where: 'Docs > Tools > Proofread.',
    steps: [
      'In your doc, open Tools, then Proofread [VERIFY menu path].',
      'Go through the suggestions one at a time. Accept or ignore each.',
      'Keep your voice. It is a check, not a rewrite.'
    ],
    prompt: '',
    alsoWorks: '',
    tip: 'Suggestions are suggestions. It has not read the style guide.',
    jobs: ['organise'],
    material: 'notes',
    effort: '1min',
    sketch: 'doc/proof',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'hear-your-draft',
    number: 41,
    section: 'tidy',
    title: 'Hear your draft read aloud',
    accent: 'Hear',
    why: 'Your ears catch clunky sentences that your eyes skip. A sentence you cannot say in one breath needs cutting.',
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
    jobs: ['organise'],
    material: 'notes',
    effort: '1min',
    sketch: 'doc/listen',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'explain-it-like-im-new',
    number: 42,
    section: 'tidy',
    title: 'Explain it like I’m new',
    accent: 'I’m new',
    why: 'Get up to speed on a new beat’s jargon.',
    tool: 'gemini',
    rung: 3,
    where: 'The Gemini app.',
    steps: [
      'Open the Gemini app.',
      'Say who you are, what you need to understand and by when.',
      'Ask for the five terms you will hear most.',
      'Then look each one up in a proper source.'
    ],
    prompt: 'Explain gilt yields to a sharp 16-year-old, then list the five terms I’ll hear most.',
    alsoWorks: '',
    tip: 'Then ask it to argue with itself: “What would an economist say is wrong with that explanation?”',
    jobs: ['explain'],
    material: 'question',
    effort: '1min',
    sketch: 'chat/plain',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'read-in-another-language',
    number: 43,
    section: 'tidy',
    title: 'Read a source in another language',
    accent: 'in another language',
    why: 'Understand a foreign report or article for background.',
    tool: 'gemini',
    rung: 3,
    where: 'The Gemini app. Paste the text or upload the file.',
    steps: [
      'Paste the text, or upload the file, into the Gemini app.',
      'Ask for a translation and for the parts that matter to you.',
      'For anything you will quote or publish, get a human expert to check it. That is Guardian policy, not a suggestion.'
    ],
    prompt: 'Translate this Le Monde article and tell me which parts concern the UK.',
    alsoWorks: 'Gemini in Chrome, on the page itself.',
    tip: 'Ask for a summary first and the full translation second. You may not need the second.',
    jobs: ['explain'],
    material: 'document',
    effort: '1min',
    sketch: 'chat/translate',
    availability: { status: 'ok', note: '' },
    sources: ['gemini-faq-internal']
  },

  {
    id: 'what-am-i-missing',
    number: 44,
    section: 'tidy',
    title: 'What am I missing?',
    accent: 'missing',
    why: 'Lists the unanswered questions in your own notes before you file or call back. It is the colleague who reads your notes and asks the obvious thing.',
    tool: 'gemini',
    rung: 3,
    where: 'The Gemini app, with your notes pasted in.',
    steps: [
      'Paste your notes into the Gemini app. Nothing confidential: no source names.',
      'Ask for the unanswered questions.',
      'Ring the ones that matter and go and answer them.'
    ],
    prompt: 'Here are my notes on this story. What obvious questions haven’t I answered yet?',
    alsoWorks: '',
    tip: 'Do this before you file, not after the editor does. The questions are the same.',
    jobs: ['prepare'],
    material: 'notes',
    effort: '1min',
    sketch: 'chat/notes',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  {
    id: 'talk-it-through',
    number: 45,
    section: 'tidy',
    title: 'Talk it through on a walk',
    accent: 'on a walk',
    why: 'Gemini Live is the spoken version of the Gemini app: you talk, it talks back. A sounding board for testing your angle out loud.',
    tool: 'gemini',
    rung: 3,
    where: 'The Gemini app on your phone > Live.',
    steps: [
      'Open the Gemini app on your phone and tap Live.',
      'Tell it the story and ask it to question you.',
      'Talk. Interrupt. Argue back.',
      'Ask for a summary at the end and send it to yourself.'
    ],
    prompt: 'I’m working on a story about bus cuts. Ask me questions until the angle is sharper.',
    alsoWorks: '',
    tip: 'It needs headphones and a quiet enough street. It does not need you to type.',
    jobs: ['prepare'],
    material: 'question',
    effort: '5min',
    sketch: 'phone/live',
    availability: { status: 'ok', note: '' },
    sources: []
  },

  /* ------------------------------------------------------------------
     Make it automatic
     ------------------------------------------------------------------ */

  {
    id: 'how-you-like-things',
    number: 46,
    section: 'automate',
    title: 'Tell Gemini how you like things',
    accent: 'how you like things',
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
    jobs: ['automate'],
    material: 'question',
    effort: 'setup',
    sketch: 'mail/settings',
    availability: { status: 'check', note: 'Custom instructions in Workspace rolled out from 2 September 2026. Confirm on a staff account. Also decide whether this entry should use a new “workspace” tool value.' },
    sources: ['custom-instructions']
  },

  {
    id: 'weekly-chore-to-skill',
    number: 47,
    section: 'automate',
    title: 'Turn a weekly chore into a skill',
    accent: 'skill',
    why: 'A skill is a saved set of instructions you can run whenever you need it, like a recipe. Write it once, use it every week.',
    tool: 'gemini',
    rung: 3,
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
    jobs: ['automate'],
    material: 'question',
    effort: 'setup',
    plate: 'skill',
    availability: { status: 'check', note: 'Skills rolled out to the Gemini app from 13 October 2026 and to Workspace apps from 5 October (scheduled release from 19 October), completing by mid-November. Do not teach Gems.' },
    sources: ['skills', 'skills-transition']
  },

  {
    id: 'morning-news-digest',
    number: 48,
    section: 'automate',
    title: 'A morning news digest',
    accent: 'news digest',
    why: 'A scheduled action is a prompt the Gemini app runs for you at a set time, without you asking. A rough digest of your patch, every weekday, before you get in.',
    tool: 'gemini',
    rung: 3,
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
    jobs: ['automate', 'catch-up'],
    material: 'question',
    effort: 'setup',
    plate: 'digest',
    availability: { status: 'check', note: 'Availability on our Workspace edition.' },
    sources: ['scheduled-actions']
  },

  {
    id: 'inbox-and-diary',
    number: 49,
    section: 'automate',
    title: 'Your inbox and diary before you get in',
    accent: 'inbox and diary',
    why: 'The same idea as tip 48, pointed at your own inbox and calendar instead of the news.',
    tool: 'gemini',
    rung: 3,
    where: 'A scheduled action in the Gemini app. Needs Gmail and Calendar connected (tip 6).',
    steps: [
      'Connect Gmail and Calendar first (tip 6).',
      'Ask for the schedule in the Gemini app, as in tip 48.',
      'Read it the next morning. If it is too long, change the wording.'
    ],
    prompt: 'Every weekday at 8am, summarise my unread emails that need a reply and list today’s meetings.',
    alsoWorks: '',
    tip: 'It only sees what you connected. If the diary is wrong, check tip 6 before you blame the digest.',
    jobs: ['automate', 'catch-up'],
    material: 'email-chat',
    effort: 'setup',
    sketch: 'chat/schedule',
    availability: { status: 'check', note: 'Same check as tip 48.' },
    sources: ['scheduled-actions']
  },

  {
    id: 'build-a-tiny-tool',
    number: 50,
    section: 'automate',
    title: 'Build a tiny tool of your own',
    accent: 'tiny tool',
    why: 'Canvas is a mode in the Gemini app that builds a small working app from a sentence. No code to write.',
    tool: 'gemini',
    rung: 3,
    where: 'Gemini app > + > Canvas.',
    steps: [
      'In the Gemini app, click + and choose Canvas [VERIFY].',
      'Describe the tool in one sentence.',
      'Try it. Ask for changes in plain English.',
      'Keep it for yourself. It is a tool, not a story.'
    ],
    prompt: 'Build me a countdown of working days until a date I pick.',
    alsoWorks: 'The vibecoding workshop deck has the full session.',
    tip: 'If it breaks, say what you saw, not what you think went wrong. “The button does nothing” is enough.',
    jobs: ['automate'],
    material: 'question',
    effort: '5min',
    sketch: 'chat/canvas',
    availability: { status: 'ok', note: '' },
    sources: ['vibecoding-deck']
  }
];
