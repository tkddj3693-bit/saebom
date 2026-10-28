// 새봄 주문서 앱 — 입력값은 이 화면에만 있고 어디에도 저장되지 않음 (닫으면 사라짐)
const $ = (s, el = document) => el.querySelector(s);
const app = $('#app');
let form = null;           // 지금 쓰는 서식 정의
let st = null;             // { c: Set(체크 번호), t: {칸번호: 값}, same: {} }
let frameReady = null;     // 서식 iframe 로드 Promise

const esc = s => String(s).replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
const toast = msg => { const d = document.createElement('div'); d.className = 'toast'; d.textContent = msg; document.body.appendChild(d); setTimeout(() => d.remove(), 2600); };
const todayISO = () => { const d = new Date(); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 10); };
const fmtDate = iso => iso ? iso.split('-').map((v, i) => i ? String(+v) : v).join('. ') + '.' : '';
const dirty = () => st && (st.c.size > (form.initC || []).length || Object.entries(st.t).some(([k, v]) => v && v !== (st.auto || {})[k] && v !== initOf(k)));
const initOf = k => { const it = form && allItems().find(i => String(i.t) === String(k)); return it ? it.init : undefined; };

/* ---------- 첫 화면 ---------- */
function home() {
  form = null; st = null; history.replaceState({}, '', '#');
  app.innerHTML = `<header><h1>새봄 주문서<small>제조사 · 서식을 고르세요</small></h1></header><main>` +
    BRANDS.map(b => `<div class="brand"><h2>${esc(b.name)}</h2>` +
      b.forms.map(f => FORMS[f.id] ? `<button class="fbtn" data-id="${f.id}">${esc(f.name)}</button>` : `<button class="fbtn off" disabled>${esc(f.name)}</button>`).join('') +
      `</div>`).join('') +
    `<p class="foot">입력한 내용은 어디에도 저장되지 않아요. 보내고 나면 화면을 닫으면 돼요.<br>새봄 주문서 v1.1 (2026-10-28)</p></main>`;
  app.querySelectorAll('.fbtn[data-id]').forEach(b => b.onclick = () => openForm(b.dataset.id));
  window.scrollTo(0, 0);
}

/* ---------- 입력 화면 ---------- */
// 서식 정의의 모든 항목 (항목마다 _k = '구역번호_항목번호')
function allItems() {
  const out = [];
  form.sections.forEach((s, si) => s.items.forEach((it, ii) => { it._k = si + '_' + ii; out.push(it); }));
  return out;
}
const isStr = v => typeof v === 'string';
function openForm(id) {
  form = FORMS[id]; form.id = id;
  st = { c: new Set(form.initC || []), t: {}, same: {} };
  allItems().forEach((it, n) => {
    if ((it.type === 'lrtext' || it.type === 'lrchoice') && st.same[it._k] === undefined) st.same[it._k] = it.same !== false;
    if (it.init !== undefined && it.t !== undefined) st.t[it.t] = it.init;
  });
  history.pushState({ f: id }, '', '#' + id);
  frameReady = new Promise(res => { const f = $('#frame'); f.onload = () => res(f); f.src = form.template; });
  render();
}

function chipHTML(it, idx, k) {
  const on = st.c.has(idx);
  return `<button class="chip${on ? ' on' : ''}" data-c="${idx}" data-g="${k}">${esc(it.o[it.c ? it.c.indexOf(idx) : idx])}${it.def === (it.c ? it.c.indexOf(idx) : -1) ? '<span class="d">기본</span>' : ''}</button>`;
}

