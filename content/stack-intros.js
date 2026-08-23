window.OPSDRILL_STACKS = [
  {
    id:'azure-devops-terraform', number:'01', title:'Azure DevOps + Terraform',
    subtitle:'Infrastructure provisioning + source control + CI/CD + Azure operations',
    intro:'This stack teaches how a DevOps engineer provisions Azure infrastructure with Terraform and delivers changes through Azure DevOps. Start with Azure fundamentals and HCL, then move to remote state, modules, service connections, YAML pipelines, approvals and production deployment.',
    flow:['Git repository','Terraform plan','Remote state + locking','Azure resources','Azure DevOps YAML pipeline','Validation / security scan','Approval','Terraform apply','Monitoring / rollback'],
    terms:['Azure Subscription','Resource Group','VNet','Subnet','NSG','Managed Identity','RBAC','Key Vault','Terraform Provider','HCL','tfvars','State','Backend','State Locking','Module','Plan','Apply','Azure Repos','Azure Pipelines','Service Connection','Variable Group','Environment','Approval Gate']
  },
  {
    id:'terraform-cicd-git-github', number:'02', title:'Terraform + CI/CD + Git/GitHub',
    subtitle:'Infrastructure as Code + version control + automated delivery',
    intro:'This stack focuses on the complete change lifecycle: developer creates a Git branch, opens a GitHub Pull Request, CI validates Terraform, security checks run, the plan is reviewed, and only an approved immutable change reaches the target environment.',
    flow:['Feature branch','git diff / validation','Pull Request','CI checks','terraform fmt / validate','Security + policy checks','terraform plan','Code review','Merge to main','Deployment / apply','Audit + rollback'],
    terms:['Git','Branching Strategy','Pull Request','Merge','Rebase','GitHub Actions','Workflow','Runner','Artifact','OIDC','Secrets','Terraform Plan','Plan Artifact','Remote Backend','State Lock','Drift Detection','Policy as Code','Approval','Environment Protection']
  },
  {
    id:'docker-kubernetes', number:'03', title:'Docker + Kubernetes',
    subtitle:'Containerization + orchestration + production workload management',
    intro:'This stack explains the path from source code to a production workload: build a minimal Docker image, scan and tag it, push it to a registry, deploy it through Kubernetes, expose it with a Service or Ingress, and operate it with probes, resource requests, HPA and observability.',
    flow:['Source code','Dockerfile','Multi-stage build','Image scan','Registry push','Deployment manifest','Pod scheduling','Service','Ingress / Gateway','Readiness + liveness probes','HPA','Logs / metrics / traces'],
    terms:['Dockerfile','Image Layer','Build Context','Multi-stage Build','ENTRYPOINT','CMD','Registry','Image Digest','Container Runtime','Pod','Deployment','ReplicaSet','Namespace','Service','Ingress','ConfigMap','Secret','Requests / Limits','Readiness Probe','Liveness Probe','HPA','kubectl']
  }
];
