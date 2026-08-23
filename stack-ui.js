(() => {
  function renderStacks(){
    if(!window.OPSDRILL_STACKS || document.getElementById('tech-stacks')) return;
    const roadmap=document.getElementById('roadmap');
    if(!roadmap) return;
    const section=document.createElement('section');
    section.className='section';
    section.id='tech-stacks';
    section.innerHTML=`<div class="eyebrow">Interview-ready project paths</div><h2>How to explain your project in an interview</h2><p class="sub">Select a stack. First learn the architecture, then use the structured introduction and project use case to explain what you built, why you built it and how you operated it.</p><div class="stack-grid">${window.OPSDRILL_STACKS.map((s,i)=>`<article class="stack-card"><div class="stack-no">${s.number}</div><div class="stack-body"><div class="stack-kicker">TECH STACK ${s.number}</div><h3>${s.title}</h3><p class="stack-subtitle">${s.subtitle}</p><div class="script-box"><h4>Interview Introduction</h4><p>${s.interview}</p></div><div class="project-box"><h4>Best Project Use Case</h4><p>${s.project}</p><ol>${s.explain.map(x=>`<li>${x}</li>`).join('')}</ol></div><h4>Production Flow</h4><div class="stack-flow">${s.flow.map((x,i)=>`<span>${i+1}. ${x}</span>`).join('<b>→</b>')}</div><h4>Key Technical Terminology</h4><div class="term-list">${s.terms.map(x=>`<code>${x}</code>`).join('')}</div><h4>Likely Interview Follow-ups</h4><div class="followup-list">${s.questions.map((x,i)=>`<div><b>Q${i+1}</b>${x}</div>`).join('')}</div></div></article>`).join('')}</div>`;
    roadmap.after(section);
    const nav=document.querySelector('.navlinks');
    if(nav && !nav.querySelector('[data-stack-nav]')){const b=document.createElement('button');b.textContent='Project Stories';b.dataset.stackNav='1';b.onclick=()=>document.getElementById('tech-stacks')?.scrollIntoView({behavior:'smooth'});nav.appendChild(b)}
  }
  const obs=new MutationObserver(renderStacks);
  obs.observe(document.body,{childList:true,subtree:true});
  renderStacks();
})();