function itemHTML(it, k) {
  const tip = it.tip ? `<div class="tip">※ ${esc(it.tip)}</div>` : '';
  switch (it.type) {
    case 'date': {
      if (it.today && st.t[it.t] === undefined) { st.t[it.t] = todayISO(); (st.auto = st.auto || {})[it.t] = st.t[it.t]; }
      return `<div class="it"><label class="l">${esc(it.label)}</label><input type="date" data-t="${it.t}" value="${esc(st.t[it.t] || '')}">${tip}</div>`;
    }
    case 'text':
      return `<div class="it"><label class="l">${esc(it.label)}</label><input type="text" data-t="${it.t}" ${it.numeric ? 'inputmode="numeric"' : ''} value="${esc(st.t[it.t] || '')}" autocomplete="off">${tip}</div>`;
    case 'textarea':
      return `<div class="it"><label class="l">${esc(it.label)}</label><textarea data-t="${it.t}">${esc(st.t[it.t] || '')}</textarea>${tip}</div>`;
    case 'choice':
      return `<div class="it"><div class="l">${esc(it.label)}${it.single ? '' : ' <span style="font-weight:400;color:var(--mut);font-size:.82rem">(여러 개 가능)</span>'}</div><div class="chips">${it.c.map(i => chipHTML(it, i, k)).join('')}</div>${tip}</div>`;
    case 'lrtext':
      return `<div class="it"><div class="l">${esc(it.label)}</div>
        <div class="lr"><b class="L">L</b><input type="text" data-t="${it.L}" data-lr="${k}" value="${esc(st.t[it.L] || '')}" placeholder="왼쪽" autocomplete="off"></div>
        <label class="same"><input type="checkbox" data-same="${k}" ${st.same[k] ? 'checked' : ''}>오른쪽도 같게</label>
        <div class="lr"><b class="R">R</b><input type="text" data-t="${it.R}" value="${esc(st.t[it.R] || '')}" placeholder="오른쪽" autocomplete="off" ${st.same[k] ? 'disabled' : ''}></div>${tip}</div>`;
    case 'lrchoice': {
      const row = (side, arr) => `<div class="lr"><b class="${side}">${side}</b><div class="chips">${arr.map((i, n) => `<button class="chip${st.c.has(i) ? ' on' : ''}" data-c="${i}" data-g="${k}${side}" data-lrc="${side}" data-n="${n}" ${side === 'R' && st.same[k] ? 'disabled style="opacity:.55"' : ''}>${esc(it.o[n])}</button>`).join('')}</div></div>`;
      return `<div class="it"><div class="l">${esc(it.label)}</div>${row('L', it.L)}<label class="same"><input type="checkbox" data-same="${k}" ${st.same[k] ? 'checked' : ''}>오른쪽도 같게</label>${row('R', it.R)}${tip}</div>`;
    }
    case 'aud':
      return `<div class="it"><table class="aud"><tr><th>Hz</th><th class="L">L (왼쪽)</th><th class="R">R (오른쪽)</th></tr>` +
        it.freqs.map((f, n) => `<tr><td class="f">${f}</td><td><input type="text" inputmode="numeric" data-t="${it.L[n]}" value="${esc(st.t[it.L[n]] || '')}"></td><td><input type="text" inputmode="numeric" data-t="${it.R[n]}" value="${esc(st.t[it.R[n]] || '')}"></td></tr>`).join('') +
        `</table></div>`;
  }
  return '';
}

function render() {
  allItems();
  app.innerHTML = `<header><button class="back" id="back">‹</button><h1>${esc(form.name)}<small>${esc(form.brand)}</small></h1></header><main>` +
    (form.note ? `<div class="note">${esc(form.note)}</div>` : '') +
    form.sections.map((s, si) => `<div class="sec"><h2>${esc(s.title)}</h2>${s.hint ? `<div class="hint">${esc(s.hint)}</div>` : ''}` +
      s.items.map((it, ii) => itemHTML(it, si + '_' + ii)).join('') + `</div>`).join('') +
    `<button class="clear" id="clear">모두 지우고 새로 쓰기</button></main>
    <div class="bar"><button class="b1" id="pvBtn">미리보기</button><button class="b2" id="sendBtn">카톡으로 보내기</button></div>`;
  $('#back').onclick = () => { if (!dirty() || confirm('쓰던 내용이 지워져요. 나갈까요?')) home(); };
  $('#clear').onclick = () => { if (confirm('모두 지울까요?')) { const id = location.hash.slice(1); st = null; openForm(id); } };
  $('#pvBtn').onclick = preview;
  $('#sendBtn').onclick = () => checkName() && send(true);
  bind();
}

function findItem(k) { const [a, b] = k.split('_').map(x => parseInt(x)); const it = form.sections[a].items[b]; it._k = k; return it; }

