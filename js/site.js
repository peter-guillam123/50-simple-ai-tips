/* Simple ways to use AI at work: everything that is not an entry.
 *
 * Taxonomy, tool cards, sections, the habit interstitials, the ladder,
 * the "why these" panel, the check-everything rule and the sources. Edit
 * copy here; edit the entries in js/entries.js.
 *
 * The taxonomy ids are fixed. Do not add values without asking Chris.
 */

window.SITE = {

  asOf: '26 October 2026',

  title: 'Simple ways to use AI at work',

  /* ------------------------------------------------------------ masthead */
  masthead: {
    eyebrow: 'A practical guide for Guardian staff',
    headline: 'Simple ways to use AI at work',
    accent: 'AI',
    standfirst: 'Practical things you can do with the AI tools the Guardian already provides, most of them inside Google Workspace, sorted by the job in front of you. None of them writes a story. Most take a minute or two.'
  },

  /* ------------------------------------------------------------ why these
     The panel under the tool cards. Plain paragraphs, in order. */
  /* Six rules, each a heading and one line, with the detail behind a
     click. Keep `short` to one line; the detail can run longer. */
  whyThese: {
    eyebrow: 'Before you start',
    title: 'Why using approved tools matters',
    lede: 'Google Workspace gives you somewhere to use AI on your documents and emails with the same privacy you already have in Drive and Gmail. Personal and free tools do not. Six things to know.',
    rules: [
      { h: 'Your work stays the Guardian’s', short: 'Workspace runs under the Guardian’s agreement with Google.',
        detail: 'The agreement was amended to cover Gemini. Your content is not used for training outside the Guardian’s domain, and your conversations are not reviewed by anyone outside the Guardian.' },
      { h: 'Training switches it on', short: 'Gemini appears once you have done the AI Essentials training.',
        detail: 'You also need to have read the GenAI acceptable use policy. If you cannot see the Gemini icon in Gmail or Docs, that is probably why [TODO: link to the training].' },
      { h: 'No personal or free accounts', short: 'Do not use them for work, however handy they are.',
        detail: 'That means no free Claude, no personal ChatGPT and no Gemini on a private Google account. They sit outside the Guardian’s agreements, and what you paste in may be kept and used for training.' },
      { h: 'If it can’t go in Drive, it can’t go in AI', short: 'The usual rules for sensitive material still apply.',
        detail: 'If you would not store something in Drive or send it by email, such as a confidential source or a sensitive document, do not put it into an AI tool either.' },
      { h: 'Take care with people', short: 'Do not use AI to judge or decide about individuals.',
        detail: 'Do not use it to form opinions about individuals: the opinion may be wrong, and it counts as personal data. Do not use it to make decisions about individuals without talking to the data privacy team first. And when you research with it, know where the information came from so you can credit it.' },
      { h: 'New tools need approval', short: 'Budget first, then Tech Council.',
        detail: 'If you want a tool that is not on this list, you need budget for it and approval through Tech Council before you use it with Guardian material [TODO: link or contact for Tech Council].' }
    ],
    links: [
      { t: 'GenAI acceptable use policy', u: 'https://drive.google.com/file/d/1jfDUXAipKcMfY_h0aHCyl3R4OVotIRK9/view' },
      { t: 'The Guardian’s approach to generative AI', u: 'https://www.theguardian.com/help/insideguardian/2023/jun/16/the-guardians-approach-to-generative-ai' },
      { t: 'Editorial code of practice', u: 'https://www.theguardian.com/about/2023/jul/07/guardian-editorial-code-of-practice-and-guidance-2023' },
      { t: 'Working securely on Google (on Spike) [TODO: link]', u: '' }
    ]
  },

  /* ------------------------------------------------------------ taxonomy */
  /* The nine jobs. Each is also a section of the list, in this order,
     after "Searching with AI". `line` shows on the job tile at the top. */
  jobs: [
    { id: 'find-story', label: 'Find a story', icon: 'find-story', line: 'Reports, agendas, meetings and releases, read for what matters.' },
    { id: 'research', label: 'Research a subject', icon: 'research', line: 'Get up to speed: judgments, papers, filings, a new beat.' },
    { id: 'documents', label: 'Get through documents', icon: 'documents', line: 'Long reports, piles of files, FOI responses.' },
    { id: 'numbers', label: 'Work with numbers', icon: 'numbers', line: 'Formulas, messy data, tables trapped in PDFs, sums.' },
    { id: 'interviews', label: 'Interviews and recordings', icon: 'interviews', line: 'Prepare, transcribe, find the moment, pull the quotes.' },
    { id: 'verify', label: 'Check and verify', icon: 'verify', line: 'Trace a figure, test a photo, check a quote.' },
    { id: 'organise', label: 'Organise your work', icon: 'organise', line: 'Inbox, Drive, notes, FOI requests, meetings.' },
    { id: 'before-filing', label: 'Before you file', icon: 'before-filing', line: 'Gaps, typos, clunky sentences, house style.' },
    { id: 'routine', label: 'Make it routine', icon: 'routine', line: 'Standing instructions, skills and digests that run themselves.' }
  ],

  /* `group` is 'guardian' (provided by the Guardian, covered by its agreements)
     or 'anyone' (open to anyone, no account needed). `access` is a short note
     shown on the card when a tool is not available to everyone. */
  toolGroups: [
    { id: 'workspace', icon: 'workspace', short: 'The apps you already use, with Gemini built in.', title: 'Inside Google Workspace', line: 'Each app works as normal. Gemini sits in a side panel (the star icon, top right) or behind a button. Same account, same privacy as the app itself, and it appears once you have done the AI Essentials training.' },
    { id: 'general', icon: 'general', short: 'Chat and research tools not tied to one app.', title: 'General AI tools', line: 'The Gemini tools come under the Guardian’s Google agreement. ChatGPT Enterprise comes under its own, and only some staff have it.' },
    { id: 'guardian', icon: 'guardian', short: 'Our own tools, made for our work.', title: 'Built by the Guardian', line: 'Where one of these does the job, it is the one to use.' },
    { id: 'anyone', icon: 'anyone', short: 'Public tools. Fine for public material only.', title: 'Open to anyone', line: 'They need no Guardian account. Treat them as you would any public website: put nothing into them you would not post.' }
  ],

  tools: [
    { id: 'gmail', group: 'workspace', label: 'Gmail', line: 'Ask your inbox a question. Summarise a thread.' },
    { id: 'drive', group: 'workspace', label: 'Drive', line: 'Find a file by describing it. Summarise a PDF where it sits.' },
    { id: 'docs', group: 'workspace', label: 'Docs', line: 'Tidy notes into tables. Proofread. Listen to your draft.' },
    { id: 'sheets', group: 'workspace', label: 'Sheets', line: 'Formulas in plain English. Tag 500 rows at once.' },
    { id: 'meet', group: 'workspace', label: 'Meet', line: 'Notes taken for you. Catch up when you join late.' },
    { id: 'chat', group: 'workspace', label: 'Google Chat', line: 'Summarise a busy space.' },
    { id: 'gemini', group: 'general', label: 'Gemini app', line: 'The chat. Your files, your Workspace, Deep Research, Canvas and Live.' },
    { id: 'notebook', group: 'general', label: 'Gemini Notebook', line: 'Answers only from the sources you give it, every one footnoted. Was NotebookLM.' },
    { id: 'chrome', group: 'general', label: 'Gemini in Chrome', line: 'Gemini in the browser: ask the page you’re on, compare open tabs.' },
    { id: 'chatgpt', group: 'general', label: 'ChatGPT Enterprise', line: 'A general-purpose chat on the Guardian’s enterprise terms. Not covered by these tips.', access: 'Enterprise accounts only, for staff on the list [TODO: how to check, who to ask]' },
    { id: 'ask-the-guardian', group: 'guardian', label: 'Ask the Guardian', line: 'A simple search of the Guardian archive: ask a question, get what we have published. [TODO: link]' },
    { id: 'house', group: 'guardian', label: 'House', line: 'Search parliamentary and congressional records in the UK, Australia and the US. [TODO: link]' },
    { id: 'guardian-angles', group: 'guardian', label: 'Guardian Angles', line: 'See how the Guardian has covered a topic over time, and from which angles. [TODO: link]' },
    { id: 'transcription', group: 'guardian', label: 'Guardian transcription tool [TODO: real name]', line: 'The Guardian’s own transcription. First stop for any recording. [TODO: link and access route]' },
    { id: 'live-transcription', group: 'guardian', label: 'Live transcription extension [TODO: real name]', line: 'A live transcript of anything playing in your browser. [TODO: install link]' },
    { id: 'search', group: 'anyone', label: 'Google Search', line: 'AI Overviews for a quick look, AI Mode for a proper question.' },
    { id: 'youtube', group: 'anyone', label: 'YouTube', line: 'The Ask button: summarise a video, jump to the moment.' }
  ],

  materials: [
    { id: 'question', label: 'Just a question', icon: 'question' },
    { id: 'document', label: 'A document or PDF', icon: 'document' },
    { id: 'spreadsheet', label: 'A spreadsheet', icon: 'spreadsheet' },
    { id: 'video-audio', label: 'Video or audio', icon: 'video' },
    { id: 'web-page', label: 'A web page', icon: 'web' },
    { id: 'email-chat', label: 'Email & chat', icon: 'email' },
    { id: 'notes', label: 'Your notes or draft', icon: 'notes' },
    { id: 'photo', label: 'A photo or screenshot', icon: 'photo' },
    { id: 'meeting', label: 'A meeting', icon: 'meeting' }
  ],

  efforts: [
    { id: '1min', label: '1 minute' },
    { id: '5min', label: '5 minutes' },
    { id: 'setup', label: 'Set up once' }
  ],

  /* ------------------------------------------------------------ sections
     Reading order. Each has a two-sentence intro and a colour family. */
  sections: [
    { id: 'ladder', title: 'Searching with AI', eyebrow: 'Part one',
      intro: 'You can ask an AI a question in four places. AI Overviews and AI Mode start from the web. Gemini Notebook starts from sources you give it, such as documents, web pages and videos, and stays there, so its answers are the easiest to check. The Gemini app starts anywhere and does the most. All four take a picture as well as words. Pick a question below to see which fits; tips 1 to 5 take each in turn.',
      plate: 'ladder', plateTitle: 'Which tool reads what' },
    { id: 'find-story', title: 'Find a story', eyebrow: 'Part two',
      intro: 'Reports, agendas and meetings land faster than anyone can read them. These tips point you to the parts worth reading. You still read them.' },
    { id: 'research', title: 'Research a subject', eyebrow: 'Part three',
      intro: 'Getting up to speed on a judgment, a study, a company or a new beat. Each tip says where the answer came from, so you can go and read it.' },
    { id: 'documents', title: 'Get through documents', eyebrow: 'Part four',
      intro: 'A 300-page report is no longer a weekend. Load it, ask it questions, and read the passage each answer cites.' },
    { id: 'numbers', title: 'Work with numbers', eyebrow: 'Part five',
      intro: 'You describe the result. Gemini writes the formula, cleans the column or shows the working. You check a few by hand.' },
    { id: 'interviews', title: 'Interviews and recordings', eyebrow: 'Part six',
      intro: 'Before, during and after an interview. For your own recordings, the Guardian’s own transcription tool comes first.' },
    { id: 'verify', title: 'Check and verify', eyebrow: 'Part seven',
      intro: 'AI can speed up checking, and it can be wrong while it does it. These tips give you leads and the page to check them against.' },
    { id: 'organise', title: 'Organise your work', eyebrow: 'Part eight',
      intro: 'Most of what you need is already in your inbox, your Drive or your notes. These tips find it and put it in order.' },
    { id: 'before-filing', title: 'Before you file', eyebrow: 'Part nine',
      intro: 'A last look at your own copy. None of these writes it for you; they find what you missed.' },
    { id: 'routine', title: 'Make it routine', eyebrow: 'Part ten',
      intro: 'Once a job works, make it run on its own. Standing instructions, saved skills and a digest that arrives before you do.' }
  ],

  /* ------------------------------------------------------------ panels
     Short evidence boxes that sit after a given entry. Figures and sources
     from the AI working group deck (slide "True enough?"). */
  panels: [
    {
      id: 'aio-reliability',
      after: 'ai-overviews',
      eyebrow: 'The evidence',
      title: 'How reliable are AI Overviews?',
      intro: 'Nobody outside Google has a full answer, and Google has never published an error rate. Two independent tests give a rough shape.',
      figures: [
        { n: '91%', t: 'right on 4,326 hard factual questions, up from 85% before Google moved it to its newer model.', src: 'Oumi for the New York Times, October 2025 and February 2026. Google disputes the test set.', link: 'oumi-nyt' },
        { n: '56%', t: 'of those right answers linked to sources that did not fully back them up.', src: 'Same study.', link: 'oumi-nyt' },
        { n: '89%', t: 'of 98,000 claims from trending US searches matched the pages cited. 2.7% were contradicted by them.', src: 'Washington University in St Louis, May 2026, not yet peer reviewed.', link: 'wustl-aio' }
      ],
      outro: 'A Guardian investigation in January 2026 found health overviews giving advice the opposite of expert guidance. So: fine for orientation on a general question, not a source. Click through before you rely on anything, and for anything that matters, use a tool that shows you the page an answer came from, such as Gemini Notebook ({tip:gemini-notebook}).',
      links: ['guardian-aio-health', 'ai-working-group']
    }
  ],

  /* ------------------------------------------------------------ habits
     Short interstitials between sections. Not numbered. One per gap,
     in order. */
  habits: [
    { k: 'Habit', b: 'One chat per task.', t: 'Start a new chat for each job. Yesterday’s question leaks into today’s answer.' },
    { k: 'Habit', b: 'Say who it’s for.', t: '“For a reader with two minutes” changes the answer more than any other words you add.' },
    { k: 'Habit', b: 'Ask for a table.', t: 'Tables are easier to check than prose, and they paste straight into Sheets.' },
    { k: 'Habit', b: 'Paste the source in.', t: 'Don’t ask from memory. Give it the document and it answers about that, not about the world.' },
    { k: 'Habit', b: 'Ask where it found it.', t: '“Give the page for each point” or “link the source” turns an answer into something you can check.' },
    { k: 'Habit', b: 'If it goes wrong, start again.', t: 'Don’t argue with a bad answer. New chat, better question.' },
    { k: 'Habit', b: 'Say what you don’t want.', t: '“No rewriting”, “data only”, “under 100 words”. Limits get you a tighter answer.' },
    { k: 'Habit', b: 'Push back.', t: 'Ask “what would someone who disagrees say?” or “what are you least sure of?”. The second answer is often the useful one.' },
    { k: 'Habit', b: 'Keep a prompt that works.', t: 'Paste it into a note, or save it as a skill. Next week you start from there.' }
  ],

  /* ------------------------------------------------------------ check everything
     The one rule above the list. Tips give only the checks particular to
     their job. */
  checkRule: {
    eyebrow: 'One rule for every tip',
    title: 'Check everything',
    lede: 'AI tools get things wrong, and they sound just as sure when they do. Treat every answer as a lead, not a fact, and check it against the source before you use it.',
    points: [
      'Quotes against the recording.',
      'Figures against the document they came from.',
      'Places against a map.',
      'Anything from the web against the page it cites.'
    ],
    close: 'You are responsible for what you publish, not the tool.'
  },

  /* ------------------------------------------------------------ the ladder */
  ladder: {
    /* Each rung is labelled by where it starts. Rungs 1 and 2 start from
       the web. Rung 3 starts from your sources and stays there. Rung 4
       starts anywhere and does the most. */
    groups: { web: 'Starts from the web', sources: 'Starts from your sources', anywhere: 'Starts anywhere' },
    rungs: [
      { n: 1, group: 'web', tool: 'AI Overviews', speed: 'Instant', reads: 'The whole search index', when: 'A quick general question you’d have Googled anyway', toolId: 'search', entry: 'ai-overviews' },
      { n: 2, group: 'web', tool: 'AI Mode', speed: 'Seconds', reads: 'The search index, many searches at once', when: 'Questions with several parts, follow-ups, comparisons', toolId: 'search', entry: 'ai-mode' },
      { n: 3, group: 'sources', tool: 'Gemini Notebook', speed: 'Slower', reads: 'Only the sources you add: documents, web pages, YouTube videos', when: 'You want what your sources say, with the passage to prove it', toolId: 'notebook', entry: 'gemini-notebook' },
      { n: 4, group: 'anywhere', tool: 'Gemini app', speed: 'Slower', reads: 'The web, your files, your Workspace and what it already knows', when: 'General questions, your document in context, and longer jobs on its strongest models', toolId: 'gemini', entry: 'gemini-app' }
    ],
    examples: [
      { q: 'What is a section 114 notice?', rung: 1, why: 'A general question with a settled answer. The overview at the top of the results will do.' },
      { q: 'Which councils have issued one since 2018, and why?', rung: 2, why: 'Several parts, and it needs many searches at once. AI Mode runs them and lets you follow up.' },
      { q: 'What does this budget report say caused the gap? Cite the page.', rung: 3, why: 'You want what your source says and nothing else, with the passage to prove it. Notebook, with the report added.' },
      { q: 'How does this council’s gap compare with similar councils?', rung: 4, why: 'It needs your document and figures from outside it. The Gemini app, with the report attached, and asked to say which figures came from where.' },
      { q: 'Brief me on how council funding works, with sources.', rung: 4, why: 'A long job that needs the web and a strong model. The Gemini app, using Deep Research, while you do something else.' },
      { q: 'Is 3.6% a big rise in council tax?', rung: 2, why: 'Needs context from many sources, but no files of yours. AI Mode.' }
    ]
  },

  /* ------------------------------------------------------------ sources
     status: 'brief' = listed and checked in the project brief, 22 to 23
     October 2026. 'guardian' = from the Guardian's internal Gemini FAQ.
     'research' = found for the research list, 26 October 2026, mostly
     read through search summaries rather than the page itself.
     'todo' = still to be supplied. */
  sources: {
    'google-gemini-faq': { t: 'Gemini for Google Workspace: official FAQ', p: 'Google Workspace admin help', u: 'https://support.google.com/a/answer/14130944?hl=en&co=DASHER._Family%3DBusiness-Enterprise', s: 'guardian' },
    'acceptable-use': { t: 'GenAI acceptable use policy', p: 'The Guardian (internal)', u: 'https://drive.google.com/file/d/1jfDUXAipKcMfY_h0aHCyl3R4OVotIRK9/view', s: 'guardian' },
    'genai-principles': { t: 'The Guardian’s approach to generative AI', p: 'The Guardian', u: 'https://www.theguardian.com/help/insideguardian/2023/jun/16/the-guardians-approach-to-generative-ai', s: 'guardian' },
    'editorial-code': { t: 'Editorial code of practice and guidance 2023', p: 'The Guardian', u: 'https://www.theguardian.com/about/2023/jul/07/guardian-editorial-code-of-practice-and-guidance-2023', s: 'guardian' },
    'gemini-features': { t: 'Gemini for Workspace: full list of features', p: 'The Guardian (internal spreadsheet)', u: 'https://docs.google.com/spreadsheets/d/1wmWJShvJHdLV_d8yIpyyCfCA-8Yp4fyqtp6-wE4PNsU/edit?usp=sharing', s: 'guardian' },
    'gemini-faq-internal': { t: 'Google Gemini FAQs for Workspaces', p: 'The Guardian (internal) [TODO: link on Spike]', u: '', s: 'guardian' },
    'oumi-nyt': { t: 'Oumi’s study of AI Overviews for the New York Times: 91% correct, 56% of correct answers not fully backed by their sources', p: 'Oumi blog, 14 April 2026. The NYT report of 7 April is paywalled. Google says the test set has errors.', u: 'https://oumi.ai/blog/oumis-study-finds-50-of-ai-overviews', s: 'deck' },
    'wustl-aio': { t: 'How well do AI Overviews cite their sources? 98,020 claims from trending US searches', p: 'Xu, Iqbal and Montgomery, Washington University in St Louis, preprint, 13 May 2026', u: 'https://arxiv.org/html/2605.14021v1', s: 'deck' },
    'guardian-aio-health': { t: 'Google AI Overviews risk harm with misleading health information', p: 'The Guardian, 2 January 2026', u: 'https://www.theguardian.com/technology/2026/jan/02/google-ai-overviews-risk-harm-misleading-health-information', s: 'deck' },
    'ai-working-group': { t: 'AI working group deck: the evidence on accuracy', p: 'Chris Moran', u: 'https://peter-guillam123.github.io/ai-working-group/', s: 'deck' },
    'notebook-rename': { t: 'NotebookLM renamed Gemini Notebook', p: 'Google Workspace Updates', u: 'https://workspaceupdates.googleblog.com/2026/07/notebooklm-now-gemini-notebook.html', s: 'brief' },
    'notebook-sync': { t: 'Notebook and Gemini app sync', p: 'Android Authority', u: 'https://www.androidauthority.com/gemini-notebook-3688235/', s: 'brief' },
    'notebook-code': { t: 'Notebook code execution and new outputs', p: 'Google blog', u: 'https://blog.google/innovation-and-ai/products/notebooklm/better-research-notebooklm/', s: 'brief' },
    'notebook-tables': { t: 'Notebook data tables', p: 'Android Authority', u: 'https://www.androidauthority.com/notebooklm-data-table-support-3626612/', s: 'brief' },
    'notebook-tables-2': { t: 'NotebookLM data tables for scientists', p: 'The Science Talk', u: 'https://thesciencetalk.com/news/notebooklm-data-tables-scicomm-scientists/', s: 'brief' },
    'youtube-ask': { t: 'YouTube tests Ask in the player', p: 'Search Engine Journal', u: 'https://www.searchenginejournal.com/youtube-test-ask-youtube-shorts-player/592723/', s: 'brief' },
    'youtube-ask-search-us': { t: 'Ask YouTube search is US-only', p: 'YouTube Help', u: 'https://support.google.com/youtube/answer/16943763?hl=en', s: 'brief' },
    'chrome-uk': { t: 'Gemini in Chrome reaches the UK', p: '9to5Google', u: 'https://9to5google.com/?p=721470', s: 'brief' },
    'chrome-admin': { t: 'Gemini in Chrome admin settings', p: 'Google Workspace Updates', u: 'https://workspaceupdates.googleblog.com/2025/09/gemini-in-google-chrome-admin-settings-available.html', s: 'brief' },
    'ask-gemini-meet': { t: 'Ask Gemini in Google Meet', p: 'Google Workspace Updates', u: 'https://workspaceupdates.googleblog.com/2025/10/ask-gemini-in-google-meet.html', s: 'brief' },
    'sheets-ai': { t: 'The AI function in Sheets', p: 'Google Docs Editors Help', u: 'https://support.google.com/docs/answer/15877199', s: 'brief' },
    'drive-audio': { t: 'Audio Overviews in Drive', p: '9to5Google', u: 'https://9to5google.com/2025/11/11/google-drive-audio-overviews/', s: 'brief' },
    'aimode-charts': { t: 'Charts in AI Mode', p: 'Google blog', u: 'https://blog.google/products-and-platforms/products/search/ai-mode-data-visualization/', s: 'brief' },
    'chat-data-source': { t: 'Google Chat as a data source in the Gemini app', p: 'Google Workspace Updates', u: 'https://workspaceupdates.googleblog.com/2026/02/google-chat-now-available-as-data-source-in-gemini-app.html', s: 'brief' },
    'workspace-apps-admin': { t: 'Turn Google apps in Gemini on or off', p: 'Google Workspace admin help', u: 'https://knowledge.workspace.google.com/admin/generative-ai/gemini-app/turn-google-apps-in-gemini-on-or-off', s: 'brief' },
    'workspace-apps-note': { t: 'Workspace apps in Gemini and the 16 October 2026 personalisation note', p: 'Google blog', u: 'https://blog.google/products-and-platforms/products/workspace/workspace-june-drop-gemini-workspace-apps/', s: 'brief' },
    'ask-gemini-drive': { t: 'Ask Gemini in Drive', p: 'Google Workspace Updates', u: 'https://workspaceupdates.googleblog.com/2026/04/ask-gemini-in-drive-now-generally-available.html', s: 'brief' },
    'custom-instructions': { t: 'Custom instructions for Gemini in Workspace', p: 'Google Workspace Updates', u: 'https://workspaceupdates.googleblog.com/2026/09/custom-instructions-for-gemini-in-Workspace-now-available-in-more-apps.html', s: 'brief' },
    'skills': { t: 'Skills in the Gemini app and Workspace', p: 'Google Workspace Updates', u: 'https://workspaceupdates.googleblog.com/2026/09/skills-gemini-app-workspace.html', s: 'brief' },
    'skills-transition': { t: 'About the transition from Gems to skills', p: 'Google Workspace admin help', u: 'https://knowledge.workspace.google.com/admin/generative-ai/gemini-app/about-the-transition-to-skills', s: 'brief' },
    'scheduled-actions': { t: 'Scheduled actions in Gemini', p: 'Android Authority', u: 'https://www.androidauthority.com/gemini-scheduled-actions-rollout-3565152', s: 'brief' },
    'deep-research-limits': { t: 'Deep Research for Workspace customers (2025, may be out of date)', p: 'Google Workspace Updates', u: 'https://workspaceupdates.googleblog.com/2025/03/gemini-gems-deep-research-available-for-more-google-workspace-customers.html', s: 'brief' },
    'vibecoding-deck': { t: 'Vibecoding workshop deck', p: 'Chris Moran', u: 'https://peter-guillam123.github.io/vibecoding-workshop/', s: 'brief' },
    'bellingcat-2026': { t: 'Can LLMs supercharge geolocation? Our tests show big improvements, but humans remain key', p: 'Bellingcat, 22 October 2026', u: 'https://www.bellingcat.com/resources/2026/10/22/can-llms-supercharge-geolocations-our-tests-show-big-improvements-but-humans-remain-key/', s: 'research' },
    'ebu-geolocation': { t: 'The OSINT prompt for AI-powered image geolocation', p: 'EBU Spotlight', u: 'https://spotlight.ebu.ch/p/the-osint-prompt-for-ai-powered-image', s: 'research' },
    'becid-osint': { t: 'AI and OSINT tool use among journalists: reverse image search used most', p: 'BECID monitoring report', u: 'https://becid.ut.ee/monitoring-report-ai-and-osint-tool-use-among-journalists/', s: 'research' },
    'ico-foi': { t: 'Freedom of information and artificial intelligence', p: 'Information Commissioner’s Office', u: 'https://ico.org.uk/for-organisations/foi/freedom-of-information-foi-and-artificial-intelligence/', s: 'research' },
    'foi-scotland': { t: 'Using AI to help make FOI requests', p: 'Scottish Information Commissioner', u: 'https://www.foi.scot/using-ai-help-make-foi-requests', s: 'research' },
    'bay-city-news': { t: 'Datebook Assistant: Gemini reading meeting agendas, with page references', p: 'Bay City News', u: 'https://piedmontexedra.com/?p=1546049', s: 'research' },
    'connecticut-public': { t: 'How Connecticut Public used AI to uncover more local stories', p: 'Local Media Association, July 2026', u: 'https://localmedia.org/2026/07/how-connecticut-public-used-ai-to-uncover-more-local-stories/', s: 'research' },
    'hearst-meetings': { t: 'Hearst Newspapers use generative AI to expand civic coverage', p: 'INMA', u: 'https://www.inma.org/blogs/ideas/post.cfm/hearst-newspapers-use-generative-ai-to-expand-civic-coverage', s: 'research' },
    'genai-newsroom-quotes': { t: 'NotebookLM in journalistic backgrounding: invented quotes from archives', p: 'Generative AI Newsroom', u: 'https://generative-ai-newsroom.com/investigating-notebooklms-potential-in-journalistic-backgrounding-c63a43a4b637', s: 'research' },
    'quintype-notebooklm': { t: 'How newsrooms use NotebookLM, including Investigate Midwest', p: 'Quintype', u: 'https://blog.quintype.com/industry/notebooklm-how-are-modern-newsrooms-maximising-productivity-and-workflow', s: 'research' },
    'medium-factcheck': { t: 'NotebookLM as a fact-check tool: comparing statements and transcripts', p: 'Medium', u: 'https://medium.com/@kombib/notebooklm-the-journalists-fact-check-tool-ee951ea93d5a', s: 'research' },
    'bradshaw-ideas': { t: 'Using generative AI for story ideas', p: 'Paul Bradshaw, Online Journalism Blog, July 2024', u: 'https://onlinejournalismblog.com/2024/07/10/investigative-journalism-and-chatgpt-using-generative-ai-for-story-ideas/', s: 'research' },
    'bradshaw-prompts': { t: 'Seven prompt design techniques every journalist should know', p: 'Paul Bradshaw, Online Journalism Blog, February 2025', u: 'https://onlinejournalismblog.com/2025/02/19/7-prompt-design-techniques-for-generative-ai-every-journalist-should-know/', s: 'research' },
    'bradshaw-sheets': { t: 'Using generative AI as a spreadsheet and data cleaning assistant', p: 'Paul Bradshaw, Online Journalism Blog, September 2024', u: 'https://onlinejournalismblog.com/2024/09/26/using-generative-ai-as-a-spreadsheet-and-data-cleaning-assistant/', s: 'research' },
    'nieman-three-newsrooms': { t: 'How three newsrooms are charting different paths for AI use, including BBC Style Assist', p: 'Nieman Lab, July 2026', u: 'https://www.niemanlab.org/2026/07/how-three-newsrooms-are-charting-different-paths-for-ai-use/', s: 'research' },
    'transcription-tool': { t: 'Guardian transcription tool: guide and access [TODO: link]', p: 'The Guardian', u: '', s: 'todo' },
    'live-transcription-tool': { t: 'Live transcription extension: install page [TODO: link]', p: '', u: '', s: 'todo' }
  }
};
