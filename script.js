// ===== Konfigurasi Tailwind CSS (Custom Color & Font) =====
if (window.tailwind) {
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          cobalt: { DEFAULT: '#2446E8', deep: '#1A36C2', light: '#4B6BFF' },
          sun: { DEFAULT: '#FFC93C', bright: '#FFE082', dark: '#E6A800' },
          ink: '#161B3D',
          night: { 950: '#090D20', 900: '#101736', 800: '#19224A', 700: '#263163' },
          mist: '#F8FAFC',
          line: '#E2E8F0',
        },
        fontFamily: {
          display: ['"Bricolage Grotesque"', 'sans-serif'],
          sans: ['Figtree', 'sans-serif'],
        },
      },
    },
  };
}

// ===== Inisialisasi Tema (Pencegahan Flash Theme) =====
(function () {
  try {
    var t = localStorage.getItem('noex_theme');
    var dark = t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();

// ===== Ikon SVG Inline =====
const ICON = {
  "eye": ["s", "<path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>"],
  "eyeOff": ["s", "<path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22\"/>"],
  "mail": ["s", "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"/><path d=\"m22 6-10 7L2 6\"/>"],
  "lightbulb": ["s", "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"/><path d=\"M9 18h6M10 22h4\"/>"],
  "calendarCheck": ["s", "<path d=\"M8 2v4M16 2v4\"/><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 10h18M9 16l2 2 4-4\"/>"],
  "listCheck": ["s", "<path d=\"m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8\"/>"],
  "check": ['s', '<path d="M20 6 9 17l-5-5"/>'],
  "chev": ['s', '<path d="m9 18 6-6-6-6"/>']
};

const ic = (name, cls = '') => {
  const [kind, inner] = ICON[name];
  const attrs = kind === 'f' ? 'fill="currentColor"' : 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  return `<svg class="${cls} h-[1em] w-[1em] inline-block shrink-0" viewBox="0 0 24 24" ${attrs} aria-hidden="true">${inner}</svg>`;
};

const TAB_ON = "w-1/2 rounded-xl py-2.5 text-sm font-bold text-ink dark:text-slate-100 bg-white dark:bg-night-800 shadow-sm transition-all duration-200";
const TAB_OFF = "w-1/2 rounded-xl py-2.5 text-sm font-semibold text-ink/60 dark:text-slate-400 hover:text-ink dark:hover:text-white transition-all duration-200";

function switchTab(tab) {
  const isLogin = tab === 'login';
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  document.getElementById('form-login').classList.toggle('hidden', !isLogin);
  document.getElementById('form-register').classList.toggle('hidden', isLogin);

  tabLogin.className = isLogin ? TAB_ON : TAB_OFF;
  tabRegister.className = isLogin ? TAB_OFF : TAB_ON;
  tabLogin.setAttribute('aria-selected', String(isLogin));
  tabRegister.setAttribute('aria-selected', String(!isLogin));
  hideAlert();
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const btn = input.nextElementSibling;
  const show = input.type === 'password';

  input.type = show ? 'text' : 'password';
  btn.innerHTML = ic(show ? 'eyeOff' : 'eye', 'text-sm');
  btn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
}

function showAlert(message) {
  const box = document.getElementById('auth-alert');
  document.getElementById('alert-msg').textContent = message;
  box.classList.remove('hidden');
  box.classList.add('flex');
}

function hideAlert() {
  const box = document.getElementById('auth-alert');
  box.classList.add('hidden');
  box.classList.remove('flex');
}

function handleForgotPassword(e) {
  e.preventDefault();
  const input = document.getElementById('login-email');
  if (!input.value || !input.checkValidity()) {
    showAlert('Isi alamat email yang valid dulu, lalu klik "Lupa kata sandi?".');
    input.focus();
    return;
  }
  showAlert(`Tautan untuk mereset kata sandi dikirim ke ${input.value}.`);
}

const $ = id => document.getElementById(id);
const USER = { first: 'Dimas' };
const MARK = '<svg class="h-5 w-5" viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M11 29V11l16 18V11" stroke="#161B3D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="8" r="3" fill="#2446E8"/></svg>';
const COPY = '<svg class="h-[1em] w-[1em] inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Salin';
const GROUPS = ['Hari ini', 'Kemarin', '7 hari terakhir'];

const SUGGEST = [
  { icon: 'mail', t: 'Tulis email penawaran', p: 'Bantu aku menulis email penawaran jasa yang singkat dan sopan untuk calon klien baru.' },
  { icon: 'lightbulb', t: 'Jelaskan dengan sederhana', p: 'Jelaskan cara kerja blockchain seolah-olah aku baru pertama kali mendengarnya.' },
  { icon: 'calendarCheck', t: 'Rencana belajar 4 minggu', p: 'Buatkan rencana belajar 4 minggu untuk dasar-dasar desain UI.' },
  { icon: 'listCheck', t: 'Rapikan catatan rapat', p: 'Ubah catatan rapat berantakan menjadi poin tindak lanjut yang jelas.' },
];

const chats = [
  {
    id: 1, title: 'Ide nama brand kopi lokal', group: 'Hari ini', msgs: [
      { r: 'u', t: 'Bantu aku cari nama brand untuk kedai kopi yang memakai biji lokal.' },
      { r: 'a', t: 'Beberapa arah nama yang bisa kamu pertimbangkan:\n\n**Lereng Kopi**: mengingatkan pada kebun di lereng gunung\n**Biji Tanah**: hangat dan membumi\n**Seduh Pelan**: santai dan mudah diingat\n\nMau saya kembangkan salah satunya, lengkap dengan tagline dan gaya visual?' }
    ]
  },
  {
    id: 2, title: 'Ringkasan rapat mingguan', group: 'Hari ini', msgs: [
      { r: 'u', t: 'Rangkum catatan rapat ini jadi 3 poin tindak lanjut.' },
      { r: 'a', t: 'Tempel catatan rapatnya di sini. Saya ubah jadi tiga poin tindak lanjut, lengkap dengan penanggung jawab dan tenggat.' }
    ]
  },
  {
    id: 3, title: 'Debug fungsi login JavaScript', group: 'Kemarin', msgs: [
      { r: 'u', t: 'Kenapa tombol "Lupa kata sandi" tidak jalan?' },
      { r: 'a', t: 'Cek argumen yang dikirim ke fungsinya. Kalau ada typo pada `event`, browser melempar `ReferenceError` dan handler berhenti sebelum notifikasi muncul.' }
    ]
  },
  {
    id: 4, title: 'Rencana konten Instagram', group: '7 hari terakhir', msgs: [
      { r: 'u', t: 'Buatkan kerangka konten Instagram untuk satu minggu.' },
      { r: 'a', t: 'Kerangka sederhana:\n\n**Senin**: tips singkat\n**Rabu**: di balik layar\n**Jumat**: cerita pelanggan\n\nSaya bisa lengkapi dengan ide caption untuk tiap hari.' }
    ]
  },
];

let current = null;
let busy = false;
let input;

const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = t => esc(t).split(/\n{2,}/).map(p => '<p class="mb-3 last:mb-0">' + p
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/`(.+?)`/g, '<code class="rounded bg-slate-100 dark:bg-night-800 px-1.5 py-0.5 text-[13px] text-cobalt-deep dark:text-blue-200">$1</code>')
  .replace(/\n/g, '<br>') + '</p>').join('');

function renderHistory() {
  const q = $('search').value.trim().toLowerCase();
  const list = chats.filter(c => c.title.toLowerCase().includes(q));
  $('history').innerHTML = !list.length
    ? '<p class="px-3 py-6 text-center text-sm text-white/60">Tidak ada percakapan yang cocok.</p>'
    : GROUPS.map(g => {
      const items = list.filter(c => c.group === g);
      if (!items.length) return '';
      return `<p class="px-3 pb-1.5 pt-4 text-xs font-semibold text-white/50">${g}</p>` + items.map(c => {
        const on = c === current;
        return `<button type="button" onclick="openChat(${c.id})" ${on ? 'aria-current="true"' : ''} class="relative flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm transition ${on ? 'bg-white/15 font-semibold text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}">${on ? '<span class="absolute inset-y-2 left-0 w-1 rounded-full bg-sun"></span>' : ''}<span class="truncate">${esc(c.title)}</span></button>`;
      }).join('');
    }).join('');
}

function welcome() {
  return `<div class="mx-auto flex min-h-full max-w-3xl flex-col justify-center px-4 py-10 sm:px-6">
    <div class="up">
      <div class="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-sun shadow-lg shadow-sun/30">${MARK.replace('h-5 w-5', 'h-7 w-7')}</div>
      <h2 class="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">Halo, ${USER.first}. Mau mulai dari mana?</h2>
      <p class="mt-2 text-slate-600 dark:text-slate-300">Tanya apa saja, atau pilih salah satu ide di bawah.</p>
    </div>
    <div class="up up-d mt-8 grid gap-3 sm:grid-cols-2">
      ${SUGGEST.map((s, i) => `<button type="button" onclick="send(SUGGEST[${i}].p)" class="flex items-center gap-3 rounded-2xl border border-slate-200 dark:border-night-700 bg-white/80 dark:bg-night-900/80 p-4 text-left shadow-sm transition hover:border-cobalt dark:hover:border-cobalt-light hover:bg-white dark:hover:bg-night-800 active:scale-[0.99]">
        <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cobalt/10 text-cobalt dark:text-cobalt-light">${ic(s.icon)}</span>
        <span class="text-sm font-semibold">${s.t}</span></button>`).join('')}
    </div>
  </div>`;
}

function row(m, i) {
  if (m.r === 'u') return `<div class="flex justify-end"><div class="max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-cobalt px-4 py-3 text-sm leading-relaxed text-white shadow-md shadow-cobalt/20">${esc(m.t)}</div></div>`;
  return `<div class="flex gap-3"><div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sun">${MARK}</div>
    <div class="min-w-0 flex-1"><div class="text-sm leading-relaxed">${fmt(m.t)}</div>
    <button type="button" onclick="copyMsg(${i}, this)" class="mt-1.5 text-xs font-semibold text-slate-400 transition hover:text-cobalt dark:hover:text-cobalt-light">${COPY}</button></div></div>`;
}

const TYPING = `<div class="up flex gap-3"><div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sun">${MARK}</div>
  <div class="flex items-center gap-1.5 pt-3" role="img" aria-label="NoeX sedang mengetik">
    <span class="dot h-2 w-2 rounded-full bg-cobalt"></span><span class="dot h-2 w-2 rounded-full bg-cobalt" style="animation-delay:.15s"></span><span class="dot h-2 w-2 rounded-full bg-cobalt" style="animation-delay:.3s"></span>
  </div></div>`;

function renderAll() {
  renderHistory();
  $('chat-title').textContent = current ? current.title : 'Percakapan baru';
  const box = $('messages');
  box.innerHTML = current
    ? `<div class="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">${current.msgs.map(row).join('')}${busy ? TYPING : ''}</div>`
    : welcome();
  box.scrollTop = box.scrollHeight;
}

// ===== Sidebar riwayat =====
const DESK = matchMedia('(min-width: 1024px)');
let deskOpen = true, mobOpen = false;
try { deskOpen = localStorage.getItem('noex_sidebar') !== 'closed'; } catch (e) {}

function renderSidebar() {
  const open = DESK.matches ? deskOpen : mobOpen;
  const sb = $('sidebar');
  sb.classList.toggle('-translate-x-full', !mobOpen);
  sb.classList.toggle('lg:-ml-72', !deskOpen);
  sb.inert = !open;
  $('scrim').classList.toggle('hidden', !mobOpen);$('sb-open').classList.toggle('hidden', open);
  $('sb-open').setAttribute('aria-expanded', String(open));$('sb-close').setAttribute('aria-expanded', String(open));
}

function toggleSidebar(open) {
  if (DESK.matches) {
    deskOpen = open;
    try { localStorage.setItem('noex_sidebar', open ? 'open' : 'closed'); } catch (e) {}
  } else {
    mobOpen = open;
  }
  renderSidebar();
  (open ? $('sb-close') :$('sb-open')).focus({ preventScroll: true });
}

function closeMobileSidebar() { mobOpen = false; renderSidebar(); }

function newChat() { current = null; renderAll(); closeMobileSidebar(); input.focus(); }
function openChat(id) { current = chats.find(c => c.id === id); renderAll(); closeMobileSidebar(); input.focus(); }

function syncSend() { $('send').disabled = busy || !input.value.trim(); }
function autosize() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 160) + 'px'; }