function bind() {
  app.querySelectorAll('[data-t]').forEach(el => el.addEventListener('input', () => {
    st.t[el.dataset.t] = el.value;
    if (el.dataset.lr && st.same[el.dataset.lr]) { const it = findItem(el.dataset.lr); st.t[it.R] = el.value; const r = app.querySelector(`[data-t="${it.R}"]`); if (r) r.value = el.value; }
  }));
  app.querySelectorAll('[data-same]').forEach(el => el.onchange = () => {
    st.same[el.dataset.same] = el.checked;
    if (el.checked) syncSame();
    const y = window.scrollY; render(); window.scrollTo(0, y);
  });
  app.querySelectorAll('.chip[data-c]').forEach(el => el.onclick = () => {
    const i = +el.dataset.c, g = el.dataset.g.replace(/[LR]$/, ''), it = findItem(g);
    const group = it.type === 'lrchoice' ? (el.dataset.lrc === 'L' ? it.L : it.R) : it.c;
    const single = it.single || it.type === 'lrchoice';
    if (st.c.has(i)) st.c.delete(i); else { if (single) group.forEach(x => st.c.delete(x)); st.c.add(i); }
    if (it.type === 'lrchoice' && st.same[g]) syncSame();
    app.querySelectorAll('.chip[data-g]').forEach(c => { if (c.dataset.g.replace(/[LR]$/, '') === g) c.classList.toggle('on', st.c.has(+c.dataset.c)); });
  });
}

function syncSame() {
  for (const it of allItems()) {
    if (it.type === 'lrtext' && st.same[it._k]) st.t[it.R] = st.t[it.L] || '';
    if (it.type === 'lrchoice' && st.same[it._k]) it.L.forEach((l, n) => { st.c.delete(it.R[n]); if (st.c.has(l)) st.c.add(it.R[n]); });
  }
}

function checkName() {
  const it = allItems().find(i => i.key === 'name');
  if (it && !(st.t[it.t] || '').trim()) { if (!confirm('고객명이 비어 있어요. 그래도 진행할까요?')) return false; }
  return true;
}

/* ---------- 서식에 값 넣기 ---------- */
// 글자 칸 대상: 숫자 = 서식의 빈 <td> 순서, 글자 = 서식 안 [data-f="이름"] 요소
function textTargets() {
  const map = {};  // 대상 → {kind, suffix}
  const add = (t, kind, extra) => { if (t !== undefined && t !== null) map[String(t)] = Object.assign({ kind }, extra || {}); };
  for (const it of allItems()) {
    if (it.type === 'aud') it.L.concat(it.R).forEach(t => add(t, 'aud'));
    else if (it.type === 'lrtext') { add(it.L, 'text'); add(it.R, 'text'); }
    else if (it.type === 'date') add(it.t, 'date', { yy: it.yy, parts: it.parts });
    else if (it.t !== undefined) add(it.t, it.type, { suffix: it.suffix });
  }
  return map;
}
function cellHTML(v, info) {
  const style = info.kind === 'aud' ? 'display:block;text-align:center' :
    info.kind === 'textarea' ? 'display:block;text-align:left;font-size:9pt;font-weight:500;line-height:1.4' : '';
  return v ? `<span class="fv" style="white-space:pre-wrap;${style}">${esc(v)}</span>` : '';
}
async function fill() {
  const f = await frameReady; const d = f.contentDocument;
  if (!d.__blanks) {
    d.__cbs = [...d.querySelectorAll('.cb')];
    d.__blanks = [...d.querySelectorAll('td')].filter(el => el.textContent.replace(/\s| /g, '') === '' && !el.querySelector('img,svg,.cb,table,[data-f]') && !el.hasAttribute('data-f'));
  }
  syncSame();
  d.__cbs.forEach((cb, i) => cb.classList.toggle('on', st.c.has(i)));
  const tg = textTargets();
  const put = (t, html) => {
    if (/^\d+$/.test(t)) { const td = d.__blanks[+t]; if (td) td.innerHTML = html; }
    else d.querySelectorAll(`[data-f="${t}"]`).forEach(el => el.innerHTML = html);
  };
  for (const [t, info] of Object.entries(tg)) {
    let v = (st.t[t] || '').trim();
    if (info.kind === 'date') {
      if (info.parts) {  // 날짜를 년·월·일 칸에 나눠 씀 (parts: {y,m,d} = data-f 이름)
        const [y, m, dd] = v ? v.split('-') : ['', '', ''];
        put(info.parts.y, cellHTML(v ? (info.yy ? y.slice(2) : y) : '', info));
        put(info.parts.m, cellHTML(v ? String(+m) : '', info));
        put(info.parts.d, cellHTML(v ? String(+dd) : '', info));
        continue;
      }
      if (v) v = fmtDate(v);
    }
    if (v && info.suffix) v += ' ' + info.suffix;
    put(t, cellHTML(v, info));
  }
  const w = f.contentWindow;
  if (typeof w.onFill === 'function') {
    const keys = {}; allItems().forEach(it => { if (it.key) keys[it.key] = it.t !== undefined ? (st.t[it.t] || '') : null; });
    w.onFill({ t: Object.assign({}, st.t), c: [...st.c], keys, form: form.id });
  }
  await w.document.fonts.ready;
  return f;
}

