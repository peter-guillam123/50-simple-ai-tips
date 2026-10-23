/* sketches.js: small static drawings, one per key.
 *
 * Each is a function returning an SVG string on a 320 by 180 canvas.
 * They are simplified frames of the tools (a search page, a notebook,
 * a player, a grid), never screenshots and never Google's logos. The
 * colours come from the page's CSS variables, so they follow dark mode.
 *
 * Entries point at one with `sketch: 'key'` in js/entries.js.
 */
(function () {
  'use strict';

  var W = 320, H = 180;
  function svg(inner, label) {
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + (label || '') + '">' + inner + '</svg>';
  }
  /* primitives */
  function frame(x, y, w, h, r) { return '<rect class="frame" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 6 : r) + '"/>'; }
  function soft(x, y, w, h, r) { return '<rect class="soft" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 3 : r) + '"/>'; }
  function hi(x, y, w, h, r) { return '<rect class="hi-soft" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 3 : r) + '"/>'; }
  function acc(x, y, w, h, r) { return '<rect class="acc" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 3 : r) + '"/>'; }
  function line(x1, y1, x2, y2, cls) { return '<line class="' + (cls || 'line') + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"/>'; }
  /* text lines standing for prose: n lines from (x,y), width w, step s */
  function lines(x, y, w, n, s, cls) {
    var out = '';
    for (var i = 0; i < n; i++) {
      var ww = i === n - 1 ? w * .6 : w * (0.85 + ((i * 37) % 15) / 100);
      out += line(x, y + i * (s || 10), x + ww, y + i * (s || 10), cls);
    }
    return out;
  }
  function t(x, y, s, cls, anchor) { return '<text x="' + x + '" y="' + y + '"' + (cls ? ' class="' + cls + '"' : '') + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + s + '</text>'; }
  function arrow(x1, y1, x2, y2) {
    var a = Math.atan2(y2 - y1, x2 - x1), L = 7;
    return '<path class="arrow" d="M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2 +
      'M' + (x2 - L * Math.cos(a - .5)) + ' ' + (y2 - L * Math.sin(a - .5)) + 'L' + x2 + ' ' + y2 + 'L' + (x2 - L * Math.cos(a + .5)) + ' ' + (y2 - L * Math.sin(a + .5)) + '"/>';
  }
  function doc(x, y, w, h) {
    return frame(x, y, w, h, 3) + '<path class="soft" d="M' + (x + w - 14) + ' ' + y + 'v14h14z"/>' + lines(x + 8, y + 22, w - 16, Math.floor((h - 30) / 9), 9);
  }
  function searchbar(x, y, w, text) {
    return '<rect class="frame" x="' + x + '" y="' + y + '" width="' + w + '" height="26" rx="13"/>' +
      '<circle cx="' + (x + 15) + '" cy="' + (y + 13) + '" r="5" class="acc-stroke" fill="none"/>' +
      t(x + 28, y + 17, text, 'ser');
  }
  function chip(x, y, w, s, cls) { return '<rect class="' + (cls || 'soft') + '" x="' + x + '" y="' + y + '" width="' + w + '" height="18" rx="9"/>' + t(x + w / 2, y + 12, s, null, 'middle'); }
  function play(x, y, r) { return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" class="ink"/><path d="M' + (x - r * .3) + ' ' + (y - r * .45) + 'l' + (r * .8) + ' ' + (r * .45) + 'l-' + (r * .8) + ' ' + (r * .45) + 'z" fill="var(--paper)"/>'; }
  function bubble(x, y, w, h, left) {
    var r = 8;
    return '<path class="soft" d="M' + (x + r) + ' ' + y + 'h' + (w - 2 * r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + 'v' + (h - 2 * r) + 'a' + r + ' ' + r + ' 0 0 1 -' + r + ' ' + r + 'h-' + (w - 2 * r) + 'a' + r + ' ' + r + ' 0 0 1 -' + r + ' -' + r + 'v-' + (h - 2 * r) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' -' + r + 'z"/>' +
      (left ? '<path class="soft" d="M' + x + ' ' + (y + h - 6) + 'l-6 6 6 0z"/>' : '') + lines(x + 8, y + 10, w - 16, Math.max(1, Math.floor((h - 10) / 9)), 9);
  }
  function headphones(x, y, s) {
    return '<path class="acc-stroke" d="M' + (x - s) + ' ' + (y + s * .4) + 'a' + s + ' ' + s + ' 0 0 1 ' + (2 * s) + ' 0" stroke-width="3"/>' +
      '<rect class="ink" x="' + (x - s - 4) + '" y="' + (y + s * .3) + '" width="10" height="16" rx="3"/>' +
      '<rect class="ink" x="' + (x + s - 6) + '" y="' + (y + s * .3) + '" width="10" height="16" rx="3"/>';
  }
  function wave(x, y, w, n, amp) {
    var out = '', step = w / n;
    for (var i = 0; i < n; i++) {
      var h = amp * (0.3 + Math.abs(Math.sin(i * 1.7)) * .7);
      out += '<line class="line line--ink" x1="' + (x + i * step) + '" y1="' + (y - h) + '" x2="' + (x + i * step) + '" y2="' + (y + h) + '"/>';
    }
    return out;
  }
  function grid(x, y, cols, rows, cw, rh, head) {
    var out = frame(x, y, cols * cw, rows * rh, 2);
    for (var c = 1; c < cols; c++) out += line(x + c * cw, y, x + c * cw, y + rows * rh, 'line');
    for (var r = 1; r < rows; r++) out += line(x, y + r * rh, x + cols * cw, y + r * rh, 'line');
    if (head) out = out.replace(frame(x, y, cols * cw, rows * rh, 2), frame(x, y, cols * cw, rows * rh, 2) + soft(x, y, cols * cw, rh, 0));
    return out;
  }
  function phone(x, y, w, h) { return '<rect class="frame" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="10"/>' + '<rect class="soft" x="' + (x + w / 2 - 10) + '" y="' + (y + 6) + '" width="20" height="4" rx="2"/>'; }
  function calendar(x, y, w, h, n) {
    var out = frame(x, y, w, h, 3) + soft(x, y, w, 14, 0);
    var cw = w / n;
    for (var i = 1; i < n; i++) out += line(x + i * cw, y + 14, x + i * cw, y + h);
    return out;
  }
  function person(x, y) { return '<circle cx="' + x + '" cy="' + (y - 20) + '" r="6" class="ink"/><path class="line line--ink" d="M' + x + ' ' + (y - 14) + 'v18M' + (x - 8) + ' ' + (y - 4) + 'h16M' + x + ' ' + (y + 4) + 'l-7 12M' + x + ' ' + (y + 4) + 'l7 12"/>'; }

  var S = {};

  S['stopwatch'] = function () {
    return svg(
      searchbar(20, 30, 200, 'What is a section 114 notice?') +
      hi(20, 66, 200, 60, 4) + lines(30, 80, 180, 4, 10) + t(30, 118, 'AI Overview', 'mono') +
      '<circle cx="268" cy="100" r="34" class="frame"/><rect class="ink" x="262" y="56" width="12" height="8" rx="2"/>' +
      '<path class="acc-stroke" d="M268 100V78" stroke-width="3"/><path class="acc-stroke" d="M268 100l14 10"/>' +
      t(268, 150, '2 seconds', 'mono', 'middle') +
      '<rect class="hi" x="20" y="136" width="200" height="4" rx="2"/>' +
      lines(20, 150, 200, 2, 10),
      'A search box with an AI overview at the top of the results, beside a stopwatch reading two seconds');
  };

  S['fanout'] = function () {
    var cards = '';
    for (var i = 0; i < 6; i++) {
      var cx = 190 + (i % 2) * 64, cy = 22 + Math.floor(i / 2) * 50;
      cards += frame(cx, cy, 56, 40, 3) + lines(cx + 6, cy + 10, 44, 3, 9);
      cards += arrow(150, 90, cx - 4, cy + 20);
    }
    return svg(
      frame(20, 68, 130, 44, 22) + t(85, 95, 'One question', 'ser', 'middle') + cards +
      t(160, 170, 'many searches at once', 'mono', 'middle'),
      'One question fanning out into six result cards');
  };

  S['chat-file'] = function () {
    return svg(
      frame(30, 14, 260, 152, 8) +
      bubble(44, 28, 150, 36, true) +
      '<rect class="frame" x="44" y="72" width="104" height="22" rx="11"/>' + '<path class="acc" d="M52 77h8l4 4v8h-12z"/>' + t(68, 91, 'budget-2026.pdf', 'mono') +
      bubble(126, 104, 150, 48, false) +
      t(160, 164, 'a thread, with a file attached', 'mono', 'middle'),
      'A chat thread with a PDF file chip attached');
  };

  S['box'] = function () {
    return svg(
      '<path class="soft" d="M60 70l100-24 100 24-100 24z"/>' +
      '<path class="frame" d="M60 70v70l100 24V94z"/><path class="frame" d="M260 70v70l-100 24V94z"/>' +
      doc(120, 24, 34, 44) + doc(142, 18, 34, 44) + doc(164, 26, 34, 44) +
      '<rect class="hi" x="110" y="104" width="100" height="26" rx="4"/>' + t(160, 121, 'the answer', 'ser', 'middle') +
      t(160, 168, 'only what you put in the box', 'mono', 'middle'),
      'A closed box of documents with the answer inside it');
  };

  S['side-by-side'] = function () {
    return svg(
      frame(20, 20, 130, 140, 6) + frame(170, 20, 130, 140, 6) +
      chip(30, 28, 54, 'Flash', 'soft') + chip(180, 28, 70, 'Thinking', 'hi') +
      lines(30, 60, 110, 3, 10) + lines(180, 60, 110, 7, 10) +
      t(30, 148, '2s', 'mono') + t(180, 148, '14s, shows the sum', 'mono'),
      'The same question answered twice, side by side: a short quick answer and a longer worked one');
  };

  S['inbox-card'] = function () {
    return svg(
      searchbar(30, 20, 260, 'When did the press office last send embargoed figures?') +
      frame(30, 60, 260, 100, 4) +
      hi(38, 68, 244, 28, 3) + t(46, 86, 'Embargoed: ONS figures, 09:30 Thursday', 'ser') +
      lines(38, 108, 244, 2, 10) + lines(38, 134, 244, 2, 10),
      'A question typed into the email search box, with one email surfacing above the rest');
  };

  S['drive-grid'] = function () {
    var out = '';
    for (var i = 0; i < 8; i++) {
      var x = 30 + (i % 4) * 66, y = 46 + Math.floor(i / 4) * 60;
      out += (i === 5 ? hi(x - 4, y - 4, 60, 56, 4) : '') + doc(x, y, 52, 48);
    }
    return svg(searchbar(30, 12, 260, 'Find the election-night planning doc') + out, 'A grid of files, one glowing');
  };

  S['collapse'] = function () {
    var chain = '';
    for (var i = 0; i < 9; i++) chain += soft(30, 16 + i * 16, 110, 12, 2);
    return svg(
      chain + arrow(150, 88, 184, 88) +
      frame(190, 54, 110, 70, 4) + '<circle cx="204" cy="72" r="3" class="acc"/>' + line(212, 72, 290, 72) +
      '<circle cx="204" cy="90" r="3" class="acc"/>' + line(212, 90, 282, 90) + '<circle cx="204" cy="108" r="3" class="acc"/>' + line(212, 108, 270, 108) +
      t(85, 170, '40 emails', 'mono', 'middle') + t(245, 170, 'three lines', 'mono', 'middle'),
      'A long email chain collapsing into three bullet points');
  };

  S['chat-stack'] = function () {
    var out = '';
    for (var i = 0; i < 7; i++) out += bubble(30 + (i % 2) * 20, 10 + i * 22, 90, 16, i % 2 === 0);
    return svg(out + arrow(160, 90, 190, 90) + hi(196, 60, 104, 60, 4) + lines(206, 76, 84, 4, 10) + t(248, 150, 'decided since Monday', 'mono', 'middle'),
      'A tall stack of chat bubbles shrinking to one summary card');
  };

  S['browser-tabs'] = function () {
    return svg(
      frame(20, 20, 280, 140, 6) + soft(20, 20, 280, 22, 6) +
      soft(28, 24, 50, 14, 3) + hi(82, 24, 50, 14, 3) + soft(136, 24, 50, 14, 3) +
      lines(32, 60, 150, 8, 10) +
      frame(196, 50, 96, 100, 4) + '<circle cx="208" cy="62" r="4" class="acc"/>' + t(216, 65, 'Ask Gemini', 'mono') + lines(204, 80, 80, 5, 10) +
      '<path class="dash" d="M132 31Q190 20 244 50M82 31Q150 10 244 50"/>',
      'A browser with three tabs and a side panel linked to them');
  };

  S['trace'] = function () {
    return svg(
      frame(230, 70, 70, 40, 20) + t(265, 95, '10,000', 'ser', 'middle') +
      frame(150, 30, 56, 40, 3) + frame(150, 110, 56, 40, 3) + frame(80, 70, 56, 40, 3) + doc(14, 60, 46, 60) +
      arrow(228, 86, 208, 56) + arrow(228, 96, 208, 126) + arrow(148, 52, 138, 82) + arrow(148, 128, 138, 98) + arrow(78, 90, 62, 90) +
      t(37, 140, 'the original', 'mono', 'middle'),
      'A number with arrows running back through articles to one original document');
  };

  S['report-fan'] = function () {
    var fan = '';
    for (var i = 0; i < 5; i++) fan += '<g transform="rotate(' + (-30 + i * 15) + ' 230 150)">' + doc(214, 60, 32, 42) + '</g>';
    return svg(doc(30, 20, 110, 140) + fan + '<circle cx="90" cy="150" r="0"/>' +
      '<circle cx="268" cy="40" r="18" class="frame"/><path class="acc-stroke" d="M268 40V28M268 40l8 6"/>' + t(268, 74, '10 min', 'mono', 'middle'),
      'A report with a fan of source cards behind it, and a timer');
  };

  S['shrink'] = function () {
    return svg(doc(30, 14, 110, 150) + t(85, 174, '300 pages', 'mono', 'middle') + arrow(150, 90, 184, 90) +
      frame(190, 60, 110, 56, 4) + lines(200, 76, 90, 3, 10) + chip(200, 96, 22, '1', 'hi') + chip(226, 96, 22, '2', 'hi'),
      'A fat report shrinking to a three-line answer with two citation chips');
  };

  S['pdf-headphones'] = function () {
    return svg(doc(40, 30, 90, 120) + '<path class="acc" d="M62 86h20l6 6v8h-26z"/>' + t(72, 125, 'PDF', 'mono', 'middle') + arrow(140, 90, 180, 90) +
      headphones(240, 70, 34) + wave(205, 140, 70, 14, 10) + t(240, 168, '4 min', 'mono', 'middle'),
      'A PDF icon turning into headphones');
  };

  S['timeline'] = function () {
    var out = line(30, 100, 290, 100, 'line line--ink');
    [40, 95, 150, 205, 260].forEach(function (x, i) {
      out += '<circle cx="' + x + '" cy="100" r="6" class="' + (i === 2 ? 'acc' : 'ink') + '"/>' + t(x, i % 2 ? 128 : 80, ['Jan', 'Mar', 'Jun', 'Sep', 'Oct'][i], 'mono', 'middle') + chip(x - 14, i % 2 ? 136 : 50, 28, [1, 2, 2, 3, 4][i], 'hi');
    });
    return svg(out, 'A horizontal timeline with dated dots and source tags');
  };

  S['mindmap'] = function () {
    var out = '<rect class="ink" x="120" y="78" width="80" height="24" rx="12"/>' + '<text x="160" y="94" class="mono" text-anchor="middle" style="fill:var(--paper)">The report</text>';
    [[40, 30], [40, 90], [40, 150], [280, 30], [280, 90], [280, 150]].forEach(function (p, i) {
      out += '<path class="line" d="M' + (p[0] < 160 ? 120 : 200) + ' 90Q' + (p[0] < 160 ? 90 : 230) + ' ' + p[1] + ' ' + p[0] + ' ' + p[1] + '"/>' + soft(p[0] - 30, p[1] - 9, 60, 18, 9);
      if (i === 1) out += '<path class="line" d="M10 90Q0 70 -10 70"/>';
    });
    return svg(out, 'A mind map branching out from the report in the middle');
  };

  S['headphones'] = function () {
    return svg(headphones(90, 60, 40) + wave(150, 90, 130, 22, 24) + chip(226, 130, 60, '12 min', 'hi') + t(90, 150, 'two voices', 'mono', 'middle'),
      'Headphones, a waveform and a twelve-minute badge');
  };

  S['dossier'] = function () {
    return svg(doc(24, 30, 50, 64) + doc(40, 40, 50, 64) + doc(56, 50, 50, 64) + arrow(118, 90, 150, 90) +
      frame(160, 24, 140, 136, 4) + t(170, 42, 'Questions', 'ser') +
      [0, 1, 2, 3].map(function (i) { return t(170, 66 + i * 24, (i + 1) + '.', 'mono') + line(184, 62 + i * 24, 270, 62 + i * 24) + chip(272, 54 + i * 24, 22, [3, 1, 5, 2][i], 'hi'); }).join(''),
      'A dossier of sources feeding a numbered list of questions, each with a citation');
  };

  S['flipcard'] = function () {
    return svg('<g transform="skewY(-6)">' + frame(40, 60, 110, 70, 6) + t(95, 100, 'Voted against,', 'ser', 'middle') + t(95, 114, '2023?', 'ser', 'middle') + '</g>' +
      arrow(160, 90, 184, 90) + '<g transform="skewY(6)">' + hi(190, 40, 110, 70, 6) + t(245, 72, 'Yes. Hansard,', 'ser', 'middle') + t(245, 86, '14 March, p 12', 'mono', 'middle') + '</g>',
      'A flashcard flipping from a question to its answer and page reference');
  };

  S['calendar-notebook'] = function () {
    var out = calendar(20, 30, 280, 110, 7);
    for (var i = 0; i < 7; i++) if (i !== 3 && i !== 6) out += doc(26 + i * 40, 60 + (i % 2) * 14, 28, 36);
    return svg(out + t(160, 164, 'add the week’s papers as they arrive', 'mono', 'middle'), 'A notebook growing across a calendar strip');
  };

  S['player-ask'] = function () {
    return svg(frame(30, 14, 260, 110, 6) + '<rect class="ink" x="30" y="14" width="260" height="110" rx="6" opacity=".9"/>' + play(160, 69, 18) +
      soft(30, 134, 48, 20, 10) + t(54, 147, 'Share', null, 'middle') + hi(84, 134, 44, 20, 10) + t(106, 147, 'Ask', null, 'middle') + soft(134, 134, 70, 20, 10) + t(169, 147, 'Download', null, 'middle') +
      '<circle cx="106" cy="134" r="0"/>' + '<circle cx="106" cy="166" r="3" class="acc"/>' + t(106, 177, 'here', 'mono', 'middle'),
      'A video player with the Ask button highlighted below it');
  };

  S['link-drop'] = function () {
    return svg(frame(30, 110, 260, 44, 22) + t(50, 137, 'Summarise this video and…', 'ser') +
      frame(90, 20, 140, 34, 17) + t(160, 42, 'youtu.be/x7k…', 'mono', 'middle') + arrow(160, 60, 160, 104),
      'A video link being dropped into the prompt box');
  };

  S['thumb-drop'] = function () {
    return svg(frame(20, 20, 110, 140, 6) + t(30, 38, 'Sources', 'ser') + doc(30, 50, 90, 26) + doc(30, 84, 90, 26) + hi(30, 118, 90, 30, 3) + play(50, 133, 8) + t(64, 137, 'hearing.mp4', 'mono') +
      frame(190, 40, 100, 60, 4) + '<rect class="ink" x="190" y="40" width="100" height="60" rx="4" opacity=".9"/>' + play(240, 70, 12) + arrow(188, 90, 130, 128),
      'A video thumbnail dropping into the source list of a notebook');
  };

  S['waveform-text'] = function () {
    return svg(wave(30, 60, 120, 20, 28) + arrow(160, 60, 190, 60) + lines(200, 40, 100, 5, 10, 'line line--ink') +
      '<rect class="hi" x="200" y="56" width="70" height="8" rx="2"/>' + t(160, 150, 'searchable text, with the quote found', 'mono', 'middle'),
      'A waveform turning into lines of text, with one line highlighted');
  };

  S['browser-scroll'] = function () {
    return svg(frame(20, 20, 280, 140, 6) + soft(20, 20, 280, 22, 6) + '<rect class="ink" x="30" y="50" width="150" height="100" rx="4" opacity=".9"/>' + play(105, 100, 14) +
      frame(190, 50, 100, 100, 4) + lines(198, 66, 84, 7, 11) + '<rect class="hi" x="198" y="120" width="60" height="6" rx="2"/>' + t(240, 165, 'scrolling as they speak', 'mono', 'middle'),
      'A browser tab playing a briefing with a transcript scrolling beside it');
  };

  S['notepad-video'] = function () {
    var out = '';
    for (var i = 0; i < 4; i++) out += frame(20 + (i % 2) * 66, 30 + Math.floor(i / 2) * 60, 60, 52, 4) + person(50 + (i % 2) * 66, 70 + Math.floor(i / 2) * 60);
    return svg(out + frame(170, 30, 120, 112, 4) + soft(170, 30, 120, 16, 4) + t(180, 42, 'Notes', 'mono') + lines(180, 62, 100, 6, 11) + '<rect class="acc" x="258" y="112" width="3" height="12"/>',
      'A notepad writing itself beside four video tiles');
  };

  S['clock-bubble'] = function () {
    return svg('<circle cx="90" cy="90" r="46" class="frame"/><path class="acc-stroke" d="M90 90V58M90 90l20 12" stroke-width="3"/>' +
      bubble(160, 56, 130, 70, true) + t(170, 118, 'only you see this', 'mono'),
      'A clock and a private summary bubble');
  };

  S['sentence-formula'] = function () {
    return svg(frame(20, 40, 280, 36, 18) + t(34, 63, 'Count how many rows in column C mention flooding', 'ser') +
      arrow(160, 84, 160, 108) + frame(60, 114, 200, 34, 4) + t(160, 136, '=COUNTIF(C:C, "*flooding*")', 'mono', 'middle'),
      'A plain English sentence turning into a formula');
  };

  S['grid-chart'] = function () {
    var out = grid(20, 30, 4, 7, 42, 16, true);
    [48, 70, 62, 90, 54].forEach(function (h, i) { out += '<rect class="' + (i === 3 ? 'acc' : 'blue') + '" x="' + (206 + i * 18) + '" y="' + (150 - h) + '" width="12" height="' + h + '"/>'; });
    return svg(out + line(200, 150, 300, 150, 'line line--ink') + t(250, 168, 'biggest rise', 'mono', 'middle'), 'A spreadsheet grid with a bar chart beside it');
  };

  S['table-before-after'] = function () {
    return svg(doc(20, 20, 120, 140) + '<rect class="soft" x="34" y="60" width="92" height="60" rx="2"/>' + lines(40, 72, 80, 4, 12, 'line line--ink') +
      '<path class="acc" d="M118 50h10l4 4v10h-14z"/>' + arrow(150, 90, 184, 90) + grid(190, 50, 3, 5, 36, 18, true),
      'A locked PDF table becoming a spreadsheet grid');
  };

  S['phone-paper'] = function () {
    return svg(phone(40, 20, 80, 140) + lines(52, 50, 56, 7, 12) + doc(190, 50, 100, 110) +
      '<path class="dash" d="M126 60L188 56M126 150L188 150"/>' + t(160, 174, 'paper to text', 'mono', 'middle'),
      'A phone photographing a page, with the text appearing on screen');
  };

  S['notes-table'] = function () {
    var scribble = '';
    for (var i = 0; i < 6; i++) scribble += '<path class="line line--ink" d="M30 ' + (40 + i * 18) + 'q20 -8 40 0t40 0t30 -4" transform="rotate(' + ((i % 2) * 2 - 1) + ' 80 ' + (40 + i * 18) + ')"/>';
    return svg(scribble + arrow(150, 90, 184, 90) + grid(190, 40, 4, 6, 27, 18, true), 'Scribbled notes becoming a neat table');
  };

  S['doc-underlines'] = function () {
    return svg(doc(40, 14, 150, 152) + '<path class="acc-stroke" d="M50 54h50M50 90h30M50 126h44" stroke-dasharray="2 3"/>' +
      frame(200, 40, 100, 44, 4) + t(208, 56, 'Suggestion', 'mono') + line(208, 70, 290, 70) +
      frame(200, 96, 100, 44, 4) + t(208, 112, 'Suggestion', 'mono') + line(208, 126, 290, 126),
      'A document with gentle underlines and suggestion cards');
  };

  S['doc-play'] = function () {
    return svg(doc(60, 14, 160, 152) + '<rect class="hi" x="68" y="68" width="110" height="10" rx="2"/>' + play(250, 90, 22), 'A document with a play button and a moving highlight');
  };

  S['jargon'] = function () {
    var pairs = [['gilt yields', 'the return on lending to the government'], ['basis points', 'hundredths of a per cent'], ['dovish', 'leaning towards lower rates']];
    var out = '';
    pairs.forEach(function (p, i) { out += chip(20, 30 + i * 46, 96, p[0], 'soft') + arrow(124, 39 + i * 46, 150, 39 + i * 46) + t(156, 43 + i * 46, p[1], null); });
    return svg(out, 'Jargon words resolving into plain ones');
  };

  S['two-columns'] = function () {
    return svg(frame(20, 20, 130, 140, 4) + t(30, 38, 'Français', 'ser') + lines(30, 56, 110, 8, 11) +
      frame(170, 20, 130, 140, 4) + t(180, 38, 'English', 'ser') + lines(180, 56, 110, 8, 11) + '<rect class="hi" x="180" y="96" width="90" height="8" rx="2"/>' + '<rect class="hi" x="30" y="96" width="90" height="8" rx="2"/>',
      'Two columns, French and English, with the matching passage highlighted in each');
  };

  S['notes-questions'] = function () {
    var out = doc(70, 14, 150, 152) + lines(82, 40, 120, 10, 11);
    [50, 95, 140].forEach(function (y) { out += '<rect class="acc" x="218" y="' + y + '" width="30" height="20" rx="3"/>' + '<text x="233" y="' + (y + 14) + '" text-anchor="middle" style="fill:#fff;font-family:var(--f-ui);font-weight:700;font-size:12px">?</text>'; });
    return svg(out, 'A page of notes with question mark tabs sticking out of the gaps');
  };

  S['walk'] = function () {
    return svg(person(80, 110) + headphones(80, 72, 14) + wave(140, 90, 150, 24, 18) + t(215, 140, 'ask me questions', 'mono', 'middle'), 'Someone walking with headphones, a speech wave beside them');
  };

  S['radiate'] = function () {
    var apps = ['Gmail', 'Docs', 'Sheets', 'Drive', 'Chat', 'Slides'];
    var out = hi(100, 66, 120, 48, 6) + t(160, 86, 'British English,', 'ser', 'middle') + t(160, 102, 'Guardian style', 'ser', 'middle');
    apps.forEach(function (a, i) {
      var x = 40 + i * 48, y = i % 2 ? 24 : 156;
      out += '<path class="dash" d="M160 90L' + x + ' ' + y + '"/>' + chip(x - 24, y - 9, 48, a, 'soft');
    });
    return svg(out, 'One instruction card radiating to six app icons');
  };

  S['envelope-calendar'] = function () {
    return svg(frame(30, 40, 90, 60, 4) + '<path class="line line--ink" d="M30 44l45 34 45-34"/>' + calendar(130, 36, 80, 68, 3) + arrow(160, 112, 200, 132) + arrow(100, 108, 180, 136) +
      hi(170, 128, 120, 40, 6) + t(230, 146, '8am', 'mono', 'middle') + t(230, 160, 'your morning', 'mono', 'middle'),
      'An envelope and a calendar merging into one morning card');
  };

  S['sentence-app'] = function () {
    return svg(frame(20, 30, 150, 36, 18) + t(30, 53, 'Build me a countdown…', 'ser') + arrow(176, 48, 200, 48) +
      frame(206, 20, 94, 100, 6) + soft(206, 20, 94, 14, 6) + t(253, 70, '37', 'ser', 'middle').replace('font-size:13px', '') + t(253, 90, 'working days', 'mono', 'middle') + soft(224, 100, 58, 12, 6),
      'A sentence becoming a small app window showing a countdown');
  };

  window.SKETCHES = S;
})();
