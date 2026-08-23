(() => {
  function renderStacks(){
    if(!window.OPSDRILL_STACKS || document.getElementById('tech-stacks')) return;
    const roadmap=document.getElementById('roadmap');
    if(!roadmap) return;
    const section=document.createElement('section');
    section.className='section';
    section.id='tech-stacks';
    section.innerHTML=`<div class="eyebrow">Focused technology paths</div><h2>Real-world DevOps tech stacks</h2><p class="sub">These paths connect individual tools into production workflows. Learn the components first, then understand how they interact in CI/CD and platform operations.</p><div class="stack-grid">${window.OPSDRILL_STACKS.map(s=>`<article class="stack-card"><div class="stack-no">${s.number}</div><div class="stack-body"><div class="stack-kicker">TECH STACK</div><h3>${s.title}</h3><p class="stack-subtitle">${s.subtitle}</p><p class="stack-intro">${s.intro}</p><h4>Production workflow</h4><div class="stack-flow">${s.flow.map((x,i)=>`<span>${i+1}. ${x}</span>`).join('')}</div><h4>Key technical terminology</h4><div class="term-list">${s.terms.map(x=>`<code>${x}</code>`).join('')}</div></div></article>`).join('')}</div>`;
    roadmap.after(section);
    const nav=document.querySelector('.navlinks');
    if(nav && !nav.querySelector('[data-stack-nav]')){const b=document.createElement('button');b.textContent='Tech Stacks';b.dataset.stackNav='1';b.onclick=()=>document.getElementById('tech-stacks')?.scrollIntoView({behavior:'smooth'});nav.appendChild(b)}
  }
  const obs=new MutationObserver(renderStacks);
  obs.observe(document.body,{childList:true,subtree:true});
  renderStacks();
})();
