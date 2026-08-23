(() => {
  function renderStacks(){
    if(!window.OPSDRILL_STACKS || document.getElementById('tech-stacks')) return;
    const roadmap=document.getElementById('roadmap');
    if(!roadmap) return;
    const section=document.createElement('section');
    section.className='section tech-stack-section';
    section.id='tech-stacks';
    section.innerHTML=`
      <div class="eyebrow">Interview-ready project stories</div>
      <h2>Explain your project clearly</h2>
      <p class="sub">Pick your technology stack. Open one section at a time and follow the same interview structure: Introduction → Project Use Case → Architecture Flow → Technical Terms → Follow-ups.</p>
      <div class="stack-accordion">
        ${window.OPSDRILL_STACKS.map((s,i)=>`
          <article class="stack-item ${i===0?'open':''}">
            <button class="stack-summary" type="button" onclick="toggleStack('${s.id}')">
              <span class="stack-index">${s.number}</span>
              <span class="stack-summary-text"><b>${s.title}</b><small>${s.subtitle}</small></span>
              <span class="stack-chevron">⌄</span>
            </button>
            <div class="stack-content">
              <div class="interview-panel">
                <div class="panel-label">01 · Interview Introduction</div>
                <p>${s.interview}</p>
              </div>
              <div class="project-panel">
                <div class="panel-label">02 · Best Project Use Case</div>
                <p>${s.project}</p>
                <ol>${s.explain.map(x=>`<li>${x}</li>`).join('')}</ol>
              </div>
              <div class="stack-section-block">
                <div class="panel-label">03 · Production Architecture Flow</div>
                <div class="stack-flow">${s.flow.map((x,i)=>`<span><b>${i+1}</b>${x}</span>`).join('')}</div>
              </div>
              <div class="stack-section-block">
                <div class="panel-label">04 · Technical Terminology</div>
                <div class="term-list">${s.terms.map(x=>`<code>${x}</code>`).join('')}</div>
              </div>
              <div class="stack-section-block">
                <div class="panel-label">05 · Interview Follow-ups</div>
                <div class="followup-list">${s.questions.map((x,i)=>`<button type="button" onclick="openStackFollowup('${s.id}',${i})"><b>Q${i+1}</b><span>${x}</span><em>→</em></button>`).join('')}</div>
                <div id="stack-followup-${s.id}" class="stack-followup-answer" hidden></div>
              </div>
            </div>
          </article>
        `).join('')}
      </div>`;
    roadmap.after(section);
    const nav=document.querySelector('.navlinks');
    if(nav && !nav.querySelector('[data-stack-nav]')){const b=document.createElement('button');b.textContent='Project Stories';b.dataset.stackNav='1';b.onclick=()=>document.getElementById('tech-stacks')?.scrollIntoView({behavior:'smooth'});nav.appendChild(b)}
  }
  window.toggleStack=function(id){
    document.querySelectorAll('.stack-item').forEach(x=>x.classList.remove('open'));
    document.querySelectorAll('.stack-item').forEach(x=>{if(x.querySelector('.stack-summary')?.getAttribute('onclick')?.includes(`'${id}'`))x.classList.add('open')});
  };
  window.openStackFollowup=function(id,index){
    const stack=window.OPSDRILL_STACKS.find(s=>s.id===id);const box=document.getElementById('stack-followup-'+id);if(!stack||!box)return;
    const answers={
      'azure-devops-terraform':['Terraform gives us declarative, version-controlled and repeatable Azure provisioning. It also makes infrastructure changes reviewable through a plan before apply.','I use a remote backend with locking and controlled access so the team shares one source of truth and concurrent applies do not corrupt state.','Secrets should not be hard-coded. I prefer Key Vault, managed identity or workload identity and protected pipeline variables/service connections.','I validate and plan in lower environments first, then promote the reviewed change through controlled stages with production approval.','I inspect the error and state, avoid blindly re-running destructive commands, identify partially created resources and use refresh/plan plus targeted recovery when appropriate.'],
      'terraform-cicd-git-github':['A PR gives us review, automated checks and an audit trail before infrastructure changes reach a shared environment.','The plan is the expected infrastructure delta, so reviewers can detect unintended creates, updates or destroys before apply.','Use GitHub Secrets or preferably short-lived OIDC federation where supported; never commit credentials or sensitive tfvars.','Use separate state/configuration per environment, protected branches and environment approvals so promotion is explicit.','Drift is when real infrastructure differs from Terraform configuration/state expectations. Detect it with scheduled plan/refresh workflows and investigate before the next deployment.'],
      'docker-kubernetes':['Multi-stage builds keep compilers and build dependencies out of the runtime image, reducing image size and attack surface.','An image is an immutable package/template; a container is a running instance of that image with a writable runtime layer.','Pods restart because the container exits, a probe fails, the process crashes, resources are exhausted or the node/workload is disrupted.','Readiness controls whether traffic should reach the Pod; liveness determines whether Kubernetes should restart an unhealthy container.','Check pod events, container logs, previous logs, probes, image/configuration, resource limits and node conditions before changing the workload.','HPA evaluates configured metrics such as CPU/memory or custom metrics and changes the desired replica count within min/max limits.']
    };
    box.hidden=false;box.innerHTML=`<b>Expected answer:</b> ${answers[id]?.[index]||'Structure your response around the technical reason, implementation, production impact and trade-off.'}`;
  };
  const obs=new MutationObserver(renderStacks);obs.observe(document.body,{childList:true,subtree:true});renderStacks();
})();
