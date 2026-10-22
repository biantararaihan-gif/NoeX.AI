// Konfigurasi Tailwind CSS
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

// Inisialisasi Tema
(function () {
  try {
    var t = localStorage.getItem('noex_theme');
    var dark = t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', dark);
  } catch (e) {}
})();

// Konstanta dan Ikon
const ICON = {
  "eye": ["s", "<path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/>"],
  "eyeOff": ["s", "<path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22\"/>"],
  "mail": ["s", "<path d=\"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z\"/><path d=\"m22 6-10 7L2 6\"/>"],
  "lightbulb": ["s", "<path d=\"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5\"/><path d=\"M9 18h6M10 22h4\"/>"],
  "calendarCheck": ["s", "<path d=\"M8 2v4M16 2v4\"/><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 10h18M9 16l2 2 4-4\"/>"],
  "listCheck": ["s", "<path d=\"m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8\"/>"],
  "x": ["s", "<path d=\"M18 6 6 18M6 6l12 12\"/>"],
  "check": ['s', '<path d="M20 6 9 17l-5-5"/>'],
  "chev": ['s', '<path d="m9 18 6-6-6-6"/>'],
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
const COPY = '<svg class="h-[1em] w-[1em] inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> <span>Salin</span>';
const GROUPS = ['Hari ini', 'Kemarin', '7 hari terakhir'];

const SUGGEST = [
  { icon: 'mail', t: 'Tulis email penawaran', p: 'Bantu aku menulis email penawaran jasa yang singkat dan sopan untuk calon klien baru.' },
  { icon: 'lightbulb', t: 'Jelaskan dengan sederhana', p: 'Jelaskan cara kerja blockchain seolah-olah aku baru pertama kali mendengarnya.' },
  { icon: 'calendarCheck', t: 'Rencana belajar 4 minggu', p: 'Buatkan rencana belajar 4 minggu untuk dasar-dasar desain UI.' },
  { icon: 'listCheck', t: 'Rapikan catatan rapat', p: 'Ubah catatan rapat berantakan menjadi poin tindak lanjut yang jelas.' },
];

// ---------- Persona (system prompt) ----------
const PERSONAS = [
  { id: 'default', name: 'NoeX Standar', sys: 'Kamu adalah NoeX, asisten AI berbahasa Indonesia yang ramah, jelas, dan efektif. Jawab dengan bahasa Indonesia yang natural kecuali diminta bahasa lain.' },
  { id: 'writer', name: 'Penulis', sys: 'Kamu adalah penulis profesional berbahasa Indonesia. Fokus pada struktur yang rapi, gaya yang mengalir, dan kata yang tepat. Selalu tawarkan versi alternatif bila diminta.' },
  { id: 'coder', name: 'Programmer', sys: 'Kamu adalah software engineer senior. Jawab dengan kode yang benar dan bisa langsung dijalankan, sertakan penjelasan singkat, sebutkan edge case, dan sarankan perbaikan performa/keamanan bila relevan.' },
  { id: 'teacher', name: 'Guru', sys: 'Kamu adalah guru yang sabar dan mudah dimengerti. Jelaskan konsep dari dasar dengan analogi sederhana, hindari jargon tanpa penjelasan, dan tutup dengan ringkasan atau pertanyaan pemahaman.' },
  { id: 'business', name: 'Bisnis', sys: 'Kamu adalah konsultan bisnis yang praktis. Berikan analisis tajam, rekomendasi yang bisa dieksekusi, dan bila perlu struktur seperti SWOT, rencana aksi, atau estimasi angka.' },
  { id: 'creative', name: 'Kreatif', sys: 'Kamu adalah partner brainstorming yang berani dan playful. Utamakan ide orisinal, kombinasi tak terduga, dan berikan banyak opsi sebelum menyempit ke satu arah terbaik.' },
  { id: 'custom', name: 'Kustom (system prompt sendiri)', sys: '' },
];

// ---------- Template prompt ----------
const TEMPLATES = [
  { cat: 'Menulis', t: 'Email penawaran singkat', p: 'Bantu aku menulis email penawaran jasa ke calon klien. Konteks: [jelaskan jasa & klien]. Gaya: sopan, singkat, fokus pada manfaat, tutup dengan call to action yang halus.' },
  { cat: 'Menulis', t: 'Perbaiki & rapikan tulisan', p: 'Perbaiki tata bahasa, ejaan, dan alur tulisan berikut tanpa mengubah makna:\n\n[tempel tulisan]' },
  { cat: 'Menulis', t: 'Ringkas jadi 3 poin', p: 'Rangkum teks berikut menjadi maksimal 3 poin utama, langsung ke inti:\n\n[tempel teks]' },
  { cat: 'Kerja', t: 'Rencana kerja 1 minggu', p: 'Buatkan rencana kerja untuk 1 minggu ke depan dengan prioritas tinggi/sedang/rendah, estimasi waktu tiap tugas, dan hasil yang diharapkan. Konteks pekerjaanku: [isi]' },
  { cat: 'Kerja', t: 'Bahan presentasi', p: 'Buat kerangka presentasi 10 slide tentang [topik] untuk audiens [audiens]. Sertakan judul slide, 3 poin utama per slide, dan catatan pembicara singkat.' },
  { cat: 'Kerja', t: 'Balas email sulit', p: 'Tulis balasan email yang profesional namun tegas untuk situasi berikut: [jelaskan situasi]. Mau: [tolak dengan sopan / negosiasi / minta waktu]' },
  { cat: 'Coding', t: 'Jelaskan error', p: 'Jelaskan error berikut: apa penyebabnya, kenapa terjadi, dan cara memperbaikinya dengan contoh kode:\n\n[tempel error + kode]' },
  { cat: 'Coding', t: 'Review kode', p: 'Review kode berikut: temukan bug, masalah keamanan, dan peluang refactor. Urutkan dari paling penting, sertakan perbaikannya:\n\n[tempel kode]' },
  { cat: 'Coding', t: 'Buat fungsi dari spesifikasi', p: 'Buatkan fungsi dengan spesifikasi berikut (bahasa: [JS/Python/dll]):\n- Input: \n- Output: \n- Edge case: \nSertakan contoh pemakaian dan unit test singkat.' },
  { cat: 'Belajar', t: 'Rencana belajar 4 minggu', p: 'Buatkan rencana belajar 4 minggu untuk [topik] dengan level [pemula/menengah]. Susun per minggu: materi, praktik, dan mini-proyek. Alokasikan waktu harian yang realistis.' },
  { cat: 'Belajar', t: 'Jelaskan sederhana', p: 'Jelaskan [konsep] seolah-olah aku baru pertama kali mendengarnya. Gunakan analogi kehidupan sehari-hari, lalu tutup dengan 2 pertanyaan untuk menguji pemahamanku.' },
  { cat: 'Belajar', t: 'Kuis pemahaman', p: 'Buatkan 5 pertanyaan kuis (pilihan ganda + jawaban + penjelasan) tentang [topik] untuk mengukur pemahamanku di level [tingkat].' },
];

function seedChats() {
  return [
    { id: 1, title: 'Ide nama brand kopi lokal', group: 'Hari ini', msgs: [
      { r: 'u', t: 'Bantu aku cari nama brand untuk kedai kopi yang memakai biji lokal.' },
      { r: 'a', t: 'Beberapa arah nama yang bisa kamu pertimbangkan:\n\n**Lereng Kopi**: mengingatkan pada kebun di lereng gunung\n**Biji Tanah**: hangat dan membumi\n**Seduh Pelan**: santai dan mudah diingat\n\nMau saya kembangkan salah satunya, lengkap dengan tagline dan gaya visual?' } ] },
    { id: 2, title: 'Ringkasan rapat mingguan', group: 'Hari ini', msgs: [
      { r: 'u', t: 'Rangkum catatan rapat ini jadi 3 poin tindak lanjut.' },
      { r: 'a', t: 'Tempel catatan rapatnya di sini. Saya ubah jadi tiga poin tindak lanjut, lengkap dengan penanggung jawab dan tenggat.' } ] },
    { id: 3, title: 'Debug fungsi login JavaScript', group: 'Kemarin', msgs: [
      { r: 'u', t: 'Kenapa tombol "Lupa kata sandi" tidak jalan?' },
      { r: 'a', t: 'Cek argumen yang dikirim ke fungsinya. Kalau ada typo pada `event`, browser melempar `ReferenceError` dan handler berhenti sebelum notifikasi muncul.' } ] },
    { id: 4, title: 'Rencana konten Instagram', group: '7 hari terakhir', msgs: [
      { r: 'u', t: 'Buatkan kerangka konten Instagram untuk satu minggu.' },
      { r: 'a', t: 'Kerangka sederhana:\n\n**Senin**: tips singkat\n**Rabu**: di balik layar\n**Jumat**: cerita pelanggan\n\nSaya bisa lengkapi dengan ide caption untuk tiap hari.' } ] },
  ];
}

let chats = [];

function chatKey() { return 'noex_chats_' + (USER.name || 'demo').toLowerCase().replace(/[^a-z0-9]+/g, '_'); }
function loadChats() {
  try { const d = JSON.parse(localStorage.getItem(chatKey())); if (Array.isArray(d)) return d; } catch (e) {}
  return null;
}
function saveChats() {
  try { localStorage.setItem(chatKey(), JSON.stringify(chats)); }
  catch (e) { toast('Penyimpanan lokal penuh — percakapan dengan lampiran besar mungkin tidak tersimpan.'); }
}

let current = null;
let busy = false;
let attachments = [];
let aborter = null;
let simTimer = null;
let renderQueued = false;
const input = $('input');

const ICON_STOP = `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>`;
const ICON_SEND = `<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;

const esc = s => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const inline = s => esc(s)
  .replace(/`([^`]+)`/g, '<code class="rounded bg-slate-100 px-1.5 py-0.5 text-[13px] text-cobalt-deep dark:bg-night-800 dark:text-blue-200">$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/\*([^*]+)\*/g, '<em>$1</em>');

function fmt(src) {
  const lines = String(src || '').split('\n');
  let html = '', listType = null, listItems = [], codeBuf = [], inCode = false;

  const flushList = () => {
    if (!listType) return;
    html += (listType === 'ul' ? '<ul class="my-2 list-disc space-y-1 pl-5">' : '<ol class="my-2 list-decimal space-y-1 pl-5">') + listItems.map(i => '<li class="text-sm leading-relaxed">' + i + '</li>').join('') + (listType === 'ul' ? '</ul>' : '</ol>');
    listType = null; listItems = [];
  };
  const flushCode = () => {
    if (!inCode) return;
    html += '<pre class="my-3 overflow-x-auto rounded-xl bg-night-900 p-4 font-mono text-[13px] leading-relaxed text-slate-100 dark:bg-night-950">' + (codeBuf.length ? esc(codeBuf.join('\n')) : '') + '</pre>';
    codeBuf = []; inCode = false;
  };

  for (const raw of lines) {
    if (raw.trim().startsWith('```')) { if (inCode) flushCode(); else { flushList(); inCode = true; } continue; }
    if (inCode) { codeBuf.push(raw); continue; }

    const head = raw.match(/^(#{1,4})\s+(.*)$/);
    if (head) {
      flushList();
      const lv = head[1].length;
      const size = lv === 1 ? 'text-lg' : lv === 2 ? 'text-base' : 'text-sm';
      html += `<h${lv + 1} class="font-display ${size} mb-1.5 mt-4 font-bold">${inline(head[2])}</h${lv + 1}>`;
      continue;
    }
    const ul = raw.match(/^\s*[-*+]\s+(.*)$/);
    if (ul) { if (listType !== 'ul') { flushList(); listType = 'ul'; } listItems.push(inline(ul[1])); continue; }
    const ol = raw.match(/^\s*\d+[.)]\s+(.*)$/);
    if (ol) { if (listType !== 'ol') { flushList(); listType = 'ol'; } listItems.push(inline(ol[1])); continue; }
    if (/^\s*>\s?/.test(raw)) { flushList(); html += '<blockquote class="my-2 border-l-4 border-cobalt/40 pl-3 italic text-slate-500 dark:text-slate-400">' + inline(raw.replace(/^\s*>\s?/, '')) + '</blockquote>'; continue; }
    if (!raw.trim()) { flushList(); continue; }

    flushList();
    html += '<p class="mb-2 last:mb-0">' + inline(raw) + '</p>';
  }
  flushList(); flushCode();
  return html;
}

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
          return `<div class="group relative">
            <button type="button" onclick="openChat(${c.id})" ${on ? 'aria-current="true"' : ''} class="relative flex w-full items-center rounded-xl px-3 py-2.5 pr-9 text-left text-sm transition ${on ? 'bg-white/15 font-semibold text-white' : 'text-white/75 hover:bg-white/10 hover:text-white'}">${on ? '<span class="absolute inset-y-2 left-0 w-1 rounded-full bg-sun"></span>' : ''}<span class="truncate">${esc(c.title)}</span></button>
            <button type="button" onclick="deleteChatById(${c.id})" class="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded-md p-1 text-white/50 transition hover:bg-white/15 hover:text-red-300 focus-within:block group-hover:block" aria-label="Hapus percakapan ${esc(c.title)}">${ic('x', 'text-xs')}</button>
          </div>`;
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

function handleFileSelect(e) {
  const files = Array.from(e.target.files);
  files.forEach(file => {
    if (file.size > 2 * 1024 * 1024) { toast('"' + file.name + '" melebihi 2 MB dan dilewati.'); return; }
    const isImage = file.type.startsWith('image/');
    const reader = new FileReader();
    reader.onload = (evt) => {
      attachments.push({
        name: file.name,
        type: file.type,
        size: (file.size / 1024).toFixed(1) + ' KB',
        url: evt.target.result,
        isImage: isImage
      });
      renderAttachments();
      syncSend();
    };
    reader.readAsDataURL(file);
  });
  e.target.value = '';
}

function removeAttachment(index) {
  attachments.splice(index, 1);
  renderAttachments();
  syncSend();
}

function renderAttachments() {
  const box = $('attachment-preview');
  if (!attachments.length) {
    box.classList.add('hidden');
    box.classList.remove('flex');
    box.innerHTML = '';
    return;
  }
  box.classList.remove('hidden');
  box.classList.add('flex');
  box.innerHTML = attachments.map((f, i) => `
    <div class="relative flex items-center gap-2 rounded-lg bg-slate-100 dark:bg-night-700 px-3 py-1.5 text-xs font-medium text-ink dark:text-slate-200">
      ${f.isImage 
        ? `<img src="${f.url}" class="h-6 w-6 rounded object-cover" alt="Preview">` 
        : `<svg class="h-4 w-4 text-cobalt dark:text-cobalt-light shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`
      }
      <span class="max-w-[120px] truncate">${esc(f.name)}</span>
      <button type="button" onclick="removeAttachment(${i})" class="ml-1 rounded p-0.5 text-slate-400 hover:text-red-500 transition" aria-label="Hapus lampiran">&times;</button>
    </div>
  `).join('');
}

function handleSendClick() {
  if (busy) {
    stopResponse();
  } else {
    send();
  }
}

function stopResponse() {
  if (!busy) return;
  if (aborter) {
    aborter.abort();
  } else if (simTimer) {
    clearInterval(simTimer);
    simTimer = null;
    const m = current.msgs[current.msgs.length - 1];
    if (m && m.stream) {
      m.t += '\n\n_[Respon dibatalkan oleh pengguna]_';
      m.stream = false;
    }
    busy = false;
    saveChats();
    syncSend();
    renderAll();
  }
}

function syncSend() {
  const btn = $('send');
  if (busy) {
    btn.disabled = false;
    btn.className = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-md shadow-red-600/25 transition hover:bg-red-700 active:scale-[0.99]";
    btn.setAttribute('aria-label', 'Batal respon');
    btn.setAttribute('title', 'Hentikan respon AI');
    btn.innerHTML = ICON_STOP;
  } else {
    const hasInput = !!input.value.trim() || attachments.length > 0;
    btn.disabled = !hasInput;
    btn.className = "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cobalt text-white shadow-md shadow-cobalt/25 transition hover:bg-cobalt-deep active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40";
    btn.setAttribute('aria-label', 'Kirim pesan');
    btn.setAttribute('title', 'Kirim pesan');
    btn.innerHTML = ICON_SEND;
  }
}

// ---------- Integrasi model AI ----------
const SETTINGS_KEY = 'noex_settings';
let SERVER_CFG = { hasServerKey: false, defaultBase: '[https://api.openai.com/v1](https://api.openai.com/v1)', fetched: false };

async function fetchServerConfig() {
  try {
    const r = await fetch('/api/config', { cache: 'no-store' });
    if (r.ok) {
      const j = await r.json();
      SERVER_CFG = { hasServerKey: !!j.hasServerKey, defaultBase: j.defaultBase || SERVER_CFG.defaultBase, allowedHosts: j.allowedHosts || [], fetched: true };
    }
  } catch (e) {}
  renderServerStatus();
  return SERVER_CFG;
}

function renderServerStatus() {
  const dot = $('server-dot'), txt =$('server-status-text');
  if (!dot || !txt) return;
  if (SERVER_CFG.hasServerKey) {
    dot.className = 'h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500';
    txt.innerHTML = '<b>Server terhubung.</b> API key terkonfigurasi di server — kolom API key di bawah bisa dikosongkan. Identitas kunci tidak pernah menyentuh browser.';
  } else if (SERVER_CFG.fetched) {
    dot.className = 'h-2.5 w-2.5 shrink-0 rounded-full bg-amber-400';
    txt.innerHTML = '<b>Server berjalan tanpa key.</b> Masukkan API key di bawah (BYOK) untuk jawaban sungguhan, atau kosongkan untuk mode simulasi.';
  } else {
    dot.className = 'h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400';
    txt.textContent = 'Mode statis / server belum terdeteksi — semua permintaan model butuh API key lokal.';
  }
}
fetchServerConfig();

function getSettings() {
  try {
    const s = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
    return {
      base: s.base || '[https://api.openai.com/v1](https://api.openai.com/v1)',
      key: s.key || '',
      persona: s.persona || 'default',
      sysprompt: s.sysprompt || '',
      models: {
        cepat: (s.models && s.models.cepat) || 'gpt-4o-mini',
        pro: (s.models && s.models.pro) || 'gpt-4o',
        nalar: (s.models && s.models.nalar) || 'o3-mini',
      },
    };
  } catch (e) {
    return { base: '[https://api.openai.com/v1](https://api.openai.com/v1)', key: '', persona: 'default', sysprompt: '', models: { cepat: 'gpt-4o-mini', pro: 'gpt-4o', nalar: 'o3-mini' } };
  }
}

function initPersonaSelects() {
  const opts = PERSONAS.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  $('persona').innerHTML = opts;
  $('set-persona').innerHTML = opts;
  syncPersonaSelect();
}

function personaName(id) { const p = PERSONAS.find(x => x.id === id); return p ? p.name : 'NoeX Standar'; }

function sysPromptFor(id) {
  if (id === 'custom') return getSettings().sysprompt.trim();
  const p = PERSONAS.find(x => x.id === id);
  return p ? p.sys : '';
}

function onPersonaChange() {
  const v = $('persona').value;
  if (current) {
    current.persona = v;
    saveChats();
    toast('Persona percakapan ini: ' + personaName(v));
  } else {
    try {
      const raw = JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
      raw.persona = v;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(raw));
    } catch (e) {}
    toast('Persona bawaan: ' + personaName(v));
  }
}

function syncPersonaSelect() {
  const id = (current && current.persona) || getSettings().persona;
  if ($('persona').value !== id)$('persona').value = id;
}

function openSettings() {
  const s = getSettings();
  $('set-base').value = s.base;
  $('set-key').value = s.key;
  $('set-fast').value = s.models.cepat;
  $('set-pro').value = s.models.pro;
  $('set-nalar').value = s.models.nalar;
  $('set-persona').value = s.persona;
  $('set-sysprompt').value = s.sysprompt;
  fetchServerConfig();
  $('settings-modal').showModal();$('set-base').focus();
}

function closeSettings() { $('settings-modal').close(); }

function saveSettings(e) {
  e.preventDefault();
  const s = {
    base: $('set-base').value.trim() || '[https://api.openai.com/v1](https://api.openai.com/v1)',
    key: $('set-key').value.trim(),
    persona: $('set-persona').value || 'default',
    sysprompt: $('set-sysprompt').value.trim(),
    models: {
      cepat: $('set-fast').value.trim() || 'gpt-4o-mini',
      pro: $('set-pro').value.trim() || 'gpt-4o',
      nalar: $('set-nalar').value.trim() || 'o3-mini',
    },
  };
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(s)); } catch (err) {}
  if (s.persona === 'custom' && !s.sysprompt) {
    toast('⚠️ Persona Kustom dipilih tapi system prompt kosong — AI tetap pakai gaya default.');
  } else {
    toast((SERVER_CFG.hasServerKey || s.key)
      ? 'Pengaturan tersimpan — respons kini dari model sungguhan.'
      : 'Tersimpan — mode simulasi aktif (tanpa API key).');
  }
  syncPersonaSelect();
  closeSettings();
}

function clearSettings() {
  try { localStorage.removeItem(SETTINGS_KEY); } catch (e) {}
  $('set-key').value = '';
  $('set-sysprompt').value = '';$('set-persona').value = 'default';
  syncPersonaSelect();
  toast(SERVER_CFG.hasServerKey
    ? 'Konfigurasi lokal dihapus — tetap pakai API key server.'
    : 'Konfigurasi dihapus. Mode simulasi aktif.');
}

const toHist = (msgs, personaId) => {
  const hist = msgs
    .filter(m => !m.stream)
    .map(m => ({
      role: m.r === 'u' ? 'user' : 'assistant',
      content: m.r === 'u' && m.files && m.files.length
        ? (m.t ? m.t + '\n' : '') + '[Lampiran: ' + m.files.map(f => f.name).join(', ') + ']'
        : (m.t || ''),
    }))
    .filter(m => m.content);
  const sys = sysPromptFor(personaId);
  return sys ? [{ role: 'system', content: sys }, ...hist] : hist;
};

async function streamAI(s, history, onChunk, aborter) {
  const res = await fetch('/api/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      base: s.base,
      model: s.models[$('model').value] || s.models.pro,
      messages: history,
      stream: true,
      temperature: 0.7,
      apiKey: SERVER_CFG.hasServerKey ? undefined : (s.key || undefined),
    }),
    signal: aborter.signal,
  });
  if (res.status === 401 && res.headers.get('x-noex-error') === 'no-key') {
    const err = new Error('NO_KEY');
    err.code = 'NO_KEY';
    throw err;
  }
  if (!res.ok) {
    let d = '';
    try { d = await res.text(); } catch (e) {}
    throw new Error('HTTP ' + res.status + (d ? ' — ' + d.slice(0, 180) : ''));
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let nl;
    while ((nl = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, nl).trim();
      buf = buf.slice(nl + 1);
      if (!line.startsWith('data:')) continue;
      const data = line.slice(5).trim();
      if (data === '[DONE]') return;
      try {
        const j = JSON.parse(data);
        const d = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
        if (d) onChunk(d);
      } catch (e) {}
    }
  }
}

function simText(history) {
  const last = history[history.length - 1];
  return 'Ini jawaban contoh karena belum ada API key (mode simulasi).\n\n**Pesanmu:** ' + (last ? last.content : '');
}

function simStream(text, onChunk, onDone) {
  const parts = text.split(/(\s+)/);
  let i = 0;
  const timer = setInterval(() => {
    if (i >= parts.length) { clearInterval(timer); onDone(); return; }
    onChunk(parts[i]); i++;
  }, 28);
  return timer;
}

async function runAssistant(chat, history) {
  const s = getSettings();
  const m = { r: 'a', t: '', stream: true };
  chat.msgs.push(m);
  busy = true;
  syncSend();
  renderAll();

  const append = (d) => { m.t += d; scheduleRender(); };
  const settle = () => {
    m.stream = false;
    busy = false;
    aborter = null;
    simTimer = null;
    saveChats();
    syncSend();
    renderAll();
  };

  const useApi = SERVER_CFG.hasServerKey || !!s.key;

  try {
    if (useApi) {
      aborter = new AbortController();
      await streamAI(s, history, append, aborter);
    } else {
      await new Promise((res) => { simTimer = simStream(simText(history), append, res); });
    }
    settle();
  } catch (err) {
    if (err && err.name === 'AbortError') {
      m.t += '\n\n_[Respon dibatalkan oleh pengguna]_';
      settle();
    } else if (err && err.code === 'NO_KEY') {
      SERVER_CFG.hasServerKey = false;
      renderServerStatus();
      m.t = '';
      await new Promise((res) => { simTimer = simStream(simText(history) + '\n\n_(Mode simulasi — tambahkan API key lewat pengaturan AI untuk jawaban sungguhan.)_', append, res); });
      settle();
    } else {
      m.t = '⚠️ **Gagal memanggil model:** ' + (err && err.message ? err.message : err) +
        '\n\nPeriksa kembali pengaturan AI (ikon ⚙️ di atas): base URL, API key, dan nama model. Kalau API key dikosongkan, NoeX menjawab dalam mode simulasi.';
      settle();
    }
  }
}

function scheduleRender() {
  if (renderQueued) return;
  renderQueued = true;
  requestAnimationFrame(() => { renderQueued = false; renderAll(); });
}

function regenerateMsg(i) {
  if (busy || !current) return;
  current.msgs.splice(i, 1);
  saveChats();
  runAssistant(current, toHist(current.msgs, current.persona));
}

function feedbackMsg(i, type) {
  if (!current || !current.msgs[i]) return;
  current.msgs[i].feedback = current.msgs[i].feedback === type ? null : type;
  saveChats();
  renderAll();
}

function row(m, i) {
  if (m.r === 'u') {
    let filesHtml = '';
    if (m.files && m.files.length) {
      filesHtml = `<div class="mb-2 flex flex-wrap gap-2">` + m.files.map(f => {
        if (f.isImage) {
          return `<a href="${f.url}" target="_blank" class="block overflow-hidden rounded-xl border border-white/20"><img src="${f.url}" class="max-h-48 max-w-full object-cover" alt="${esc(f.name)}"></a>`;
        }
        return `<div class="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold text-white"><svg class="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg><span class="truncate max-w-[150px]">${esc(f.name)}</span></div>`;
      }).join('') + `</div>`;
    }
    return `<div class="flex justify-end"><div class="max-w-[85%] break-words rounded-2xl rounded-br-md bg-cobalt px-4 py-3 text-sm leading-relaxed text-white shadow-md shadow-cobalt/20">${filesHtml}${m.t ? `<div>${esc(m.t)}</div>` : ''}</div></div>`;
  }

  const isLiked = m.feedback === 'like';
  const isDisliked = m.feedback === 'dislike';

  return `<div class="flex gap-3"><div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sun">${MARK}</div>
    <div class="min-w-0 flex-1"><div class="text-sm leading-relaxed">${fmt(m.t)}</div>
    <div class="mt-2.5 flex items-center gap-3 text-xs text-slate-400">
      <button type="button" onclick="copyMsg(${i}, this)" class="flex items-center gap-1 font-semibold transition hover:text-cobalt dark:hover:text-cobalt-light">${COPY}</button>
      <button type="button" onclick="regenerateMsg(${i})" class="flex items-center gap-1 font-semibold transition hover:text-cobalt dark:hover:text-cobalt-light">
        <svg class="h-[1em] w-[1em] inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21.5 2v6h-6M2.5 22v-6h6"/><path d="M2 11.5a10 10 0 0 1 18.8-4.3L21.5 8M22 12.5a10 10 0 0 1-18.8 4.3L2.5 16"/></svg>
        <span>Coba lagi</span>
      </button>
      <div class="ml-1 flex items-center gap-1">
        <button type="button" onclick="feedbackMsg(${i}, 'like')" aria-label="Suka respon" class="p-1 rounded transition ${isLiked ? 'text-cobalt dark:text-cobalt-light font-bold' : 'hover:text-cobalt dark:hover:text-cobalt-light'}">
          <svg class="h-[1.1em] w-[1.1em] inline-block shrink-0" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
        </button>
        <button type="button" onclick="feedbackMsg(${i}, 'dislike')" aria-label="Tidak suka respon" class="p-1 rounded transition ${isDisliked ? 'text-red-500 font-bold' : 'hover:text-red-500'}">
          <svg class="h-[1.1em] w-[1.1em] inline-block shrink-0" viewBox="0 0 24 24" fill="${isDisliked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/></svg>
        </button>
      </div>
    </div></div></div>`;
}

