// 육아 혜택 정리노트 예약 (2026-11-16). 함수 본문: 인자 K(benefit_b1.json 순번), U(json 주소). AsyncFunction으로 실행
const sl=ms=>new Promise(r=>setTimeout(r,ms)); const setv=(el,v)=>{Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el),'value').set.call(el,v); el.dispatchEvent(new Event('input',{bubbles:true}));}; const vis=sel=>[...document.querySelectorAll(sel)].find(e=>e.offsetParent);
for(let k=0;k<60&&!(window.tinymce&&tinymce.activeEditor&&tinymce.activeEditor.initialized);k++) await sl(250);
await sl(1500);
const J = window.__BB1 || (window.__BB1 = await (await fetch(U)).json()); const p=J[K];
const [Y,MO,D]=p.date.split('-').map(Number);
const ed=tinymce.activeEditor; ed.setContent(p.html); ed.undoManager.add(); ed.setDirty(true); ed.fire('change'); await sl(500);
const clen=ed.getContent().length;
document.querySelector('#category-btn').click(); await sl(300);
const it=[...document.querySelectorAll('#category-list [role=option], #category-list li, [class*=category] li')].find(e=>e.textContent.trim()===p.cat); if(it) it.click();
const t=document.querySelector('#post-title-inp'); t.focus(); setv(t,p.title);
const e=document.querySelector('#tagText'); for (const tag of p.tags.slice(0,10)) { e.focus(); setv(e,tag); for (const k of ['keydown','keypress','keyup']) e.dispatchEvent(new KeyboardEvent(k,{key:'Enter',code:'Enter',keyCode:13,which:13,bubbles:true})); await sl(150);} e.blur();
if (clen < 1000) throw 'empty body '+clen;
[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='완료').click(); await sl(900);
(document.querySelector('label[for=open20]')||document.querySelector('#open20')).click(); await sl(300);
const tb=[...document.querySelectorAll('button.select_btn')].find(b=>b.offsetParent && /선택 안 함|육아/.test(b.textContent)); tb.click(); await sl(400); const m=[...document.querySelectorAll('[role=menuitem]')].find(x=>x.textContent.trim()==='- 육아'); if(m) m.click(); await sl(300);
[...document.querySelectorAll('button.btn_date')].find(b=>b.textContent.trim()==='예약').click(); await sl(500);
if (!vis('table.tbl_calendar')) { document.querySelector('button.btn_reserve').click(); await sl(400); }
for (let k=0;k<12;k++){ const mm=vis('.txt_calendar').textContent.match(/(\d+)년\s*(\d+)월/); if(+mm[1]===Y && +mm[2]===MO) break; vis('.btn_next').click(); await sl(300); }
const db=[...vis('table.tbl_calendar').querySelectorAll('button')].find(x=>x.textContent.trim()===String(D) && !x.disabled); db.click(); await sl(300);
for (const [id,v] of [['dateHour',p.hour],['dateMinute','00']]) { const x=document.querySelector('#'+id); x.focus(); setv(x,v); x.dispatchEvent(new Event('change',{bubbles:true})); x.blur(); await sl(150); }
const st={clen, title:t.value===p.title, cat:document.querySelector('#category-btn').textContent.includes(p.cat), tags:document.querySelectorAll('.txt_tag').length, pub:document.querySelector('#open20').checked, topic:tb.textContent.includes('육아'), date:document.querySelector('button.btn_reserve').textContent.trim()===p.date, hh:document.querySelector('#dateHour').value, mi:document.querySelector('#dateMinute').value};
const ok = st.title&&st.cat&&st.pub&&st.topic&&st.date&&st.hh===p.hour&&st.mi==='00';
if (ok) setTimeout(()=>[...document.querySelectorAll('button')].find(x=>x.offsetParent && x.textContent.trim()==='공개 발행').click(), 50);
return JSON.stringify([p.n, p.title.slice(0,18), st, ok ? 'PUBLISHED' : 'STOPPED'])
