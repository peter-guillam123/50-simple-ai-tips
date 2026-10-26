/* plates.js: the interactive plates.
 *
 * Each plate is a function (el, ctx) that builds its contents inside el.
 * ctx carries { reduced: bool, site: window.SITE, entry: the entry or null }.
 * PLATES.captions holds the "What to notice" text for each.
 *
 * All the text in these mock-ups is illustrative. None of it comes from a
 * real document, and the plates say so.
 */
(function () {
  'use strict';

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function h(tag, attrs, html) {
    var el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (attrs[k] === false || attrs[k] == null) return;
      if (k === 'class') el.className = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    if (html != null) el.innerHTML = html;
    return el;
  }
  function $$(sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); }
  function note(el, text) { el.appendChild(h('p', { class: 'mock-note', text: text || 'Illustrative text, not from a real document.' })); }

  var P = { captions: {} };

  /* ------------------------------------------------------------ 1 ladder */
  P.captions.ladder = 'Rungs 1 and 2 answer from the web. Rung 3 answers only from the document you gave it, so every claim can be traced to a page. Rung 4 starts from your document and reaches beyond it. That makes it the most useful for context and the hardest to check, so ask it to say which facts came from where.';
  P.ladder = function (el, ctx) {
    var L = ctx.site.ladder;
    var left = h('div');
    left.appendChild(h('p', { class: 'k', text: 'Pick a question' }));
    var qs = h('div', { class: 'ladder__qs', role: 'group', 'aria-label': 'Example questions' });
    var why = h('p', { class: 'ladder__why', 'aria-live': 'polite' });
    var right = h('div');
    var rungs = h('ol', { class: 'ladder__rungs', 'aria-label': 'The four rungs' });
    var lastGroup = null;
    L.rungs.forEach(function (r) {
      if (r.group && r.group !== lastGroup && L.groups && L.groups[r.group]) {
        rungs.appendChild(h('li', { class: 'rung-group', 'aria-hidden': 'true', text: L.groups[r.group] }));
        lastGroup = r.group;
      }
      var li = h('li', { class: 'rung', 'data-rung': r.n });
      li.innerHTML = '<span class="rung__n">' + r.n + '</span>' +
        '<span class="rung__tool">' + esc(r.tool) + '<small>' + esc(r.speed) + '</small></span>' +
        '<p class="rung__reads"><span class="k">Reads</span>' + esc(r.reads) + (r.group && L.groups ? '<span class="vh">. ' + esc(L.groups[r.group]) + '</span>' : '') + '</p>' +
        '<p class="rung__when"><span class="k">Reach for it when</span>' + esc(r.when) + '</p>' +
        (r.entry ? '<a class="rung__go" href="#' + esc(r.entry) + '">Read tip ' + r.n + '</a>' : '');
      rungs.appendChild(li);
    });
    right.appendChild(rungs);

    var btns = [];
    function pick(i) {
      var ex = L.examples[i];
      btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
      $$('.rung', rungs).forEach(function (r) { r.classList.toggle('is-lit', +r.dataset.rung === ex.rung); });
      why.innerHTML = '<b>Rung ' + ex.rung + '.</b> ' + esc(ex.why);
    }
    L.examples.forEach(function (ex, i) {
      var b = h('button', { class: 'ladder__q', type: 'button', 'aria-pressed': 'false', text: ex.q });
      b.addEventListener('click', function () { pick(i); });
      qs.appendChild(b); btns.push(b);
    });
    left.appendChild(qs); left.appendChild(why);
    el.appendChild(left); el.appendChild(right);
    pick(0);
  };

  /* ------------------------------------------------------------ converge (6) */
  P.captions.converge = 'Three places you would have searched one at a time. One question, and the result is a single list, newest first, each item linked back to where it lives. Nothing is moved or copied.';
  P.converge = function (el, ctx) {
    var items = [
      { src: 'Inbox', when: '22 Oct', t: 'Re: Thames Water: OFWAT response to our questions' },
      { src: 'Drive', when: '21 Oct', t: 'Thames Water: timeline of fines (draft)' },
      { src: 'Chat', when: '21 Oct', t: 'Business desk: who has the Thames Water bond figures?' },
      { src: 'Inbox', when: '17 Oct', t: 'Press office: Thames Water statement, 15:00 embargo' },
      { src: 'Chat', when: '15 Oct', t: 'Newsdesk: Thames Water hearing is Tuesday' },
      { src: 'Drive', when: '9 Oct', t: 'Thames Water annual report 2026 (PDF)' },
      { src: 'Inbox', when: '2 Oct', t: 'Fwd: FOI reply, Environment Agency' },
      { src: 'Chat', when: '28 Sep', t: 'Graphics: Thames Water map, first pass' },
      { src: 'Drive', when: '20 Sep', t: 'Interview notes: former Thames engineer' }
    ];
    var wrap = h('div', { class: 'cv' });
    var streams = h('div', { class: 'cv__streams' });
    ['Inbox', 'Chat', 'Drive'].forEach(function (s) {
      var col = h('div', { class: 'cv__col' });
      col.appendChild(h('span', { class: 'k', text: s }));
      items.filter(function (i) { return i.src === s; }).forEach(function (i) {
        col.appendChild(h('div', { class: 'cv__item', 'data-src': i.src }, '<span class="cv__when">' + esc(i.when) + '</span>' + esc(i.t)));
      });
      streams.appendChild(col);
    });
    var merged = h('ol', { class: 'cv__merged', hidden: '' });
    items.forEach(function (i, n) {
      merged.appendChild(h('li', { class: 'cv__item', 'data-src': i.src, style: '--i:' + n }, '<span class="cv__when">' + esc(i.when) + '</span><span class="tag">' + esc(i.src) + '</span>' + esc(i.t) + ' <a href="#" onclick="return false" class="cv__link">open</a>'));
    });
    var ask = h('div', { class: 'cv__ask' });
    var btn = h('button', { class: 'btn', type: 'button', text: 'Ask: everything on Thames Water' });
    var back = h('button', { class: 'btn btn--ghost', type: 'button', text: 'Start again', hidden: '' });
    var on = false;
    function set(v) {
      on = v;
      wrap.classList.toggle('is-merged', on);
      streams.hidden = on; merged.hidden = !on;
      btn.hidden = on; back.hidden = !on;
      (on ? back : btn).focus();
    }
    btn.addEventListener('click', function () { set(true); });
    back.addEventListener('click', function () { set(false); });
    ask.appendChild(btn); ask.appendChild(back);
    wrap.appendChild(streams); wrap.appendChild(merged);
    el.appendChild(wrap); el.appendChild(ask);
    note(el, 'Illustrative items, not real messages or files.');
  };

  /* ------------------------------------------------------------ receipt (15) */
  P.captions.receipt = 'Click the citations in turn. Citations 1 and 2 say what the answer says. Citation 3 does not quite: the passage says the gap "could reach" £40m, and the answer has dropped the "could". That is the kind of thing a receipt lets you catch in seconds.';
  P.receipt = function (el, ctx) {
    var passages = [
      { n: 1, t: 'The council\u2019s general fund reserves fell from \u00a338.2m in March 2024 to \u00a321.6m in March 2025, a reduction of 43%.' },
      { n: 2, t: 'Spending on children\u2019s social care rose by \u00a311.4m in the year, against a budgeted increase of \u00a34.1m.' },
      { n: 3, t: 'Officers estimate that, without further savings, the funding gap could reach \u00a340m by 2027/28.' },
      { n: 0, t: 'The council has not issued a section 114 notice and does not currently expect to do so.' }
    ];
    var wrap = h('div', { class: 'rc' });
    var ans = h('div', { class: 'rc__answer' });
    ans.appendChild(h('span', { class: 'k', text: 'The answer' }));
    var p = h('p');
    p.innerHTML = 'Reserves fell by 43% in a year <button class="cite" type="button" data-n="1" aria-label="Citation 1">1</button>, driven mostly by children\u2019s social care overspending its budget by about \u00a37m <button class="cite" type="button" data-n="2" aria-label="Citation 2">2</button>. The gap will reach \u00a340m by 2027/28 <button class="cite" type="button" data-n="3" aria-label="Citation 3">3</button>.';
    ans.appendChild(p);
    var src = h('div', { class: 'rc__source' });
    src.appendChild(h('span', { class: 'k', text: 'The source' }));
    passages.forEach(function (ps) {
      src.appendChild(h('p', { class: 'rc__p', 'data-n': ps.n, text: ps.t }));
    });
    var say = h('p', { class: 'rc__say', 'aria-live': 'polite', text: 'Click a numbered citation.' });
    $$('.cite', ans).forEach(function (b) {
      b.addEventListener('click', function () {
        var n = b.dataset.n;
        $$('.cite', ans).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        $$('.rc__p', src).forEach(function (x) { x.classList.toggle('is-hot', x.dataset.n === n); });
        say.textContent = n === '3'
          ? 'Citation 3 highlighted. Compare the words: the passage says "could reach", the answer says "will reach". Do not use the answer as it stands.'
          : 'Citation ' + n + ' highlighted. Read the passage and check it says what the answer says.';
      });
    });
    wrap.appendChild(ans); wrap.appendChild(src);
    el.appendChild(wrap); el.appendChild(say);
    note(el);
  };

  /* ------------------------------------------------------------ table (17) */
  P.captions.table = 'The same facts, twice. In prose you have to read all of it to find the deadlines. As a table you can sort by deadline, see which department has the most to do, and export it. The page column is your way back to check.';
  P.table = function (el, ctx) {
    var text = 'The department will publish a national retrofit strategy by March 2027 (p 12). The Treasury commits to a review of the fuel duty escalator before the autumn statement (p 18). DfT will consult on bus franchising powers for all combined authorities by the end of 2026 (p 24). DESNZ will bring forward secondary legislation on heat network zoning in spring 2027 (p 31). The Home Office will report on the pilot by September 2026 (p 40).';
    var rows = [
      ['National retrofit strategy', 'DESNZ', 'March 2027', '12'],
      ['Review of the fuel duty escalator', 'Treasury', 'Autumn 2026', '18'],
      ['Consult on bus franchising powers', 'DfT', 'End of 2026', '24'],
      ['Secondary legislation on heat network zoning', 'DESNZ', 'Spring 2027', '31'],
      ['Report on the pilot', 'Home Office', 'September 2026', '40']
    ];
    var wrap = h('div', { class: 'dt' });
    var prose = h('p', { class: 'dt__prose', text: text });
    var table = h('table', { class: 'dt__table', hidden: '' });
    table.innerHTML = '<thead><tr><th>Commitment</th><th>Department</th><th>Deadline</th><th>Page</th></tr></thead><tbody>' +
      rows.map(function (r, i) { return '<tr style="--i:' + i + '">' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody>';
    var controls = h('div', { class: 'plate__controls' });
    var btn = h('button', { class: 'btn', type: 'button', text: 'Make a table' });
    var exp = h('button', { class: 'btn btn--ghost', type: 'button', text: 'Export to Sheets', hidden: '', disabled: '' });
    var back = h('button', { class: 'btn btn--ghost', type: 'button', text: 'Show the text', hidden: '' });
    function set(on) {
      wrap.classList.toggle('is-table', on);
      prose.hidden = on; table.hidden = !on; btn.hidden = on; exp.hidden = !on; back.hidden = !on;
      (on ? back : btn).focus();
    }
    btn.addEventListener('click', function () { set(true); });
    back.addEventListener('click', function () { set(false); });
    controls.appendChild(btn); controls.appendChild(exp); controls.appendChild(back);
    wrap.appendChild(prose); wrap.appendChild(table);
    el.appendChild(wrap); el.appendChild(controls);
    note(el, 'Illustrative commitments, not from a real white paper. The export button is a picture of one.');
  };

  /* ------------------------------------------------------------ diff (19) */
  P.captions.diff = 'Three kinds of change, three colours. Added text is green, deleted text is red and struck through, reworded text is yellow. The reworded ones are the ones to read twice: "will" became "aims to", which is a different promise.';
  P.diff = function (el, ctx) {
    var left = [
      ['The council will deliver 1,200 new homes by 2028, of which at least 40% will be affordable.', 'rew'],
      ['A new leisure centre will open in Northfield in 2027.', 'del'],
      ['Bus services on routes 14 and 22 will run every 15 minutes at peak times.', 'same']
    ];
    var right = [
      ['The council aims to deliver 1,200 new homes by 2029, of which at least 35% will be affordable.', 'rew'],
      ['Bus services on routes 14 and 22 will run every 15 minutes at peak times.', 'same'],
      ['A feasibility study on the Northfield leisure centre will report in 2027.', 'add']
    ];
    var wrap = h('div', { class: 'df' });
    function col(title, list) {
      var c = h('div', { class: 'df__col' });
      c.appendChild(h('span', { class: 'k', text: title }));
      list.forEach(function (x) { c.appendChild(h('p', { class: 'df__p', 'data-k': x[1], text: x[0] })); });
      return c;
    }
    wrap.appendChild(col('2025 plan', left)); wrap.appendChild(col('2026 plan', right));
    var summary = h('ul', { class: 'df__sum', hidden: '' });
    summary.innerHTML = '<li><span class="tag tag--add">New</span> A feasibility study replaces the leisure centre itself.</li>' +
      '<li><span class="tag tag--del">Gone</span> The commitment to open a leisure centre in 2027.</li>' +
      '<li><span class="tag tag--rew">Reworded</span> "Will deliver" is now "aims to deliver". 2028 is now 2029. 40% affordable is now 35%.</li>';
    var controls = h('div', { class: 'plate__controls' });
    var btn = h('button', { class: 'btn', type: 'button', 'aria-pressed': 'false', text: 'Show the changes' });
    btn.addEventListener('click', function () {
      var on = btn.getAttribute('aria-pressed') !== 'true';
      btn.setAttribute('aria-pressed', String(on));
      btn.textContent = on ? 'Hide the changes' : 'Show the changes';
      wrap.classList.toggle('is-on', on);
      summary.hidden = !on;
    });
    controls.appendChild(btn);
    el.appendChild(wrap); el.appendChild(summary); el.appendChild(controls);
    note(el, 'Illustrative plans, not a real council\u2019s.');
  };

  /* ------------------------------------------------------------ moment (27) */
  P.captions.moment = 'You asked a question about a two-hour video and got a place to click, not a summary. The timestamp is the useful part: it takes you to the words so you can hear them yourself before you quote them.';
  P.moment = function (el, ctx) {
    var total = 2 * 3600 + 8 * 60; // 2:08:00
    var qs = [
      { q: 'When does the minister talk about prisons?', at: 4472, a: 'The minister turns to prisons at 1:14:32, in reply to a question about overcrowding, and returns to the subject briefly at 1:51:05.' },
      { q: 'Where is the figure of 14,000 places mentioned?', at: 4530, a: 'At 1:15:30 the minister says the programme will add "around 14,000 places" by 2031. The chair asks for the source at 1:16:10.' },
      { q: 'When is the chair\u2019s closing question?', at: 7380, a: 'The chair\u2019s closing question begins at 2:03:00 and the session ends at 2:08:00.' }
    ];
    function fmt(s) { var hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60; return hh + ':' + String(mm).padStart(2, '0') + ':' + String(ss).padStart(2, '0'); }
    var wrap = h('div', { class: 'mo' });
    var player = h('div', { class: 'mo__player', 'aria-hidden': 'true' });
    player.innerHTML = '<div class="mo__screen"><span class="mo__title">Select committee, session 2 of 2</span></div>' +
      '<div class="mo__bar"><div class="mo__track"><span class="mo__fill"></span><span class="mo__marker"></span></div><span class="mo__time">0:00:00 / ' + fmt(total) + '</span></div>';
    var marker = player.querySelector('.mo__marker'), fill = player.querySelector('.mo__fill'), time = player.querySelector('.mo__time');
    var qwrap = h('div', { class: 'mo__qs', role: 'group', 'aria-label': 'Example questions' });
    var ans = h('p', { class: 'mo__answer', 'aria-live': 'polite', text: 'Ask one of the questions.' });
    var btns = [];
    qs.forEach(function (x, i) {
      var b = h('button', { class: 'ladder__q', type: 'button', 'aria-pressed': 'false', text: x.q });
      b.addEventListener('click', function () {
        btns.forEach(function (y, k) { y.setAttribute('aria-pressed', String(k === i)); });
        var pct = (x.at / total * 100).toFixed(2) + '%';
        marker.style.left = pct; fill.style.width = pct;
        time.textContent = fmt(x.at) + ' / ' + fmt(total);
        ans.innerHTML = esc(x.a).replace(/(\d:\d\d:\d\d)/g, '<b class="mo__stamp">$1</b>');
      });
      qwrap.appendChild(b); btns.push(b);
    });
    wrap.appendChild(player); wrap.appendChild(qwrap);
    el.appendChild(wrap); el.appendChild(ans);
    note(el, 'Illustrative timestamps, not from a real hearing.');
  };

  /* ------------------------------------------------------------ rows (34) */
  P.captions.rows = 'One formula, dragged down the column, and every row gets a tag. The tags are guesses, and they are usually right. That is why the third step says spot-check five rows: row 6 here is the one to look at twice.';
  P.rows = function (el, ctx) {
    var data = [
      ['Two-storey rear extension to dwelling', 'Residential'],
      ['Change of use from retail (Class E) to hot food takeaway', 'Commercial'],
      ['Erection of 14 dwellings with access and landscaping', 'Residential'],
      ['Installation of 5G telecommunications mast', 'Other'],
      ['New shopfront and illuminated signage', 'Commercial'],
      ['Conversion of barn to holiday let and farm shop', 'Other'],
      ['Loft conversion with rear dormer', 'Residential'],
      ['Demolition of warehouse and erection of 3 industrial units', 'Commercial']
    ];
    var wrap = h('div', { class: 'rw' });
    var table = h('table', { class: 'rw__table' });
    table.innerHTML = '<thead><tr><th class="rw__corner"></th><th>A</th><th>B</th></tr></thead><tbody>' +
      '<tr><th>1</th><td class="rw__head">Description</td><td class="rw__head rw__formula">=AI("Is this planning application residential, commercial or other?", A2)</td></tr>' +
      data.map(function (r, i) { return '<tr><th>' + (i + 2) + '</th><td>' + esc(r[0]) + '</td><td class="rw__cell" data-v="' + esc(r[1]) + '"></td></tr>'; }).join('') + '</tbody>';
    var controls = h('div', { class: 'plate__controls' });
    var btn = h('button', { class: 'btn', type: 'button', text: 'Fill the column' });
    var clear = h('button', { class: 'btn btn--ghost', type: 'button', text: 'Clear', hidden: '' });
    var timers = [];
    function fill() {
      var cells = $$('.rw__cell', table);
      btn.hidden = true; clear.hidden = false;
      cells.forEach(function (c, i) {
        var go = function () { c.textContent = c.dataset.v; c.classList.add('is-filled'); c.classList.toggle('is-doubt', c.dataset.v === 'Other' && i === 5); };
        if (ctx.reduced) go(); else timers.push(setTimeout(go, 220 + i * 260));
      });
    }
    function reset() {
      timers.forEach(clearTimeout); timers = [];
      $$('.rw__cell', table).forEach(function (c) { c.textContent = ''; c.classList.remove('is-filled', 'is-doubt'); });
      btn.hidden = false; clear.hidden = true; btn.focus();
    }
    btn.addEventListener('click', fill); clear.addEventListener('click', reset);
    controls.appendChild(btn); controls.appendChild(clear);
    wrap.appendChild(table);
    el.appendChild(wrap); el.appendChild(controls);
    note(el, 'Illustrative applications, not a real register. Row 6 is a barn that is both a holiday let and a shop: the formula says "Other", and you might not.');
  };

  /* ------------------------------------------------------------ skill (47) */
  P.captions.skill = 'The skill does not change. The text does. You wrote the rules once on Monday, and every day after that the check costs you one click. The output is a list of problems with fixes, not a rewrite.';
  P.skill = function (el, ctx) {
    var days = [
      { d: 'Mon', input: 'The council spent 12 per cent more than planned, the Chief Executive said on Tues.', out: ['"12 per cent": write "12%".', '"Chief Executive": lower case, "chief executive".', '"Tues": write "Tuesday" in full.'] },
      { d: 'Tue', input: 'Around 2,000 people attended the protest in Trafalgar square.', out: ['"Trafalgar square": "Trafalgar Square", capital S.'] },
      { d: 'Wed', input: 'The MP, who was elected in 2024, said the bill would be "a disaster".', out: ['No problems found.'] },
      { d: 'Thu', input: 'Figures show 1 in 5 pupils missed school last autumn, up from 1 in 7.', out: ['"1 in 5", "1 in 7": write "one in five", "one in seven".'] },
      { d: 'Fri', input: 'The Prime minister will visit Leeds on the 3rd of November.', out: ['"Prime minister": "prime minister", both lower case.', '"the 3rd of November": "3 November".'] }
    ];
    var wrap = h('div', { class: 'sk' });
    var card = h('div', { class: 'sk__card' });
    card.innerHTML = '<span class="k">Your skill</span><b>Style check</b><p>Check any text I give you against these Guardian style rules: numbers, capitals, dates. List each problem with the fix.</p>';
    var week = h('div', { class: 'sk__week', role: 'group', 'aria-label': 'Days of the week' });
    var out = h('div', { class: 'sk__out', 'aria-live': 'polite' });
    var btns = [];
    function pick(i) {
      btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
      var d = days[i];
      out.innerHTML = '<p class="sk__in"><span class="k">' + esc(d.d) + ': the text</span>' + esc(d.input) + '</p>' +
        '<ul class="sk__list"><span class="k">What the skill says</span>' + d.out.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>';
      card.classList.remove('is-pulse'); void card.offsetWidth; card.classList.add('is-pulse');
    }
    days.forEach(function (d, i) {
      var b = h('button', { class: 'sk__day', type: 'button', 'aria-pressed': 'false', text: d.d });
      b.addEventListener('click', function () { pick(i); });
      week.appendChild(b); btns.push(b);
    });
    wrap.appendChild(card); wrap.appendChild(week); wrap.appendChild(out);
    el.appendChild(wrap);
    pick(0);
    note(el, 'Illustrative sentences and a shortened set of style rules.');
  };

  /* ------------------------------------------------------------ digest (48) */
  P.captions.digest = 'A card lands every weekday at about the same time, whether or not you remembered to ask. Each one is three pointers with links, not a story. Open a day to see what that looks like, and notice how thin a pointer is: it tells you where to look, not what to write.';
  P.digest = function (el, ctx) {
    var days = [
      { d: 'Mon 19', items: ['NHS England publishes September referral-to-treatment data', 'Think tank report on A&E waits in the north-east', 'Health secretary interview, Today programme, 8.10am'] },
      { d: 'Tue 20', items: ['Three trusts declare critical incidents overnight', 'Nuffield Trust analysis of the new waiting list target', 'Select committee publishes evidence from royal colleges'] },
      { d: 'Wed 21', items: ['New figures on 12-hour trolley waits', 'Trust in special measures: CQC report due', 'Opposition day debate on waiting times, 12.30pm'] },
      { d: 'Thu 22', items: ['Monthly performance statistics, 9.30am embargo', 'Regional variation analysis from the King\u2019s Fund', 'Interview request: trust chief executive stepping down'] },
      { d: 'Fri 23', items: ['Weekly flu and Covid admissions bulletin', 'Judicial review on cancer waiting time targets: judgment', 'Leaked letter on winter planning reported by the HSJ'] }
    ];
    var wrap = h('div', { class: 'dg' });
    var strip = h('div', { class: 'dg__strip', role: 'group', 'aria-label': 'Days of the week' });
    var read = h('div', { class: 'dg__read', 'aria-live': 'polite' });
    var btns = [];
    function open(i) {
      btns.forEach(function (b, k) { b.setAttribute('aria-pressed', String(k === i)); });
      var d = days[i];
      read.innerHTML = '<span class="k">' + esc(d.d) + ', 7:04am</span><ol class="dg__list">' + d.items.map(function (x) { return '<li>' + esc(x) + ' <a href="#" onclick="return false">source</a></li>'; }).join('') + '</ol>';
    }
    days.forEach(function (d, i) {
      var b = h('button', { class: 'dg__day', type: 'button', 'aria-pressed': 'false', style: '--i:' + i });
      b.innerHTML = '<span class="dg__dname">' + esc(d.d) + '</span><span class="dg__card">7am</span>';
      b.addEventListener('click', function () { open(i); });
      strip.appendChild(b); btns.push(b);
    });
    var controls = h('div', { class: 'plate__controls' });
    var play = h('button', { class: 'btn', type: 'button', text: 'Run the week' });
    var timers = [];
    play.addEventListener('click', function () {
      timers.forEach(clearTimeout); timers = [];
      wrap.classList.remove('is-run');
      btns.forEach(function (b) { b.classList.remove('is-in'); });
      void wrap.offsetWidth;
      btns.forEach(function (b, i) {
        var go = function () { b.classList.add('is-in'); if (i === btns.length - 1) wrap.classList.add('is-run'); };
        if (ctx.reduced) go(); else timers.push(setTimeout(go, 150 + i * 420));
      });
    });
    controls.appendChild(play);
    wrap.appendChild(strip); wrap.appendChild(read);
    el.appendChild(wrap); el.appendChild(controls);
    open(0);
    if (ctx.reduced) btns.forEach(function (b) { b.classList.add('is-in'); });
    note(el, 'Illustrative pointers, not real stories.');
  };

  window.PLATES = P;
})();