function reply(text) {
  return `Ini jawaban contoh karena dashboard belum tersambung ke model.\n\n**Pesanmu:** ${text}`;
}

function send(text) {
  text = (text ?? input.value).trim();
  if (!text || busy) return;
  if (!current) {
    current = { id: Date.now(), title: text.length > 32 ? text.slice(0, 32) + '…' : text, group: 'Hari ini', msgs: [] };
    chats.unshift(current);
  }
  const chat = current;
  chat.msgs.push({ r: 'u', t: text });
  input.value = ''; autosize();
  busy = true; syncSend(); renderAll();
  setTimeout(() => {
    chat.msgs.push({ r: 'a', t: reply(text) });
    busy = false; syncSend();
    if (current === chat) renderAll(); else renderHistory();
  }, 900 + Math.random() * 700);
}

async function copyMsg(i, btn) {
  try {
    await navigator.clipboard.writeText(current.msgs[i].t);
    btn.innerHTML = '<svg class="h-[1em] w-[1em] inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> Tersalin';
  } catch (e) {
    btn.textContent = 'Gagal menyalin';
  }
  setTimeout(() => { btn.innerHTML = COPY; }, 1500);
}

// ===== Alur autentikasi =====
const SESSION_KEY = 'noex_user';
let oauthBusy = false;

