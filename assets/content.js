/*
 * Single source of truth for every design in /designs.
 * Edit this file once; all layouts pick up the change.
 */
window.PORTFOLIO = {
  profile: {
    name: "Tamil Vanan",
    shortName: "Tamil",
    initials: "TV",
    role: "Senior DevOps / SRE Engineer",
    company: "Conga",
    location: "Chennai, India",
    timezone: "Asia/Kolkata",
    years: "8+", // recalculated from `experience` at the bottom of this file
    headline: "Engineering Infrastructure. Enabling Autonomous Delivery.",
    tagline:
      "I architect enterprise-grade DevOps platforms, GitOps-driven release automation and scalable Kubernetes infrastructure across AWS and Azure: secure, reliable, cost-optimized multi-cloud foundations that take hundreds of microservices from commit to production automatically.",
    about: [
      "I'm a Senior DevOps Engineer at Conga with 8+ years across Sify, Lucid Motors and Conga in cloud infrastructure, CI/CD automation and SRE. I design and run the delivery platform that takes 180+ microservices across 14 product pillars from a merged pull request to healthy workloads in nine stages: dev, QA, perf, preview, staging, production and two disaster-recovery stages, on both AWS and Azure.",
      "My day-to-day covers the whole path to production: Argo CD, Argo Workflows and Kargo for GitOps promotion; EKS/AKS clusters tuned with Karpenter and KEDA; Terraform and Crossplane for infrastructure; GitHub Actions and Jenkins for CI; External Secrets, Kyverno and CVE remediation for security; and FinOps across network, images, storage and compute to keep the bill honest. Lately I'm contributing to our Backstage developer portal and building AI-assisted workflows with Claude, GitHub Copilot and Azure AI Foundry.",
      "I like declarative systems: Git is the source of truth, controllers reconcile it, and every change is reviewed, repeatable and reversible.",
    ],
    quote: "Less toil, fewer handoffs, and production that stays boring.",
    available: "Open to platform engineering conversations",
    // Rotating titles typed out in the Orbit hero.
    roles: [
      "Senior DevOps Engineer",
      "Site Reliability Engineer",
      "Platform Engineer",
      "Kubernetes & GitOps specialist",
      "FinOps-minded cloud engineer",
      "Backstage & AI tooling explorer",
    ],
    // Square headshot. Currently the public 200×200 LinkedIn photo; replace with a sharper 600×600+ image when available.
    // Leave empty to show the "TV" monogram instead.
    photo: "assets/img/profile.jpg",
    links: {
      linkedin: "https://www.linkedin.com/in/tamil-vanan-012b33207/",
      // Set automatically by ./scripts/publish.sh <github-username>. GitHub buttons stay hidden while empty.
      github: "https://github.com/Tamilvanan-Devops",
      email: "tamilvananaws@gmail.com",
      blog: "", // optional, e.g. a dev.to / Medium / Hashnode profile
      // Public site URL printed on the resume; switch to the custom domain once it is live.
      site: "https://tamilvanan-devops.github.io",
      // resume.html is generated from this file; its "Download PDF" button serves assets/Tamil-Vanan-Resume.pdf
      // (rebuild the PDF with ./scripts/build-resume.sh after editing content).
      resume: "resume.html",
    },
  },

  // Optional: a free https://formspree.io endpoint (e.g. "https://formspree.io/f/abcdwxyz")
  // makes the contact form send messages directly. Without it, the form opens the visitor's
  // mail app addressed to profile.links.email. With neither set, the form is hidden.
  contact: {
    formEndpoint: "",
    talkAbout: [
      "GitOps adoption with Argo CD & Kargo",
      "Kubernetes platforms on EKS / AKS",
      "CI/CD standardisation & elastic runners",
      "Cloud cost engineering (FinOps)",
      "Backstage & AI-assisted DevOps",
      "Terraform & Crossplane IaC",
      "Release reliability & DR readiness",
    ],
  },

  principles: [
    { icon: "gitops", title: "Git is the source of truth", text: "If it isn't in a pull request, it didn't happen. Every environment is reconciled from Git, so every change is reviewed and reversible." },
    { icon: "ci", title: "Automate the second time", text: "Do it once by hand to understand it, then turn it into a workflow nobody has to remember." },
    { icon: "finops", title: "Measure before you optimise", text: "Cost and reliability decisions start from data (flow logs, metrics and traces), not guesses." },
    { icon: "shield", title: "Secure by default", text: "Secrets come from a manager, policies run in audit before enforce, and images and tokens are pinned and least-privilege." },
  ],

  journeyIntro: "Three companies, one direction: from AWS cloud administration in 2017 to running a multi-cloud GitOps platform today.",
  journey: [
    { year: "2017", title: "Into the cloud", text: "Joined Sify Technologies as an AWS Cloud Administrator after a B.E. at Anna University: EC2, VPC, RDS, Route 53, CloudFront and CloudWatch." },
    { year: "2019", title: "AWS DevOps", text: "Promoted to AWS DevOps Engineer: Jenkins CI/CD, Ansible, Docker and multi-AZ AWS deployments for client GEICO." },
    { year: "2021", title: "Lucid Motors", text: "CI/CD for 15 model-based ECUs in electric-vehicle software with Jenkins, GitLab and JFrog Artifactory." },
    { year: "2022", title: "Joined Conga", text: "Built Jenkins shared libraries: Kaniko build-and-push, Python CI, Checkmarx scanning and artifact clean-up." },
    { year: "2023", title: "Kubernetes data tier", text: "Automated Kafka, MongoDB, the EBS CSI driver and the ELK stack on Kubernetes with Helm and Ansible." },
    { year: "2024", title: "Azure & IaC", text: "Provisioned Azure Log Analytics, Key Vault and VMs with Terraform; onboarded platform services to Kubernetes." },
    { year: "2025", title: "Spinnaker → GitOps", text: "Moved services from Spinnaker to a multi-stage Argo CD + Argo Workflows platform; promoted to Senior." },
    { year: "2026", title: "Scale, cost & AI", text: "Kargo promotions, ephemeral environments, end-to-end FinOps, Crossplane, Backstage plugins and AI-assisted DevOps." },
    { year: "Next", title: "What's next", text: "CKA certification, Crossplane self-service platforms and deeper Backstage + AI-agent tooling.", next: true },
  ],

  // Optional public side projects / open-source repos. The "Open-source labs" section appears once this has entries.
  // Example:
  // { title: "gitops-promotion-lab", summary: "Argo CD + Kargo multi-stage promotion on kind.", stack: ["Argo CD", "Kargo", "kind"], code: "https://github.com/you/gitops-promotion-lab", demo: "" },
  labs: [],

  metrics: [
    { value: "895", label: "release definitions under GitOps", detail: "Argo CD + Argo Workflows reconcile every service release across 9 stages." },
    { value: "187", label: "microservices onboarded", detail: ".NET, Python and Node services across 14 product pillars." },
    { value: "18+", label: "environments on AWS & Azure", detail: "Dev → QA → perf → preview → staging → prod, plus DR." },
    { value: "12+", label: "FinOps levers shipped", detail: "Network, image caching, Dockerfile slimming, lifecycle rules, ARM64 and right-sizing." },
    { value: "~60%", label: "CI egress cost cut (roadmap)", detail: "Flow-log analysis, single-AZ Karpenter, VPC endpoints and pull-through caches." },
    { value: "2,400+", label: "hand-written commits", detail: "Across 30+ repositories in the engineering org since 2022." },
  ],

  focus: [
    { icon: "gitops", title: "GitOps release engineering", text: "Commit-driven promotion with Argo CD, Argo Workflows, ApplicationSets and Kargo. Every release includes migrations, smoke tests and rollback." },
    { icon: "k8s", title: "Kubernetes platforms", text: "EKS and AKS clusters with Karpenter node pools, KEDA autoscaling, Kong ingress, taints and tolerations, plus controller tuning at scale." },
    { icon: "deploy", title: "Microservices & messaging", text: "Shared Helm/Kustomize deployments for event-driven services on SQS/SNS and Azure Service Bus, with KEDA, health checks and rollback." },
    { icon: "iac", title: "Infrastructure as Code", text: "Multi-cloud Terraform run from workflows, DR state layouts and Crossplane compositions for self-service infrastructure." },
    { icon: "finops", title: "FinOps & cost engineering", text: "Network egress, pull-through image caches, slimmer Dockerfiles, ECR/S3 lifecycle rules, ARM64, right-sizing and scale-to-zero." },
    { icon: "shield", title: "Security & compliance", text: "External Secrets with Doppler, Kyverno policies, Trivy/Checkmarx scanning, CVE remediation and injection-hardened pipelines." },
    { icon: "ci", title: "CI/CD & developer experience", text: "Reusable GitHub Actions, Jenkins shared libraries, autoscaling ARM64 runners and per-PR ephemeral review environments." },
    { icon: "obs", title: "Observability & reliability", text: "OpenTelemetry labelling, the ELK stack, Grafana, Argo CD notifications to Teams, and SRE runbooks for stuck releases." },
    { icon: "ai", title: "Backstage & AI tooling", text: "Contributing Backstage plugins, and building AI-assisted DevOps with Claude, GitHub Copilot agents, MCP tools and Azure AI Foundry." },
  ],

  // Each project may also have optional links, rendered as buttons in the case study:
  //   links: { code: "https://github.com/...", writeup: "https://dev.to/...", demo: "https://..." }
  projects: [
    {
      id: "gitops-platform",
      category: "GitOps",
      org: "Conga · Release Platform",
      title: "Multi-stage GitOps release platform",
      summary: "One declarative path from a merged PR to healthy pods for 187 microservices across 9 stages and 18+ environments on AWS and Azure.",
      challenge: "Every product pillar released differently. Stages had their own environments, overrides, secrets, database migrations and post-deploy checks, so releases depended on people rather than the platform.",
      built: [
        "Service CI renders Kustomize overlays and commits stage-specific manifests to a central GitOps repo, the single source of truth for 895 release definitions.",
        "Argo CD post-sync hooks start per-service Argo Workflows that run DB migrations, Terraform, Argo Application creation, smoke tests and rollback.",
        "A stage → environment topology plus ApplicationSet generators fan each release out to the right AWS or Azure clusters by service mapping.",
        "Change detection releases only what changed; a database-backed mutex and hashed workflow names keep parallel releases safe.",
      ],
      impact: ["895 release definitions managed declaratively", "Every deployment traceable to a Git commit", "Same workflow from dev through production DR"],
      stack: ["Argo CD", "Argo Workflows", "ApplicationSets", "Kustomize", "Helm", "Jsonnet", "AWS", "Azure"],
    },
    {
      id: "kargo-promotion",
      category: "GitOps",
      org: "Conga · Progressive Delivery",
      title: "Kargo & PR-based stage promotion",
      summary: "Promotion from DEV → QA → PERF → staging → prod through auditable pull requests, with parallel promotions and a dedicated hotfix lane.",
      challenge: "Promotions were manual copy-paste between stage folders. They collided when several services moved at once, and hotfixes had no safe fast path.",
      built: [
        "Installed Kargo with Argo CD integration to model stages, freight and promotion policies.",
        "Built promotion workflows that open labelled PRs (pillar, service, commit, description) with auto-merge for DEV → QA.",
        "Added rebase-retry logic so many services can promote in parallel without merge conflicts.",
        "Designed the hotfix path (always a PR, no cascade) and folded DR promotions into their primary stages.",
      ],
      impact: ["Parallel multi-service promotions", "Reviewable, labelled promotion PRs", "Safe hotfix lane straight to production"],
      stack: ["Kargo", "Argo CD", "Argo Workflows", "GitHub API", "yq", "Bash"],
    },
    {
      id: "microservices",
      category: "Kubernetes",
      org: "Conga · Service Onboarding",
      title: "Microservice deployments at scale",
      summary: "Onboarded 100+ .NET, Python and Node services, including document automation, migration workers, DataSync, revenue and e-sign, onto a shared Kubernetes deployment model.",
      challenge: "Each team shipped its own Helm charts, ingress rules and secrets wiring, which made deployments inconsistent and hard to roll back.",
      built: [
        "Standardised workloads on a shared k8s library and Kustomize overlays, moving services from bespoke Helm charts where it simplified image tagging.",
        "Added KEDA event-driven autoscaling that works across clouds (Azure Service Bus and AWS) for high-volume workers.",
        "Wired Kong ingress, OpenTelemetry labels, node affinity for Graviton and imagePullSecrets into the defaults.",
        "Added pre-deploy health verification, smoke tests, manual deploy_version redeploys and rollback to service workflows.",
      ],
      impact: ["784 production-path releases initiated personally", "One deployment model across 14 pillars", "Rollback and redeploy without a rebuild"],
      stack: ["Kubernetes", "EKS", "AKS", "Helm", "Kustomize", "KEDA", "Kong", "OpenTelemetry"],
    },
    {
      id: "messaging",
      category: "Messaging",
      org: "Conga · Event-driven Platform",
      title: "Event-driven messaging on AWS & Azure",
      summary: "Queues, topics and subscriptions for event-driven workers, provisioned as code and released with the services that use them on both clouds.",
      challenge: "Workers depended on queues and topics that were created by hand, named differently in every environment, and drifted between AWS and Azure. That broke autoscaling and cross-service events.",
      built: [
        "Terraform modules for AWS SQS queues and SNS topics, and Azure Service Bus topics, subscriptions and SQL filter rules, all run from release workflows.",
        "Consistent, environment-aware naming (stage, site group, test suffixes) so the same service config resolves the right queue in every stage and DR region.",
        "KEDA ScaledObjects on SQS and Service Bus queue depth, with TriggerAuthentication per cloud, so workers scale to load and back to zero.",
        "Kafka topic automation (partitions, replication and retention) and CloudWatch alarms that notify through SNS.",
      ],
      impact: ["Messaging infra released alongside the code", "Same worker runs on AWS or Azure", "Queue-driven autoscaling instead of fixed replicas"],
      stack: ["AWS SQS", "AWS SNS", "Azure Service Bus", "Kafka", "KEDA", "Terraform", "CloudWatch"],
    },
    {
      id: "k8s-platform",
      category: "Kubernetes",
      org: "Conga · Platform Reliability",
      title: "Kubernetes & Argo control-plane hardening",
      summary: "Kept the CI/CD control plane fast and stable under thousands of workflow runs, through EKS upgrades and Karpenter changes.",
      challenge: "As release volume grew, the change-detection job ran out of memory, workflows piled up in etcd, Argo CD syncs hung, and node churn interrupted runners.",
      built: [
        "Fixed the change-detection OOM by listing workflows with metadata only, and tuned TTLs, pod GC and archived history.",
        "Added an Argo CD sync timeout, memoised git fetch with cache GC, and Teams notifications managed through GitOps.",
        "Designed Karpenter EC2NodeClasses and node pools (amd64/arm64, single-AZ, tainted ephemeral pools) with sensible consolidation.",
        "Carried do-not-disrupt policies safely through the EKS 1.35 upgrade.",
      ],
      impact: ["No more controller OOM restarts", "Leaner etcd and a faster UI", "Predictable node lifecycle for CI pods"],
      stack: ["Argo Workflows", "Argo CD", "Karpenter", "EKS", "EBS CSI", "Kubernetes RBAC"],
    },
    {
      id: "finops",
      category: "FinOps",
      org: "Conga · FinOps",
      title: "End-to-end cloud cost engineering",
      summary: "A data-driven FinOps programme across the whole delivery platform, covering network, container images, storage and compute, with more than a dozen cost levers shipped.",
      challenge: "CI and platform spend was growing with release volume. NAT and cross-AZ traffic, repeated image pulls, bloated images, unexpired artifacts and over-provisioned runners were all hiding in the bill, and earlier estimates were off by 4×.",
      built: [
        "Network: enabled VPC Flow Logs with a small analyzer, moved Karpenter node pools to a single AZ (97% of traffic now stays there) and added S3, ECR and STS VPC endpoints.",
        "Image pulls: ECR pull-through caches and mirrored hot images (TiDB, Redis, base images) so external registries (Docker Hub, ACR, GitHub) stop being re-pulled over NAT.",
        "Images & builds: multi-stage Dockerfiles, BuildKit cache mounts, slimmer Alpine-based tool images and multi-arch builds, giving smaller layers, faster pulls and less egress.",
        "Storage: ECR and S3 lifecycle rules to expire untagged and stale images and artifacts, shorter workflow TTLs, immediate pod GC, memoization-cache GC and leaner runner volumes (lower IOPS and throughput).",
        "Compute: ARM64/Graviton node pools and GitHub-hosted ARM runners, right-sized runner and review-app requests, and Karpenter consolidation tuning (WhenEmptyOrUnderutilized, 30 → 10 min).",
        "Idle spend: idle tooling scaled to zero (Kargo, Crossplane, Argo Events) and ephemeral environment TTL cut from 24h to 8h.",
      ],
      impact: ["12+ cost levers in production", "~60% CI egress reduction roadmap", "97% of CI traffic kept in one AZ", "Smaller images, cheaper storage, right-sized compute"],
      stack: ["VPC Flow Logs", "Cost Explorer", "ECR pull-through cache", "S3/ECR lifecycle", "Docker BuildKit", "Karpenter", "Graviton", "Python"],
    },
    {
      id: "ephemeral",
      category: "CI/CD",
      org: "Conga · Developer Platform",
      title: "Ephemeral review environments",
      summary: "A full-stack environment for every pull request that cleans itself up, cheaply.",
      challenge: "Reviewers had nowhere to test PRs end to end, and early preview environments lingered and cost money.",
      built: [
        "Per-PR review apps for the Next.js UI and backend services, provisioned by Argo Workflows with dry-run previews.",
        "Ephemeral TiDB databases on a tainted ARM64 node pool, with images mirrored to ECR and Delete-reclaim storage.",
        "Cut the TTL from 24h to 8h and made deprovisioning idempotent, including GitHub deployment clean-up.",
      ],
      impact: ["Testable PRs before merge", "TTL cut from 24h to 8h", "No orphaned environments"],
      stack: ["Argo Workflows", "Argo CD", "Karpenter", "TiDB", "GitHub Actions", "Next.js"],
    },
    {
      id: "ci-toolkit",
      category: "CI/CD",
      org: "Conga · CI/CD",
      title: "Reusable CI toolkit & elastic runners",
      summary: "Shared GitHub Actions used across the org, self-hosted ARM64 runners that scale to 50, and a tiered move to GitHub-hosted ARM.",
      challenge: "Every repo copied its own build, test and push logic, and self-hosted runners were either idle or saturated.",
      built: [
        "Composite actions for multi-arch Docker builds with BuildKit secrets, optional ECR push, OCI labels and semver auto-versioning.",
        ".NET and Python test actions with coverage thresholds that match the earlier Jenkins measurements.",
        "Moved Actions Runner Controller scale sets under Argo CD, pinned images and scaled ARM64 runners from 10 to 50.",
        "Moved hundreds of workflows to GitHub-hosted ARM64 runners in four tiers.",
      ],
      impact: ["One standard pipeline for many services", "Faster, cheaper ARM64 builds", "No secrets baked into images"],
      stack: ["GitHub Actions", "ARC", "Docker BuildKit", "ECR", "ACR", "Bash"],
    },
    {
      id: "terraform-dr",
      category: "IaC",
      org: "Conga · Infrastructure",
      title: "Multi-cloud Terraform & disaster recovery",
      summary: "One Terraform workflow template that provisions AWS and Azure resources per service, per environment, including DR.",
      challenge: "Infrastructure for queues, topics and databases lived outside the release flow, and DR environments drifted from primary.",
      built: [
        "A unified terraform-apply ClusterWorkflowTemplate supporting multiple clouds and modules, with prechecks and per-run repo clones.",
        "DR state layout (stage/env-dr/service) with tfvars gating for staging-dr and prod-dr.",
        "Service Bus and SNS topics, Log Analytics and Key Vault provisioned as code.",
        "Crossplane proof of concept with a MessagingStack composition for self-service infrastructure.",
      ],
      impact: ["Infrastructure released alongside code", "DR stages kept in parity", "A self-service IaC path"],
      stack: ["Terraform", "Crossplane", "Argo Workflows", "Azure Service Bus", "AWS SNS", "Key Vault"],
    },
    {
      id: "cluster-lifecycle",
      category: "IaC",
      org: "Conga · Fleet Management",
      title: "Cluster lifecycle automation",
      summary: "A pipeline that registers new clusters in Argo CD and safely drains and retires old ones.",
      challenge: "Adding or removing clusters was manual and risky, and removed clusters left orphaned Argo CD apps.",
      built: [
        "Jenkins pipeline that imports clusters into Argo CD (upsert) with labels for ApplicationSet targeting.",
        "A deprovision mode with a safe clean-up stage, graceful handling of zero apps or missing labels, and tiered unsticking of stalled drains.",
        "Earlier work: EBS CSI driver install, Kafka and MongoDB provisioning with Ansible, and Azure VM dry-runs.",
      ],
      impact: ["Repeatable cluster onboarding and offboarding", "No orphaned applications", "Clean multi-cluster fleet"],
      stack: ["Jenkins", "Argo CD", "Ansible", "Terraform", "AWS", "Azure"],
    },
    {
      id: "security",
      category: "Security",
      org: "Conga · Platform Security",
      title: "Secrets, policy & supply-chain hygiene",
      summary: "Safer defaults across clusters, pipelines and container images.",
      challenge: "Secrets were scattered, policy enforcement was risky to roll out, and base images regularly picked up HIGH/CRITICAL CVEs.",
      built: [
        "External Secrets Operator (major-version upgrade, retry with backoff) sourcing from Doppler across AWS and Azure.",
        "Kyverno policies rolled out in Audit mode before enforcing them.",
        "CVE fixes in .NET runtimes, perl-base, libexpat, curl and ca-certificates; Trivy, Checkmarx and hadolint in CI.",
        "Replaced PATs with GitHub App tokens, disabled shell tracing around credentials, and removed expression injection from workflows.",
      ],
      impact: ["Secrets only from a secret manager", "Policies rolled out without outages", "Fewer high-severity findings"],
      stack: ["External Secrets", "Doppler", "Kyverno", "Trivy", "Checkmarx", "GitHub Apps"],
    },
    {
      id: "devportal",
      category: "Observability",
      org: "Conga · Developer Experience",
      title: "Backstage developer portal & observability",
      summary: "Contributing to our Backstage developer portal and giving engineers self-serve visibility into releases, logs and health.",
      challenge: "Developers had to ask the DevOps team for release status, logs and failure reasons.",
      built: [
        "Contributed an Argo Workflows plugin (frontend plus gated backend) to the Backstage developer hub, with the token synced from Doppler through External Secrets.",
        "Exploring catalog-driven workflows and AI assistants (Claude, GitHub Copilot, MCP tools) to answer 'where is my release?' without a ticket.",
        "Argo CD notifications to Microsoft Teams, managed as code.",
        "OpenTelemetry labels in common labels for log routing, and otel-agent tolerations for tainted pools.",
        "Earlier work: ELK stack (Filebeat, Logstash, Kibana), the Elastic operator, and Grafana drill-downs in Rancher.",
      ],
      impact: ["Self-serve release status", "Fewer status pings to DevOps", "Consistent telemetry across services"],
      stack: ["Backstage", "OpenTelemetry", "ELK", "Grafana", "MS Teams", "Claude Code", "GitHub Copilot"],
    },
    {
      id: "jenkins-legacy",
      category: "CI/CD",
      org: "Conga · Build Engineering",
      title: "Jenkins shared libraries & data infrastructure",
      summary: "The groundwork from 2022–2024: standardised Jenkins pipelines and automated data-tier provisioning.",
      challenge: "Each team maintained its own Jenkinsfile and data-tier setup, with no shared scanning or artifact handling.",
      built: [
        "Jenkins shared libraries for Kaniko build-tag-push, a Python CI pipeline, archiving and artifact clean-up.",
        "Checkmarx scanning and Artifactory registries wired into every pipeline.",
        "Kafka topic automation (partitions, replication, retention), MongoDB replication and Ansible playbooks.",
      ],
      impact: ["Shared pipelines across many services", "Security scanning on by default", "Repeatable data-tier setup"],
      stack: ["Jenkins", "Groovy", "Kaniko", "Kafka", "MongoDB", "Ansible", "Artifactory"],
    },
  ],

  // Shared by the site and resume.html. Orbit shows the first two points of each role and puts the rest
  // behind "Show more outcomes". Consecutive roles at the same company are grouped on the resume.
  experience: [
    {
      role: "Senior Software Engineer — DevOps",
      company: "Conga",
      period: "Apr 2025 — Present",
      location: "Chennai, India",
      current: true,
      points: [
        "Own the multi-stage GitOps release platform (Argo CD, Argo Workflows, Kargo) that ships 187 microservices across 14 product lines, 9 stages and 18+ AWS and Azure environments.",
        "Designed PR-based stage promotion with Kargo, including parallel rebase-and-retry and a dedicated hotfix lane to production, removing release-queue bottlenecks.",
        "Led FinOps for the CI/CD platform: VPC Flow Log analysis, single-AZ Karpenter consolidation (97% of traffic), S3/ECR VPC endpoints, pull-through image caches, slimmer images, ECR/S3 lifecycle rules, ARM64 and scale-to-zero, with a roadmap to cut NAT egress cost by ~60%.",
        "Delivered per-PR ephemeral review environments (TTL cut from 24h to 8h), autoscaling ARM64 GitHub Actions runners and an org-wide reusable GitHub Actions toolkit.",
        "Provisioned AWS SQS/SNS and Azure Service Bus topics and subscriptions with Terraform, with KEDA queue-based autoscaling for event-driven workers and Crossplane compositions for self-service infrastructure.",
        "Hardened the platform with External Secrets (Doppler), Kyverno policies, Trivy/Checkmarx scanning, CVE remediation and Argo control-plane tuning.",
        "Contributing Backstage developer-portal plugins and AI-assisted DevOps workflows with Claude, GitHub Copilot agents, MCP servers and Azure AI Foundry.",
      ],
      tags: ["Kubernetes", "Argo CD", "Kargo", "Terraform", "Karpenter", "KEDA", "AWS SQS", "Azure Service Bus", "GitHub Actions", "Backstage", "Claude Code"],
    },
    {
      role: "DevOps Engineer",
      company: "Conga",
      period: "Jan 2022 — Mar 2025",
      location: "Chennai, India",
      points: [
        "Built Jenkins shared libraries (Kaniko build-and-push, Python CI, Checkmarx scanning, artifact clean-up) adopted across product teams to standardise CI.",
        "Ran Spinnaker pipelines and webhook triggers for service deployments, then migrated services to Argo CD GitOps.",
        "Automated Kafka topics, MongoDB replication, the EBS CSI driver and the ELK stack on Kubernetes with Helm and Ansible.",
        "Provisioned Azure infrastructure (VMs, Log Analytics, Key Vault) with Terraform and maintained AWS, Azure and IBM Cloud integrations.",
        "Onboarded .NET microservices to Kubernetes with Kong ingress, SNS topics and KEDA autoscaling.",
      ],
      tags: ["Jenkins", "Spinnaker", "Helm", "Ansible", "Kafka", "Terraform", "Azure", "IBM Cloud"],
    },
    {
      role: "DevOps Engineer",
      company: "Lucid Motors",
      period: "Jun 2021 — Dec 2021",
      location: "Chennai, India",
      points: [
        "Built and maintained CI/CD pipelines for 15 model-based ECUs (electronic control units) in electric-vehicle software using Jenkins, GitLab CI and JFrog Artifactory.",
        "Scaled and supported a multi-stage CI system, diagnosing and resolving build and test failures raised by validation teams.",
        "Defined the branching and merging strategy and drove repeatable DevOps practices across the infotainment organisation, with release documentation in Confluence and sprint planning in Jira.",
      ],
      tags: ["Jenkins", "GitLab CI", "JFrog Artifactory", "Git", "Jira", "Confluence"],
    },
    {
      role: "AWS DevOps Engineer",
      company: "Sify Technologies",
      period: "Apr 2019 — Feb 2021",
      location: "Chennai, India",
      points: [
        "Built end-to-end Jenkins CI/CD pipelines (controller/agent) with Maven, SonarQube quality gates and Nexus artifacts, deploying Java applications to Tomcat across Dev, QA and UAT for client GEICO.",
        "Acted as release engineer for multiple development teams running parallel releases, owning Git branching, tagging and merges.",
        "Containerised applications with Docker and automated server configuration with Ansible playbooks and roles.",
        "Delivered highly available AWS deployments with Elastic Load Balancing across Availability Zones, HTTPS certificates and Prometheus/CloudWatch monitoring.",
      ],
      tags: ["AWS", "Jenkins", "Ansible", "Docker", "Maven", "SonarQube", "Nexus", "Prometheus"],
    },
    {
      role: "AWS Cloud Administrator",
      company: "Sify Technologies",
      period: "Dec 2017 — Mar 2019",
      location: "Chennai, India",
      points: [
        "Provisioned and administered Linux and Windows servers on AWS (EC2, VPC, RDS, S3, Route 53), with IAM users, groups and least-privilege policies.",
        "Set up CloudFront CDN with S3 and server origins, Route 53 DNS, and AMI/EBS snapshot backups for disaster recovery.",
        "Monitored production health with CloudWatch alarms and SNS notifications, and resolved day-to-day infrastructure incidents.",
      ],
      tags: ["AWS", "EC2", "CloudFront", "Route 53", "CloudWatch", "Linux"],
    },
  ],

  education: {
    degree: "B.E. Electronics & Communication Engineering",
    school: "Anna University, Chennai",
    period: "2013 — 2017",
  },

  certifications: [
    { name: "Scientific Computing with Python", issuer: "freeCodeCamp", date: "Nov 2021", url: "https://freecodecamp.org/certification/tamilvanan/scientific-computing-with-python-v7" },
    // TODO: add CKA / AWS / Terraform certifications as you earn them
  ],

  // Resume-only content for resume.html: plain-text, keyword-rich rows that ATS parsers read well.
  // The phone number is deliberately not stored here, so the public PDF omits it. For applications run:
  //   PHONE="+91 ..." ./scripts/build-resume.sh ~/Downloads/Tamil_Vanan_Senior_DevOps_Engineer_Resume.pdf
  resume: {
    title: "Senior DevOps Engineer | Site Reliability | Platform Engineering",
    summary:
      "Senior DevOps and Site Reliability Engineer with 8+ years of experience designing, automating and operating cloud platforms on AWS and Azure. I own a multi-stage GitOps release platform (Argo CD, Argo Workflows, Kargo) that ships 187 microservices across 9 stages and 18+ environments through automated, Git-driven promotion. Hands-on across Kubernetes (EKS, AKS, Karpenter, KEDA), Terraform and Crossplane, GitHub Actions and Jenkins CI/CD, event-driven messaging, DevSecOps and FinOps. I replace manual releases with self-service automation and cut cloud spend through data-driven cost engineering.",
    competencies: [
      "Platform Engineering", "GitOps & Release Engineering", "Kubernetes (EKS / AKS)", "CI/CD Automation",
      "Infrastructure as Code", "Site Reliability Engineering", "Cloud Cost Optimization (FinOps)", "DevSecOps", "Multi-cloud (AWS & Azure)",
    ],
    skills: [
      { group: "Cloud", items: "AWS (EKS, EC2, VPC, S3, ECR, IAM, RDS, Route 53, CloudFront, SQS, SNS, CloudWatch), Azure (AKS, Service Bus, Key Vault, Log Analytics, AI Foundry), IBM Cloud, Cloudflare" },
      { group: "Containers & GitOps", items: "Kubernetes, Docker, Helm, Kustomize, Argo CD, Argo Workflows, Argo Events, Kargo, Karpenter, KEDA, Kong, Rancher" },
      { group: "CI/CD & Build", items: "GitHub Actions, Actions Runner Controller, Jenkins (shared libraries), Spinnaker, Azure DevOps, GitLab CI, BuildKit, Kaniko, Maven, Nexus, JFrog Artifactory, SonarQube" },
      { group: "Infrastructure as Code", items: "Terraform, Crossplane, Ansible" },
      { group: "Messaging & Data", items: "Kafka, AWS SQS/SNS, Azure Service Bus, MongoDB, Redis, PostgreSQL, TiDB" },
      { group: "Observability", items: "OpenTelemetry, Prometheus, Grafana, ELK Stack (Elasticsearch, Logstash, Kibana), CloudWatch, Argo CD Notifications" },
      { group: "Security", items: "External Secrets Operator, Doppler, HashiCorp Vault, Kyverno, Trivy, Checkmarx, IAM & RBAC" },
      { group: "Scripting & Tools", items: "Bash, Python, Groovy, Node.js, YAML, Jsonnet, Git, Linux, Jira, Confluence" },
      { group: "AI & Developer Portals", items: "Backstage, Claude Code, GitHub Copilot, MCP servers, Azure AI Foundry" },
    ],
    languages: "English, Tamil",
  },
  // Rendered as capability cards; every item with an entry in `logos` shows its icon.
  skills: [
    { group: "Cloud & Infrastructure", items: ["AWS", "Azure", "IBM Cloud", "Cloudflare", "Linux", "EKS", "AKS", "VPC & networking", "S3 & ECR", "Key Vault"] },
    { group: "Kubernetes & GitOps", items: ["Kubernetes", "Docker", "Helm", "Kustomize", "Argo CD", "Argo Workflows", "Argo Events", "Kargo", "Karpenter", "KEDA", "Kong Ingress", "Rancher"] },
    { group: "IaC & CI/CD", items: ["Terraform", "Crossplane", "Ansible", "GitHub Actions", "Jenkins", "Spinnaker", "Azure DevOps", "Actions Runner Controller", "BuildKit", "Kaniko"] },
    { group: "Messaging & Data", items: ["AWS SQS", "AWS SNS", "Azure Service Bus", "Kafka", "MongoDB", "Redis", "PostgreSQL", "TiDB"] },
    { group: "Observability", items: ["OpenTelemetry", "Grafana", "Elasticsearch", "Logstash", "Kibana", "CloudWatch", "Argo CD Notifications"] },
    { group: "Security", items: ["External Secrets", "Doppler", "Vault", "Kyverno", "Trivy", "Checkmarx", "GitHub Apps", "RBAC"] },
    { group: "Languages & Scripting", items: ["Bash", "Python", "Groovy", "Node.js", "YAML", "Jsonnet", ".NET builds", "Git"] },
    { group: "AI & Developer Portals", items: ["Claude Code", "GitHub Copilot", "Azure AI Foundry", "MCP servers", "Backstage"] },
  ],

  // Self-hosted icons in assets/icons (from devicon, MIT, and simple-icons, CC0).
  logos: {
    "AWS": "aws.svg", "EKS": "aws.svg", "S3 & ECR": "aws.svg", "VPC & networking": "aws.svg", "AWS SQS": "aws.svg", "AWS SNS": "aws.svg", "CloudWatch": "aws.svg",
    "Azure": "azure.svg", "AKS": "azure.svg", "Key Vault": "azure.svg", "Azure Service Bus": "azure.svg", "Azure AI Foundry": "azure.svg", "Log Analytics": "azure.svg",
    "Cloudflare": "cloudflare.svg", "Linux": "linux.svg",
    "Kubernetes": "kubernetes.svg", "Docker": "docker.svg", "BuildKit": "docker.svg", "Helm": "helm.svg", "Rancher": "rancher.svg", "Kong Ingress": "kong.svg",
    "Argo CD": "argocd.svg", "Argo CD Notifications": "argocd.svg", "Argo Workflows": "argo.svg", "Argo Events": "argo.svg", "Kargo": "argo.svg",
    "Terraform": "terraform.svg", "Ansible": "ansible.svg", "GitHub Actions": "githubactions.svg", "Actions Runner Controller": "githubactions.svg",
    "Jenkins": "jenkins.svg", "Spinnaker": "spinnaker.svg", "Azure DevOps": "azuredevops.svg",
    "Kafka": "kafka.svg", "MongoDB": "mongodb.svg", "Redis": "redis.svg", "PostgreSQL": "postgresql.svg", "TiDB": "tidb.svg",
    "OpenTelemetry": "opentelemetry.svg", "Grafana": "grafana.svg", "Elasticsearch": "elasticsearch.svg", "Logstash": "logstash.svg", "Kibana": "kibana.svg",
    "Vault": "vault.svg", "Trivy": "trivy.svg", "Checkmarx": "checkmarx.svg", "GitHub Apps": "github.svg",
    "Bash": "bash.svg", "Python": "python.svg", "Groovy": "groovy.svg", "Node.js": "nodejs.svg", "YAML": "yaml.svg", ".NET builds": "dotnet.svg", ".NET": "dotnet.svg", "Git": "git.svg",
    "Claude Code": "claude.svg", "GitHub Copilot": "githubcopilot.svg", "MCP servers": "mcp.svg", "Backstage": "backstage.svg",
  },
  // Near-black marks that get flipped (invert + hue-rotate) on dark themes.
  darkLogos: ["aws.svg", "github.svg", "githubcopilot.svg", "mcp.svg", "helm.svg", "kafka.svg", "kong.svg", "trivy.svg", "ansible.svg"],
};

// Derived experience: per-role durations (LinkedIn-style, months inclusive) and total years.
(() => {
  const P = window.PORTFOLIO;
  const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const now = new Date();
  const parse = (t) => {
    if (/present/i.test(t)) return now.getFullYear() * 12 + now.getMonth();
    const [m, y] = t.trim().split(/\s+/);
    return Number(y) * 12 + MONTHS.indexOf(m.slice(0, 3).toLowerCase());
  };
  const fmt = (n) => {
    const y = Math.floor(n / 12), m = n % 12;
    return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
  };
  let total = 0;
  for (const x of P.experience) {
    const [a, b] = x.period.split(/[—–-]/);
    x.months = parse(b) - parse(a) + 1;
    x.duration = fmt(x.months);
    total += x.months;
  }
  P.totalMonths = total;
  P.totalDuration = fmt(total);
  P.companies = new Set(P.experience.map((x) => x.company)).size;
  P.profile.years = `${Math.floor(total / 12)}+`;
})();
