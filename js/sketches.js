/* sketches.js: the small drawings beside entries.
 *
 * Ten frames, each a simplified picture of one tool surface, drawn to one
 * visual system: a 320 by 200 canvas, 1.5px strokes, text shown as rounded
 * grey bars, one yellow highlight for the thing to notice, one red mark for
 * a cursor or the current position. No screenshots and no Google logos.
 *
 * Entries point at a frame and a variant: sketch: 'chat/file'. Each frame
 * takes the entry, so it can show the entry's own prompt where that helps.
 *
 *   search    overview · aimode · trace
 *   chat      plain · file · link · image · model · research · browser ·
 *             translate · notes · schedule · canvas
 *   notebook  sources · answer · audio · mindmap · cards · video ·
 *             timeline · questions · beat
 *   mail      search · thread · space · settings
 *   drive     find · pdf
 *   sheet     formula · chart
 *   doc       table · proof · listen
 *   player    ask · transcript · live
 *   meet      notes · ask
 *   phone     camera · live
 */
(function () {
  'use strict';

  var W = 320, H = 200;

  /* ------------------------------------------------------------ primitives */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function svg(inner, label) {
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(label) + '">' + inner + '</svg>';
  }
  function rect(x, y, w, h, cls, r) {
    return '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 4 : r) + '"/>';
  }
  /* a window: paper panel with a hairline header */
  function win(x, y, w, h, title) {
    return rect(x, y, w, h, 'sk-win', 6) +
      '<path class="sk-rule" d="M' + x + ' ' + (y + 22) + 'h' + w + '"/>' +
      (title ? text(x + 10, y + 15, title, 'sk-t sk-t--head') : '');
  }
  function text(x, y, s, cls, anchor) {
    return '<text class="' + (cls || 'sk-t') + '" x="' + x + '" y="' + y + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + esc(s) + '</text>';
  }
  /* greeked text: rounded bars standing for lines of prose */
  var PAT = [1, 0.93, 0.98, 0.88, 0.95, 0.62];
  function greek(x, y, w, n, opts) {
    opts = opts || {};
    var gap = opts.gap || 9, out = '';
    for (var i = 0; i < n; i++) {
      var f = (i === n - 1 && n > 1) ? 0.55 : PAT[i % PAT.length];
      out += '<line class="' + (opts.cls || 'sk-greek') + '" x1="' + x + '" y1="' + (y + i * gap) + '" x2="' + (x + w * f) + '" y2="' + (y + i * gap) + '"/>';
    }
    return out;
  }
  function chip(x, y, s, hot, cls) {
    var w = Math.round(s.length * 5.6 + 14);
    return rect(x, y, w, 16, (hot ? 'sk-hi' : 'sk-soft') + (cls ? ' ' + cls : ''), 8) + text(x + w / 2, y + 11, s, 'sk-t sk-t--chip' + (hot ? ' sk-on-hi' : ''), 'middle');
  }
  function chipW(s) { return Math.round(s.length * 5.6 + 14); }
  function btn(x, y, s, primary) {
    var w = Math.round(s.length * 6 + 18);
    return rect(x, y, w, 18, primary ? 'sk-ink' : 'sk-soft', 9) + text(x + w / 2, y + 12, s, primary ? 'sk-t sk-t--onink' : 'sk-t sk-t--chip', 'middle');
  }
  /* a four-point sparkle, the generic sign for "the AI bit" */
  function spark(x, y, r) {
    r = r || 5;
    return '<path class="sk-spark" d="M' + x + ' ' + (y - r) + 'Q' + x + ' ' + y + ' ' + (x + r) + ' ' + y + 'Q' + x + ' ' + y + ' ' + x + ' ' + (y + r) + 'Q' + x + ' ' + y + ' ' + (x - r) + ' ' + y + 'Q' + x + ' ' + y + ' ' + x + ' ' + (y - r) + 'z"/>';
  }
  function cursor(x, y, h) { return '<rect class="sk-acc" x="' + x + '" y="' + y + '" width="2" height="' + (h || 10) + '"/>'; }
  function docIcon(x, y, w, h, hot) {
    return rect(x, y, w, h, hot ? 'sk-hi' : 'sk-card', 2) + '<path class="sk-rule" d="M' + (x + w - 6) + ' ' + y + 'v6h6"/>' + greek(x + 4, y + 11, w - 8, Math.max(1, Math.floor((h - 12) / 5)), { gap: 5, cls: 'sk-greek sk-greek--thin' });
  }
  function fileChip(x, y, name, kind) {
    var w = chipW(name) + 14;
    return rect(x, y, w, 18, 'sk-card', 4) +
      (kind === 'link' ? '<path class="sk-stroke" d="M' + (x + 7) + ' ' + (y + 11) + 'a3 3 0 0 1 0-4l2-2a3 3 0 0 1 4 4M' + (x + 15) + ' ' + (y + 7) + 'a3 3 0 0 1 0 4l-2 2a3 3 0 0 1-4-4"/>' :
        kind === 'image' ? rect(x + 5, y + 4, 10, 10, 'sk-blue', 1) + '<path class="sk-stroke-paper" d="M' + (x + 6) + ' ' + (y + 12) + 'l3-3 2 2 2-3 2 4"/>' :
        '<path class="sk-acc" d="M' + (x + 5) + ' ' + (y + 4) + 'h6l3 3v7h-9z"/>') +
      text(x + 20, y + 12, name, 'sk-t sk-t--chip');
  }
  function bubbleUser(x, y, w, s, extra) {
    var lines = wrap(s, Math.floor(w / 5.4)), h = 10 + lines.length * 12 + (extra ? 24 : 0);
    var out = rect(x, y, w, h, 'sk-bubble', 8);
    lines.forEach(function (l, i) { out += text(x + 9, y + 15 + i * 12, l, 'sk-t sk-t--body'); });
    if (extra) out += extra(x + 8, y + 12 + lines.length * 12);
    return { svg: out, h: h };
  }
  function wrap(s, n) {
    var words = String(s).split(' '), lines = [], cur = '';
    words.forEach(function (w) { if ((cur + ' ' + w).trim().length > n) { lines.push(cur.trim()); cur = w; } else cur += ' ' + w; });
    if (cur.trim()) lines.push(cur.trim());
    if (lines.length > 2) { lines = lines.slice(0, 2); lines[1] = lines[1].replace(/\s*\S*$/, '') + '…'; }
    return lines;
  }
  function short(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1).replace(/\s*\S*$/, '') + '…' : s; }
  function answer(x, y, w, n, opts) {
    return spark(x + 5, y + 2) + greek(x + 16, y + 2, w - 16, n, opts);
  }
  function wave(x, y, w, n, amp, cls) {
    var out = '', step = w / n;
    for (var i = 0; i < n; i++) {
      var h = amp * (0.25 + Math.abs(Math.sin(i * 1.3 + 0.4)) * 0.75);
      out += '<line class="' + (cls || 'sk-wave') + '" x1="' + (x + i * step) + '" y1="' + (y - h) + '" x2="' + (x + i * step) + '" y2="' + (y + h) + '"/>';
    }
    return out;
  }
  function play(x, y, r, cls) {
    return '<circle class="' + (cls || 'sk-ink') + '" cx="' + x + '" cy="' + y + '" r="' + r + '"/><path class="sk-paper" d="M' + (x - r * 0.28) + ' ' + (y - r * 0.42) + 'l' + (r * 0.78) + ' ' + (r * 0.42) + 'l-' + (r * 0.78) + ' ' + (r * 0.42) + 'z"/>';
  }
  function grid(x, y, cols, rows, cw, rh) {
    var out = rect(x, y, cols * cw, rows * rh, 'sk-win', 2) + rect(x, y, cols * cw, rh, 'sk-soft', 0);
    for (var c = 1; c < cols; c++) out += '<path class="sk-rule" d="M' + (x + c * cw) + ' ' + y + 'v' + (rows * rh) + '"/>';
    for (var r = 1; r < rows; r++) out += '<path class="sk-rule" d="M' + x + ' ' + (y + r * rh) + 'h' + (cols * cw) + '"/>';
    return out;
  }
  function person(cx, cy, r) {
    return '<circle class="sk-soft-fill" cx="' + cx + '" cy="' + (cy - r * 0.35) + '" r="' + (r * 0.42) + '"/><path class="sk-soft-fill" d="M' + (cx - r) + ' ' + (cy + r) + 'a' + r + ' ' + r + ' 0 0 1 ' + (2 * r) + ' 0z"/>';
  }

  var F = {};
  var CAP = {};

  /* ---------------------------------------------------------------- search */
  CAP['search/overview'] = 'A Google search with the AI Overview at the top of the results';
  CAP['search/aimode'] = 'AI Mode: one question, answered from many searches at once';
  CAP['search/trace'] = 'Following a figure back through the reports that repeat it to the document it came from';
  F.search = function (v, e) {
    var q = short(e.prompt, 44);
    if (v === 'overview') {
      /* Drawn from a real results page: search bar, tab row, the overview
         with a source chip and key facts, a column of source cards, the
         "Show more" pill, then the ordinary results underneath. */
      var o = rect(8, 4, 304, 192, 'sk-win', 6) + rect(16, 10, 196, 22, 'sk-card', 11) + text(26, 24, q, 'sk-t sk-t--body') +
        '<path class="sk-stroke" d="M178 18l5 5M183 18l-5 5"/>' + rect(191, 16, 4, 7, 'sk-soft-fill', 2) + '<circle class="sk-stroke" cx="204" cy="21" r="3"/>';
      /* tabs */
      var tabs = ['AI Mode', 'All', 'Images', 'News', 'Videos'], tx = 16;
      tabs.forEach(function (t, i) { o += text(tx, 46, t, 'sk-t sk-t--chip' + (i === 1 ? ' sk-t--ink' : '')); if (i === 1) o += '<path class="sk-stroke" d="M' + tx + ' 50h' + (t.length * 5) + '"/>'; tx += t.length * 5.2 + 12; });
      o += '<path class="sk-rule" d="M16 52h288"/>';
      /* overview label, highlighted as the thing to notice */
      o += rect(16, 58, 72, 14, 'sk-hi', 7) + spark(26, 65, 4) + text(34, 68, 'AI Overview', 'sk-t sk-t--chip sk-on-hi');
      /* paragraph: a bold term, then prose, then a source chip */
      o += '<line class="sk-greek sk-greek--ink" x1="16" y1="82" x2="60" y2="82"/>' + '<line class="sk-greek" x1="66" y1="82" x2="190" y2="82"/>' + greek(16, 91, 174, 2, { gap: 9 }) + rect(96, 102, 94, 12, 'sk-card', 6) + '<circle class="sk-acc" cx="104" cy="108" r="2.5"/>' + text(110, 111.5, 'Institute for Gov +2', 'sk-t sk-t--chip');
      /* key facts */
      o += text(16, 126, 'Key facts', 'sk-t sk-t--head');
      [0, 1].forEach(function (i) { var y = 136 + i * 9; o += '<circle class="sk-ink" cx="19" cy="' + y + '" r="1.5"/><line class="sk-greek sk-greek--ink" x1="25" y1="' + y + '" x2="58" y2="' + y + '"/><line class="sk-greek" x1="64" y1="' + y + '" x2="' + (190 - i * 30) + '" y2="' + y + '"/>'; });
      /* show more pill */
      o += rect(16, 152, 174, 14, 'sk-card', 7) + text(103, 162, 'Show more ⌄', 'sk-t sk-t--chip', 'middle');
      /* ordinary results below */
      o += '<path class="sk-rule" d="M16 174h174"/>' + '<circle class="sk-soft-fill" cx="21" cy="183" r="4"/>' + '<line class="sk-greek sk-greek--thin" x1="29" y1="182" x2="90" y2="182"/>' + '<line class="sk-greek sk-greek--blue" x1="16" y1="191" x2="140" y2="191"/>';
      /* source cards on the right */
      o += rect(222, 58, 82, 114, 'sk-card', 5);
      [0, 1].forEach(function (i) { var y = 66 + i * 38; o += '<circle class="sk-soft-fill" cx="231" cy="' + (y + 3) + '" r="3"/>' + '<line class="sk-greek sk-greek--thin" x1="237" y1="' + (y + 3) + '" x2="270" y2="' + (y + 3) + '"/>' + greek(227, y + 13, 46, 2, { gap: 7, cls: 'sk-greek sk-greek--thin' }) + rect(280, y, 18, 22, 'sk-soft', 2) + (i === 0 ? '<path class="sk-rule" d="M227 ' + (y + 30) + 'h72"/>' : ''); });
      o += rect(228, 148, 70, 14, 'sk-soft', 7) + text(263, 158, 'Show all', 'sk-t sk-t--chip', 'middle');
      return svg(o, CAP[v]);
    }
    var out = rect(16, 16, 288, 26, 'sk-win', 13) + '<circle class="sk-stroke" cx="31" cy="29" r="5"/><path class="sk-stroke" d="M35 33l3 3"/>' + text(44, 33, q, 'sk-t sk-t--body');
    if (v === 'aimode') {
      /* Drawn from a real AI Mode page: the tab row with AI Mode chosen,
         the question as a bubble on the right, a prose answer with a
         source chip, a table, and the "Ask anything" box at the foot. */
      var a = rect(8, 4, 304, 192, 'sk-win', 6);
      var tabs2 = ['AI Mode', 'All', 'Images', 'Videos', 'News'], tx2 = 16;
      tabs2.forEach(function (t, i) { a += text(tx2, 20, t, 'sk-t sk-t--chip' + (i === 0 ? ' sk-t--ink' : '')); if (i === 0) a += '<path class="sk-stroke" d="M' + tx2 + ' 24h' + (t.length * 5) + '"/>'; tx2 += t.length * 5.2 + 12; });
      a += '<path class="sk-rule" d="M16 27h288"/>';
      var qlines = wrap(short(e.prompt, 70), 36);
      a += rect(112, 34, 192, 7 + qlines.length * 11, 'sk-soft', 8);
      qlines.forEach(function (l, i) { a += text(120, 46 + i * 11, l, 'sk-t sk-t--body'); });
      var ay = 46 + qlines.length * 11 + 10;
      a += '<line class="sk-greek" x1="16" y1="' + ay + '" x2="70" y2="' + ay + '"/><line class="sk-greek sk-greek--ink" x1="76" y1="' + ay + '" x2="230" y2="' + ay + '"/><line class="sk-greek" x1="236" y1="' + ay + '" x2="304" y2="' + ay + '"/>' + greek(16, ay + 9, 288, 2, { gap: 9 });
      a += rect(186, ay + 21, 118, 12, 'sk-card', 6) + '<circle class="sk-acc" cx="194" cy="' + (ay + 27) + '" r="2.5"/>' + text(200, ay + 30.5, 'House of Commons +4', 'sk-t sk-t--chip');
      var ty = ay + 44;
      a += text(16, ty, 'Council', 'sk-t sk-t--cap') + text(104, ty, 'Year', 'sk-t sk-t--cap') + text(140, ty, 'Reasons given', 'sk-t sk-t--cap') + '<path class="sk-rule" d="M16 ' + (ty + 4) + 'h288"/>';
      [['2018', 0], ['2020', 1]].forEach(function (r, i) {
        var y = ty + 14 + i * 17;
        a += '<line class="sk-greek sk-greek--blue" x1="16" y1="' + y + '" x2="' + (70 + (i % 2) * 14) + '" y2="' + y + '"/>' + text(104, y + 3, r[0], 'sk-t sk-t--chip') + greek(140, y, 164, 2, { gap: 7, cls: 'sk-greek sk-greek--thin' }) + '<path class="sk-rule" d="M16 ' + (y + 11) + 'h288"/>';
      });
      a += rect(16, 172, 288, 20, 'sk-card', 10) + '<circle class="sk-stroke" cx="30" cy="182" r="5"/><path class="sk-stroke" d="M30 179.5v5M27.5 182h5"/>' + text(42, 185, 'Ask anything', 'sk-t sk-t--chip') + rect(290, 177, 4, 7, 'sk-soft-fill', 2) + '<path class="sk-stroke" d="M288 183a4 4 0 0 0 8 0"/>';
      return svg(a, CAP[v]);
    }
    /* trace */
    out += rect(236, 62, 68, 30, 'sk-hi', 15) + text(270, 81, '10,000', 'sk-t sk-t--big sk-on-hi', 'middle');
    out += docIcon(160, 56, 44, 44) + docIcon(160, 112, 44, 44) + docIcon(86, 84, 44, 44) + docIcon(16, 76, 44, 60, true);
    out += '<path class="sk-arrow" d="M234 74L208 72M234 84L208 128M158 78L134 100M158 134L134 110M84 106L64 106"/>';
    out += text(38, 150, 'the original', 'sk-t sk-t--cap', 'middle');
    return svg(out, CAP[v]);
  };

  /* ------------------------------------------------------------------ chat */
  CAP['chat/plain'] = 'The Gemini app: your question, then the answer';
  CAP['chat/file'] = 'The Gemini app with a PDF attached to the question';
  CAP['chat/link'] = 'The Gemini app with a video link pasted into the question';
  CAP['chat/image'] = 'The Gemini app with a screenshot attached, answering with a table';
  CAP['chat/model'] = 'The model picker at the top of the Gemini app, with Thinking chosen';
  CAP['chat/research'] = 'Deep Research reading its sources while you do something else';
  CAP['chat/browser'] = 'Gemini in Chrome: a side panel that can read the open tabs';
  CAP['chat/translate'] = 'A translation shown beside the original';
  CAP['chat/notes'] = 'Your notes pasted in, and the questions they leave open';
  CAP['chat/schedule'] = 'A scheduled action: the same prompt, run every weekday morning';
  CAP['chat/canvas'] = 'Canvas: a sentence on the left, a small working app on the right';
  F.chat = function (v, e) {
    var q = e.prompt || '';
    if (v === 'browser') {
      var out = rect(16, 12, 288, 176, 'sk-win', 6) + rect(16, 12, 288, 20, 'sk-soft', 6) +
        rect(24, 16, 44, 12, 'sk-win', 3) + rect(72, 16, 44, 12, 'sk-hi', 3) + rect(120, 16, 44, 12, 'sk-win', 3) +
        greek(28, 48, 150, 11, { gap: 11 }) +
        rect(192, 40, 104, 140, 'sk-card', 4) + spark(204, 52) + text(212, 56, 'Ask Gemini', 'sk-t sk-t--head') +
        greek(202, 72, 84, 7, { gap: 10 }) + '<path class="sk-dash" d="M94 28Q150 20 192 60M142 28Q172 24 192 60"/>';
      return svg(out, CAP['chat/browser']);
    }
    if (v === 'canvas') {
      var o2 = win(16, 12, 288, 176, 'Gemini') + rect(16, 34, 110, 154, 'sk-paper', 0) + '<path class="sk-rule" d="M126 34v154"/>';
      var b = bubbleUser(24, 44, 94, q); o2 += b.svg + answer(24, 56 + b.h, 94, 3);
      o2 += rect(140, 46, 150, 128, 'sk-card', 6) + rect(140, 46, 150, 16, 'sk-soft', 6) + text(215, 104, '37', 'sk-t sk-t--huge', 'middle') + text(215, 122, 'working days', 'sk-t sk-t--cap', 'middle') + rect(185, 140, 60, 16, 'sk-ink', 8);
      return svg(o2, CAP['chat/canvas']);
    }
    var head = 'Gemini';
    var out3 = win(16, 12, 288, 176, head);
    if (v === 'model') {
      out3 += rect(196, 16, 98, 16, 'sk-hi', 8) + text(245, 27, 'Thinking ▾', 'sk-t sk-t--chip', 'middle');
    }
    var extra = null;
    if (v === 'file') extra = function (x, y) { return fileChip(x, y, 'budget-2026.pdf', 'file'); };
    if (v === 'link') extra = function (x, y) { return fileChip(x, y, 'youtu.be/x7k…', 'link'); };
    if (v === 'image') extra = function (x, y) { return fileChip(x, y, 'table.png', 'image'); };
    if (v === 'notes') extra = function (x, y) { return fileChip(x, y, 'my notes', 'file'); };
    var bw = 190;
    var bub = bubbleUser(304 - 8 - bw, 44, bw, q, extra);
    out3 += bub.svg;
    var ay = 44 + bub.h + 12;
    if (v === 'model') {
      out3 += rect(24, ay, 272, 178 - ay, 'sk-hi-soft', 6) + spark(36, ay + 14) + text(46, ay + 18, 'Working', 'sk-t sk-t--head') + greek(36, ay + 32, 200, 3, { gap: 10 }) + '<path class="sk-rule" d="M36 ' + (ay + 60) + 'h240"/>' + greek(36, ay + 72, 240, 2, { gap: 10, cls: 'sk-greek sk-greek--ink' });
    } else if (v === 'research') {
      out3 += spark(36, ay + 6) + text(46, ay + 10, 'Reading 24 sources', 'sk-t sk-t--head') + rect(36, ay + 20, 240, 5, 'sk-soft', 3) + rect(36, ay + 20, 150, 5, 'sk-acc', 3);
      for (var i = 0; i < 3; i++) out3 += docIcon(36 + i * 56, ay + 36, 48, 36);
      out3 += chip(220, ay + 44, '10 min', true);
    } else if (v === 'image') {
      out3 += spark(36, ay + 6) + grid(48, ay, 4, 4, 56, 14);
    } else if (v === 'translate') {
      out3 += spark(36, ay + 6) + text(48, ay + 10, 'Français', 'sk-t sk-t--cap') + greek(48, ay + 24, 110, 5, { gap: 9 }) + text(174, ay + 10, 'English', 'sk-t sk-t--cap') + greek(174, ay + 24, 110, 5, { gap: 9 }) + rect(48, ay + 38, 80, 6, 'sk-hi', 2) + rect(174, ay + 38, 80, 6, 'sk-hi', 2);
    } else if (v === 'notes') {
      out3 += spark(36, ay + 6) + text(48, ay + 10, 'Not answered yet', 'sk-t sk-t--head');
      for (var k = 0; k < 3; k++) out3 += '<circle class="sk-acc" cx="52" cy="' + (ay + 28 + k * 13) + '" r="2.5"/>' + greek(62, ay + 28 + k * 13, 200 - k * 30, 1);
    } else if (v === 'schedule') {
      out3 += rect(24, ay, 272, 60, 'sk-card', 6) + '<circle class="sk-stroke" cx="42" cy="' + (ay + 18) + '" r="8"/><path class="sk-stroke" d="M42 ' + (ay + 13) + 'v5l3 2"/>' + text(56, ay + 15, 'Every weekday, 8am', 'sk-t sk-t--head') + text(56, ay + 27, 'Next run: tomorrow', 'sk-t sk-t--cap') + greek(36, ay + 42, 240, 1) + greek(36, ay + 52, 180, 1);
    } else {
      out3 += answer(36, ay + 2, 240, Math.min(5, Math.floor((176 - ay) / 10)), { gap: 10 });
    }
    return svg(out3, CAP['chat/' + v] || CAP['chat/plain']);
  };

  /* -------------------------------------------------------------- notebook */
  CAP['notebook/sources'] = 'Gemini Notebook: the sources you added on the left, the chat in the middle';
  CAP['notebook/answer'] = 'A Notebook answer with its numbered citations';
  CAP['notebook/audio'] = 'The Studio panel, with an Audio Overview playing';
  CAP['notebook/mindmap'] = 'A mind map of the report, drawn from its sources';
  CAP['notebook/cards'] = 'Flashcards made only from the sources in the notebook';
  CAP['notebook/video'] = 'A video added as a source beside the documents';
  CAP['notebook/timeline'] = 'A dated timeline built from the cuttings';
  CAP['notebook/questions'] = 'Interview questions, each with a citation back to a source';
  CAP['notebook/beat'] = 'A standing notebook, fed week by week';
  F.notebook = function (v, e) {
    var out = win(16, 12, 288, 176) + text(26, 27, 'Sources', 'sk-t sk-t--head') + text(118, 27, 'Chat', 'sk-t sk-t--head') + text(238, 27, 'Studio', 'sk-t sk-t--head') +
      '<path class="sk-rule" d="M108 34v154M228 34v154"/>';
    /* sources */
    var srcN = v === 'beat' ? 6 : 3, hot = v === 'sources' || v === 'beat' || v === 'video';
    for (var i = 0; i < srcN; i++) {
      var sy = 44 + i * (v === 'beat' ? 22 : 30);
      if (v === 'video' && i === 2) out += rect(24, sy, 76, 22, 'sk-hi', 3) + play(36, sy + 11, 7) + greek(48, sy + 11, 44, 1, { cls: 'sk-greek sk-greek--thin' });
      else if (v === 'beat') out += rect(24, sy, 76, 16, i >= 4 ? 'sk-hi' : 'sk-card', 3) + text(30, sy + 11, ['Jan minutes', 'Feb agenda', 'Mar minutes', 'Apr release', 'May minutes', 'Jun agenda'][i], 'sk-t sk-t--chip' + (i >= 4 ? ' sk-on-hi' : ''));
      else out += rect(24, sy, 76, 22, hot && i === srcN - 1 ? 'sk-hi' : 'sk-card', 3) + '<path class="sk-acc" d="M31 ' + (sy + 6) + 'h6l3 3v7h-9z"/>' + greek(46, sy + 11, 46, 1, { cls: 'sk-greek sk-greek--thin' });
    }
    if (v === 'sources') out += btn(24, 150, '+ Add source', true);
    /* chat column */
    var q = short(e.prompt, 46);
    if (v === 'mindmap') {
      out += rect(140, 96, 56, 16, 'sk-ink', 8) + text(168, 107, 'The report', 'sk-t sk-t--onink', 'middle');
      [[120, 56], [216, 56], [120, 150], [216, 150], [124, 104], [212, 104]].forEach(function (p) { out += '<path class="sk-dash" d="M168 104Q' + p[0] + ' 104 ' + p[0] + ' ' + p[1] + '"/>' + rect(p[0] - 10, p[1] - 7, 24, 14, 'sk-card', 7); });
    } else if (v === 'cards') {
      out += '<g transform="rotate(-4 168 100)">' + rect(128, 70, 80, 56, 'sk-hi', 6) + text(168, 94, 'Voted against', 'sk-t sk-t--body sk-on-hi', 'middle') + text(168, 108, 'in 2023?', 'sk-t sk-t--body sk-on-hi', 'middle') + '</g>' + rect(136, 134, 64, 4, 'sk-soft', 2) + text(168, 158, 'tap to flip', 'sk-t sk-t--cap', 'middle');
    } else if (v === 'timeline') {
      out += '<path class="sk-stroke" d="M120 110h96"/>';
      [124, 146, 168, 190, 212].forEach(function (x, i) { out += '<circle class="' + (i === 2 ? 'sk-acc' : 'sk-ink') + '" cx="' + x + '" cy="110" r="4"/>' + text(x, i % 2 ? 128 : 98, ['Jan', 'Mar', 'Jun', 'Sep', 'Oct'][i], 'sk-t sk-t--cap', 'middle') + rect(x - 7, i % 2 ? 134 : 78, 14, 10, 'sk-hi', 5); });
    } else if (v === 'audio') {
      out += wave(126, 100, 84, 16, 22) + play(168, 140, 12) + text(168, 166, '12 min', 'sk-t sk-t--cap', 'middle');
    } else if (v === 'questions') {
      out += text(118, 48, 'Questions', 'sk-t sk-t--head');
      for (var k = 0; k < 4; k++) out += text(118, 68 + k * 22, (k + 1) + '.', 'sk-t sk-t--cap') + greek(130, 66 + k * 22, 60, 1) + rect(196, 60 + k * 22, 14, 10, 'sk-hi', 5);
    } else {
      var bq = bubbleUser(116, 44, 104, q); out += bq.svg;
      var ay = 52 + bq.h;
      out += answer(116, ay, 104, 4, { gap: 10 });
      var cy = ay + 46;
      [1, 2, 3].forEach(function (n, i) { out += rect(128 + i * 24, cy, 18, 14, v === 'answer' ? 'sk-hi' : 'sk-soft', 7) + text(137 + i * 24, cy + 10, String(n), 'sk-t sk-t--chip', 'middle'); });
      if (v === 'answer') out += '<path class="sk-dash" d="M137 ' + (cy + 14) + 'Q100 ' + (cy + 40) + ' 62 100"/>' + rect(24, 104, 76, 22, 'sk-hi', 3).replace('sk-hi', 'sk-hi-soft');
    }
    /* studio */
    ['Audio', 'Mind map', 'Table', 'Cards'].forEach(function (s, i) {
      var hotS = (v === 'audio' && i === 0) || (v === 'mindmap' && i === 1) || (v === 'cards' && i === 3);
      out += rect(236, 44 + i * 26, 60, 18, hotS ? 'sk-hi' : 'sk-card', 9) + text(266, 56 + i * 26, s, 'sk-t sk-t--chip' + (hotS ? ' sk-on-hi' : ''), 'middle');
    });
    return svg(out, CAP['notebook/' + v]);
  };

  /* ------------------------------------------------------------------ mail */
  CAP['mail/search'] = 'A question typed into the Gmail search box, with one email found';
  CAP['mail/thread'] = 'A long thread, summarised in the Gemini side panel';
  CAP['mail/space'] = 'A busy Chat space, summarised since Monday';
  CAP['mail/settings'] = 'Standing instructions, set once in the side panel';
  F.mail = function (v, e) {
    var out = win(16, 12, 288, 176) + '<path class="sk-rule" d="M60 34v154"/>';
    for (var i = 0; i < 5; i++) out += rect(24, 44 + i * 16, 28, 6, i === 0 ? 'sk-ink' : 'sk-soft', 3);
    if (v === 'search') {
      out += rect(68, 40, 228, 22, 'sk-card', 11) + '<circle class="sk-stroke" cx="80" cy="51" r="4"/>' + text(90, 55, short(e.prompt, 40), 'sk-t sk-t--body');
      out += rect(68, 72, 228, 24, 'sk-hi', 3) + text(76, 82, 'Press office', 'sk-t sk-t--head sk-on-hi') + text(76, 92, 'Embargoed: ONS figures, 09:30 Thursday', 'sk-t sk-t--cap sk-on-hi');
      for (var j = 0; j < 4; j++) out += rect(68, 102 + j * 20, 228, 1, 'sk-rule-fill', 0) + greek(76, 112 + j * 20, 60, 1) + greek(146, 112 + j * 20, 140, 1, { cls: 'sk-greek sk-greek--thin' });
      return svg(out, CAP[v]);
    }
    if (v === 'settings') {
      out += greek(76, 50, 100, 8, { gap: 14, cls: 'sk-greek sk-greek--thin' });
      out += rect(190, 36, 106, 146, 'sk-card', 4) + spark(202, 48) + text(210, 52, 'Settings', 'sk-t sk-t--head') + text(198, 70, 'Personalisation', 'sk-t sk-t--cap') + rect(198, 76, 90, 54, 'sk-hi-soft', 3) + text(204, 90, 'Always use', 'sk-t sk-t--chip') + text(204, 102, 'British English', 'sk-t sk-t--chip') + text(204, 114, 'and Guardian', 'sk-t sk-t--chip') + text(204, 126, 'style.', 'sk-t sk-t--chip') + btn(198, 140, 'Save', true);
      return svg(out, CAP[v]);
    }
    if (v === 'space') {
      for (var k = 0; k < 7; k++) out += rect(68 + (k % 2) * 16, 40 + k * 18, 92, 12, 'sk-soft', 6);
      out += '<path class="sk-arrow" d="M172 100L186 100"/>' + rect(190, 36, 106, 146, 'sk-card', 4) + spark(202, 48) + text(210, 52, 'Since Monday', 'sk-t sk-t--head');
      for (var m = 0; m < 3; m++) out += '<circle class="sk-acc" cx="204" cy="' + (72 + m * 24) + '" r="2.5"/>' + greek(212, 72 + m * 24, 76, 2, { gap: 8, cls: 'sk-greek sk-greek--thin' });
      return svg(out, CAP[v]);
    }
    /* thread */
    for (var t = 0; t < 8; t++) out += rect(68, 40 + t * 17, 112, 11, 'sk-soft', 2) + greek(74, 45.5 + t * 17, 60, 1, { cls: 'sk-greek sk-greek--thin' });
    out += text(124, 184, '40 emails', 'sk-t sk-t--cap', 'middle');
    out += rect(190, 36, 106, 146, 'sk-card', 4) + spark(202, 48) + text(210, 52, 'Summary', 'sk-t sk-t--head');
    for (var s = 0; s < 3; s++) out += '<circle class="sk-acc" cx="204" cy="' + (72 + s * 26) + '" r="2.5"/>' + greek(212, 72 + s * 26, 76, 2, { gap: 8, cls: 'sk-greek sk-greek--thin' });
    return svg(out, CAP[v]);
  };

  /* ----------------------------------------------------------------- drive */
  CAP['drive/find'] = 'Drive, asked for a file by description, with the match highlighted';
  CAP['drive/pdf'] = 'A PDF open in Drive, with the Audio Overview button and the Gemini panel';
  F.drive = function (v, e) {
    var out = win(16, 12, 288, 176);
    if (v === 'find') {
      out += rect(24, 32, 272, 20, 'sk-card', 10) + spark(36, 42, 4) + text(46, 46, short(e.prompt, 44), 'sk-t sk-t--body');
      for (var i = 0; i < 8; i++) { var x = 24 + (i % 4) * 69, y = 62 + Math.floor(i / 4) * 60; out += docIcon(x, y, 60, 50, i === 5); }
      return svg(out, CAP[v]);
    }
    out += rect(16, 12, 288, 22, 'sk-soft', 6) + text(26, 27, 'report.pdf', 'sk-t sk-t--head') + rect(176, 16, 92, 15, 'sk-hi', 7) + play(186, 23.5, 5) + text(196, 27, 'Audio Overview', 'sk-t sk-t--chip sk-on-hi');
    out += rect(40, 46, 120, 130, 'sk-paper-card', 2) + greek(50, 60, 100, 11, { gap: 10, cls: 'sk-greek sk-greek--thin' });
    out += rect(190, 44, 106, 134, 'sk-card', 4) + spark(202, 56) + text(210, 60, 'Summary', 'sk-t sk-t--head') + greek(200, 78, 86, 6, { gap: 10, cls: 'sk-greek sk-greek--thin' });
    return svg(out, CAP[v]);
  };

  /* ----------------------------------------------------------------- sheet */
  CAP['sheet/formula'] = 'A plain English request in the Sheets side panel, and the formula it produces';
  CAP['sheet/chart'] = 'A question to a spreadsheet, answered with a chart';
  F.sheet = function (v, e) {
    var out = win(16, 12, 288, 176) + grid(24, 40, 4, 8, 40, 16);
    for (var r = 1; r < 8; r++) for (var c = 0; c < 4; c++) out += greek(29 + c * 40, 48 + r * 16, 28 * (0.6 + ((r * c) % 3) * 0.15), 1, { cls: 'sk-greek sk-greek--thin' });
    out += rect(190, 36, 106, 146, 'sk-card', 4) + spark(202, 48);
    if (v === 'formula') {
      out += text(210, 52, 'Gemini', 'sk-t sk-t--head') + rect(198, 62, 90, 40, 'sk-bubble', 6);
      wrap(short(e.prompt, 60), 18).forEach(function (l, i) { out += text(204, 76 + i * 12, l, 'sk-t sk-t--chip'); });
      out += rect(198, 112, 90, 20, 'sk-hi', 3) + text(243, 125, '=COUNTIF(C:C,…)', 'sk-t sk-t--mono sk-on-hi', 'middle') + greek(198, 146, 80, 2, { gap: 9, cls: 'sk-greek sk-greek--thin' });
    } else {
      out += text(210, 52, 'Gemini', 'sk-t sk-t--head');
      [34, 50, 42, 66, 28].forEach(function (h, i) { out += rect(202 + i * 17, 150 - h, 11, h, i === 3 ? 'sk-acc' : 'sk-blue', 1); });
      out += '<path class="sk-stroke" d="M198 150h92"/>' + text(243, 168, 'biggest rise', 'sk-t sk-t--cap', 'middle');
    }
    return svg(out, CAP[v]);
  };

  /* ------------------------------------------------------------------- doc */
  CAP['doc/table'] = 'Meeting notes in a Doc, turned into a table by the side panel';
  CAP['doc/proof'] = 'Proofreading suggestions, one card per change';
  CAP['doc/listen'] = 'A draft read aloud, with the highlight following the voice';
  F.doc = function (v, e) {
    var out = win(16, 12, 288, 176) + rect(36, 40, 130, 140, 'sk-paper-card', 2);
    if (v === 'table') {
      out += greek(46, 52, 110, 3, { gap: 9, cls: 'sk-greek sk-greek--thin' }) + grid(46, 86, 3, 5, 36, 14);
      out += rect(190, 36, 106, 146, 'sk-card', 4) + spark(202, 48) + text(210, 52, 'Gemini', 'sk-t sk-t--head') + rect(198, 62, 90, 44, 'sk-bubble', 6);
      wrap(short(e.prompt, 56), 18).forEach(function (l, i) { out += text(204, 76 + i * 12, l, 'sk-t sk-t--chip'); });
      out += btn(198, 118, 'Insert', true);
    } else if (v === 'proof') {
      out += greek(46, 54, 110, 11, { gap: 11, cls: 'sk-greek sk-greek--thin' }) + '<path class="sk-acc-dots" d="M62 58h36M46 91h28M80 124h40"/>';
      [0, 1, 2].forEach(function (i) { out += rect(190, 44 + i * 44, 106, 36, 'sk-card', 4) + text(198, 58 + i * 44, 'Suggestion', 'sk-t sk-t--cap') + greek(198, 70 + i * 44, 86, 1, { cls: 'sk-greek sk-greek--thin' }); });
    } else {
      out += greek(46, 54, 110, 11, { gap: 11, cls: 'sk-greek sk-greek--thin' }) + rect(44, 83, 80, 8, 'sk-hi', 2);
      out += rect(190, 44, 106, 40, 'sk-card', 4) + play(208, 64, 10) + rect(224, 62, 64, 4, 'sk-soft', 2) + rect(224, 62, 28, 4, 'sk-acc', 2) + text(243, 118, 'Listen', 'sk-t sk-t--head', 'middle');
    }
    return svg(out, CAP['doc/' + v]);
  };

  /* ---------------------------------------------------------------- player */
  CAP['player/ask'] = 'A video on YouTube, with the Ask button below the player';
  CAP['player/transcript'] = 'A recording uploaded to the Guardian transcription tool, and the transcript it returns';
  CAP['player/live'] = 'A briefing playing in one tab, with a live transcript scrolling beside it';
  F.player = function (v, e) {
    if (v === 'ask') {
      var out = rect(16, 16, 288, 118, 'sk-screen', 6) + play(160, 75, 18, 'sk-paper-fill') +
        rect(16, 128, 288, 4, 'sk-soft', 0) + rect(16, 128, 110, 4, 'sk-acc', 0) +
        rect(16, 148, 48, 18, 'sk-soft', 9) + text(40, 160, 'Share', 'sk-t sk-t--chip', 'middle') +
        rect(70, 148, 40, 18, 'sk-hi', 9) + text(90, 160, 'Ask', 'sk-t sk-t--chip sk-on-hi', 'middle') +
        rect(116, 148, 70, 18, 'sk-soft', 9) + text(151, 160, 'Download', 'sk-t sk-t--chip', 'middle') +
        '<path class="sk-arrow" d="M90 186L90 170"/>';
      return svg(out, CAP[v]);
    }
    if (v === 'transcript') {
      var o2 = rect(16, 16, 128, 168, 'sk-card', 6) + wave(30, 90, 100, 18, 28) + rect(52, 140, 56, 18, 'sk-ink', 9) + text(80, 152, 'Upload', 'sk-t sk-t--onink', 'middle') +
        '<path class="sk-arrow" d="M150 100L164 100"/>' + rect(172, 16, 132, 168, 'sk-win', 6) + text(182, 32, 'Transcript', 'sk-t sk-t--head') +
        greek(182, 50, 112, 12, { gap: 11, cls: 'sk-greek sk-greek--thin' }) + rect(180, 94, 90, 8, 'sk-hi', 2);
      return svg(o2, CAP[v]);
    }
    var o3 = rect(16, 12, 288, 176, 'sk-win', 6) + rect(16, 12, 288, 20, 'sk-soft', 6) + rect(24, 16, 60, 12, 'sk-win', 3) + rect(88, 16, 44, 12, 'sk-win', 3) +
      rect(26, 42, 150, 96, 'sk-screen', 4) + play(101, 90, 14, 'sk-paper-fill') + rect(26, 146, 150, 4, 'sk-soft', 0) + rect(26, 146, 90, 4, 'sk-acc', 0) +
      rect(186, 42, 110, 136, 'sk-card', 4) + text(194, 56, 'Live transcript', 'sk-t sk-t--head') + greek(194, 72, 92, 9, { gap: 11, cls: 'sk-greek sk-greek--thin' }) + cursor(258, 160, 9);
    return svg(o3, CAP[v]);
  };

  /* ------------------------------------------------------------------ meet */
  CAP['meet/notes'] = 'A Meet call with Gemini taking notes in the side panel';
  CAP['meet/ask'] = 'Joining late: a private question to Gemini, bottom left of the call';
  F.meet = function (v, e) {
    var out = rect(16, 12, 288, 176, 'sk-screen', 6);
    for (var i = 0; i < 4; i++) { var x = 26 + (i % 2) * 78, y = 24 + Math.floor(i / 2) * 64; out += rect(x, y, 72, 58, 'sk-tile', 4) + person(x + 36, y + 30, 14); }
    if (v === 'notes') {
      out += rect(186, 22, 108, 156, 'sk-card', 4) + '<path class="sk-stroke" d="M196 40l8-8 4 4-8 8h-4z"/>' + text(210, 38, 'Taking notes', 'sk-t sk-t--head') + greek(196, 56, 88, 9, { gap: 11, cls: 'sk-greek sk-greek--thin' }) + cursor(250, 150, 9);
    } else {
      out += rect(186, 22, 108, 60, 'sk-tile', 4) + person(240, 52, 14);
      out += rect(26, 152, 150, 26, 'sk-card', 13) + spark(40, 165, 4) + text(50, 169, short(e.prompt, 24), 'sk-t sk-t--chip');
      out += rect(186, 96, 108, 50, 'sk-hi-soft', 6) + text(194, 110, 'Only you see this', 'sk-t sk-t--cap') + greek(194, 124, 90, 2, { gap: 10, cls: 'sk-greek sk-greek--thin' });
    }
    return svg(out, CAP['meet/' + v]);
  };

  /* ----------------------------------------------------------------- phone */
  CAP['phone/camera'] = 'The Gemini app on a phone, pointed at a printed page';
  CAP['phone/live'] = 'Gemini Live on a phone: you talk, it talks back';
  F.phone = function (v, e) {
    var out = rect(112, 8, 96, 184, 'sk-win', 14) + rect(146, 14, 28, 4, 'sk-soft', 2);
    if (v === 'camera') {
      out += rect(120, 26, 80, 120, 'sk-screen', 4) + rect(134, 40, 52, 92, 'sk-paper-card', 1) + greek(140, 50, 40, 8, { gap: 9, cls: 'sk-greek sk-greek--thin' }) +
        '<path class="sk-acc-line" d="M126 32h10M126 32v10M194 32h-10M194 32v10M126 140h10M126 140v-10M194 140h-10M194 140v-10"/>' +
        '<circle class="sk-stroke" cx="160" cy="166" r="11"/><circle class="sk-ink" cx="160" cy="166" r="7"/>';
      out += '<path class="sk-arrow" d="M212 60L240 60"/>' + greek(246, 50, 60, 6, { gap: 9, cls: 'sk-greek sk-greek--thin' }) + text(276, 112, 'text', 'sk-t sk-t--cap', 'middle');
    } else {
      out += wave(126, 90, 70, 12, 26) + rect(140, 130, 40, 16, 'sk-hi', 8) + text(160, 141, 'Live', 'sk-t sk-t--chip sk-on-hi', 'middle') + '<circle class="sk-acc" cx="160" cy="168" r="9"/>';
      out += '<path class="sk-dash" d="M212 90q20-30 40 0t40 0"/><path class="sk-dash" d="M28 90q20-30 40 0t40 0"/>';
    }
    return svg(out, CAP['phone/' + v]);
  };

  /* ------------------------------------------------------------- interface */
  window.SKETCHES = {
    draw: function (key, entry) {
      var parts = String(key || '').split('/');
      var frame = F[parts[0]];
      if (!frame) return null;
      return frame(parts[1] || '', entry || {});
    },
    caption: function (key) { return CAP[key] || ''; },
    has: function (key) { return !!F[String(key || '').split('/')[0]]; },
    keys: Object.keys(CAP)
  };
})();
