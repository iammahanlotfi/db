(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const levels = {
    easy: {name:'آسان', desc:'رابطه‌ها رو بشناس، کلیدها رو پیدا کن و اولین کوئری‌ها رو بنویس.', icon:'۱'},
    medium: {name:'متوسط', desc:'تاریخچه، گروه‌بندی و اتصال جدول‌ها؛ یک قدم نزدیک‌تر به امتحان.', icon:'۲'},
    hard: {name:'سخت', desc:'رابطه‌های ترکیبی، EER و زیرپرسش؛ حل مسئله با چند قدم فکر.', icon:'۳'}
  };
  const key = 'db-practice-v1';
  const memory = {version:1,level:null,index:0,notes:{},done:{},revealed:{}};
  let state = memory;
  let storageOK = true;
  const validIds = new Set(QUESTIONS.map(q=>q.id));
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && saved.version === 1) {
      state = {...memory, ...saved};
      for (const name of ['notes','done','revealed']) {
        state[name] = saved[name] && typeof saved[name] === 'object' && !Array.isArray(saved[name]) ? saved[name] : {};
        for (const id of Object.keys(state[name])) if (!validIds.has(id)) delete state[name][id];
      }
      state.level = Object.hasOwn(levels,state.level) ? state.level : null;
      state.index = Number.isInteger(state.index) ? Math.max(0,Math.min(5,state.index)) : 0;
    }
  } catch (_) { storageOK = false; }
  const fa = n => n.toLocaleString('fa-IR');
  const list = () => QUESTIONS.filter(q=>q.level===state.level);
  const current = () => list()[state.index];
  function save() {
    try { localStorage.setItem(key,JSON.stringify(state)); storageOK = true; }
    catch (_) { storageOK = false; }
    $('saveStatus').textContent = storageOK ? 'ذخیره شد در همین مرورگر' : 'ذخیره‌سازی مرورگر در دسترس نیست؛ یادداشت فعلاً در این صفحه می‌ماند.';
    $('saveHome').textContent = storageOK ? 'یادداشت‌ها و پیشرفتت در همین مرورگر ذخیره می‌شن.' : 'ذخیره‌سازی مرورگر مسدود است؛ برای حفظ یادداشت‌ها این صفحه را نبند.';
  }
  function doneCount(level) { return QUESTIONS.filter(q=>(!level || q.level===level)&&state.done[q.id]).length; }
  function renderHome() {
    $('home').hidden=false; $('study').hidden=true;
    $('totalDone').textContent=fa(doneCount());
    $('levelCards').replaceChildren();
    for (const [level,meta] of Object.entries(levels)) {
      const button=document.createElement('button');
      button.className='level-card '+level;
      const count=doneCount(level);
      button.innerHTML='<div class="level-top"><h2>'+meta.name+'</h2><span class="level-icon">'+meta.icon+'</span></div><p>'+meta.desc+'</p><div class="start"><span>شروع تمرین</span><small>'+fa(count)+' از ۶ حل شده</small></div>';
      button.onclick=()=>{ if(state.level!==level) state.index=0; state.level=level; save(); renderQuestion(); window.scrollTo({top:0}); };
      $('levelCards').append(button);
    }
  }
  function fillList() {
    $('questionList').replaceChildren();
    list().forEach((q,i)=>{
      const b=document.createElement('button');
      b.className=i===state.index?'active':'';
      if(i===state.index)b.setAttribute('aria-current','step');
      const no=document.createElement('span');no.className='nav-number';no.textContent=fa(i+1);
      const title=document.createElement('span');title.className='nav-title';title.textContent=q.title;
      b.append(no,title);
      if(state.done[q.id]){const check=document.createElement('span');check.className='check';check.textContent='✓';check.setAttribute('aria-label','حل شده');b.append(check);}
      b.onclick=()=>go(i);
      $('questionList').append(b);
    });
    $('levelProgress').textContent=fa(doneCount(state.level))+' از ۶ تمرین رو حل کردی';
    $('progress').value=doneCount(state.level);
  }
  function renderQuestion() {
    if(!state.level)return renderHome();
    const q=current(); $('home').hidden=true; $('study').hidden=false;
    $('position').textContent='سؤال '+fa(state.index+1)+' از ۶';
    $('footerPosition').textContent=fa(state.index+1)+' از ۶';
    $('levelPill').textContent=levels[state.level].name;
    $('qNumber').textContent='تمرین '+fa(state.index+1);
    $('qTitle').textContent=q.title; $('scenario').textContent=q.scenario;
    $('queryTasks').replaceChildren();
    q.queries.forEach(query=>{const li=document.createElement('li');li.textContent=query.prompt;$('queryTasks').append(li);});
    $('notes').value=typeof state.notes[q.id]==='string'?state.notes[q.id]:'';
    $('done').checked=!!state.done[q.id];
    $('lesson').textContent=q.lesson;
    $('erReason').textContent='هر شکل رو با جمله‌های سناریو بخون. رابطه‌های شناسا و موجودیت‌های ضعیف دوتایی رسم شده‌اند. '+q.reason;
    $('diagram').src=q.diagram; $('diagram').alt='نمودار حل ER تمرین '+q.title;
    $('diagramLink').href=q.diagram;
    $('schema').textContent=q.schema; $('reason').textContent=q.reason;
    $('trap').textContent=q.trap; $('source').textContent=q.source;
    $('queryAnswers').replaceChildren();
    q.queries.forEach((query,i)=>{
      const block=document.createElement('section');block.className='query-answer';
      const heading=document.createElement('h4');heading.textContent=fa(i+1)+'. '+query.prompt;
      const copy=document.createElement('button');copy.className='copy';copy.textContent='کپی کوئری';
      copy.onclick=async()=>{
        try {await navigator.clipboard.writeText(query.sql);copy.textContent='کپی شد';}
        catch (_) {
          const range=document.createRange();range.selectNodeContents(code);
          const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);
          copy.textContent='کد انتخاب شد؛ کپی کن';
        }
        setTimeout(()=>copy.textContent='کپی کوئری',2200);
      };
      const pre=document.createElement('pre');const code=document.createElement('code');code.textContent=query.sql;pre.append(code);
      const why=document.createElement('p');why.textContent=query.why;
      block.append(heading,copy,pre,why);$('queryAnswers').append(block);
    });
    applyReveal(); fillList();
    $('prev').disabled=state.index===0;$('next').disabled=state.index===5;
    $('saveStatus').textContent=storageOK?'ذخیره در همین مرورگر':'ذخیره‌سازی مرورگر در دسترس نیست.';
  }
  function applyReveal(){
    const open=!!state.revealed[current().id];$('answer').hidden=!open;
    $('reveal').textContent=open?'پنهان کردن پاسخ':'مشاهدهٔ پاسخ و راهنمای حل';
    $('reveal').setAttribute('aria-expanded',String(open));
  }
  function go(i){state.index=Math.max(0,Math.min(5,i));save();renderQuestion();window.scrollTo({top:0,behavior:'smooth'});$('qTitle').focus({preventScroll:true});}
  $('notes').addEventListener('input',()=>{state.notes[current().id]=$('notes').value;save();});
  $('done').onchange=()=>{state.done[current().id]=$('done').checked;save();fillList();};
  $('reveal').onclick=()=>{const id=current().id;state.revealed[id]=!state.revealed[id];save();applyReveal();};
  $('prev').onclick=()=>go(state.index-1);$('next').onclick=()=>go(state.index+1);
  $('backHome').onclick=()=>{renderHome();window.scrollTo({top:0});};
  document.querySelector('.brand').onclick=e=>{e.preventDefault();renderHome();window.scrollTo({top:0});};
  $('sourcesButton').onclick=()=>$('sourcesDialog').showModal();
  $('closeDialog').onclick=()=>$('sourcesDialog').close();
  $('sourcesDialog').addEventListener('click',e=>{if(e.target===$('sourcesDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
  renderHome(); save();
})();
