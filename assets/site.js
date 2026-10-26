/* ============ CONFIG — edit these when links change ============ */
const CONFIG = {
  discordInvite: 'https://discord.gg/VAQPV9jksP',
  lumaUrl: 'https://luma.com/1qxb9px8',
};

/* Only real events with tickets on Posh or Luma. Past events show greyed out. */
const EVENTS = [
  { date: '2026-10-21', title: 'Algos & Co Builders Workshop', venue: 'Potomac District Café · Gaylord National', track: 'Builder',
    posh: 'https://posh.vip/e/algos-co-builders-workshop', luma: 'https://luma.com/1qxb9px8' },
];

const TRACKS = [
  { word: 'Certs', label: 'The study sprints', name: 'Upskill & Certifications', cadence: '6-week cohorts · weekly check-ins',
    items: [['AWS AI Practitioner', 'Bedrock & SageMaker labs'], ['CompTIA Security+', 'PBQ drills, timed practice'], ['Cloud Architecture', 'Well-Architected reviews']] },
  { word: 'Build', label: 'AI & engineering projects', name: 'Builder Studio', cadence: '2-hour sprints · bi-weekly',
    items: [['AI wrappers', 'real UI, real URL'], ['RAG agents', 'index, retrieve, evaluate'], ['Threat dashboards', 'ingest, visualize, alert']] },
  { word: 'Roles', label: 'Work & opportunities', name: 'Talent & Project Exchange', cadence: 'Always on · monthly digest',
    items: [['Verified profiles', 'shipped work, not a résumé'], ['Project board', 'freelance & contract scopes'], ['Co-founder matching', 'complementary skills']] },
  { word: 'Meet', label: 'Gatherings', name: 'Community & Social', cadence: 'Monthly · plus quarterly mixers',
    items: [['Co-working', 'Gaylord National Harbor'], ['Socials', 'Harbour Social'], ['Fireside chats', 'operators & leaders']] },
];

const FAQ = [
  ['Who is this for?', 'Working engineers, security and cloud professionals, AI creators, and technical founders in the DMV who prefer shipping to small talk.'],
  ['Do I need to be an expert to join a build sprint?', 'No. Briefs are scoped so you can ship in two hours. Bring a laptop and something you want to build; mentors float the room.'],
  ['How do study sprints work?', 'Six-week cohorts with a weekly roadmap, a small accountability pod, labs, and a mock exam before your test date.'],
  ['Where are events held?', 'Most sessions run at Gaylord National Harbor, with socials at Harbour Social.'],
  ['How do I get listed in the Talent Exchange?', 'Join the Discord and share links to work you have shipped. Profiles are verified against shipped work.'],
];

/* ============ HELPERS ============ */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = new Date(); today.setHours(0, 0, 0, 0);
const isPast = e => new Date(e.date + 'T23:59:59') < today;
const upcoming = EVENTS.filter(e => !isPast(e)).sort((a, b) => a.date.localeCompare(b.date));
const past = EVENTS.filter(isPast).sort((a, b) => b.date.localeCompare(a.date));
const next = upcoming[0];

/* ============ LINKS ============ */
document.querySelectorAll('[data-discord]').forEach(a => { a.href = CONFIG.discordInvite; });
document.querySelectorAll('[data-luma]').forEach(a => { a.href = CONFIG.lumaUrl; });

// Hero second button: RSVP when an event is live, otherwise Join Discord
const heroCta = $('#heroCta');
if (heroCta) {
  if (next) { heroCta.href = next.posh; heroCta.textContent = 'RSVP on Posh ↗'; }
  else { heroCta.href = CONFIG.discordInvite; heroCta.textContent = 'Join the Discord ↗'; }
}

/* ============ TRACKS ============ */
const trackGrid = $('#trackGrid');
if (trackGrid) trackGrid.innerHTML = TRACKS.map((t, i) => `
  <article class="track">
    <div class="sec-top"><span class="label">${esc(t.label)}</span><span class="label muted">0${i + 1}</span></div>
    <h3 class="giant">${esc(t.word)}</h3>
    <div class="rule">
      <p class="h" style="font-size:19px">${esc(t.name)}</p>
      <p class="label muted" style="margin-top:6px">${esc(t.cadence)}</p>
    </div>
    <ul class="list">${t.items.map((it, j) => `<li><span class="n">0${j + 1}</span><span class="txt"><span class="t">${esc(it[0])}</span><br><span class="d">${esc(it[1])}</span></span></li>`).join('')}</ul>
  </article>`).join('');

/* ============ CALENDAR ============ */
const row = (e, isOld) => {
  const d = new Date(e.date + 'T12:00:00');
  const mo = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const dow = d.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  const links = isOld ? '' : `<div class="links-inline">${e.posh ? `<a href="${esc(e.posh)}" target="_blank" rel="noopener">Posh ↗</a>` : ''}${e.luma ? `<a href="${esc(e.luma)}" target="_blank" rel="noopener">Luma ↗</a>` : ''}</div>`;
  return `<div class="ev${isOld ? ' past' : ''}">
    <div><p class="label muted">${mo} · ${dow}</p><p class="day">${String(d.getDate()).padStart(2, '0')}</p></div>
    <div><p class="title">${esc(e.title)} <span class="pill${isOld ? ' gold' : ''}">${isOld ? 'Past' : 'Tickets live'}</span></p>${links}</div>
    <p class="p venue">${esc(e.venue)}</p>
    <span class="tag"><span class="pill">${esc(e.track)}</span></span>
  </div>`;
};
const eventList = $('#eventList');
if (eventList) eventList.innerHTML =
  (upcoming.length ? upcoming.map(e => row(e, false)).join('')
    : `<div class="empty"><p class="label blue">Next event</p><p class="h" style="margin-top:8px">Announced soon. Watch the Discord.</p></div>`) +
  past.slice(0, 3).map(e => row(e, true)).join('');

/* ============ FAQ ============ */
const faqList = $('#faqList');
if (faqList) faqList.innerHTML = FAQ.map((f, i) => `
  <details><summary><span class="n">0${i + 1}</span><span>${esc(f[0])}</span><span class="plus" aria-hidden="true">+</span></summary><p class="p">${esc(f[1])}</p></details>`).join('');

/* ============ HERO DIAGRAM SEATS ============ */
const seats = $('#seats');
if (seats) {
  let s = '';
  for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) {
    s += `<rect x="${392 + c * 48}" y="${108 + r * 24}" width="22" height="14" rx="2" fill="${(r + c) % 3 === 0 ? 'var(--hatch)' : 'none'}" stroke="var(--blue)" stroke-width="1"/>`;
  }
  seats.innerHTML = s;
}

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();