function nameFromEmail(email) {
  return email.split('@')[0].split(/[._-]+/).filter(Boolean)
    .map(w => w[0].toUpperCase() + w.slice(1)).join(' ') || 'Pengguna';
}

function enterApp(user) {
  USER.name = user.name;
  USER.first = user.name.split(' ')[0];
  $('user-name').textContent = user.name;
  $('user-avatar').textContent = user.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
  USER.plan = user.plan || 'Paket Gratis';
  applyPlan();
  try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(user)); } catch (e) {}
  hideAlert();
  $('view-auth').classList.add('hidden');$('view-app').classList.remove('hidden');
  document.title = 'Chat · NoeX.ai';
  current = null;
  closeMobileSidebar();
  renderAll();
  input.focus();
}

function logout() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
  $('form-login').reset();$('form-register').reset();
  $('view-app').classList.add('hidden');$('view-auth').classList.remove('hidden');
  document.title = 'Masuk ke NoeX.ai';
  switchTab('login');
  $('login-email').focus();
}

function submitAuth(btnId, user, busyLabel) {
  const btn = $(btnId), label = btn.querySelector('span'), old = label.textContent;
  btn.disabled = true;
  label.textContent = busyLabel;
  setTimeout(() => { btn.disabled = false; label.textContent = old; enterApp(user); }, 700);
}