/* ---------- 미리보기 ---------- */
async function preview() {
  // 서식 iframe은 미리보기 창 안에 늘 있음(옮기면 다시 불러와져 입력값이 사라지므로 옮기지 않음)
  $('#pv').classList.add('show');
  await fill();
  const box = $('#frameBox'), wrap = $('#pvWrap');
  const s = Math.min(1, (wrap.clientWidth - 4) / 794);
  box.style.transform = `scale(${s})`; box.style.width = '794px'; box.style.height = '1123px';
  box.style.marginBottom = `${-1123 * (1 - s) + 10}px`;
  history.pushState({ pv: 1 }, '', location.hash);
}
function closePreview() { $('#pv').classList.remove('show'); const box = $('#frameBox'); box.style.transform = ''; box.style.marginBottom = ''; }
$('#pvClose').onclick = () => history.back();
$('#pvSave').onclick = () => checkName() && send(false);
$('#pvShare').onclick = () => checkName() && send(true);

/* ---------- PDF 만들기 · 보내기 ---------- */
function fileName() {
  const it = allItems().find(i => i.key === 'name');
  const nm = it ? (st.t[it.t] || '').trim().replace(/[\\/:*?"<>|\s]+/g, '') : '';
  const d = todayISO().slice(2).replace(/-/g, '');
  return `${form.file}${nm ? '_' + nm : ''}_${d}.pdf`;
}
async function send(share) {
  $('#busy').classList.add('show');
  try {
    const f = await fill();
    const blob = await f.contentWindow.makePdf();
    const file = new File([blob], fileName(), { type: 'application/pdf' });
    if (share && navigator.canShare && navigator.canShare({ files: [file] })) {
      $('#busy').classList.remove('show');
      try { await navigator.share({ files: [file], title: file.name }); }
      catch (e) {
        if (e.name === 'NotAllowedError') askAgain(file);
        else if (e.name !== 'AbortError') toast('보내기를 못 했어요. PDF 저장으로 해 주세요.');
      }
      return;
    }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast(share ? '이 기기는 바로 보내기가 안 돼서 PDF로 저장했어요' : 'PDF를 저장했어요 (다운로드 폴더)');
  } catch (e) {
    console.error(e); toast('PDF를 만들지 못했어요. 인터넷 연결을 확인해 주세요.');
  } finally { $('#busy').classList.remove('show'); }
}

// PDF 만드는 사이 폰이 '누른 동작'을 놓쳤을 때: 다 만든 파일로 한 번 더 누르게 함
function askAgain(file) {
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:40;display:flex;align-items:center;justify-content:center;padding:24px';
  d.innerHTML = `<div style="background:#fff;border-radius:16px;padding:22px;max-width:360px;width:100%;text-align:center">
    <div style="font-weight:700;font-size:1.05rem;margin-bottom:6px">PDF가 준비됐어요</div>
    <div style="color:#68707a;font-size:.92rem;margin-bottom:16px">아래 버튼을 눌러 카톡으로 보내 주세요.</div>
    <button style="width:100%;height:54px;border-radius:12px;background:#2e6b4f;color:#fff;font-weight:700;font-size:1.05rem">카톡으로 보내기</button>
    <button style="margin-top:10px;color:#68707a;padding:8px">닫기</button></div>`;
  const [go, no] = d.querySelectorAll('button');
  go.onclick = async () => { d.remove(); try { await navigator.share({ files: [file], title: file.name }); } catch (e) { if (e.name !== 'AbortError') toast('보내기를 못 했어요. PDF 저장으로 해 주세요.'); } };
  no.onclick = () => d.remove();
  document.body.appendChild(d);
}

/* ---------- 뒤로가기 ---------- */
window.addEventListener('popstate', () => {
  if ($('#pv').classList.contains('show')) { closePreview(); return; }
  if (form) { if (!dirty() || confirm('쓰던 내용이 지워져요. 나갈까요?')) home(); else history.pushState({ f: 1 }, '', location.hash); }
});
window.addEventListener('beforeunload', e => { if (dirty()) { e.preventDefault(); e.returnValue = ''; } });

const start = location.hash.slice(1);
if (FORMS[start]) { history.replaceState({}, '', '#'); home(); openForm(start); } else home();
