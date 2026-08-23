/* OpsDrill expanded interview bank: 100 generated, structured questions per core topic. */
window.OPSDRILL_BANK = (() => {
  const seeds = {
    Azure:['Resource Groups','Subscriptions','Regions and Availability Zones','VMs','VM Scale Sets','Load Balancer','Application Gateway','Front Door','Private Endpoints','NSGs','Azure Firewall','Routing','VNet Peering','VPN Gateway','ExpressRoute','DNS','Azure Monitor','Log Analytics','Managed Identity','Key Vault'],
    Kubernetes:['Pods','Deployments','ReplicaSets','StatefulSets','DaemonSets','Jobs and CronJobs','Namespaces','Labels and Selectors','ConfigMaps','Secrets','Services','Ingress','Endpoints','Readiness Probes','Liveness Probes','Resource Requests','HPA','Scheduling','Taints and Tolerations','NetworkPolicy'],
    Terraform:['Providers','Resources','Data Sources','Variables','Outputs','Locals','for_each','count','Modules','Module Versioning','State','Remote State','State Locking','Import','Drift','Plan','Apply','Lifecycle','Provider Versions','CI/CD'],
    Docker:['Images and Containers','Dockerfile','Build Context','Layers','Caching','Multi-stage Builds','CMD and ENTRYPOINT','Environment Variables','Volumes','Bind Mounts','Networks','Port Publishing','Compose','Registry','Tags and Digests','Resource Limits','Non-root Containers','Capabilities','Healthchecks','Image Security'],
    'CI/CD':['CI vs CD','Pipeline Stages','Artifacts','Versioning','Pull Requests','Code Review','Unit Tests','Integration Tests','Smoke Tests','Quality Gates','Environment Promotion','Approvals','Secrets','OIDC','Runners','Caching','Parallel Jobs','Docker Builds','Terraform Deployments','Kubernetes Deployments'],
    Linux:['Filesystem','Permissions','Users and Groups','sudo','SSH','systemd','Processes','top and ps','Load Average','CPU Saturation','Memory','Swap','Disk Usage','Inodes','lsof','Networking','DNS','Ports','Firewalls','Logs']
  };
  const modes = [
    ['Explain','The interviewer asks you to explain {s} to a junior engineer using a simple production story.'],
    ['Scenario','At 10 AM, a production symptom points toward {s}. The interviewer asks how you would investigate without making the incident worse.'],
    ['Troubleshooting','A production service behaves unexpectedly and the evidence points toward {s}. What would you check first, next, and why?'],
    ['Compare','The interviewer asks you to compare common alternatives around {s} and explain when you would choose each in production.'],
    ['Senior','You are designing a reliable production platform and must make a decision involving {s}. What trade-offs and guardrails would you use?']
  ];
  const lens = {
    Azure:'Azure interviews reward layered troubleshooting, least-privilege identity, network-path thinking, observability, governance and safe rollback. Validate control-plane state separately from data-plane behavior.',
    Kubernetes:'Kubernetes interviews reward desired-state thinking and request-path troubleshooting. Trace Ingress/Service/Endpoint/Pod/application, then inspect scheduling, probes, resources and controllers.',
    Terraform:'Terraform interviews reward declarative thinking, state safety and reviewable change. Separate configuration, state and real infrastructure, and never approve an unexplained destructive plan.',
    Docker:'Docker interviews reward understanding of process isolation, image construction, runtime identity, networking and supply-chain security. Diagnose the process first instead of treating containers like VMs.',
    'CI/CD':'CI/CD interviews reward repeatability, immutable artifacts, fast feedback, progressive delivery and secure trust boundaries. A green pipeline is not enough; verify what users actually receive.',
    Linux:'Linux interviews reward evidence-driven troubleshooting across processes, CPU, memory, disk, networking, permissions and logs. Use the smallest safe change after proving the failure layer.'
  };
  const cmds = {
    Azure:'az account show\naz group show -n <rg>\naz monitor metrics list --resource <id>\naz resource show --ids <resource-id>',
    Kubernetes:'kubectl get pods -o wide\nkubectl describe pod <pod>\nkubectl get events --sort-by=.lastTimestamp\nkubectl logs <pod> --previous',
    Terraform:'terraform fmt -check\nterraform validate\nterraform plan\nterraform state list',
    Docker:'docker ps -a\ndocker logs <container>\ndocker inspect <container>\ndocker stats <container>',
    'CI/CD':'git rev-parse HEAD\n# inspect pipeline logs\n# verify artifact digest\n# run post-deploy smoke test',
    Linux:'uptime\ntop\nss -lntp\njournalctl -u <service> --since "30 min ago"'
  };
  const examples = {
    Azure:'Use Azure Policy, RBAC, tags, private connectivity, Monitor and controlled deployment identities around the change.',
    Kubernetes:'Use readiness/liveness probes, requests and limits, PodDisruptionBudgets, NetworkPolicies and progressive rollout where appropriate.',
    Terraform:'Use remote state with locking, versioned modules, plan review, protected production applies and short-lived CI credentials.',
    Docker:'Use immutable images, minimal runtime layers, non-root execution, vulnerability scanning and registry access controls.',
    'CI/CD':'Use immutable artifacts, protected environments, automated verification, OIDC where possible and an explicit rollback path.',
    Linux:'Use service accounts, least privilege, monitoring, log rotation, resource limits and repeatable runbooks rather than ad-hoc fixes.'
  };
  const follow = {
    Azure:'What evidence would make you choose mitigation A instead of mitigation B?',
    Kubernetes:'Which signal would prove the application is healthy from the user perspective?',
    Terraform:'What would make you stop the plan instead of applying it?',
    Docker:'How would you prove the fix is safe before promoting the image?',
    'CI/CD':'How would you prevent the same failure from reaching production again?',
    Linux:'How would you distinguish the symptom from the root cause?'
  };
  function makeQ(topic,seed,mode,index){
    const story = modes.find(x=>x[0]===mode)[1].replace('{s}',seed);
    return {
      id: `${topic.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-expanded-${String(index).padStart(3,'0')}`,
      topic, level: mode==='Explain'?'Beginner':mode==='Senior'?'Advanced':mode==='Scenario'?'Advanced':'Intermediate', type: mode==='Explain'?'Concept':mode,
      question: story,
      hinglish:`Socho production mein ${seed} se related issue aa gaya. Pehle panic ya random change nahi karna. Desired state aur actual state compare karo, symptom ka blast radius samjho, phir evidence ke basis par failure layer isolate karo. ${lens[topic]}`,
      english:`I would first establish the impact and expected behavior, then inspect the current state around ${seed}. I would trace the dependency path, compare healthy versus failing cases, correlate recent changes, and make the smallest safe mitigation only after I have enough evidence. ${lens[topic]}`,
      deep:`For ${seed}, the important interview signal is not memorizing commands. Explain what the component controls, what it does not control, which dependency can fail, and which metric, event or command proves each hypothesis. Keep diagnosis, mitigation, root cause and prevention as separate steps.`,
      commands:cmds[topic],
      production:`Production approach: ${examples[topic]} Before closing the incident, record the evidence, exact change, recovery signal and prevention action.`,
      mistake:`A common mistake is changing multiple variables at once or assuming a healthy control-plane status means the complete application path is healthy. For ${seed}, avoid guessing; prove the failing layer first.`,
      senior:`Senior answer: discuss blast radius, failure domains, least privilege, observability, rollback and trade-offs. ${lens[topic]} A strong engineer can explain not only what to change, but why the change is safe and how success will be measured.`,
      followup:follow[topic]
    };
  }
  const out=[];
  Object.entries(seeds).forEach(([topic,list])=>list.forEach(seed=>modes.forEach(([mode])=>out.push(makeQ(topic,seed,mode,out.length+1)))));
  return out;
})();