function handleLogin(e) {
  e.preventDefault();
  submitAuth('btn-login', { name: nameFromEmail($('login-email').value) }, 'Memeriksa…');
}

function handleRegister(e) {
  e.preventDefault();
  submitAuth('btn-register', { name: $('reg-name').value.trim() || 'Pengguna' }, 'Membuat akun…');
}

function loginWithOAuth(provider) {
  if (oauthBusy) return;
  oauthBusy = true;
  showAlert(`Melanjutkan autentikasi via ${provider}...`);
  setTimeout(() => { oauthBusy = false; enterApp({ name: 'Dimas Pratama' }); }, 900);
}

// ===== Mode Gelap / Terang =====
const THEME_KEY = 'noex_theme';

function applyTheme(dark) {
  document.documentElement.classList.toggle('dark', dark);
  document.querySelectorAll('.theme-toggle').forEach(b => {
    const label = dark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap';
    b.setAttribute('aria-pressed', String(dark));
    b.setAttribute('aria-label', label);
    b.title = label;
  });
}

function toggleTheme() {
  const root = document.documentElement;
  root.classList.add('theme-anim');
  applyTheme(!root.classList.contains('dark'));
  try { localStorage.setItem(THEME_KEY, root.classList.contains('dark') ? 'dark' : 'light'); } catch (e) {}
  setTimeout(() => root.classList.remove('theme-anim'), 400);
}

