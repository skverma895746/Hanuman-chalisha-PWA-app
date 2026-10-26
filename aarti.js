/* ==========================================================================
   आरती थाल (Aarti Thali) - अलग मॉड्यूल
   - app.js ko chhua nahi gaya. Yeh file app.js ke BAAD load hoti hai aur
     window.hanumanApp me toggleAartiDock / toggleAartiDiya jodti hai.
   - Sab kuch Vanilla JS + inline SVG; koi bahari library nahi.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     INTEGRATION POINTS - yahan apni awaz-files ke path badlein
     (files abhi project me NAHI hain; jab tak nahi jodti, ye do button
      "फ़ाइल नहीं" dikhayenge aur kuch nahi bajayenge)
     ------------------------------------------------------------------------ */
  const SOUND_FILES = {
    conch: { src: 'assets/audio/shankh.mp3', loop: false, name: 'शंख' },
    dhol: { src: 'assets/audio/dhol-nagada.mp3', loop: true, name: 'ढोल-नगाड़ा' }
  };

  /* Ek parikrama (poora chakkar) ka samay, second me */
  const SPEEDS = [
    { label: 'बहुत धीमी', period: 9 },
    { label: 'धीमी', period: 6 },
    { label: 'सामान्य', period: 4 },
    { label: 'तेज', period: 2.6 },
    { label: 'बहुत तेज', period: 1.6 }
  ];

  const TAU = Math.PI * 2;
  /* Thali SVG (viewBox 260x260) me diye ka gol/andakar raasta */
  const CX = 130;
  const CY = 132;
  const RX = 50;
  const RY = 42;
  const TRAIL_N = 10;
  const MAX_PETALS = 30;

  const S = { running: false, bell: false, conch: false, dhol: false, petals: false, bright: false, speed: 2 };
  const missing = { conch: false, dhol: false };

  let overlay = null;
  let isOpen = false;
  let lastFocus = null;
  let minimized = false;

  // DOM refs (build() ke baad bharte hain)
  let openBtn, stageEl, viewEl, petalsEl, statusEl, noteEl, diyaEl, leanEl, trailGroup, trailEls = [];
  const btn = {};
  let speedBtns = [];

  // animation state
  let rafId = 0;
  let lastTs = 0;
  let theta = -Math.PI / 2; // shuruaat: raaste ke sabse upar
  let omega = 0; // abhi ki kon-gati (rad/s), smooth badalti hai
  let revAcc = 0;
  let lean = 0;
  let petalTimer = 0;
  let petalFadeTimer = 0;
  let petalH = 400;

  // audio state
  let ctx = null;
  let bellBus = null;
  let bellBuf = null;
  const activeBells = new Set();
  const media = {};
  let mainAudio = null;

  const reducedMotion = () =>
    !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  /* ======================================================================
     THALI SVG
     ====================================================================== */
  function diyaIcon(cls) {
    return (
      `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true" focusable="false">` +
      '<path class="aarti-open-flame" d="M16 2.5c3 4 4.6 6.6 4.6 9.2a4.6 4.6 0 0 1-9.2 0c0-2.600 1.600-5.200 4.600-9.200z" fill="#FFD54F"/>' +
      '<path d="M16 8c1.400 2 2 3.300 2 4.600a2 2 0 0 1-4 0c0-1.300.6-2.600 2-4.600z" fill="#FFF8E1"/>' +
      '<path d="M3 16h26c0 6-5.500 11-13 11S3 22 3 16z" fill="#FFB300" stroke="#7B3F00" stroke-width="1.500"/>' +
      '<ellipse cx="16" cy="16" rx="13" ry="2.600" fill="#8D4B00"/></svg>'
    );
  }

  function thaliSVG() {
    // सिर्फ़ पंखुड़ियाँ (फूल नहीं): थाली के किनारे पर 8 छोटी पत्तियाँ
    let flowers = '';
    const N = 8;
    const R = 90;
    const cols = ['#FF8F00', '#FFC107', '#E91E63', '#FFC107'];
    for (let i = 0; i < N; i++) {
      const a = (i / N) * TAU - Math.PI / 2;
      const x = (130 + R * Math.cos(a)).toFixed(1);
      const y = (130 + R * Math.sin(a)).toFixed(1);
      const rot = ((a * 180) / Math.PI + 90).toFixed(0);
      flowers += `<ellipse cx="${x}" cy="${y}" rx="4.2" ry="8" fill="${cols[i % 4]}" opacity=".9" transform="rotate(${rot} ${x} ${y})"/>`;
    }
    let trail = '';
    for (let i = 0; i < TRAIL_N; i++) {
      const r = (7 - (i * 5) / TRAIL_N).toFixed(1);
      const op = (0.5 * (1 - i / TRAIL_N) ** 1.4).toFixed(2);
      trail += `<circle class="at-trail" r="${r}" cx="130" cy="118" fill="url(#atTrail)" opacity="${op}"/>`;
    }

    return `
<svg class="at-svg" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="आरती की थाली में गोल घूमता दीपक">
  <defs>
    <radialGradient id="atShadow" cx="50%" cy="50%" r="50%">
      <stop offset="72%" stop-color="#000" stop-opacity=".5"/><stop offset="100%" stop-color="#000" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="atRim" cx="38%" cy="32%" r="80%">
      <stop offset="0%" stop-color="#FFE082"/><stop offset="55%" stop-color="#FFA000"/>
      <stop offset="88%" stop-color="#B06000"/><stop offset="100%" stop-color="#6A3400"/>
    </radialGradient>
    <radialGradient id="atPlate" cx="40%" cy="34%" r="78%">
      <stop offset="0%" stop-color="#FFF3C4"/><stop offset="42%" stop-color="#FFD76A"/>
      <stop offset="80%" stop-color="#F2A100"/><stop offset="100%" stop-color="#C77700"/>
    </radialGradient>
    <linearGradient id="atBrass" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE082"/><stop offset="55%" stop-color="#FFB300"/><stop offset="100%" stop-color="#8D4B00"/>
    </linearGradient>
    <radialGradient id="atHalo" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF59D" stop-opacity=".95"/><stop offset="45%" stop-color="#FFB300" stop-opacity=".5"/>
      <stop offset="100%" stop-color="#FF6F00" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="atFlame" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stop-color="#3F51B5"/><stop offset="14%" stop-color="#FF5722"/>
      <stop offset="55%" stop-color="#FF9800"/><stop offset="100%" stop-color="#FFEB3B"/>
    </linearGradient>
    <radialGradient id="atTrail" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF59D"/><stop offset="100%" stop-color="#FFB300" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="atWashG" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#FFF3C4" stop-opacity=".9"/><stop offset="100%" stop-color="#FFB300" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Thali (sthir): chhaya, kinara, plate, chamak -->
  <ellipse cx="130" cy="140" rx="126" ry="120" fill="url(#atShadow)"/>
  <circle cx="130" cy="130" r="122" fill="url(#atRim)"/>
  <circle cx="130" cy="130" r="116" fill="none" stroke="#FFF59D" stroke-width="2.4" stroke-dasharray="3 4" opacity=".85"/>
  <circle cx="130" cy="130" r="111" fill="none" stroke="#7B3F00" stroke-width="1.4"/>
  <circle cx="130" cy="130" r="106" fill="url(#atPlate)"/>
  <circle cx="130" cy="130" r="98" fill="none" stroke="#C77700" stroke-width="1" opacity=".55"/>
  <circle cx="130" cy="130" r="74" fill="none" stroke="#C77700" stroke-width="1" stroke-dasharray="3 5" opacity=".5"/>
  <circle cx="130" cy="130" r="60" fill="none" stroke="#FFF3C4" stroke-width="1" opacity=".35"/>
  <path d="M 44 96 A 90 90 0 0 1 118 41" fill="none" stroke="#FFFBE6" stroke-width="5" stroke-linecap="round" opacity=".5"/>
  <path d="M 52 112 A 80 80 0 0 1 70 80" fill="none" stroke="#FFFBE6" stroke-width="2.5" stroke-linecap="round" opacity=".45"/>
  <path d="M 214 168 A 90 90 0 0 1 160 218" fill="none" stroke="#8D4B00" stroke-width="4" stroke-linecap="round" opacity=".22"/>
  ${flowers}
  <text x="130" y="145" text-anchor="middle" font-size="40" font-weight="700" fill="#B35A00" opacity=".5" font-family="'Noto Sans Devanagari','Nirmala UI','Mangal',sans-serif">ॐ</text>
  <circle class="at-wash" cx="130" cy="130" r="104" fill="url(#atWashG)"/>

  <!-- Gatisheel: sunehri lakeer (trail) aur diya -->
  <g class="at-trail-group">${trail}</g>
  <g class="at-diya" transform="translate(130 90)">
    <ellipse cx="0" cy="12" rx="19" ry="5" fill="#3E1F00" opacity=".35"/>
    <path d="M -20 4 Q -17 17 0 18 Q 17 17 20 4 Z" fill="url(#atBrass)" stroke="#6D3600" stroke-width="1.2"/>
    <ellipse cx="0" cy="4" rx="20" ry="6" fill="#A85F00" stroke="#6D3600" stroke-width="1"/>
    <ellipse cx="0" cy="3.4" rx="16" ry="4" fill="#FFD27A"/>
    <circle class="at-halo-b" cx="0" cy="-14" r="48" fill="url(#atHalo)"/>
    <circle class="at-halo" cx="0" cy="-14" r="30" fill="url(#atHalo)"/>
    <g class="at-lean" transform="rotate(0 0 4)">
      <path class="at-flame" d="M 0 4 C -9 0 -12 -16 0 -32 C 12 -16 9 0 0 4 Z" fill="url(#atFlame)"/>
      <path class="at-flame-in" d="M 0 2 C -4 -1 -5 -11 0 -21 C 5 -11 4 -1 0 2 Z" fill="#FFFFFF" opacity=".95"/>
    </g>
  </g>
</svg>`;
  }

  /* ======================================================================
     OVERLAY BUILD (pehli baar kholne par hi, ek baar)
     ====================================================================== */
  function ctl(act, icon, label, extraClass) {
    return (
      `<button type="button" class="at-btn${extraClass ? ' ' + extraClass : ''}" data-act="${act}">` +
      `<span class="at-ico" aria-hidden="true">${icon}</span><span class="at-lbl">${label}</span>` +
      '<span class="at-chip" aria-hidden="true"></span></button>'
    );
  }

  function build() {
    if (overlay) return;
    let speedHtml = '';
    SPEEDS.forEach((sp, i) => {
      speedHtml += `<button type="button" class="at-speed-btn" data-act="speed" data-i="${i}" aria-pressed="false">${sp.label}</button>`;
    });

    overlay = document.createElement('div');
    overlay.className = 'at-overlay';
    overlay.id = 'aartiTemple';
    overlay.setAttribute('role', 'complementary'); // non-modal: peeche ka paath padha/scroll kiya ja sakta hai
    overlay.setAttribute('aria-labelledby', 'atTitle');
    overlay.innerHTML = `
      <div class="at-card">
        <div class="at-head">
          <h2 class="at-title" id="atTitle">${diyaIcon('')}<span>दीप आरती</span></h2>
          <button type="button" class="at-hbtn" id="atMin" aria-expanded="true" aria-label="छोटा करें" title="छोटा / बड़ा करें">&#9662;</button>
          <button type="button" class="at-hbtn" id="atClose" aria-label="आरती बंद करें (Esc)" title="बंद करें (Esc)">&times;</button>
        </div>
        <div class="at-body">
          <div class="at-view" id="atView">
            <div class="at-stage" id="atStage"></div>
          </div>
          <div class="at-controls" role="group" aria-label="आरती नियंत्रण">
            <p class="at-status" id="atStatus" role="status" aria-live="polite"></p>
            ${ctl('run', '🕉️', 'आरती शुरू करें', '')}
            ${ctl('bell', '🔔', 'घंटी', '')}
            ${ctl('conch', '🐚', 'शंख', '')}
            ${ctl('petals', '🌸', 'फूल वर्षा', '')}
            ${ctl('bright', '🔆', 'दीपक तेज', '')}
            ${ctl('dhol', '🥁', 'ढोल-नगाड़ा', '')}
            <div class="at-speed" role="group" aria-label="आरती स्पीड">
              <div class="at-speed-title"><span>⏱ आरती स्पीड</span><b id="atSpeedNow"></b></div>
              <div class="at-speed-grid">${speedHtml}</div>
            </div>
            ${ctl('audio', '🎵', 'पाठ ऑडियो', '')}
            <p class="at-note" id="atNote" role="status" aria-live="polite"></p>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    stageEl = overlay.querySelector('#atStage');
    viewEl = overlay.querySelector('#atView');
    // फूल वर्षा की परत: पूरी स्क्रीन पर (विजेट के पीछे), छूने में बाधा नहीं
    petalsEl = document.createElement('div');
    petalsEl.className = 'at-rain';
    petalsEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(petalsEl);
    statusEl = overlay.querySelector('#atStatus');
    noteEl = overlay.querySelector('#atNote');
    stageEl.innerHTML = thaliSVG();
    diyaEl = stageEl.querySelector('.at-diya');
    leanEl = stageEl.querySelector('.at-lean');
    trailGroup = stageEl.querySelector('.at-trail-group');
    trailEls = Array.prototype.slice.call(stageEl.querySelectorAll('.at-trail'));
    ['run', 'bell', 'conch', 'petals', 'bright', 'dhol', 'audio'].forEach((k) => {
      btn[k] = overlay.querySelector(`[data-act="${k}"]`);
    });
    speedBtns = Array.prototype.slice.call(overlay.querySelectorAll('.at-speed-btn'));

    // Delegation: control panel ke liye ek hi click listener, band karne ka alag
    overlay.querySelector('.at-controls').addEventListener('click', onControlClick);
    overlay.querySelector('#atClose').addEventListener('click', close);
    overlay.querySelector('#atMin').addEventListener('click', function () { setMin(!minimized); });
    // थाली पर टैप = आरती शुरू/रोकें (छोटे रूप में भी काम करता है)
    viewEl.addEventListener('click', function () { setRunning(!S.running); });
    viewEl.setAttribute('title', 'थाली छुएँ: आरती शुरू / रोकें');

    draw(0);
  }

  /* ======================================================================
     ANIMATION - ek hi rAF loop; diya ellipse par chalta hai, thali sthir
     ====================================================================== */
  function posAt(th) {
    return [CX + RX * Math.cos(th), CY + RY * Math.sin(th)];
  }

  function draw(dt) {
    const p = posAt(theta);
    diyaEl.setAttribute('transform', `translate(${p[0].toFixed(2)} ${p[1].toFixed(2)})`);

    // Lau gati ke vipreet jhukti hai; halka sa halka-pan bhi
    const vx = -RX * Math.sin(theta) * omega;
    const target = Math.max(-12, Math.min(12, -vx * 0.045));
    lean += (target - lean) * (dt > 0 ? 1 - Math.exp(-dt * 9) : 1);
    leanEl.setAttribute('transform', `rotate(${lean.toFixed(2)} 0 4)`);

    // Sunehri lakeer: gati ke hisaab se lambi/chhoti
    const showTrail = omega > 0.05 && !reducedMotion();
    trailGroup.style.display = showTrail ? '' : 'none';
    if (showTrail) {
      const step = Math.min(0.2, omega * 0.045);
      trailGroup.style.opacity = String(Math.min(1, omega / 0.6));
      for (let k = 0; k < trailEls.length; k++) {
        const q = posAt(theta - (k + 1) * step);
        trailEls[k].setAttribute('cx', q[0].toFixed(1));
        trailEls[k].setAttribute('cy', (q[1] - 14).toFixed(1));
      }
    }
  }

  function frame(ts) {
    rafId = 0;
    if (!lastTs) lastTs = ts;
    let dt = (ts - lastTs) / 1000;
    lastTs = ts;
    if (dt > 0.05) dt = 0.05; // tab wapas aane par chhalaang nahi
    if (dt < 0) dt = 0;

    const targetOmega = S.running ? TAU / SPEEDS[S.speed].period : 0;
    omega += (targetOmega - omega) * (1 - Math.exp(-dt * 5)); // naram shuruaat / rukaav
    if (!S.running && omega < 0.03) {
      omega = 0;
      draw(dt);
      lastTs = 0;
      return; // loop band - idle me CPU nahi
    }

    const dth = omega * (1 + 0.1 * Math.sin(2 * theta)) * dt; // halka sa jeevant utaar-chadhaav
    theta = (theta + dth) % TAU;
    revAcc += dth;
    if (revAcc >= TAU) {
      revAcc -= TAU;
      if (S.bell) ringBell(); // har parikrama par ek ghanti
    }
    draw(dt);
    rafId = requestAnimationFrame(frame);
  }

  function startLoop() {
    if (rafId || document.hidden) return;
    lastTs = 0;
    rafId = requestAnimationFrame(frame);
  }

  function stopLoop() {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    lastTs = 0;
  }

  function onVisibility() {
    if (document.hidden) {
      stopLoop();
    } else if (S.running || omega > 0) {
      startLoop();
    }
  }

  function setRunning(on) {
    if (on === S.running) return;
    S.running = on;
    if (on) {
      revAcc = 0;
      if (S.bell) ringBell();
      if (S.conch) playMedia('conch');
      startLoop();
    } else {
      startLoop(); // omega ko dheere dheere 0 tak laane ke liye
    }
    syncUI();
  }

  function setSpeed(i) {
    if (!(i >= 0 && i < SPEEDS.length)) return;
    S.speed = i;
    syncUI();
    if (S.running) startLoop();
  }

  /* ======================================================================
     AWAZ: ghanti (Web Audio me ek baar banaya buffer) + shankh/dhol (file)
     ====================================================================== */
  function ensureCtx() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try {
        ctx = new AC();
        bellBus = ctx.createGain();
        bellBus.connect(ctx.destination);
      } catch (e) {
        ctx = null;
        return null;
      }
    }
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  }

  function getBellBuffer() {
    if (bellBuf) return bellBuf;
    const sr = ctx.sampleRate;
    const n = Math.floor(sr * 2.6);
    const buf = ctx.createBuffer(1, n, sr);
    const d = buf.getChannelData(0);
    const f0 = 520;
    // [ratio, amp, decay-seconds] - mandir ghanti jaisi anuchit (inharmonic) tonein
    const parts = [[0.5, 0.4, 2.0], [1, 1, 1.6], [1.004, 0.6, 1.5], [2.01, 0.6, 1.2], [2.76, 0.45, 0.9], [4.07, 0.3, 0.6], [5.4, 0.2, 0.4]];
    let peak = 0;
    for (let i = 0; i < n; i++) {
      const t = i / sr;
      let v = 0;
      for (let k = 0; k < parts.length; k++) {
        v += parts[k][1] * Math.sin(TAU * f0 * parts[k][0] * t) * Math.exp(-t / parts[k][2]);
      }
      v *= Math.min(1, t / 0.004); // 4ms attack - click nahi
      d[i] = v;
      if (Math.abs(v) > peak) peak = Math.abs(v);
    }
    const norm = peak ? 0.55 / peak : 1;
    for (let i = 0; i < n; i++) d[i] *= norm;
    bellBuf = buf;
    return buf;
  }

  function ringBell() {
    if (!S.bell) return;
    const c = ensureCtx();
    if (!c) return;
    const src = c.createBufferSource();
    src.buffer = getBellBuffer();
    src.connect(bellBus);
    activeBells.add(src);
    src.onended = function () {
      activeBells.delete(src);
      try { src.disconnect(); } catch (e) { /* ignore */ }
    };
    src.start();
  }

  function setBell(on) {
    S.bell = on;
    if (on) {
      const c = ensureCtx();
      if (!c) {
        S.bell = false;
        setNote('इस ब्राउज़र में घंटी की ध्वनि उपलब्ध नहीं है।');
      } else {
        bellBus.gain.cancelScheduledValues(c.currentTime);
        bellBus.gain.setValueAtTime(1, c.currentTime);
        ringBell();
        setNote('घंटी हर परिक्रमा पर बजेगी।');
      }
    } else if (ctx && bellBus) {
      // Turant chup: gain ko jhatke se 0 karke chal rahi awaz rok dein
      const now = ctx.currentTime;
      bellBus.gain.cancelScheduledValues(now);
      bellBus.gain.setTargetAtTime(0, now, 0.012);
      activeBells.forEach((s) => { try { s.stop(now + 0.06); } catch (e) { /* ignore */ } });
      setNote('');
    }
  }

  function getMedia(key) {
    let m = media[key];
    if (!m) {
      m = new Audio();
      m.preload = 'none';
      m.loop = SOUND_FILES[key].loop;
      m.addEventListener('error', function () { onMediaError(key); });
      m.src = SOUND_FILES[key].src;
      media[key] = m;
    }
    return m;
  }

  function onMediaError(key) {
    missing[key] = true;
    S[key] = false;
    setNote(`${SOUND_FILES[key].name} की आवाज़ फ़ाइल नहीं मिली: ${SOUND_FILES[key].src} — फ़ाइल जोड़ने पर यह बटन काम करेगा।`);
    syncUI();
  }

  function playMedia(key) {
    const m = getMedia(key);
    if (missing[key]) {
      missing[key] = false;
      m.load(); // दोबारा कोशिश: हो सकता है फ़ाइल अब जोड़ दी गई हो
    }
    try { m.currentTime = 0; } catch (e) { /* metadata abhi nahi - theek hai */ }
    const p = m.play();
    if (p && p.catch) {
      p.catch(function (err) {
        if (err && err.name === 'NotAllowedError') {
          S[key] = false;
          setNote('ध्वनि चलाने के लिए बटन को एक बार फिर छुएँ।');
          syncUI();
        } else if (err && err.name === 'NotSupportedError') {
          onMediaError(key);
        }
      });
    }
  }

  function stopMedia(key) {
    const m = media[key];
    if (m) {
      m.pause();
      try { m.currentTime = 0; } catch (e) { /* ignore */ }
    }
  }

  function setMediaToggle(key, on) {
    S[key] = on;
    if (on) {
      playMedia(key);
      setNote(key === 'conch' ? 'शंख अभी और हर बार आरती शुरू होने पर बजेगा।' : '');
    } else {
      stopMedia(key);
      setNote('');
    }
  }

  /* ---- मुख्य पाठ-ऑडियो (मौजूदा प्लेयर) - सीधे वही <audio>, कोई दूसरी प्रति नहीं ---- */
  function toggleMainAudio() {
    if (!mainAudio) return;
    if (mainAudio.paused) {
      const p = mainAudio.play();
      if (p && p.catch) {
        p.catch(function () { setNote('ऑडियो चलाने के लिए बटन को एक बार फिर छुएँ।'); });
      }
    } else {
      mainAudio.pause();
    }
  }

  function onMainAudioEvent() {
    syncUI();
  }

  /* ======================================================================
     फूल वर्षा - हल्के CSS कण, पूरे होते ही हटते हैं
     ====================================================================== */
  const PETAL_COLORS = [['#FF9800', '#FFC107'], ['#FF6F00', '#FFB300'], ['#E91E63', '#F8BBD0'], ['#FFD54F', '#FFF59D']];

  // पूरा गेंदे जैसा फूल: 8 पंखुड़ियाँ + बीच का केंद्र (inline SVG, कोई फ़ाइल नहीं)
  function flowerSVG(petal, core) {
    let p = '';
    for (let k = 0; k < 8; k++) p += `<ellipse cx="0" cy="-5.4" rx="3.1" ry="5.4" transform="rotate(${k * 45})"/>`;
    return `<svg viewBox="-10 -10 20 20" aria-hidden="true" focusable="false"><g fill="${petal}">${p}</g><circle r="3.3" fill="${core}"/></svg>`;
  }

  function spawnPetal() {
    if (document.hidden || !petalsEl || petalsEl.childElementCount >= MAX_PETALS) return;
    const el = document.createElement('span');
    const c = PETAL_COLORS[(Math.random() * PETAL_COLORS.length) | 0];
    const isFlower = Math.random() < 0.3; // हर ~तीसरी चीज़ पूरा फूल, बाकी पत्तियाँ
    el.className = isFlower ? 'at-petal at-flower' : 'at-petal';
    if (isFlower) el.innerHTML = flowerSVG(c[0], c[1]);
    el.style.left = (Math.random() * 94).toFixed(1) + '%';
    el.style.setProperty('--s', (isFlower ? 18 + Math.random() * 8 : 9 + Math.random() * 9).toFixed(1) + 'px');
    el.style.setProperty('--c1', c[0]);
    el.style.setProperty('--c2', c[1]);
    el.style.setProperty('--d', (7 + Math.random() * 5).toFixed(1) + 's');
    el.style.setProperty('--dx', ((Math.random() - 0.4) * 70).toFixed(0) + 'px');
    el.style.setProperty('--r', (180 + Math.random() * 360).toFixed(0) + 'deg');
    el.style.setProperty('--h', (petalH + 40) + 'px');
    el.addEventListener('animationend', function () { el.remove(); }, { once: true });
    petalsEl.appendChild(el);
  }

  function setPetals(on) {
    if (on && reducedMotion()) {
      S.petals = false;
      setNote('आपके डिवाइस पर "कम गति" सेटिंग चालू है, इसलिए फूल वर्षा बंद रखी गई है।');
      return;
    }
    S.petals = on;
    clearInterval(petalTimer);
    petalTimer = 0;
    clearTimeout(petalFadeTimer);
    if (on) {
      petalsEl.style.opacity = '1';
      measure();
      spawnPetal();
      petalTimer = setInterval(spawnPetal, 350);
    } else {
      petalsEl.style.opacity = '0';
      petalFadeTimer = setTimeout(function () {
        petalsEl.textContent = '';
        petalsEl.style.opacity = '1';
      }, 420);
    }
  }

  function measure() {
    petalH = window.innerHeight || (petalsEl && petalsEl.clientHeight) || petalH;
  }

  /* ======================================================================
     UI sync
     ====================================================================== */
  function setNote(t) {
    if (noteEl) noteEl.textContent = t || '';
  }

  function setToggle(b, on, chipOn, chipOff) {
    b.classList.toggle('at-on', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
    b.querySelector('.at-chip').textContent = on ? chipOn : chipOff;
  }

  function syncUI() {
    if (!overlay) return;
    // आरती शुरू/बंद: लेबल बदलता है, इसलिए aria-pressed नहीं
    btn.run.classList.toggle('at-on', S.running);
    btn.run.querySelector('.at-lbl').textContent = S.running ? 'आरती रोकें' : 'आरती शुरू करें';
    btn.run.querySelector('.at-chip').textContent = S.running ? 'चल रही' : 'रुकी';

    setToggle(btn.bell, S.bell, 'चालू', 'बंद');
    setToggle(btn.conch, S.conch, 'चालू', 'बंद');
    setToggle(btn.petals, S.petals, 'चालू', 'बंद');
    setToggle(btn.bright, S.bright, 'चालू', 'बंद');
    setToggle(btn.dhol, S.dhol, 'चालू', 'बंद');
    ['conch', 'dhol'].forEach((k) => {
      btn[k].classList.toggle('at-missing', missing[k]);
      if (missing[k]) btn[k].querySelector('.at-chip').textContent = 'फ़ाइल नहीं';
    });
    viewEl.classList.toggle('at-bright', S.bright);

    if (openBtn) openBtn.classList.toggle('aarti-active', anyActive());
    const sp = SPEEDS[S.speed];
    speedBtns.forEach((b, i) => {
      const on = i === S.speed;
      b.classList.toggle('at-on', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    overlay.querySelector('#atSpeedNow').textContent = sp.label;

    const playing = !!(mainAudio && !mainAudio.paused);
    btn.audio.querySelector('.at-lbl').textContent = playing ? 'पाठ ऑडियो रोकें' : 'पाठ ऑडियो बजाएँ';
    btn.audio.classList.toggle('at-on', playing);
    btn.audio.querySelector('.at-chip').textContent = playing ? 'बज रहा' : 'रुका';
    btn.audio.hidden = !mainAudio;

    statusEl.innerHTML =
      (S.running ? '🪔 आरती चल रही है' : '🪔 आरती रुकी है') +
      `<span>गति: ${sp.label} · ${sp.period} सेकंड में एक परिक्रमा</span>`;
  }

  function onControlClick(e) {
    const b = e.target.closest('[data-act]');
    if (!b || !overlay.contains(b)) return;
    switch (b.dataset.act) {
      case 'run': setRunning(!S.running); break;
      case 'bell': setBell(!S.bell); syncUI(); break;
      case 'conch': setMediaToggle('conch', !S.conch); syncUI(); break;
      case 'dhol': setMediaToggle('dhol', !S.dhol); syncUI(); break;
      case 'petals': setPetals(!S.petals); syncUI(); break;
      case 'bright': S.bright = !S.bright; syncUI(); break;
      case 'speed': setSpeed(parseInt(b.dataset.i, 10)); break;
      case 'audio': toggleMainAudio(); break;
      default: break;
    }
  }

  /* ======================================================================
     OPEN / CLOSE, focus, background lock, keyboard
     ====================================================================== */
  function setMin(on) {
    minimized = on;
    overlay.querySelector('.at-card').classList.toggle('at-min', on);
    const b = overlay.querySelector('#atMin');
    b.setAttribute('aria-expanded', on ? 'false' : 'true');
    b.setAttribute('aria-label', on ? 'बड़ा करें' : 'छोटा करें');
    b.innerHTML = on ? '&#9652;' : '&#9662;';
    measure();
  }

  function onDocKey(e) {
    if (isOpen && e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  let listenersBound = false;
  let firstOpenDone = false;

  // Ek baar jodein, phir kabhi na hatayein: widget band hone par bhi kaam chalte rahenge
  function bindPermanent() {
    if (listenersBound) return;
    listenersBound = true;
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', measure, { passive: true });
    if (mainAudio) {
      ['play', 'pause', 'ended', 'error'].forEach((ev) => mainAudio.addEventListener(ev, onMainAudioEvent));
    }
  }

  function anyActive() {
    return !!(S.running || S.bell || S.conch || S.dhol || S.petals || S.bright);
  }

  function open() {
    if (isOpen) return;
    build();
    mainAudio = document.getElementById('mainAudioPlayer');
    bindPermanent();
    isOpen = true;
    if (!openBtn) openBtn = document.getElementById('aartiOpenBtn');
    // Safari/Firefox(mac) button click par focus nahi dete - tab opener ko hi wapas focus denge
    lastFocus = document.activeElement && document.activeElement !== document.body ? document.activeElement : openBtn;
    overlay.classList.add('at-open');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onDocKey);

    measure();
    if (!firstOpenDone) {
      firstOpenDone = true;
      // पहली बार: दृश्य गति अपने-आप शुरू (बिना आवाज़ के); छोटी स्क्रीन पर छोटा रूप
      if (!reducedMotion()) setRunning(true);
      setMin(window.innerWidth <= 640);
    }
    syncUI();
    if (btn.run && !minimized) btn.run.focus({ preventScroll: true });
  }

  // × / Esc / हेडर बटन से विजेट पूरा बंद = सब कुछ बंद (आरती, घंटी, शंख, ढोल, फूल वर्षा, दीपक तेज)।
  // सिर्फ़ "छोटा करें (▾)" से कुछ बंद नहीं होता - सब चलता रहता है।
  function close() {
    if (!isOpen) return;
    S.running = false;
    stopLoop();
    omega = 0;
    revAcc = 0;
    setPetals(false);
    clearTimeout(petalFadeTimer);
    petalFadeTimer = 0;
    petalsEl.textContent = '';
    petalsEl.style.opacity = '1';
    if (S.bell) setBell(false);
    S.conch = false;
    S.dhol = false;
    stopMedia('conch');
    stopMedia('dhol');
    S.bright = false;
    if (ctx && ctx.state === 'running') ctx.suspend().catch(() => {});
    draw(0);
    setNote('');
    firstOpenDone = false; // अगली बार नए सिरे से खुलेगा

    isOpen = false;
    overlay.classList.remove('at-open');
    document.removeEventListener('keydown', onDocKey);
    syncUI();
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    if (lastFocus && typeof lastFocus.focus === 'function' && document.contains(lastFocus)) {
      lastFocus.focus();
    } else if (openBtn) {
      openBtn.focus();
    }
  }

  /* ======================================================================
     Hook-up: header button + window.hanumanApp methods
     ====================================================================== */
  function init() {
    openBtn = document.getElementById('aartiOpenBtn');
    if (openBtn) openBtn.addEventListener('click', function () { if (isOpen) close(); else open(); });

    const app = (window.hanumanApp = window.hanumanApp || {});
    app.openAartiTemple = open;
    app.closeAartiTemple = close;
    app.toggleAartiDock = function () { if (isOpen) close(); else open(); };
    app.toggleAartiDiya = app.toggleAartiDock;
  }

  init();
})();