const TYPING = `<div class="up flex gap-3"><div class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sun">${MARK}</div>
  <div class="flex items-center gap-1.5 pt-3" role="img" aria-label="NoeX sedang mengetik">
    <span class="dot h-2 w-2 rounded-full bg-cobalt"></span><span class="dot h-2 w-2 rounded-full bg-cobalt" style="animation-delay:.15s"></span><span class="dot h-2 w-2 rounded-full bg-cobalt" style="animation-delay:.3s"></span>
  </div></div>`;

function renderAll() {
  renderHistory();
  $('chat-title').textContent = current ? current.title : 'Percakapan baru';
  syncPersonaSelect();
  const box = $('messages');
  if (current) {
    const visible = current.msgs.filter(m => !(m.stream && !m.t));
    const last = current.msgs[current.msgs.length - 1];
    const typing = busy && (!last || !last.stream || last.t) ? TYPING : '';
    box.innerHTML = `<div class="mx-auto max-w-3xl space-y-6 px-4 py-6 sm:px-6">${visible.map(row).join('')}${typing}</div>`;
  } else {
    box.innerHTML = welcome();
  }
  box.scrollTop = box.scrollHeight;
}

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
DESK.addEventListener('change', closeMobileSidebar);
renderSidebar();

function newChat() { current = null; renderAll(); closeMobileSidebar(); input.focus(); }
function openChat(id) { current = chats.find(c => c.id === id); renderAll(); closeMobileSidebar(); input.focus(); }