// ===== Checkout Langganan =====
const PRICE = 49000;
const rupiah = n => 'Rp ' + n.toLocaleString('id-ID');
const METHODS = [
  { id: 'qris', g: 'QRIS', label: 'QRIS', sub: 'Semua e-wallet & mobile banking', ab: 'QR', c: '#E11D2E', t: 'qr' },
  { id: 'gopay', g: 'E-Wallet', label: 'GoPay', ab: 'GP', c: '#00AA13', t: 'wallet' },
  { id: 'dana', label: 'DANA', ab: 'DA', c: '#118EEA', t: 'wallet' },
  { id: 'ovo', label: 'OVO', ab: 'OV', c: '#4C2A86', t: 'wallet' },
  { id: 'shopeepay', label: 'ShopeePay', ab: 'SP', c: '#EE4D2D', t: 'wallet' },
  { id: 'linkaja', label: 'LinkAja', ab: 'LA', c: '#E82529', t: 'wallet' },
  { id: 'livin', g: 'Mobile Banking', label: "Livin' by Mandiri", ab: 'Li', c: '#003D79', t: 'mbank' },
  { id: 'brimo', label: 'BRImo', sub: 'Mobile banking BRI', ab: 'BR', c: '#00529C', t: 'mbank' },
  { id: 'va', g: 'Transfer Bank', label: 'Virtual Account', sub: 'BCA, Mandiri, BNI, BRI, Permata, CIMB Niaga', ab: 'VA', c: '#2446E8', t: 'va' },
  { id: 'indomaret', g: 'Gerai Retail', label: 'Indomaret', ab: 'IM', c: '#0A3C8C', t: 'store' },
  { id: 'alfamart', label: 'Alfamart', ab: 'AM', c: '#E4002B', t: 'store' },
  { id: 'card', g: 'Kartu', label: 'Kartu Kredit / Debit', sub: 'Visa, Mastercard, JCB', ab: 'CC', c: '#161B3D', t: 'card' },
];

const C_BTN = 'flex w-full items-center justify-center gap-2 rounded-xl bg-cobalt py-3.5 text-sm font-bold text-white shadow-lg shadow-cobalt/25 transition hover:bg-cobalt-deep active:scale-[0.99] disabled:cursor-wait disabled:opacity-60';
const C_INPUT = 'w-full rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cobalt focus:ring-4 focus:ring-cobalt/15 dark:border-night-700 dark:bg-night-800/70';
const C_NOTE = 'text-xs text-slate-500 dark:text-slate-400';
let pay = {};

function applyPlan() {
  const pro = USER.plan === 'Paket Pro';
  $('user-plan').textContent = USER.plan;
  $('user-plan').className = pro ? 'text-xs font-semibold text-sun' : 'text-xs text-white/60';
  $('upgrade-card').classList.toggle('hidden', pro);
}

