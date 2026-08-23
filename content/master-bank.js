window.OPSDRILL_MASTER = (() => {
  const topics = {
    Azure: ['VMs','VM Scale Sets','VNets','NSGs','Azure Firewall','Application Gateway','Load Balancer','Front Door','Private Link','Private Endpoints','DNS','VNet Peering','VPN Gateway','ExpressRoute','RBAC','Managed Identity','Key Vault','Azure Monitor','Log Analytics','Azure Policy'],
    Kubernetes: ['Pods','Deployments','ReplicaSets','StatefulSets','DaemonSets','Jobs','CronJobs','Namespaces','Labels and Selectors','ConfigMaps','Secrets','Services','Ingress','Gateway API','Endpoints','Probes','Requests and Limits','HPA','VPA','Scheduling'],
    Terraform: ['Providers','Resources','Data Sources','Variables','Outputs','Locals','Expressions','for_each','count','Dynamic Blocks','Modules','Module Sources','Module Versioning','State','Remote State','State Locking','Import','Drift','Plan','Apply'],
    Docker: ['Images','Containers','Dockerfile','Build Context','Layers','Build Cache','Multi-stage Builds','CMD','ENTRYPOINT','Environment Variables','Volumes','Bind Mounts','Networks','Port Publishing','Compose'],
    'CI/CD': ['CI vs CD','Pipeline Stages','Artifacts','Versioning','Pull Requests','Code Review','Unit Tests','Integration Tests','Smoke Tests','Regression Tests','Quality Gates','Promotion','Approvals','Secrets','OIDC','Runners','Caching','Parallel Jobs','Docker Builds','Kubernetes Deployments'],
    Linux: ['Filesystem','Permissions','Users and Groups','sudo','SSH','systemd','Processes','ps and top','Load Average','CPU','Memory','Swap','Disk Usage','Inodes','Networking'],
    DevSecOps: ['Shift Left','SAST','DAST','SCA','Secrets Scanning','Container Scanning','IaC Scanning','SBOM','Supply Chain','Threat Modeling'],
    Git: ['Commits','Branches','Merge','Rebase','Cherry-pick','Reset','Revert','Stash','Tags','Bisect'],
    Jenkins: ['Controllers','Agents','Pipeline','Declarative Pipeline','Scripted Pipeline','Credentials','Shared Libraries','Webhooks','Artifacts','Agents and Labels'],
    'GitHub Actions': ['Workflows','Triggers','Jobs','Steps','Actions','Runners','Matrix Builds','Artifacts','Environments','OIDC'],
    Ansible: ['Inventory','Ad-hoc Commands','Playbooks','Tasks','Modules','Handlers','Variables','Templates','Roles','Vault'],
    Networking: ['OSI Model','TCP','UDP','IP','Subnetting','Routing','ARP','DNS','DHCP','NAT'],
    Monitoring: ['Metrics','Logs','Traces','Prometheus','Grafana','Alertmanager','Exporters','PromQL','Dashboards','SLOs'],
    AWS: ['EC2','Auto Scaling','ALB','VPC','Security Groups','IAM','S3','RDS','CloudWatch','EKS'],
    SRE: ['SLI','SLO','SLA','Error Budgets','Toil','Incident Response','Postmortems','Capacity Planning','Reliability','Observability'],
    'System Design': ['Load Balancing','Caching','Queues','Databases','Replication','Sharding','Rate Limiting','High Availability','Disaster Recovery','Observability']
  };
  const modes = [
    ['Concept','Beginner','Explain'],['Concept','Intermediate','How it works'],['Scenario','Advanced','Production incident'],['Troubleshooting','Advanced','Troubleshoot'],['Compare','Intermediate','Compare'],['Production','Advanced','On-call'],['Security','Advanced','Secure'],['Optimization','Advanced','Optimize'],['Design','Senior','Design'],['Senior','Senior','Senior follow-up']
  ];
  const focus = {
    Azure:'control plane vs data plane, identity, network path, observability and rollback',
    Kubernetes:'desired state, request path, scheduling, probes, resources and controllers',
    Terraform:'configuration vs state vs real infrastructure, plan safety and state locking',
    Docker:'process isolation, image layers, runtime identity, networking and supply-chain security',
    'CI/CD':'immutable artifacts, protected environments, fast feedback and rollback',
    Linux:'processes, CPU, memory, disk, networking, permissions and logs',
    DevSecOps:'shift-left controls, secrets, supply chain, scanning and least privilege',
    Git:'safe history management, collaboration and reversible changes',
    Jenkins:'controllers, agents, credentials, pipeline code and plugins',
    'GitHub Actions':'workflow/job/step boundaries, runners, permissions and artifacts',
    Ansible:'idempotency, inventory, variables, roles and encrypted secrets',
    Networking:'packet path, routing, DNS, ports, policies and protocol layers',
    Monitoring:'metrics, logs, traces, alert quality and cardinality',
    AWS:'IAM, network boundaries, managed services, resilience and observability',
    SRE:'SLI/SLO, error budgets, toil, incidents and reliability',
    'System Design':'scale, bottlenecks, failure domains, consistency, availability and cost'
  };
  const commands = {
    Azure:'az resource show --ids <id>\naz monitor metrics list --resource <id>',
    Kubernetes:'kubectl get pods -o wide\nkubectl describe pod <pod>\nkubectl get events --sort-by=.lastTimestamp\nkubectl logs <pod> --previous',
    Terraform:'terraform fmt -check\nterraform validate\nterraform plan\nterraform state list',
    Docker:'docker ps -a\ndocker inspect <container>\ndocker logs <container>\ndocker stats <container>',
    'CI/CD':'git rev-parse HEAD\n# inspect pipeline logs\n# verify artifact digest\n# run smoke test',
    Linux:'uptime\nps aux --sort=-%cpu | head\nfree -h\ndf -h\nss -lntp\njournalctl -u <service>',
    DevSecOps:'# inspect scanner output\n# verify SBOM/provenance\n# review CI permissions',
    Git:'git status\ngit log --oneline -10\ngit diff\ngit reflog',
    Jenkins:'# inspect build console\n# inspect pipeline stages\n# verify credential binding',
    'GitHub Actions':'gh run list\ngh run view <run-id>\n# inspect workflow permissions',
    Ansible:'ansible-inventory --graph\nansible all -m ping\nansible-playbook --check site.yml',
    Networking:'ip addr\nip route\nss -lntup\ndig <name>\ntraceroute <host>',
    Monitoring:'# inspect Prometheus query\n# inspect Grafana panel\n# inspect Alertmanager alerts',
    AWS:'aws sts get-caller-identity\naws ec2 describe-instances\naws cloudwatch list-metrics',
    SRE:'# inspect SLI/SLO dashboards\n# inspect error budget\n# review incident timeline',
    'System Design':'# estimate traffic\n# map dependencies and failure domains\n# define SLO and recovery targets'
  };
  const make = (topic, subject, mode, n) => {
    const [type, level, lead] = mode;
    return {
      id:`master-${topic.toLowerCase().replace(/[^a-z0-9]+/g,'-')}-${String(n).padStart(4,'0')}`,
      topic, level, type,
      question:`${lead}: A production team is dealing with ${subject}. The interviewer asks how you would explain, investigate, or design this safely.`,
      hinglish:`Socho production mein ${subject} se related issue aa gaya. Pehle impact aur expected behavior clear karo. Random change mat karo. ${focus[topic]}. Evidence collect karke failure layer isolate karo, smallest safe mitigation choose karo aur recovery ko measurable signal se verify karo.`,
      english:`I would first clarify impact, expected behavior and the failure boundary for ${subject}. Then I would inspect current state, dependencies, recent changes and telemetry. I would test a small set of hypotheses with the least invasive evidence, mitigate safely, and verify recovery using a user-impacting signal. The key areas are ${focus[topic]}.`,
      deep:`Explain what ${subject} owns, what it does not own, its dependencies, common failure modes, observability signals and production trade-offs. Separate diagnosis, mitigation, root cause and prevention.`,
      commands:commands[topic],
      production:`Production approach: establish blast radius; control risky changes; collect timestamps and evidence; apply the smallest reversible mitigation; validate end-to-end health; document root cause and prevention.`,
      mistake:`Common mistake: jumping directly to commands or changing multiple layers at once. A healthy infrastructure component does not automatically prove that the end-to-end user path is healthy.`,
      senior:`Senior answer: discuss failure domains, security, observability, capacity, cost, rollback and trade-offs. Explain how you would test the design or fix under failure, not only on the happy path.`,
      followup:`What evidence would make you choose one approach over another, and how would you prevent a ${subject} failure from recurring?`
    };
  };
  const out=[];
  Object.entries(topics).forEach(([topic, subjects]) => subjects.forEach((subject, i) => modes.forEach((mode, j) => out.push(make(topic, subject, mode, i*modes.length+j+1)))));
  return out;
})();
