(() => {
  const C = window.CONFIG;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = (a, b) => Math.random() * (b - a) + a;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const TAU = Math.PI * 2;

  $$('[data-name]').forEach((el) => (el.textContent = C.herName));
  document.title = `Happy Birthday ${C.herName} 💖`;

  /* =================== CANVAS =================== */
  const bg = $('#bg'), bctx = bg.getContext('2d');
  const fx = $('#fx'), fctx = fx.getContext('2d');
  let W = 0, H = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    for (const c of [bg, fx]) {
      c.width = W * dpr; c.height = H * dpr;
      c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }
  resize();
  addEventListener('resize', resize);

  function heartPath(ctx, x, y, s) {
    // (x, y) = tâm trên, s = kích thước
    ctx.beginPath();
    ctx.moveTo(x, y + s * 0.3);
    ctx.bezierCurveTo(x, y, x - s * 0.5, y, x - s * 0.5, y + s * 0.3);
    ctx.bezierCurveTo(x - s * 0.5, y + s * 0.6, x, y + s * 0.75, x, y + s);
    ctx.bezierCurveTo(x, y + s * 0.75, x + s * 0.5, y + s * 0.6, x + s * 0.5, y + s * 0.3);
    ctx.bezierCurveTo(x + s * 0.5, y, x, y, x, y + s * 0.3);
    ctx.closePath();
  }

  // Sao lấp lánh + tim bay
  const stars = Array.from({ length: 140 }, () => ({ x: Math.random(), y: Math.random(), r: rand(0.3, 1.5), p: rand(0, TAU), s: rand(0.5, 2) }));
  const hearts = [];
  const newHeart = (anywhere) => ({
    x: rand(0, W), y: anywhere ? rand(0, H) : H + 30, size: rand(8, 24),
    vy: rand(0.3, 1.1), sway: rand(0.5, 1.5), p: rand(0, TAU), a: rand(0.12, 0.45), hue: rand(325, 360),
  });
  for (let i = 0; i < 32; i++) hearts.push(newHeart(true));

  // Hạt hiệu ứng (pháo hoa, lấp lánh, tim nổ)
  const parts = [];
  const add = (o) => parts.push({ vx: 0, vy: 0, g: 0, drag: 0.98, life: 1, decay: 0.02, size: 2, color: '#fff', type: 'dot', ...o });

  let t = 0;
  function frame() {
    t += 0.016;
    // background
    bctx.clearRect(0, 0, W, H);
    bctx.fillStyle = '#fff';
    for (const s of stars) {
      bctx.globalAlpha = 0.2 + 0.8 * Math.abs(Math.sin(t * s.s + s.p));
      bctx.beginPath(); bctx.arc(s.x * W, s.y * H, s.r, 0, TAU); bctx.fill();
    }
    for (let i = 0; i < hearts.length; i++) {
      const h = hearts[i];
      h.y -= h.vy; h.p += 0.02;
      bctx.globalAlpha = h.a;
      bctx.fillStyle = `hsl(${h.hue},90%,70%)`;
      heartPath(bctx, h.x + Math.sin(h.p) * h.sway * 16, h.y, h.size);
      bctx.fill();
      if (h.y < -40) hearts[i] = newHeart(false);
    }
    bctx.globalAlpha = 1;

    // fx
    fctx.clearRect(0, 0, W, H);
    fctx.globalCompositeOperation = 'lighter';
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.vx *= p.drag; p.vy = p.vy * p.drag + p.g;
      p.x += p.vx; p.y += p.vy;
      p.life -= p.decay;
      if (p.type === 'rocket') {
        add({ x: p.x, y: p.y, vx: rand(-0.4, 0.4), vy: rand(0, 1), decay: 0.05, size: 1.6, color: `hsl(${p.hue},100%,75%)` });
        if (p.vy >= -0.6) { explode(p.x, p.y, p.hue); p.life = 0; }
      }
      if (p.life <= 0) { parts.splice(i, 1); continue; }
      fctx.globalAlpha = Math.min(1, p.life);
      fctx.fillStyle = p.color;
      if (p.type === 'heart') { heartPath(fctx, p.x, p.y, p.size); fctx.fill(); }
      else { fctx.beginPath(); fctx.arc(p.x, p.y, Math.max(0.3, p.size * Math.min(1, p.life + 0.3)), 0, TAU); fctx.fill(); }
    }
    fctx.globalAlpha = 1;
    fctx.globalCompositeOperation = 'source-over';
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Vệt lấp lánh theo con trỏ / ngón tay
  let lastTrail = 0;
  addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - lastTrail < 16) return;
    lastTrail = now;
    for (let i = 0; i < 2; i++) {
      add({ x: e.clientX, y: e.clientY, vx: rand(-1, 1), vy: rand(-1.2, 0.4), g: 0.03, decay: rand(0.02, 0.04), size: rand(1.2, 2.6),
        color: Math.random() < 0.5 ? '#ffc2d4' : '#ffd166' });
    }
  });

  // Chạm đâu cũng nở tim
  function heartBurst(x, y, n = 14, power = 5) {
    for (let i = 0; i < n; i++) {
      const a = rand(0, TAU), s = rand(1, power);
      add({ type: 'heart', x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1.5, g: 0.08, drag: 0.97, decay: rand(0.012, 0.022),
        size: rand(8, 16), color: `hsl(${rand(330, 360)},95%,${rand(65, 78)}%)` });
    }
  }
  addEventListener('pointerdown', (e) => heartBurst(e.clientX, e.clientY, 8, 4));

  function explode(x, y, hue) {
    const heart = Math.random() < 0.45;
    const n = heart ? 80 : 100;
    for (let i = 0; i < n; i++) {
      let vx, vy;
      if (heart) {
        const a = (i / n) * TAU, k = rand(0.27, 0.31);
        vx = 16 * Math.sin(a) ** 3 * k;
        vy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) * k;
      } else {
        const a = rand(0, TAU), s = rand(1, 6.5);
        vx = Math.cos(a) * s; vy = Math.sin(a) * s;
      }
      add({ x, y, vx, vy, g: 0.035, drag: 0.975, decay: rand(0.008, 0.016), size: rand(1.6, 2.8),
        color: `hsl(${hue + rand(-25, 25)},100%,${rand(62, 78)}%)` });
    }
  }
  function launchRocket() {
    const g = 0.15, h = rand(H * 0.45, H * 0.8);
    add({ type: 'rocket', x: rand(W * 0.12, W * 0.88), y: H + 10, vx: rand(-1, 1), vy: -Math.sqrt(2 * g * h),
      g, drag: 1, decay: 0, size: 2.4, color: '#fff3c4', hue: rand(0, 360) });
  }
  function fireworks(duration = 9000) {
    const end = performance.now() + duration;
    (function loop() {
      launchRocket();
      if (Math.random() < 0.4) launchRocket();
      if (performance.now() < end) setTimeout(loop, rand(250, 550));
    })();
  }
  function confetti(n = 140) {
    const colors = ['#ff5c8a', '#ffd166', '#b388ff', '#7bdff2', '#ffc2d4', '#ffffff'];
    for (let i = 0; i < n; i++) {
      const el = document.createElement('div');
      el.className = 'confetti';
      const w = rand(6, 11);
      Object.assign(el.style, {
        left: rand(0, 100) + 'vw', width: w + 'px', height: w * rand(1.2, 1.8) + 'px',
        background: colors[i % colors.length],
        animationDuration: rand(3, 6) + 's', animationDelay: rand(0, 1.5) + 's',
      });
      el.style.setProperty('--dx', rand(-120, 120) + 'px');
      el.style.setProperty('--rot', rand(360, 1440) + 'deg');
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 8000);
    }
  }

  /* =================== MUSIC =================== */
  // bg: nhạc nền chung · bday: khi ở tab Bánh kem · voice: phát 1 lần khi lần đầu mở Kỷ niệm
  const musicBtn = $('#music-btn');
  const VOL = 0.7;
  const tracks = { bg: new Audio(C.music.background), bday: new Audio(C.music.birthday) };
  const voice = new Audio(C.music.journeyIntro);
  for (const a of [...Object.values(tracks), voice]) { a.preload = 'auto'; a.volume = 0; }
  tracks.bg.loop = tracks.bday.loop = true;
  tracks.bg.addEventListener('error', () => musicBtn.classList.add('nomusic'));
  let current = 'bg', muted = false, voiceOn = false;

  function fade(a, to, ms, done) {
    const from = a.volume, t0 = performance.now(), id = (a._fid = (a._fid || 0) + 1);
    const step = () => {
      if (a._fid !== id) return; // có lệnh fade mới hơn thì bỏ lệnh cũ
      const k = Math.min(1, (performance.now() - t0) / ms);
      try { a.volume = from + (to - from) * k; } catch {}
      if (k < 1) requestAnimationFrame(step); else if (done) done();
    };
    step();
  }
  function playTrack(name) {
    const prev = tracks[current], next = tracks[name];
    if (prev !== next) fade(prev, 0, 700, () => prev.pause());
    current = name;
    if (muted || voiceOn) return;
    next.play().then(() => { musicBtn.classList.add('playing'); fade(next, VOL, 1000); }).catch(() => {});
  }
  function playVoice(track) {
    current = track;
    if (muted) return;
    voiceOn = true;
    for (const a of Object.values(tracks)) fade(a, 0, 600, () => a.pause());
    voice.currentTime = 0;
    voice.volume = 1;
    voice.play().catch(() => { voiceOn = false; playTrack(current); });
  }
  voice.addEventListener('ended', () => { voiceOn = false; playTrack(current); });
  function stopVoice() {
    if (!voiceOn) return;
    voiceOn = false;
    fade(voice, 0, 500, () => voice.pause());
  }
  let voiceDone = false;
  // Mở khoá âm thanh trên iPhone (phải "chạm" mỗi file 1 lần trong lúc người dùng bấm)
  function unlockAudio(skip) {
    for (const a of [tracks.bg, tracks.bday, voice]) {
      if (a === skip) continue;
      a.muted = true;
      a.play().then(() => { a.pause(); a.currentTime = 0; a.muted = false; }).catch(() => { a.muted = false; });
    }
  }
  musicBtn.addEventListener('click', () => {
    muted = !muted;
    if (muted) {
      musicBtn.classList.remove('playing');
      for (const a of [...Object.values(tracks), voice]) fade(a, 0, 400, () => a.pause());
    } else if (voiceOn) {
      voice.volume = 1; voice.play().catch(() => {}); musicBtn.classList.add('playing');
    } else playTrack(current);
  });

  /* =================== INTRO =================== */
  const intro = $('#intro'), app = $('#app'), gift = $('#gift');
  gift.addEventListener('click', () => {
    if (gift.classList.contains('open')) return;
    gift.classList.add('open');
    const first = location.hash === '#cake' ? 'bday' : 'bg';
    unlockAudio(tracks[first]);
    playTrack(first);
    const r = gift.getBoundingClientRect();
    heartBurst(r.left + r.width / 2, r.top + r.height / 2, 40, 9);
    setTimeout(() => {
      intro.classList.add('hide');
      app.hidden = false;
      musicBtn.hidden = false;
      requestAnimationFrame(() => app.classList.add('show'));
      const start = location.hash.slice(1);
      showTab(initers[start] ? start : 'home');
      launchRocket(); launchRocket();
    }, 1300);
    setTimeout(() => intro.remove(), 2600);
  });

  /* =================== TABS =================== */
  const inited = {};
  function showTab(name) {
    $$('.tabs button').forEach((b) => b.classList.toggle('active', b.dataset.tab === name));
    $$('.tab').forEach((s) => s.classList.toggle('active', s.id === 'tab-' + name));
    scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', '#' + name);
    if (!inited[name]) { inited[name] = true; initers[name](); }
    const track = name === 'cake' ? 'bday' : 'bg';
    if (name === 'story' && !voiceDone && C.music.journeyIntro) { voiceDone = true; playVoice(track); }
    else { if (name !== 'story') stopVoice(); playTrack(track); }
  }
  $$('[data-tab]').forEach((b) => b.addEventListener('click', () => showTab(b.dataset.tab)));
  document.addEventListener('click', (e) => { const b = e.target.closest('[data-goto]'); if (b) showTab(b.dataset.goto); });

  const initers = { home: initHome, story: initStory, album: initAlbum, cake: initCake };

  /* =================== HOME =================== */
  function initHome() {
    const title = $('.hb-title');
    title.innerHTML = [...title.textContent].map((ch, i) => `<span style="--i:${i}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');

    const el = $('#typed');
    (async () => {
      await sleep(1800);
      for (let i = 0; ; i++) {
        const chars = Array.from(C.wishes[i % C.wishes.length]);
        for (let k = 1; k <= chars.length; k++) { el.textContent = chars.slice(0, k).join(''); await sleep(55); }
        await sleep(2400);
        for (let k = chars.length; k >= 0; k--) { el.textContent = chars.slice(0, k).join(''); await sleep(18); }
        await sleep(400);
      }
    })();

    const start = new Date(C.loveStartDate).getTime();
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      let d = Math.max(0, Date.now() - start) / 1000;
      $('#c-d').textContent = Math.floor(d / 86400);
      $('#c-h').textContent = pad(Math.floor((d % 86400) / 3600));
      $('#c-m').textContent = pad(Math.floor((d % 3600) / 60));
      $('#c-s').textContent = pad(Math.floor(d % 60));
    };
    tick();
    setInterval(tick, 1000);
  }

  /* =================== STORY =================== */
  /* ---- helpers ngày & ảnh ---- */
  const DAY = 864e5;
  const pad2 = (n) => String(n).padStart(2, '0');
  const full = (f) => 'assets/photos/' + f;
  const thumb = (f) => 'assets/photos/thumb/' + f;
  const fdate = (f) => { const m = /^(\d{4})(\d{2})(\d{2})/.exec(f); return m ? new Date(+m[1], m[2] - 1, +m[3]) : null; };
  const parseDay = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
  const LOVE = parseDay(C.loveStartDate.slice(0, 10));
  const elapsed = (d) => Math.round((d - LOVE) / DAY);
  const fmtDot = (d) => `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
  const dayLabel = (n) => (n > 0 ? `${n} ngày bên nhau` : n === 0 ? 'Ngày đầu tiên 💘' : `${-n} ngày trước khi yêu`);

  /* =================== STORY / HÀNH TRÌNH =================== */
  function initStory() {
    const box = $('#journey');
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const chs = C.chapters.map((ch) => {
      const ds = ch.photos.map(fdate);
      const s = ds[0] || parseDay(ch.date);
      return { ...ch, s, e: ds[ds.length - 1] || s, ds };
    });

    box.innerHTML = chs.map((ch, ci) => {
      let gap = '';
      if (ci > 0) {
        const g = Math.round((ch.s - chs[ci - 1].e) / DAY);
        if (g > 1) gap = `<div class="gap"><span>${g} ngày sau…</span></div>`;
      }
      const range = +ch.s === +ch.e ? fmtDot(ch.s) : `${fmtDot(ch.s).slice(0, 5)} – ${fmtDot(ch.e)}`;
      const frames = ch.photos.map((f, i) => `
        <figure class="frame" style="--d:${Math.min(i, 8) * 80}ms;--r:${((i % 2 ? 1 : -1) * rand(0.8, 2.6)).toFixed(1)}deg" data-i="${i}">
          <img src="${thumb(f)}" alt="" loading="lazy" draggable="false">
          <figcaption>${fmtDot(ch.ds[i])}</figcaption>
        </figure>`).join('');
      return `${gap}
        <section class="chapter${ch.final ? ' final' : ''}" data-ci="${ci}">
          <span class="ch-icon">${ch.icon}</span>
          <header class="ch-head">
            <span class="ch-date">${range} · ${dayLabel(elapsed(ch.s))}</span>
            <h3>${ch.title}</h3>
            ${ch.text ? `<p>${ch.text}</p>` : ''}
          </header>
          ${frames ? `<div class="strip-wrap"><div class="strip">${frames}</div>${ch.photos.length > 2 ? '<span class="swipe-hint">kéo ngang ⟶</span>' : ''}</div>` : ''}
          ${ch.final ? '<button class="cta" data-goto="cake">Đến lúc thổi nến rồi 🎂</button>' : ''}
        </section>`;
    }).join('');

    // Hiện dần khi cuộn tới
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.15 });
    $$('.chapter, .gap', box).forEach((el) => io.observe(el));

    // Dải ảnh: kéo bằng chuột, chạm để phóng to
    $$('.chapter', box).forEach((sec) => {
      const strip = $('.strip', sec);
      if (!strip) return;
      const ch = chs[+sec.dataset.ci];
      const list = ch.photos.map((f, i) => ({ src: full(f), caption: `${ch.title} · ${fmtDot(ch.ds[i])}` }));
      let down = false, moved = false, sx = 0, sl = 0;
      strip.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse') return;
        down = true; moved = false; sx = e.clientX; sl = strip.scrollLeft;
      });
      addEventListener('pointermove', (e) => {
        if (!down) return;
        const dx = e.clientX - sx;
        if (Math.abs(dx) > 6) { moved = true; strip.classList.add('dragging'); }
        if (moved) strip.scrollLeft = sl - dx;
      });
      addEventListener('pointerup', () => { if (down) { down = false; strip.classList.remove('dragging'); } });
      strip.addEventListener('scroll', () => sec.classList.add('scrolled'), { passive: true });
      $$('.frame', strip).forEach((fr) => fr.addEventListener('click', (e) => {
        if (moved) { e.preventDefault(); moved = false; return; }
        openLb(list, +fr.dataset.i);
      }));
    });

    // HUD: bộ đếm ngày chạy theo vị trí cuộn
    const hud = $('#hud'), hudDay = $('#hud-day'), hudDate = $('#hud-date'), hudFill = $('#hud-fill');
    const secs = $$('.chapter', box);
    const total = Math.max(1, elapsed(today));
    let shown = elapsed(chs[0].s), target = shown, lastRendered = null;
    const render = (n) => {
      if (n === lastRendered) return;
      lastRendered = n;
      const d = new Date(LOVE.getTime() + n * DAY);
      hudDay.textContent = dayLabel(n);
      hudDate.textContent = `${pad2(d.getDate())} · ${pad2(d.getMonth() + 1)} · ${d.getFullYear()}`;
      hudFill.style.width = Math.max(0, Math.min(100, (n / total) * 100)) + '%';
    };
    const loop = () => {
      if ($('#tab-story').classList.contains('active')) {
        const line = innerHeight * 0.55;
        let active = null;
        for (const s of secs) if (s.getBoundingClientRect().top < line) active = s;
        hud.classList.toggle('show', box.getBoundingClientRect().top < innerHeight * 0.7);
        if (active) {
          const ch = chs[+active.dataset.ci];
          const strip = $('.strip', active);
          let d = ch.final ? today : ch.s;
          if (strip && ch.ds.length > 1) {
            const max = strip.scrollWidth - strip.clientWidth;
            const k = max > 4 ? Math.round((strip.scrollLeft / max) * (ch.ds.length - 1)) : 0;
            d = ch.ds[k];
          }
          target = elapsed(d);
        } else target = elapsed(chs[0].s);
        const diff = target - shown;
        if (diff !== 0) {
          const step = diff * 0.12 + Math.sign(diff) * 0.6;
          shown = Math.abs(step) >= Math.abs(diff) ? target : shown + step;
        }
        render(Math.round(shown));
      }
      requestAnimationFrame(loop);
    };
    render(shown);
    loop();
  }

  /* =================== ALBUM =================== */
  let lbIndex = 0, lbList = [];
  const lb = $('#lightbox'), lbImg = $('#lightbox img'), lbWrap = $('#lightbox .lb-img'), lbCap = $('#lightbox figcaption');
  function initAlbum() {
    const box = $('#album');
    const list = C.album.map((f) => ({ src: full(f), caption: fmtDot(fdate(f)) }));
    box.innerHTML = C.album.map((f, i) => `
      <figure class="polaroid" style="--r:${rand(-7, 7).toFixed(1)}deg;--d:${i * 90}ms" data-i="${i}">
        <div class="ph"><img src="${thumb(f)}" alt="" loading="lazy"></div>
        <figcaption>${fmtDot(fdate(f))}</figcaption>
      </figure>`).join('');
    $$('.ph img', box).forEach((img) => img.addEventListener('error', () => img.parentElement.classList.add('missing')));
    $$('.polaroid', box).forEach((f) => f.addEventListener('click', () => openLb(list, +f.dataset.i)));
  }
  function openLb(list, i) { lbList = list; showLb(i); }
  function showLb(i) {
    lbIndex = (i + lbList.length) % lbList.length;
    const p = lbList[lbIndex];
    lbWrap.classList.remove('missing');
    lbImg.style.animation = 'none'; void lbImg.offsetWidth; lbImg.style.animation = '';
    lbImg.src = p.src;
    lbCap.textContent = p.caption;
    lb.hidden = false;
  }
  lbImg.addEventListener('error', () => lbWrap.classList.add('missing'));
  const closeLb = () => (lb.hidden = true);
  $('.lb-close').addEventListener('click', closeLb);
  $('.lb-nav.prev').addEventListener('click', (e) => { e.stopPropagation(); showLb(lbIndex - 1); });
  $('.lb-nav.next').addEventListener('click', (e) => { e.stopPropagation(); showLb(lbIndex + 1); });
  lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
  });
  let touchX = null;
  lb.addEventListener('touchstart', (e) => (touchX = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
    touchX = null;
  });

  /* =================== LETTER =================== */
  function initLetter() {
    const env = $('#envelope'), wrap = $('#envelope-wrap'), paper = $('#letter-paper');
    const textEl = $('#letter-text'), sign = $('#letter-sign');
    sign.textContent = '— ' + C.fromName + ' ❤️';
    let skip = false;
    env.addEventListener('click', () => {
      if (env.classList.contains('open')) return;
      env.classList.add('open');
      const r = env.getBoundingClientRect();
      setTimeout(() => heartBurst(r.left + r.width / 2, r.top, 24, 7), 700);
      setTimeout(() => wrap.classList.add('gone'), 1700);
      setTimeout(async () => {
        wrap.hidden = true;
        paper.hidden = false;
        const full = C.letter.trim();
        let out = '';
        for (const ch of full) {
          if (skip) break;
          out += ch;
          textEl.textContent = out;
          await sleep(ch === '\n' ? 220 : /[.,!?]/.test(ch) ? 160 : 32);
        }
        textEl.textContent = full;
        sign.classList.add('show');
      }, 2400);
    });
    paper.addEventListener('click', () => (skip = true));
  }

  /* =================== CAKE =================== */
  function initCake() {
    const box = $('#candles');
    box.innerHTML = Array.from({ length: C.candles || 5 }, () => '<div class="candle"><div class="flame"></div></div>').join('');
    $('#final-msg').textContent = C.finalMessage;

    const micBtn = $('#mic-btn');
    micBtn.addEventListener('click', async () => {
      if (micBtn.disabled) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micBtn.disabled = true;
        micBtn.textContent = '🎤 Đang nghe... thổi đi nào!';
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        const an = ac.createAnalyser();
        an.fftSize = 512;
        ac.createMediaStreamSource(stream).connect(an);
        const buf = new Uint8Array(an.fftSize);
        let cool = 0;
        const listen = () => {
          an.getByteTimeDomainData(buf);
          let sum = 0;
          for (const v of buf) { const x = (v - 128) / 128; sum += x * x; }
          const rms = Math.sqrt(sum / buf.length);
          const now = performance.now();
          if (rms > 0.16 && now > cool) {
            const c = $('.candle:not(.out)');
            if (c) { blow(c); cool = now + 180; }
          }
          if ($('.candle:not(.out)')) requestAnimationFrame(listen);
          else { stream.getTracks().forEach((tr) => tr.stop()); ac.close(); micBtn.textContent = '🎉 Giỏi quá!'; }
        };
        listen();
      } catch {
        micBtn.textContent = '🎤 Thử lại';
        $('#cake-hint').textContent = 'Em cần cho phép dùng micro thì mới thổi nến được nha 🥺 (bấm biểu tượng ổ khoá trên thanh địa chỉ → Cho phép micro)';
      }
    });
  }
  let celebrated = false;
  function blow(c) {
    if (c.classList.contains('out')) return;
    c.classList.add('out');
    const r = c.getBoundingClientRect();
    for (let i = 0; i < 6; i++) {
      add({ x: r.left + r.width / 2, y: r.top - 20, vx: rand(-0.5, 0.5), vy: rand(-1.5, -0.5), decay: 0.02, size: rand(2, 4), color: '#ffb347' });
    }
    if (!celebrated && !$('.candle:not(.out)')) {
      celebrated = true;
      setTimeout(celebrate, 500);
    }
  }
  function celebrate() {
    $('#cake').classList.add('done');
    fireworks(10000);
    confetti();
    $('.cake-actions').hidden = true;
    $('#cake-hint').textContent = 'Điều ước đã được gửi lên các vì sao ✨';
    const after = $('#after-wish');
    after.hidden = false;
    initLetter();
    setTimeout(() => after.scrollIntoView({ behavior: 'smooth', block: 'start' }), 900);
  }
})();