function setPlan(plan, order) {
  USER.plan = plan;
  try {
    const u = JSON.parse(sessionStorage.getItem(SESSION_KEY)) || { name: USER.name };
    u.plan = plan;
    if (order) u.order = order;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(u));
  } catch (e) {}
  applyPlan();
}

function qrSvg(seed) {
  const N = 21; let h = seed, cells = '';
  const rnd = () => (h = (h * 1664525 + 1013904223) >>> 0) / 4294967296;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const bx = x < 7 ? 0 : x > 13 ? 14 : -1, by = y < 7 ? 0 : y > 13 ? 14 : -1;
    let on;
    if (bx >= 0 && by >= 0 && !(bx === 14 && by === 14)) {
      const lx = x - bx, ly = y - by;
      on = lx === 0 || lx === 6 || ly === 0 || ly === 6 || (lx > 1 && lx < 5 && ly > 1 && ly < 5);
    } else on = rnd() > 0.5;
    if (on) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
  }
  return `<svg viewBox="0 0 21 21" class="h-44 w-44" fill="currentColor" shape-rendering="crispEdges" role="img" aria-label="Contoh kode QRIS (simulasi)">${cells}</svg>`;
}

function fmtCard(el) { el.value = el.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim(); }
function fmtExp(el) { const d = el.value.replace(/\D/g, '').slice(0, 4); el.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; }

const BANKS = ['BCA', 'Mandiri', 'BNI', 'BRI', 'Permata', 'CIMB Niaga'];
const badge = (m, cls = 'h-10 w-10 text-sm') => `<span class="flex ${cls} shrink-0 items-center justify-center rounded-xl font-extrabold text-white" style="background:${m.c}" aria-hidden="true">${m.ab}</span>`;
const codeBox = (title, num) => `<div class="mt-3 rounded-xl border border-dashed border-cobalt/40 bg-cobalt/5 p-4 text-center"><p class="${C_NOTE}">${title}</p><p class="mt-1 font-display text-xl font-bold tracking-wider">${num}</p></div>`;
const steps = list => `<ol class="list-decimal space-y-1 pl-5 text-sm text-slate-600 dark:text-slate-300">${list.map(t => `<li>${t}</li>`).join('')}</ol>`;
const LBL = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300';

function detailHtml(m) {
  if (m.t === 'qr') return `<div class="flex flex-col items-center gap-3 text-center">
    <div class="rounded-2xl bg-white p-3 text-[#161B3D] shadow-sm ring-1 ring-slate-200 dark:ring-0">${qrSvg(pay.seed)}</div>
    <p class="text-sm text-slate-600 dark:text-slate-300">Pindai dengan aplikasi e-wallet atau mobile banking, lalu tekan tombol di bawah setelah membayar.</p></div>`;
  if (m.t === 'wallet') return `<label for="pay-phone" class="${LBL}">Nomor HP ${m.label}</label>
    <input id="pay-phone" class="${C_INPUT}" required type="tel" inputmode="numeric" autocomplete="off" pattern="08[0-9]{8,11}" title="Contoh: 081234567890" placeholder="081234567890">
    <p class="mt-2 ${C_NOTE}">Permintaan pembayaran dikirim ke aplikasi ${m.label}. Buka aplikasinya lalu konfirmasi.</p>`;
  if (m.t === 'mbank') return steps([`Buka aplikasi ${m.label}`, 'Pilih menu Bayar, lalu Virtual Account', 'Masukkan kode bayar di bawah dan konfirmasi']) + codeBox('Kode bayar', pay.va);
  if (m.t === 'va') return `<label for="pay-bank" class="${LBL}">Pilih bank</label>
    <select id="pay-bank" onchange="setBank(this.value)" class="${C_INPUT}">${BANKS.map(b => `<option ${b === pay.bank ? 'selected' : ''}>${b}</option>`).join('')}</select>` + codeBox(`Nomor virtual account ${pay.bank}`, pay.va);
  if (m.t === 'store') return steps([`Tunjukkan kode ini ke kasir ${m.label}`, `Bayar tunai ${rupiah(PRICE)}`, 'Simpan struk, lalu tekan tombol di bawah']) + codeBox('Kode pembayaran', pay.code);
  return `<div class="space-y-3">
    <input class="${C_INPUT}" required autocomplete="off" placeholder="Nama di kartu" aria-label="Nama di kartu">
    <input class="${C_INPUT}" required autocomplete="off" inputmode="numeric" pattern="[0-9 ]{19}" title="16 digit nomor kartu" placeholder="Nomor kartu" aria-label="Nomor kartu" oninput="fmtCard(this)">
    <div class="grid grid-cols-2 gap-3">
      <input class="${C_INPUT}" required autocomplete="off" inputmode="numeric" pattern="(0[1-9]|1[0-2])/[0-9]{2}" title="Format BB/TT" placeholder="BB/TT" aria-label="Masa berlaku" oninput="fmtExp(this)">
      <input class="${C_INPUT}" required autocomplete="off" inputmode="numeric" pattern="[0-9]{3,4}" title="3 atau 4 digit" maxlength="4" placeholder="CVV" aria-label="CVV" type="password">
    </div></div>`;
}

