/* app.js: the page engine.
 *
 * Vanilla JS, no dependencies. Content comes from js/site.js (window.SITE)
 * and js/entries.js (window.ENTRIES). Drawings from js/sketches.js,
 * interactive plates from js/plates.js.
 *
 * Address options:
 *   ?job=find-story,verify&tool=gmail&material=email-chat&effort=1min
 *       filters. OR within a facet, AND across facets.
 *   ?review
 *       shows the [VERIFY] and [TODO] markers and each entry's availability
 *       note. Readers never see these.
 *   #sort-500-rows
 *       every entry has an anchor.
 */
(function () {
  'use strict';

  var S = window.SITE || {};
  var E = (window.ENTRIES || []).slice().sort(function (a, b) { return a.number - b.number; });
  var SK = window.SKETCHES || {};
  var PL = window.PLATES || { captions: {} };
  var doc = document, root = doc.documentElement;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  /* ---------------------------------------------------------------- helpers */
  function $(sel, el) { return (el || doc).querySelector(sel); }
  function $$(sel, el) { return Array.prototype.slice.call((el || doc).querySelectorAll(sel)); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function h(tag, attrs, html) {
    var el = doc.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (attrs[k] === false || attrs[k] == null) return;
      if (k === 'class') el.className = attrs[k];
      else if (k === 'text') el.textContent = attrs[k];
      else el.setAttribute(k, attrs[k]);
    });
    if (html != null) el.innerHTML = html;
    return el;
  }
  function byId(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }

  /* Cross-references. {tip:some-id} becomes "tip 12", linked, numbered from
     the entry so renumbering never breaks it. */
  function tipNo(id) { for (var i = 0; i < E.length; i++) if (E[i].id === id) return E[i].number; return null; }
  function tipRefs(s) {
    return s.replace(/\{tip:([a-z0-9-]+)\}/g, function (_, id) { var n = tipNo(id); return n ? '<a class="tipref" href="#' + id + '">tip ' + n + '</a>' : ''; });
  }

  /* Markers. [VERIFY] and [TODO: ...] become spans that only show in review
     mode. Everything else is escaped. */
  function rich(s) {
    return tipRefs(esc(s))
      .replace(/\s*\[VERIFY(?::?\s*([^\]]*))?\]/g, function (_, note) { return '<span class="mark mark--verify">Verify' + (note ? ': ' + note : '') + '</span>'; })
      .replace(/\s*\[TODO:?\s*([^\]]*)\]/g, function (_, note) { return '<span class="mark mark--todo">To do' + (note ? ': ' + note : '') + '</span>'; });
  }
  /* The same text with markers removed, for places that need plain text. */
  function plain(s) { return String(s == null ? '' : s).replace(/\{tip:([a-z0-9-]+)\}/g, function (_, id) { return 'tip ' + tipNo(id); }).replace(/\s*\[VERIFY[^\]]*\]/g, '').replace(/\s*\[TODO[^\]]*\]/g, '').replace(/\s+([.,])/g, '$1').trim(); }
  function hasMarkers(s) { return /\[(VERIFY|TODO)/.test(String(s || '')); }

  /* Title with the accent phrase in italics. */
  function accented(title, accent) {
    var t = esc(title), a = esc(accent || '');
    if (a && t.indexOf(a) !== -1) return t.replace(a, '<em>' + a + '</em>');
    return t;
  }

  /* ---------------------------------------------------------- review mode */
  var params = new URLSearchParams(location.search);
  var review = params.has('review');
  if (review) {
    root.classList.add('is-review');
    var banner = h('div', { class: 'review-banner' }, 'Review mode: showing [VERIFY] and [TODO] markers and availability notes. <a href="' + esc(location.pathname) + '">Back to the reader view</a>');
    doc.body.appendChild(banner);
  }

  /* ------------------------------------------------------------- masthead */
  function renderMasthead() {
    var M = S.masthead || {};
    var ey = $('#hero-eyebrow'), hd = $('#hero-headline'), st = $('#hero-stand');
    if (ey) ey.textContent = M.eyebrow || '';
    if (hd) hd.innerHTML = accented(M.headline || S.title || '', M.accent);
    if (st) st.textContent = M.standfirst || '';
    $$('[data-asof]').forEach(function (el) { el.textContent = S.asOf || ''; });
    var words = 0;
    function count(s) { words += plain(s).split(/\s+/).filter(Boolean).length; }
    E.forEach(function (e) { count(e.title); count(e.why); count(e.where); (e.steps || []).forEach(count); count(e.prompt); count(e.alsoWorks); count(e.tip); count(e.care); });
    (S.sections || []).forEach(function (s) { count(s.title); count(s.intro); });
    (S.habits || []).forEach(function (x) { count(x.b); count(x.t); });
    var mins = Math.max(1, Math.round(words / 200));
    var rm = $('#read-mins'); if (rm) rm.textContent = mins;
    var ec = $('#entry-count'); if (ec) ec.textContent = E.length;
    doc.title = plain(M.headline || S.title || doc.title);
  }

  /* ------------------------------------------------------------ tool cards */
  var GICONS = {
    workspace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.5"/></svg>',
    general: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c.6 4.6 3.4 7.4 9 9-5.6 1.6-8.4 4.4-9 9-.6-4.6-3.4-7.4-9-9 5.6-1.6 8.4-4.4 9-9z"/></svg>',
    guardian: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4" width="17" height="16" rx="1.5"/><path d="M7 8h10M7 12h4M7 16h4M14 12h3v4h-3z"/></svg>',
    anyone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.6 2.6 14.4 0 17M12 3.5c-2.6 2.6-2.6 14.4 0 17"/></svg>'
  };

  function toolCard(t) {
    var n = E.filter(function (e) { return e.tool === t.id; }).length;
    var card = h('div', { class: 'tool-card' });
    card.innerHTML = '<b>' + rich(t.label) + '</b>' +
      (t.access ? '<span class="tool-card__access">' + rich(t.access) + '</span>' : '') +
      '<span>' + rich(t.line) + '</span>' +
      '<span class="k">' + (n ? n + (n === 1 ? ' tip' : ' tips') : 'No tips yet') + '</span>';
    return card;
  }

  function renderTools() {
    var wrap = $('#tool-cards');
    if (wrap) {
      /* Four group cards. Clicking one opens its apps in a panel placed
         after the last card in the clicked card's row, so it opens beside
         what you clicked at every width. */
      var grid = h('div', { class: 'tgroups' });
      var panel = h('div', { class: 'tgroup-panel', id: 'tgroup-panel', role: 'region', hidden: '' });
      var cards = [], open = null;
      function place(btn) {
        grid.appendChild(panel);
        var top = btn.offsetTop, last = btn;
        cards.forEach(function (c) { if (c.offsetTop === top) last = c; });
        last.after(panel);
      }
      function show(g, btn) {
        if (open === g.id) { open = null; panel.hidden = true; btn.setAttribute('aria-expanded', 'false'); return; }
        open = g.id;
        cards.forEach(function (c) { c.setAttribute('aria-expanded', String(c === btn)); });
        var mine = (S.tools || []).filter(function (t) { return t.group === g.id; });
        panel.innerHTML = '<p class="tgroup-panel__line">' + rich(g.line || '') + '</p>';
        panel.setAttribute('aria-label', g.title);
        var tg = h('div', { class: 'tools' });
        mine.forEach(function (t) { tg.appendChild(toolCard(t)); });
        panel.appendChild(tg);
        panel.hidden = false;
        place(btn);
      }
      (S.toolGroups || []).forEach(function (g) {
        var mine = (S.tools || []).filter(function (t) { return t.group === g.id; });
        if (!mine.length) return;
        var names = mine.map(function (t) { return plain(t.label); }).join(' · ');
        var b = h('button', { class: 'tgroup', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'tgroup-panel' });
        b.innerHTML = (GICONS[g.icon] || '') + '<b>' + esc(g.title) + '</b><span class="tgroup__line">' + esc(g.short || '') + '</span>' +
          '<span class="tgroup__names">' + esc(names) + '</span>' +
          '<span class="tgroup__more"><span class="tgroup__open">Show the ' + mine.length + ' tools</span><span class="tgroup__close">Hide</span></span>';
        b.addEventListener('click', function () { show(g, b); });
        grid.appendChild(b); cards.push(b);
      });
      grid.appendChild(panel);
      wrap.appendChild(grid);
      var rt;
      window.addEventListener('resize', function () {
        clearTimeout(rt);
        rt = setTimeout(function () { var b = cards.filter(function (c) { return c.getAttribute('aria-expanded') === 'true'; })[0]; if (b) place(b); }, 120);
      });
    }

    var why = $('#why-these');
    var W = S.whyThese;
    if (why && W) {
      why.innerHTML = (W.eyebrow ? '<p class="eyebrow">' + esc(W.eyebrow) + '</p>' : '') +
        '<h3>' + esc(W.title || '') + '</h3>' +
        (W.lede ? '<p class="why__lede">' + rich(W.lede) + '</p>' : '') +
        '<ol class="rules">' + (W.rules || []).map(function (r) {
          return '<li><details class="rule"><summary><b>' + rich(r.h) + '</b><span>' + rich(r.short) + '</span></summary>' +
            '<div class="rule__body"><p>' + rich(r.detail) + '</p></div></details></li>';
        }).join('') + '</ol>' +
        (W.links && W.links.length ? '<p class="why__links"><span class="k">Read the rules</span>' + W.links.map(function (l) { return l.u ? '<a href="' + esc(l.u) + '" rel="noopener" target="_blank">' + rich(l.t) + '</a>' : '<span>' + rich(l.t) + '</span>'; }).join('') + '</p>' : '');
    }
  }

  /* ---------------------------------------------------------------- filters */
  var FACETS = ['job', 'tool', 'material', 'effort'];
  var state = { job: [], tool: [], material: [], effort: [] };
  var chipEls = { job: [], tool: [], material: [], effort: [] };

  function facetValues(entry, facet) {
    if (facet === 'job') return entry.jobs || [];
    return [entry[facet]];
  }
  function matchesExcept(entry, skip) {
    return FACETS.every(function (f) {
      if (f === skip || !state[f].length) return true;
      var vals = facetValues(entry, f);
      return state[f].some(function (v) { return vals.indexOf(v) !== -1; });
    });
  }
  function matches(entry) { return matchesExcept(entry, null); }
  function anyFilter() { return FACETS.some(function (f) { return state[f].length; }); }

  function readState() {
    FACETS.forEach(function (f) {
      var raw = params.get(f);
      state[f] = raw ? raw.split(',').map(function (s) { return s.trim(); }).filter(Boolean) : [];
    });
  }
  function writeState() {
    var p = new URLSearchParams();
    FACETS.forEach(function (f) { if (state[f].length) p.set(f, state[f].join(',')); });
    if (review) p.set('review', '');
    var q = p.toString().replace(/=(&|$)/g, '$1');
    var url = location.pathname + (q ? '?' + q : '') + location.hash;
    try { history.replaceState(null, '', url); } catch (e) { /* file:// */ }
  }

  function toggle(facet, id) {
    var i = state[facet].indexOf(id);
    if (i === -1) state[facet].push(id); else state[facet].splice(i, 1);
    apply();
  }
  function reset() { FACETS.forEach(function (f) { state[f] = []; }); apply(); }

  function buildChips() {
    var lists = { job: S.jobs, tool: S.tools, material: S.materials, effort: S.efforts };
    FACETS.forEach(function (f) {
      var wrap = $('#fg-' + f + ' .fgroup__chips');
      if (!wrap) return;
      (lists[f] || []).forEach(function (v) {
        /* No chip for a tool no entry uses (ChatGPT Enterprise is listed, not taught). */
        if (f === 'tool' && !E.some(function (e) { return e.tool === v.id; })) return;
        var b = h('button', { class: 'fchip', type: 'button', 'aria-pressed': 'false', 'data-id': v.id });
        b.innerHTML = '<span>' + esc(plain(v.label)) + '</span><span class="n">0</span>';
        b.addEventListener('click', function () { toggle(f, v.id); });
        wrap.appendChild(b); chipEls[f].push(b);
      });
    });
    var tog = $('#filter-toggle'), bar = $('#filterbar');
    if (tog && bar) {
      tog.addEventListener('click', function () {
        var open = !bar.classList.contains('is-open');
        bar.classList.toggle('is-open', open);
        tog.setAttribute('aria-expanded', String(open));
      });
    }
    var rs = $('#filter-reset'); if (rs) rs.addEventListener('click', reset);
    var er = $('#empty-reset'); if (er) er.addEventListener('click', reset);
  }

  function apply(opts) {
    opts = opts || {};
    var shown = 0;
    E.forEach(function (e) {
      var ok = matches(e);
      if (e._el) e._el.hidden = !ok;
      if (e._panel) e._panel.hidden = !ok || !!anyFilter();
      if (ok) shown++;
    });
    (S.sections || []).forEach(function (s) {
      var any = E.some(function (e) { return e.section === s.id && matches(e); });
      if (s._el) s._el.hidden = !any;
      if (s._habit) s._habit.hidden = !any || !!anyFilter();
      if (s._plate) s._plate.hidden = !!anyFilter();
    });
    FACETS.forEach(function (f) {
      chipEls[f].forEach(function (b) {
        var id = b.dataset.id;
        var n = E.filter(function (e) { return facetValues(e, f).indexOf(id) !== -1 && matchesExcept(e, f); }).length;
        b.querySelector('.n').textContent = n;
        b.setAttribute('aria-pressed', String(state[f].indexOf(id) !== -1));
        if (n === 0 && state[f].indexOf(id) === -1) b.setAttribute('data-zero', ''); else b.removeAttribute('data-zero');
      });
    });
    $$('.job').forEach(function (b) {
      var id = b.dataset.id;
      b.setAttribute('aria-pressed', String(state.job.indexOf(id) !== -1));
      var n = E.filter(function (e) { return (e.jobs || []).indexOf(id) !== -1 && matchesExcept(e, 'job'); }).length;
      b.querySelector('.n').textContent = n + (n === 1 ? ' tip' : ' tips');
    });
    $$('.pick').forEach(function (b) {
      var id = b.dataset.id;
      b.setAttribute('aria-pressed', String(state.material.indexOf(id) !== -1));
      var n = E.filter(function (e) { return e.material === id && matchesExcept(e, 'material'); }).length;
      b.querySelector('.n').textContent = n + (n === 1 ? ' tip' : ' tips');
    });
    var count = $('#filter-count');
    if (count) count.textContent = anyFilter() ? 'Showing ' + shown + ' of ' + E.length : 'Showing all ' + E.length;
    var active = $('#filter-active');
    if (active) {
      active.innerHTML = '';
      var lists = { job: S.jobs, tool: S.tools, material: S.materials, effort: S.efforts };
      FACETS.forEach(function (f) {
        state[f].forEach(function (id) {
          var v = byId(lists[f] || [], id) || { label: id };
          var b = h('button', { class: 'fchip fchip--active', type: 'button', 'aria-label': 'Remove filter: ' + plain(v.label) });
          b.innerHTML = '<span>' + esc(plain(v.label)) + '</span><span class="x" aria-hidden="true">×</span>';
          b.addEventListener('click', function () { toggle(f, id); });
          active.appendChild(b);
        });
      });
    }
    var rs = $('#filter-reset'); if (rs) rs.hidden = !anyFilter();
    var empty = $('#empty'); if (empty) empty.hidden = shown > 0;
    if (!opts.silent) writeState();
  }

  /* ---------------------------------------------------------------- picker */
  var ICONS = {
    question: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M9.3 9.5a2.7 2.7 0 1 1 3.9 2.4c-.8.4-1.2 1-1.2 1.8v.3"/><circle cx="12" cy="17.3" r=".7" fill="currentColor"/></svg>',
    document: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h7M9 17h7M9 9h2"/></svg>',
    spreadsheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z" fill="currentColor"/></svg>',
    web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20h4l11-11-4-4L4 16z"/><path d="M13 7l4 4"/></svg>',
    photo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    meeting: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="9" r="3"/><circle cx="16" cy="9" r="3"/><path d="M2.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5M10.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5"/></svg>'
  };
  var JICONS = {
    'find-story': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21M8 10.5h5M10.5 8v5"/></svg>',
    research: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 5.5c3-1.5 6-1.5 9 0v14c-3-1.5-6-1.5-9 0zM21 5.5c-3-1.5-6-1.5-9 0v14c3-1.5 6-1.5 9 0z"/></svg>',
    documents: ICONS.document,
    numbers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    interviews: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7"/></svg>',
    verify: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l7.5 3v5.5c0 4.5-3.2 8-7.5 9.5-4.3-1.5-7.5-5-7.5-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/></svg>',
    organise: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7h6l2 2h10v10H3z"/><path d="M3 7V5h6l2 2"/></svg>',
    'before-filing': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 15l2 2 4-4.5"/></svg>',
    routine: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/></svg>'
  };

  /* The way in: nine job tiles, each filtering the list to that job. */
  function renderJobs() {
    var grid = $('#jobs-grid');
    if (!grid) return;
    (S.jobs || []).forEach(function (j) {
      var b = h('button', { class: 'job', type: 'button', 'aria-pressed': 'false', 'data-id': j.id });
      b.innerHTML = (JICONS[j.icon] || '') + '<b>' + esc(j.label) + '</b><span class="job__line">' + esc(j.line || '') + '</span><span class="n"></span>';
      b.addEventListener('click', function () {
        state.job = state.job.length === 1 && state.job[0] === j.id ? [] : [j.id];
        apply();
        if (state.job.length) scrollToList();
      });
      grid.appendChild(b);
    });
  }
  function scrollToList() {
    var target = $('#entries');
    var y = target.getBoundingClientRect().top + window.scrollY - 150;
    window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
  }

  /* The rule above the list. */
  function renderCheckRule() {
    var el = $('#check-rule'), C = S.checkRule;
    if (!el || !C) return;
    el.innerHTML = '<p class="eyebrow">' + esc(C.eyebrow || '') + '</p><h2 id="check-rule-title">' + esc(C.title) + '</h2>' +
      '<p class="check__lede">' + rich(C.lede) + '</p>' +
      '<ul class="check__points">' + (C.points || []).map(function (x) { return '<li>' + rich(x) + '</li>'; }).join('') + '</ul>' +
      (C.close ? '<p class="check__close">' + rich(C.close) + '</p>' : '');
  }

  function renderPicker() {
    var grid = $('#picker-grid');
    if (!grid) return;
    (S.materials || []).forEach(function (m) {
      var b = h('button', { class: 'pick', type: 'button', 'aria-pressed': 'false', 'data-id': m.id });
      b.innerHTML = (ICONS[m.icon] || '') + '<b>' + esc(m.label) + '</b><span class="n"></span>';
      b.addEventListener('click', function () {
        state.material = state.material.indexOf(m.id) === -1 ? [m.id] : [];
        apply();
        if (state.material.length) scrollToList();
      });
      grid.appendChild(b);
    });
  }

  /* --------------------------------------------------------------- entries */
  var plateNo = 1;

  function miniLadder(rung) {
    var bars = [1, 2, 3, 4].map(function (n) { return '<b style="height:' + (4 + n * 3) + 'px"' + (n === rung ? ' class="is-lit"' : '') + '></b>'; }).join('');
    return '<span class="mini-ladder" title="Rung ' + rung + ' of the ladder"><i>' + bars + '</i>Rung ' + rung + '</span>';
  }

  function copyText(box, value) {
    var badge = box.querySelector('.copy-badge');
    function done(ok) {
      if (badge) badge.textContent = ok ? 'Copied' : 'Select and copy';
      box.setAttribute('data-copied', '');
      clearTimeout(box._t);
      box._t = setTimeout(function () { box.removeAttribute('data-copied'); }, 1400);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () { done(true); }, function () { fallback(); });
    } else fallback();
    function fallback() {
      var ta = doc.createElement('textarea');
      ta.value = value; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-1000px;opacity:0;';
      doc.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = doc.execCommand('copy'); } catch (e) { ok = false; }
      doc.body.removeChild(ta);
      done(ok);
    }
  }

  function promptCard(entry) {
    var isCode = /^=/.test(entry.prompt);
    var box = h('button', { class: 'prompt' + (isCode ? ' prompt--code' : ''), type: 'button', 'aria-label': 'Copy this ' + (isCode ? 'formula' : 'prompt') + ' to the clipboard' });
    box.innerHTML = '<span class="prompt__head"><span class="prompt__label">' + (isCode ? 'The formula' : 'Saved prompt') + '</span><span class="prompt__hint">Click to copy</span></span>' +
      '<span class="prompt__text">' + esc(entry.prompt) + '</span><span class="copy-badge" aria-hidden="true">Copied</span>';
    box.addEventListener('click', function () { copyText(box, entry.prompt); });
    return box;
  }

  function renderEntry(entry, sec) {
    var tool = byId(S.tools || [], entry.tool) || { label: entry.tool };
    var effort = byId(S.efforts || [], entry.effort) || { label: entry.effort };
    var hasArt = !!(entry.plate && PL[entry.plate]) || !!(entry.sketch && SK.has && SK.has(entry.sketch));
    var art = h('article', { class: 'tip' + (hasArt ? '' : ' tip--noart'), id: entry.id, 'data-number': entry.number, style: '--sec: var(--s-' + sec.id + ')' });

    var main = h('div', { class: 'tip__main' });
    var meta = h('div', { class: 'tip__meta' });
    meta.innerHTML = '<span class="tip__no" aria-hidden="true">' + entry.number + '</span>' +
      '<span class="tag tag--tool">' + rich(tool.label) + '</span>' +
      '<span class="tag tag--effort">' + esc(effort.label) + '</span>' +
      (entry.rung ? miniLadder(entry.rung) : '');
    main.appendChild(meta);

    var title = h('h3', { class: 'tip__title' });
    title.innerHTML = '<a href="#' + esc(entry.id) + '"><span class="vh">Tip ' + entry.number + ': </span>' + accented(entry.title, entry.accent) + '</a>';
    main.appendChild(title);
    if (entry.why) main.appendChild(h('p', { class: 'tip__why' }, rich(entry.why)));
    if (plain(entry.where) || (review && entry.where)) main.appendChild(h('p', { class: 'tip__where' }, '<span class="k">Where</span><span>' + rich(entry.where) + '</span>'));
    if (entry.steps && entry.steps.length) {
      var ol = h('ol', { class: 'tip__steps' });
      entry.steps.forEach(function (s) { ol.appendChild(h('li', null, '<span>' + rich(s) + '</span>')); });
      main.appendChild(ol);
    }
    if (entry.prompt) main.appendChild(promptCard(entry));
    if (entry.alsoWorks) main.appendChild(h('p', { class: 'tip__also' }, '<span class="k">Also works</span><span>' + rich(entry.alsoWorks) + '</span>'));
    if (entry.tip) main.appendChild(h('p', { class: 'tip__tip' }, '<span class="k">Tip</span><span>' + rich(entry.tip) + '</span>'));
    if (entry.care) main.appendChild(h('p', { class: 'tip__care' }, '<span class="k">Take care</span><span>' + rich(entry.care) + '</span>'));

    if (entry.availability) {
      var a = entry.availability;
      var av = h('div', { class: 'avail avail--' + (a.status || 'ok') });
      av.innerHTML = '<b>Availability: ' + esc(a.status || 'ok') + '</b>' + rich(a.note || 'Nothing to check.') +
        (hasMarkers(JSON.stringify(entry)) ? ' <span class="mark mark--verify">Has markers</span>' : '');
      main.appendChild(av);
    }
    art.appendChild(main);

    if (hasArt) {
      var side = h('div', { class: 'tip__side' });
      if (entry.plate && PL[entry.plate]) {
        plateNo++;
        var fig = h('figure', { class: 'plate plate--inline', 'aria-labelledby': 'plate-' + entry.plate + '-title' });
        fig.innerHTML = '<div class="plate__head"><span class="plate__no">Plate ' + plateNo + '</span><h4 class="plate__title" id="plate-' + entry.plate + '-title">' + esc(plain(entry.title)) + '</h4></div>';
        var body = h('div', { class: 'plate__body' });
        fig.appendChild(body);
        var cap = h('figcaption', { class: 'plate__cap' }, '<strong>What to notice</strong> ' + esc(PL.captions[entry.plate] || ''));
        fig.appendChild(cap);
        side.appendChild(fig);
        try { PL[entry.plate](body, { reduced: reduced, site: S, entry: entry }); } catch (e) { if (window.console) console.error('Plate failed:', entry.plate, e); }
      } else if (entry.sketch && SK.has(entry.sketch)) {
        var drawn = SK.draw(entry.sketch, entry);
        if (drawn) {
          var sk = h('div', { class: 'sketch' }, drawn);
          var capText = SK.caption(entry.sketch);
          if (capText) sk.appendChild(h('p', { class: 'sketch__cap', text: capText }));
          side.appendChild(sk);
        }
      }
      art.appendChild(side);
    }
    return art;
  }

  /* An evidence panel that sits after an entry. */
  function renderPanel(p, sec) {
    var aside = h('aside', { class: 'panel', id: p.id, 'aria-labelledby': p.id + '-title', style: '--sec: var(--s-' + sec.id + ')' });
    var srcLink = function (id) { var s = (S.sources || {})[id]; return s && s.u ? ' <a class="panel__src" href="' + esc(s.u) + '" rel="noopener" target="_blank">source</a>' : ''; };
    aside.innerHTML = '<p class="eyebrow">' + esc(p.eyebrow || '') + '</p><h3 id="' + p.id + '-title">' + esc(p.title) + '</h3>' +
      (p.intro ? '<p class="panel__intro">' + rich(p.intro) + '</p>' : '') +
      '<ol class="ev">' + (p.figures || []).map(function (f) { return '<li><span class="ev__n">' + esc(f.n) + '</span><div><p>' + rich(f.t) + '</p><p class="ev__src">' + rich(f.src) + srcLink(f.link) + '</p></div></li>'; }).join('') + '</ol>' +
      (p.outro ? '<p class="panel__outro">' + rich(p.outro) + '</p>' : '') +
      ((p.links || []).length ? '<p class="panel__links">' + p.links.map(function (id) { var s = (S.sources || {})[id]; return s ? '<a href="' + esc(s.u) + '" rel="noopener" target="_blank">' + rich(s.t) + '</a>' : ''; }).join('') + '</p>' : '');
    return aside;
  }

  function renderEntries() {
    var wrap = $('#entries');
    if (!wrap) return;
    (S.sections || []).forEach(function (sec, i) {
      var mine = E.filter(function (e) { return e.section === sec.id; });
      var section = h('section', { class: 'tipsec', id: 'sec-' + sec.id, style: '--sec: var(--s-' + sec.id + ')', 'aria-labelledby': 'sec-' + sec.id + '-title' });
      var head = h('div', { class: 'tipsec__head' });
      head.innerHTML = '<p class="eyebrow">' + esc(sec.eyebrow || '') + '</p><h2 id="sec-' + sec.id + '-title">' + esc(sec.title) + '</h2><p class="tipsec__intro">' + rich(sec.intro || '') + '</p>';
      section.appendChild(head);
      /* A section can open with a plate (part one opens with the ladder). */
      if (sec.plate && PL[sec.plate]) {
        var fig = h('figure', { class: 'plate plate--section rv', id: 'plate-' + sec.plate, 'aria-labelledby': 'plate-' + sec.plate + '-title' });
        fig.innerHTML = '<div class="plate__head"><span class="plate__no">Plate 1</span><h3 class="plate__title" id="plate-' + sec.plate + '-title">' + esc(sec.plateTitle || '') + '</h3></div>';
        var fbody = h('div', { class: 'plate__body ' + sec.plate, id: sec.plate });
        fig.appendChild(fbody);
        fig.appendChild(h('figcaption', { class: 'plate__cap' }, '<strong>What to notice</strong> ' + esc(PL.captions[sec.plate] || '')));
        section.appendChild(fig);
        sec._plate = fig;
        try { PL[sec.plate](fbody, { reduced: reduced, site: S, entry: null }); } catch (err) { if (window.console) console.error('Plate failed:', sec.plate, err); }
      }
      mine.forEach(function (e) {
        var el = renderEntry(e, sec); e._el = el; section.appendChild(el);
        (S.panels || []).forEach(function (p) { if (p.after === e.id) { var pe = renderPanel(p, sec); e._panel = pe; section.appendChild(pe); } });
      });
      sec._el = section;
      wrap.appendChild(section);
      var habit = (S.habits || [])[i];
      if (habit && i < S.sections.length - 1) {
        var hb = h('aside', { class: 'habit', 'aria-label': 'A habit worth keeping' });
        hb.innerHTML = '<span class="k">' + esc(habit.k) + '</span><b>' + esc(habit.b) + '</b><p>' + esc(habit.t) + '</p>';
        sec._habit = hb;
        wrap.appendChild(hb);
      }
    });
  }

  /* --------------------------------------------------------------- sources */
  function renderSources() {
    var ol = $('#sources-list');
    if (!ol || !S.sources) return;
    var order = [];
    E.forEach(function (e) {
      (e.sources || []).forEach(function (id) { if (order.indexOf(id) === -1) order.push(id); });
      (S.panels || []).forEach(function (p) { if (p.after === e.id) { (p.figures || []).map(function (f) { return f.link; }).concat(p.links || []).forEach(function (id) { if (id && order.indexOf(id) === -1) order.push(id); }); } });
    });
    Object.keys(S.sources).forEach(function (id) { if (order.indexOf(id) === -1) order.push(id); });
    var labels = { brief: 'Checked', guardian: 'From the Gemini FAQ', deck: 'Read for the AI working group deck', research: 'Found for the research list', todo: 'Still to add' };
    order.forEach(function (id, i) {
      var s = S.sources[id];
      if (!s) return;
      var used = E.filter(function (e) { return (e.sources || []).indexOf(id) !== -1; }).map(function (e) { return '<a href="#' + esc(e.id) + '">' + e.number + '</a>'; });
      var li = h('li', { id: 'src-' + id });
      li.innerHTML = '<span class="n">' + (i + 1) + '</span><span>' +
        (s.u ? '<a href="' + esc(s.u) + '" rel="noopener" target="_blank">' + rich(s.t) + '</a>' : rich(s.t)) +
        '<span class="m">' + rich(s.p || '') + (used.length ? '. Tip' + (used.length > 1 ? 's ' : ' ') + used.join(', ') : '') +
        ' <span class="chk chk--' + esc(s.s || 'brief') + '">' + (labels[s.s] || 'Checked') + '</span></span></span>';
      ol.appendChild(li);
    });
  }

  /* ------------------------------------------------- theme, nav, reveals */
  function initTheme() {
    var btn = $('#theme-btn');
    if (!btn) return;
    try {
      var saved = localStorage.getItem('fifty-theme');
      if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
    } catch (e) { /* storage blocked */ }
    btn.addEventListener('click', function () {
      var cur = root.getAttribute('data-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      var next = cur === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('fifty-theme', next); } catch (e) { /* ignore */ }
    });
  }

  function initChrome() {
    var links = $$('.topbar__nav a[href^="#"]');
    var bar = $('.progress');
    var targets = links.map(function (a) { return $(a.getAttribute('href')); });
    var ticking = false;
    function update() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset;
      var max = doc.body.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (max > 0 ? Math.min(1, y / max) : 0) + ')';
      var current = -1;
      targets.forEach(function (t, i) { if (t && !t.hidden && t.getBoundingClientRect().top < window.innerHeight * 0.35) current = i; });
      links.forEach(function (a, i) {
        if (i === current) {
          if (a.getAttribute('aria-current') !== 'true') {
            a.setAttribute('aria-current', 'true');
            var nav = a.parentNode;
            nav.scrollLeft = a.offsetLeft - nav.clientWidth / 2 + a.clientWidth / 2;
          }
        } else a.removeAttribute('aria-current');
      });
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
    var rv = $$('.rv');
    if ('IntersectionObserver' in window && !reduced) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
      rv.forEach(function (el) { io.observe(el); });
    } else rv.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ------------------------------------------------------------------ boot */
  function boot() {
    initTheme();
    renderMasthead();
    renderTools();
    renderJobs();
    renderPicker();
    renderCheckRule();
    buildChips();
    renderEntries();
    renderSources();
    readState();
    apply({ silent: true });
    initChrome();
    /* An entry hidden by a filter should still open from its anchor, on
       arrival and when a link on the page points at it. */
    function openHash(onLoad) {
      if (!location.hash) return;
      var t; try { t = $(location.hash); } catch (e) { t = null; }
      if (!t) return;
      var hidden = t.classList.contains('tip') && t.hidden;
      if (hidden) reset();
      if (onLoad || hidden) setTimeout(function () { t.scrollIntoView({ block: 'start', behavior: 'auto' }); }, 50);
    }
    openHash(true);
    window.addEventListener('hashchange', function () { openHash(false); });
  }
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', boot); else boot();
})();
