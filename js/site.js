/* 50 simple ways to use AI at work: everything that is not an entry.
 *
 * Taxonomy, tool cards, sections, the habit interstitials, the ladder,
 * the "why these" panel and the sources. Edit copy here; edit the 50
 * entries in js/entries.js.
 *
 * The taxonomy ids are fixed. Do not add values without asking Chris.
 */

window.SITE = {

  asOf: '23 October 2026',

  title: '50 simple ways to use AI at work',

  /* ------------------------------------------------------------ masthead */
  masthead: {
    eyebrow: 'A practical guide for Guardian staff',
    headline: '50 simple ways to use AI at work',
    accent: 'AI',
    standfirst: 'Fifty practical things you can do with the AI tools the Guardian already provides, most of them inside Google Workspace. None of them writes a story. Most take a minute or two, and every answer can be checked.'
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
  jobs: [
    { id: 'find', label: 'Find' },
    { id: 'interrogate', label: 'Interrogate documents' },
    { id: 'catch-up', label: 'Catch up' },
    { id: 'transcribe', label: 'Transcribe & capture' },
    { id: 'organise', label: 'Organise & tidy' },
    { id: 'count', label: 'Count & chart' },
    { id: 'explain', label: 'Translate & explain' },
    { id: 'prepare', label: 'Prepare' },
    { id: 'automate', label: 'Make it automatic' }
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
    { id: 'find', title: 'Find anything', eyebrow: 'Part two',
      intro: 'Most of what you need is already in your inbox, your Drive or on a page you have open. These tips find it by description rather than by keyword.' },
    { id: 'documents', title: 'Get through documents', eyebrow: 'Part three',
      intro: 'A 300-page report is no longer a weekend. Load it, ask it questions, and check the answers against the page it cites.' },
    { id: 'av', title: 'Video, audio and meetings', eyebrow: 'Part four',
      intro: 'Hearings, press conferences and recordings can be searched like text. For your own recordings, the Guardian’s own tool comes first.' },
    { id: 'numbers', title: 'Numbers and spreadsheets', eyebrow: 'Part five',
      intro: 'You describe the result. Gemini writes the formula, tags the rows or draws the chart. You check a few by hand.' },
    { id: 'tidy', title: 'Tidy, translate and explain', eyebrow: 'Part six',
      intro: 'Small jobs that eat an afternoon: notes into tables, a photo into text, jargon into English. None of them touch the copy you file.' },
    { id: 'automate', title: 'Make it automatic', eyebrow: 'Part seven',
      intro: 'Once a job works, make it run on its own. Standing instructions, saved skills and a digest that arrives before you do.' }
  ],

  /* ------------------------------------------------------------ panels
     Short evidence boxes that sit after a given entry. Figures and sources
     from the AI working group deck (slide "True enough?"). */
  panels: [
    {
      id: 'aio-reliability',
      after: 1,
      eyebrow: 'The evidence',
      title: 'How reliable are AI Overviews?',
      intro: 'Nobody outside Google has a full answer, and Google has never published an error rate. Two independent tests give a rough shape.',
      figures: [
        { n: '91%', t: 'right on 4,326 hard factual questions, up from 85% before Google moved it to its newer model.', src: 'Oumi for the New York Times, October 2025 and February 2026. Google disputes the test set.', link: 'oumi-nyt' },
        { n: '56%', t: 'of those right answers linked to sources that did not fully back them up.', src: 'Same study.', link: 'oumi-nyt' },
        { n: '89%', t: 'of 98,000 claims from trending US searches matched the pages cited. 2.7% were contradicted by them.', src: 'Washington University in St Louis, May 2026, not yet peer reviewed.', link: 'wustl-aio' }
      ],
      outro: 'A Guardian investigation in January 2026 found health overviews giving advice the opposite of expert guidance. So: fine for orientation on a general question, not a source. Click through before you rely on anything, and for anything that matters, use a tool that shows you the page an answer came from, such as Gemini Notebook (tip 3).',
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
    { k: 'Habit', b: 'If it goes wrong, start again.', t: 'Don’t argue with a bad answer. New chat, better question.' },
    { k: 'Habit', b: 'Check one thing.', t: 'Before you rely on an answer, test one fact in it against the source. If that’s wrong, assume the rest is.' }
  ],

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
      { q: 'Brief me on how council funding works, with sources.', rung: 4, why: 'A long job that needs the web and a strong model. The Gemini app, using Deep Research (tip 13), while you do something else.' },
      { q: 'Is 3.6% a big rise in council tax?', rung: 2, why: 'Needs context from many sources, but no files of yours. AI Mode.' }
    ]
  },

  /* ------------------------------------------------------------ sources
     status: 'brief' = listed and checked in the project brief, 22 to 23
     October 2026. 'guardian' = from the Guardian's internal Gemini FAQ.
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
    'transcription-tool': { t: 'Guardian transcription tool: guide and access [TODO: link]', p: 'The Guardian', u: '', s: 'todo' },
    'live-transcription-tool': { t: 'Live transcription extension: install page [TODO: link]', p: '', u: '', s: 'todo' }
  }
};