function autosize() { input.style.height = 'auto'; input.style.height = Math.min(input.scrollHeight, 160) + 'px'; }

// ---------- Kelola percakapan ----------
function renameChat() {
  if (!current) { toast('Mulai atau pilih percakapan dulu.'); return; }
  const h = $('chat-title');
  const inp = document.createElement('input');
  inp.value = current.title;
  inp.className = 'min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-display text-base font-bold text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/15 dark:border-night-700 dark:bg-night-800 dark:text-slate-100';
  let done = false;
  const commit = () => { if (done) return; done = true; const t = inp.value.trim(); if (t && t !== current.title) { current.title = t; saveChats(); } renderAll(); };
  const cancel = () => { if (done) return; done = true; renderAll(); };
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); commit(); } else if (e.key === 'Escape') { cancel(); } });
  inp.addEventListener('blur', commit);
  h.replaceWith(inp);
  inp.focus();
  inp.select();
}

function exportChat() {
  if (!current) { toast('Mulai atau pilih percakapan dulu.'); return; }
  if (busy) { toast('Tunggu respons selesai dulu.'); return; }
  const md = '# ' + current.title + '\n\n' + current.msgs.map(m =>
    (m.r === 'u' ? '**Kamu**' : '**NoeX**') + ':\n\n' + m.t +
    (m.files && m.files.length ? '\n\n_Lampiran: ' + m.files.map(f => f.name).join(', ') + '_' : '')
  ).join('\n\n---\n\n');
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (current.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'percakapan') + '.md';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  toast('Percakapan diekspor sebagai .md');
}

