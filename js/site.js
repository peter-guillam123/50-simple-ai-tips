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
  whyThese: {
    title: 'Why these tools, and not others',
    paragraphs: [
      'The point of Google Workspace is privacy. It gives you a place to work on your documents and emails with an AI model under the same terms that already cover Drive and Gmail. What you put in stays the Guardian’s and is not used to train the model.',
      'Do not use free or personal accounts for work: no free Claude, no personal ChatGPT, no Gemini on a private Google account. They sit outside the Guardian’s agreements, and what you paste in may be kept and used for training.',
      'The usual rule still applies. If you would not store something in Drive or send it by email (a confidential source, a sensitive document), do not put it into an AI tool either.',
      'If you want a tool that is not on this list, you need budget for it and approval through Tech Council before you use it with Guardian material [TODO: link or contact for Tech Council].'
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
    { id: 'workspace', title: 'Inside Google Workspace', line: 'The apps you already use, working as normal. Gemini is built into each one, usually as a side panel (the star icon, top right) or a button. Same account, same privacy as the app itself.' },
    { id: 'general', title: 'General AI tools', line: 'Chat and research tools that are not tied to one app. The Gemini ones are under the Guardian’s Google agreement; ChatGPT Enterprise under its own.' },
    { id: 'guardian', title: 'Built by the Guardian', line: 'Our own tools, made for our work. Where one of these does the job, it is the one to use.' },
    { id: 'anyone', title: 'Open to anyone', line: 'Public tools that need no Guardian account. Fine for public material only.' }
  ],

  tools: [
    { id: 'gmail', group: 'workspace', label: 'Gmail', line: 'Ask your inbox a question. Summarise a thread.' },
    { id: 'drive', group: 'workspace', label: 'Drive', line: 'Find a file by describing it. Summarise a PDF where it sits.' },
    { id: 'docs', group: 'workspace', label: 'Docs', line: 'Tidy notes into tables. Proofread. Listen to your draft.' },
    { id: 'sheets', group: 'workspace', label: 'Sheets', line: 'Formulas in plain English. Tag 500 rows at once.' },
    { id: 'meet', group: 'workspace', label: 'Meet', line: 'Notes taken for you. Catch up when you join late.' },
    { id: 'chat', group: 'workspace', label: 'Google Chat', line: 'Summarise a busy space.' },
    { id: 'chrome', group: 'workspace', label: 'Chrome', line: 'Gemini in the browser: ask the page you’re on, compare open tabs.' },
    { id: 'gemini', group: 'general', label: 'Gemini app', line: 'The chat. Your files, your Workspace, Deep Research, Canvas and Live.' },
    { id: 'notebook', group: 'general', label: 'Gemini Notebook', line: 'Answers only from the sources you give it, every one footnoted. Was NotebookLM.' },
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
    { id: 'ladder', title: 'Pick the right tool', eyebrow: 'Part one',
      intro: 'There are four places to ask an AI a question, and they read different things. The less a tool reads, the easier it is to check what it says.' },
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
    rungs: [
      { n: 1, tool: 'AI Overviews', speed: 'Instant', reads: 'The whole search index', when: 'A quick general question you’d have Googled anyway', toolId: 'search' },
      { n: 2, tool: 'AI Mode', speed: 'Seconds', reads: 'The search index, many searches at once, plus PDFs you upload', when: 'Multi-part questions, follow-ups, comparisons', toolId: 'search' },
      { n: 3, tool: 'Gemini app', speed: 'Slower', reads: 'The web (some sites block it), your uploads, your Workspace', when: 'Your own files, long back-and-forth, Deep Research', toolId: 'gemini' },
      { n: 4, tool: 'Gemini Notebook', speed: 'Slower', reads: 'Only the sources you give it', when: 'Answers you can trace to a page, from documents you chose', toolId: 'notebook' }
    ],
    examples: [
      { q: 'What is a section 114 notice?', rung: 1, why: 'A general question with a settled answer. The overview at the top of the results will do.' },
      { q: 'Which councils have issued one since 2018, and why?', rung: 2, why: 'Several parts, and it needs many searches at once. AI Mode runs them and lets you follow up.' },
      { q: 'Explain the funding gap in this budget PDF I’ve uploaded.', rung: 3, why: 'It’s your file, and you’ll want to keep asking. The Gemini app.' },
      { q: 'What did councillors say about the gap? Cite the page.', rung: 4, why: 'You want an answer you can trace to a page in documents you chose. Notebook, with the minutes loaded.' },
      { q: 'Compare this year’s report with last year’s.', rung: 4, why: 'Two documents you have, and the answer must come only from them.' },
      { q: 'Is 3.6% a big rise in council tax?', rung: 2, why: 'Needs context from many sources, but no files of yours. AI Mode.' }
    ],
    message: 'The further down the ladder you go, the less the tool reads, and the easier its answer is to check.'
  },

  /* ------------------------------------------------------------ sources
     status: 'brief' = listed and checked in the project brief, 22 to 23
     October 2026. 'todo' = still to be supplied. */
  sources: {
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