function renderPay() {
  const body = $('pay-body'), m = METHODS.find(x => x.id === pay.method);$('pay-back').classList.toggle('hidden', pay.step !== 'method' && pay.step !== 'pay');
  if (pay.step === 'plan') {
    $('pay-title').textContent = 'Langganan NoeX Pro';
    body.innerHTML = `<div class="rounded-2xl bg-gradient-to-br from-cobalt to-cobalt-deep p-5 text-white">
        <div class="flex items-baseline justify-between"><span class="font-display text-xl font-bold">NoeX Pro</span>
          <span class="text-sm"><b class="font-display text-2xl">${rupiah(PRICE)}</b>/bulan</span></div>
        <ul class="mt-4 space-y-2 text-sm">${['Pesan tanpa batas', 'Akses model NoeX Nalar', 'Respons prioritas', 'Riwayat percakapan tak terbatas'].map(t => `<li class="flex items-center gap-2">${ic('check', 'text-sun')}${t}</li>`).join('')}</ul></div>
      <p class="mt-3 ${C_NOTE}">Mode simulasi: tidak ada tagihan sungguhan. Harga dan fitur di atas hanya contoh.</p>
      <button type="button" data-main onclick="payStep('method')" class="${C_BTN} mt-5">Langganan Sekarang</button>`;
  } else if (pay.step === 'method') {
    $('pay-title').textContent = 'Pilih metode pembayaran';
    body.innerHTML = `<div class="flex items-center justify-between rounded-xl bg-slate-100 px-4 py-3 text-sm dark:bg-night-800"><span>NoeX Pro · 1 bulan</span><b>${rupiah(PRICE)}</b></div>` + METHODS.map((x, i) =>
      (x.g ? `<p class="mb-2 mt-5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">${x.g}</p>` : '') +
      `<button type="button" ${i ? '' : 'data-main'} onclick="selectMethod('${x.id}')" class="mb-2 flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-cobalt hover:bg-cobalt/5 dark:border-night-700 dark:hover:border-cobalt-light">${badge(x)}<span class="min-w-0 flex-1"><span class="block text-sm font-semibold">${x.label}</span>${x.sub ? `<span class="block text-xs text-slate-500 dark:text-slate-400">${x.sub}</span>` : ''}</span><span class="text-slate-400">${ic('chev', 'text-base')}</span></button>`).join('');
  } else if (pay.step === 'pay') {
    $('pay-title').textContent = m.t === 'wallet' ? 'Bayar dengan ' + m.label : m.label;
    body.innerHTML = `<form onsubmit="payNow(event)">
      <div class="flex items-center gap-3 rounded-xl bg-slate-100 px-4 py-3 dark:bg-night-800">${badge(m, 'h-9 w-9 text-xs')}<div class="min-w-0 flex-1 text-sm"><p class="truncate font-semibold">${m.label}</p><p class="${C_NOTE}">NoeX Pro · 1 bulan</p></div><b class="text-sm">${rupiah(PRICE)}</b></div>
      <div class="mt-4">${detailHtml(m)}</div>
      <p class="mt-3 text-center ${C_NOTE}">Simulasi. Jangan memasukkan data pembayaran asli.</p>
      <button type="submit" id="pay-submit" data-main class="${C_BTN} mt-4">${m.t === 'wallet' ? 'Bayar dengan ' + m.label : m.t === 'card' ? 'Bayar ' + rupiah(PRICE) : 'Saya sudah bayar'}</button></form>`;
  } else {
    $('pay-title').textContent = 'Pembayaran berhasil';
    const label = m.label;
    body.innerHTML = `<div class="py-2 text-center">
      <div class="up mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sun text-[#161B3D] shadow-lg shadow-sun/30">${ic('check', 'text-3xl')}</div>
      <h3 class="mt-4 font-display text-2xl font-bold">Selamat, kamu sekarang di Paket Pro</h3>
      <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">Pembayaran ${rupiah(PRICE)} lewat ${label} berhasil. Nomor pesanan <b>${pay.order}</b>.</p>
      <button type="button" data-main onclick="closePay()" class="${C_BTN} mt-6">Mulai pakai Pro</button></div>`;
  }
}