function deleteChat() {
  if (!current) { toast('Mulai atau pilih percakapan dulu.'); return; }
  if (!confirm('Hapus percakapan "' + current.title + '"? Tindakan ini tidak bisa dibatalkan.')) return;
  const id = current.id;
  chats = chats.filter(c => c.id !== id);
  current = null;
  saveChats();
  renderAll();
}

function deleteChatById(id) {
  const c = chats.find(x => x.id === id);
  if (!c) return;
  if (!confirm('Hapus percakapan "' + c.title + '"? Tindakan ini tidak bisa dibatalkan.')) return;
  chats = chats.filter(x => x.id !== id);
  if (current && current.id === id) current = null;
  saveChats();
  renderAll();
}

function toggleChatMenu(force) {
  const m = $('chat-menu');
  const open = force !== undefined ? force : m.classList.contains('hidden');
  m.classList.toggle('hidden', !open);
  $('chat-menu-btn').setAttribute('aria-expanded', String(open));
}

function menuAction(a) { toggleChatMenu(false); if (a === 'rename') renameChat(); else if (a === 'export') exportChat(); else deleteChat(); }
document.addEventListener('click', e => { if (!e.target.closest('#chat-menu-wrap')) toggleChatMenu(false); });

// ---------- Kirim pesan ----------
function send(text) {
  text = (text ?? input.value).trim();
  if ((!text && attachments.length === 0) || busy) return;

  if (!current) {
    const titleText = text || (attachments[0] ? `Berkas: ${attachments[0].name}` : 'Percakapan baru');
    current = { id: Date.now(), title: titleText.length > 32 ? titleText.slice(0, 32) + '…' : titleText, group: 'Hari ini', persona: getSettings().persona, msgs: [] };
    chats.unshift(current);
  }

  const chat = current;
  chat.msgs.push({ 
    r: 'u', 
    t: text, 
    files: [...attachments] 
  });

  input.value = ''; 
  attachments = []; 
  renderAttachments();
  autosize();
  saveChats();
  runAssistant(chat, toHist(chat.msgs, chat.persona));
}