function focusMain() {
  const el = $('pay-body').querySelector('input') \vert{}\vert{}$('pay-body').querySelector('[data-main]');
  if (el) el.focus({ preventScroll: true });
}

function openPay() {
  const digits = () => String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  pay = { step: 'plan', method: 'qris', bank: 'BCA', seed: Date.now() % 100000, va: '8808 ' + [digits(), digits(), digits()].join(' '), code: [digits(), digits(), digits()].join(' '), order: null };
  closeMobileSidebar();
  renderPay();
  $('pay-modal').showModal();
  focusMain();
}

function closePay() { $('pay-modal').close(); }
function payStep(step) { pay.step = step; renderPay(); $('pay-body').scrollTop = 0; focusMain(); }
function payBack() { payStep(pay.step === 'pay' ? 'method' : 'plan'); }
function selectMethod(m) { pay.method = m; payStep('pay'); }
function setBank(b) { pay.bank = b; renderPay(); $('pay-bank').focus(); }

function payNow(e) {
  e.preventDefault();
  const btn = $('pay-submit');
  btn.disabled = true;
  btn.textContent = 'Memproses pembayaran…';
  setTimeout(() => {
    pay.order = 'NX-' + Date.now().toString(36).toUpperCase().slice(-6);
    setPlan('Paket Pro', { id: pay.order, method: METHODS.find(x => x.id === pay.method).label, paidAt: new Date().toISOString() });
    pay.step = 'done';
    renderPay();
    focusMain();
  }, 1600);
}

// ===== Event Listener Setup (setelah DOM Siap) =====
document.addEventListener('DOMContentLoaded', () => {
  input = $('input');

  // Event listener input chat
  input.addEventListener('input', () => { autosize(); syncSend(); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(); }
  });

  // Modal event listener
  $('pay-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closePay(); });

  // Sidebar responsif
  DESK.addEventListener('change', closeMobileSidebar);

  // Pulihkan sesi pengguna jika ada
  try {
    const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY));
    if (saved && saved.name) enterApp(saved);
  } catch (e) {}

  // Inisialisasi awal
  applyTheme(document.documentElement.classList.contains('dark'));
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    try { if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches); } catch (err) {}
  });

  renderSidebar();
  renderAll();
  syncSend();
});