async function copyMsg(i, btn) {
  try {
    await navigator.clipboard.writeText(current.msgs[i].t);
    btn.innerHTML = '<svg class="h-[1em] w-[1em] inline-block shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg> <span>Tersalin</span>';
  } catch (e) {
    btn.textContent = 'Gagal';
  }
  setTimeout(() => { btn.innerHTML = COPY; }, 1500);
}

input.addEventListener('input', () => { autosize(); syncSend(); });
input.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(); }
});

renderAll();
syncSend();

// Autentikasi
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
  const stored = loadChats();
  chats = stored !== null ? stored : seedChats();
  if (stored === null) saveChats();
  current = null;
  closeMobileSidebar();
  renderAll();
  input.focus();
}

function logout() {
  if (busy) stopResponse();
  saveChats();
  chats = [];
  current = null;
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

try {
  const saved = JSON.parse(sessionStorage.getItem(SESSION_KEY));
  if (saved && saved.name) enterApp(saved);
} catch (e) {}

// Tema
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

applyTheme(document.documentElement.classList.contains('dark'));
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  try { if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches); } catch (err) {}
});

// Toast Notifikasi
let toastTimer = null;
function toast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.remove('opacity-0');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add('opacity-0'), 2600);
}

$('settings-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeSettings(); });

// ---------- Modal Template Prompt ----------
function openTemplates() {
  renderTemplates();
  $('prompt-modal').showModal();
  $('tpl-search').value = '';
  $('tpl-search').focus();
}

function closeTemplates() { $('prompt-modal').close(); }

function renderTemplates() {
  const q = ($('tpl-search').value || '').trim().toLowerCase();
  const list = TEMPLATES
    .map((t, i) => ({ ...t, i }))
    .filter(t => !q || t.t.toLowerCase().includes(q) || t.p.toLowerCase().includes(q) || t.cat.toLowerCase().includes(q));
  if (!list.length) {
    $('tpl-list').innerHTML = '<p class="py-6 text-center text-sm text-slate-500 dark:text-slate-400">Tidak ada template yang cocok.</p>';
    return;
  }
  const cats = [...new Set(list.map(t => t.cat))];
  $('tpl-list').innerHTML = cats.map(cat => `
    <p class="mb-2 mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 first:mt-0 dark:text-slate-400">${cat}</p>
    ${list.filter(t => t.cat === cat).map(t => `
      <button type="button" onclick="useTemplate(${t.i})" class="mb-1.5 flex w-full items-start gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:border-cobalt hover:bg-cobalt/5 dark:border-night-700 dark:hover:border-cobalt-light">
        <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cobalt/10 text-cobalt dark:text-cobalt-light">${ic('listCheck')}</span>
        <span class="min-w-0 flex-1">
          <span class="block text-sm font-semibold">${esc(t.t)}</span>
          <span class="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">${esc(t.p.replace(/\n/g, ' ').slice(0, 90))}…</span>
        </span>
        <span class="mt-1 text-slate-400">${ic('chev')}</span>
      </button>`).join('')}`).join('');
}

function useTemplate(i) {
  const t = TEMPLATES[i];
  if (!t) return;
  input.value = t.p;
  closeTemplates();
  autosize();
  syncSend();
  input.focus();
  toast('Template "' + t.t + '" dimuat — sesuaikan lalu kirim.');
}
$('prompt-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeTemplates(); });

initPersonaSelects();

// ---------- Checkout Modal ----------
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
  const body = $('pay-body'), m = METHODS.find(x => x.id === pay.method);
  $('pay-back').classList.toggle('hidden', pay.step !== 'method' && pay.step !== 'pay');
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
  const el = $('pay-body').querySelector('input') || $('pay-body').querySelector('[data-main]');
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

$('pay-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closePay(); });
