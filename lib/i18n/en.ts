const en = {
  // ── nav / meta ──────────────────────────────────────────
  "meta.title": "AppBase — PFE Progress",
  "meta.description":
    "Progress tracker for AppBase, a self-hosted Backend-as-a-Service platform for LAN environments.",
  "meta.beta": "BETA",
  "meta.beta.title": "AppBase — Beta progress (per-app architecture)",

  // ── banner ──────────────────────────────────────────────
  "banner.message":
    "Big news! Appbase is now Nublestation. Enjoy enhanced features by visiting our site",
  "banner.cta": "See official documentation →",
  "banner.close": "Dismiss",

  // ── what's new (notifications popup) ────────────────────
  "whatsnew.title": "What's new",
  "whatsnew.close": "Close",

  // ── progress / current milestone ────────────────────────
  "progress.current": "Currently working on",
  "progress.next": "Next up",
  "progress.complete": "Complete",

  // ── header ──────────────────────────────────────────────
  "header.badge": "Final Year Project · ENSA Fès",
  "header.degree": "Network & Telecommunications Engineering",
  "header.github": "View on GitHub",
  "header.tagline":
    "Self-hosted Backend-as-a-Service for LAN environments and private VPCs.",

  // ── what section ────────────────────────────────────────
  "what.heading": "What is AppBase?",
  "what.p1":
    "AppBase is a self-hosted Backend-as-a-Service platform that gives small organisations — clinics, schools, local government offices, small engineering teams — the same developer experience as Firebase or Supabase: authentication, file storage, and a database API. The difference is that it runs entirely on your own hardware, on your own network, with zero data leaving the premises.",
  "what.p2":
    "You deploy one instance on any machine. Developers register apps against it, receive scoped API keys, and build on top of the platform. Everything works offline. Pull the network cable to the internet — the platform keeps running.",

  // ── problem section ──────────────────────────────────────
  "problem.heading": "The Problem",
  "problem.intro":
    "Existing BaaS solutions fail organisations that cannot send data to the cloud:",
  "problem.firebase": "Cloud-dependent. Data leaves the network. Not viable for compliance-sensitive environments.",
  "problem.supabase": "Requires DevOps expertise and complex infrastructure. Not designed for LAN-first operation.",
  "problem.appwrite": "Monolithic architecture. No LAN-native networking or built-in service discovery.",
  "problem.pocketbase": "Single binary with no multi-app isolation and no network-layer features.",
  "problem.gap":
    "No existing solution combines BaaS services with LAN-native networking in a single platform deployable on commodity hardware in under ten minutes.",

  // ── how section ──────────────────────────────────────────
  "how.heading": "How It Works",
  "how.m1":
    "In the first milestone, AppBase is a single BaaS instance: one Fastify API, one SQLite database, one storage namespace, and one app-specific dashboard. Developers consume it through an SDK that handles token refresh, file uploads, and real-time subscriptions transparently.",
  "how.m2":
    "From M2 onwards, a master control plane at appbase.local provisions isolated BaaS instances per app using Docker. Each app gets its own port, database, and storage namespace — managed automatically.",
  "how.m3":
    "M3 adds the network layer: Caddy reverse proxy routes traffic to subdomain addresses, mDNS announces services on the LAN so clients discover them without manual configuration, and a health monitor restarts failed containers automatically.",

  // ── progress section ─────────────────────────────────────
  "progress.heading": "Progress",
  "progress.tasks": "tasks",
  "progress.of": "of",

  // ── legend ───────────────────────────────────────────────
  "legend.done": "Completed",
  "legend.inprogress": "In Progress",
  "legend.upcoming": "Upcoming",

  // ── status badges ────────────────────────────────────────
  "status.done": "Completed",
  "status.in-progress": "In Progress",
  "status.upcoming": "Upcoming",

  // ── milestones section ───────────────────────────────────
  "milestones.heading": "Milestones",

  // ── tech stack ───────────────────────────────────────────
  "tech.heading": "Tech Stack",

  // ── about ────────────────────────────────────────────────
  "about.heading": "About This Project",
  "about.body":
    "AppBase is the Final Year Project (PFE) for a Network & Telecommunications Engineering degree at ENSA Fès. It sits at the intersection of software engineering and network engineering — demonstrating REST API design, multi-app isolation, container orchestration, LAN service discovery, and real-time data pipelines in a single cohesive platform.",

  // ── sidebar nav ──────────────────────────────────────────
  "nav.overview": "Overview",
  "nav.problem": "The Problem",
  "nav.how": "How It Works",
  "nav.progress": "Progress",
  "nav.milestones": "Milestones",
  "nav.documents": "Documents",
  "nav.tech": "Tech Stack",
  "nav.contact": "Contact",
  "nav.architecture": "Architecture",
  "nav.what": "What is AppBase",
  "nav.usecases": "Use cases",
  "nav.comparison": "Comparison",
  "nav.demo": "Demo & Docs",
  "nav.beta": "Beta progress",
  "nav.beta.back": "← Back to current progress",

  // ── documents section ───────────────────────────────────
  "documents.heading": "Documents",
  "documents.presentation": "PFE Presentation",
  "documents.report": "PFE Report",
  "documents.status.unavailable": "Not available yet",
  "documents.status.in-progress": "In progress",
  "documents.status.available": "Available",
  "documents.open": "Open",

  // ── contact section ─────────────────────────────────────
  "contact.heading": "Contact",
  "contact.github": "GitHub",
  "contact.linkedin": "LinkedIn",
  "contact.email": "Email",

  // ── admin hint ───────────────────────────────────────────
  "footer.admin": "Update progress",

  // ── milestone data ───────────────────────────────────────
  "ms.planning.title": "Planning & Architecture",
  "ms.planning.subtitle": "Research, ADRs, and system design",
  "ms.planning.weeks": "Pre-M1",
  "ms.planning.deliverable": "README, architecture docs, ADRs, API spec, monorepo scaffold",
  "ms.planning.w0.label": "Research & Decisions",
  "ms.planning.w0.summary": "Evaluated frameworks, wrote ADRs, designed API surface",
  "ms.planning.w0.t0": "Framework evaluation (Fastify, Express, Hono)",
  "ms.planning.w0.t1": "ADR-001: API framework selection",
  "ms.planning.w0.t2": "ADR-002: ORM and migration strategy",
  "ms.planning.w0.t3": "ADR-003: Auth implementation strategy",
  "ms.planning.w0.t4": "API spec design (REST surface)",
  "ms.planning.w0.t5": "Architecture document (M1 → M4)",

  "ms.setup.title": "Project Setup",
  "ms.setup.subtitle": "Monorepo, tooling, CI pipeline",
  "ms.setup.weeks": "Pre-M1",
  "ms.setup.deliverable": "Turborepo monorepo with CI, linting, and shared packages",
  "ms.setup.w0.label": "Infrastructure",
  "ms.setup.w0.summary": "Monorepo scaffold, shared configs, CI workflows",
  "ms.setup.w0.t0": "Turborepo monorepo setup",
  "ms.setup.w0.t1": "Shared tsconfig, ESLint, Prettier",
  "ms.setup.w0.t2": "GitHub Actions CI (lint, typecheck, test)",
  "ms.setup.w0.t3": "Package structure (api, dashboard, sdk, db, types)",

  "ms.m1.title": "M1 — Single Instance BaaS",
  "ms.m1.subtitle": "Auth, database, storage, SDK, dashboard",
  "ms.m1.weeks": "Weeks 1–4",
  "ms.m1.deliverable": "One BaaS unit, working SDK, and a demo app running fully offline",
  "ms.m1.w0.label": "Week 1 — Auth + API Keys",
  "ms.m1.w0.summary": "Authentication system and API key middleware",
  "ms.m1.w0.t0": "better-auth integration (register, login, refresh)",
  "ms.m1.w0.t1": "API key issuance and validation middleware",
  "ms.m1.w0.t2": "SDK auth module",
  "ms.m1.w1.label": "Week 2 — Database API",
  "ms.m1.w1.summary": "Collection CRUD and first demoable checkpoint",
  "ms.m1.w1.t0": "Collection management endpoints",
  "ms.m1.w1.t1": "Full CRUD on records",
  "ms.m1.w1.t2": "SDK db module",
  "ms.m1.w1.t3": "Demo app stores & retrieves data",
  "ms.m1.w2.label": "Week 3 — Storage",
  "ms.m1.w2.summary": "File upload/download and SDK storage module",
  "ms.m1.w2.t0": "Bucket-based upload/download endpoints",
  "ms.m1.w2.t1": "File scoping per user",
  "ms.m1.w2.t2": "SDK storage module",
  "ms.m1.w3.label": "Week 4 — Real-time + Dashboard",
  "ms.m1.w3.summary": "SSE subscriptions, admin UI, Docker packaging",
  "ms.m1.w3.t0": "SSE real-time on DB collections",
  "ms.m1.w3.t1": "SDK subscribe() method",
  "ms.m1.w3.t2": "App-specific admin dashboard",
  "ms.m1.w3.t3": "Docker packaging (single docker run)",

  "ms.m2.title": "M2 — Container Orchestration",
  "ms.m2.subtitle": "Multi-app provisioning and isolation",
  "ms.m2.weeks": "Weeks 5–6",
  "ms.m2.deliverable": "Master control plane that provisions isolated BaaS instances per app",
  "ms.m2.w0.label": "Week 5 — Control Plane",
  "ms.m2.w0.summary": "Master process and app provisioning",
  "ms.m2.w0.t0": "Master control plane at appbase.local",
  "ms.m2.w0.t1": "App provisioning / deletion service",
  "ms.m2.w0.t2": "Docker SDK integration (dockerode)",
  "ms.m2.w1.label": "Week 6 — Isolation",
  "ms.m2.w1.summary": "Per-app databases, storage, and port management",
  "ms.m2.w1.t0": "Per-app SQLite and storage namespaces",
  "ms.m2.w1.t1": "Port assignment and management",
  "ms.m2.w1.t2": "Master tracks app state and lifecycle",

  "ms.m3.title": "M3 — Network Layer",
  "ms.m3.subtitle": "Routing, mDNS, health checks",
  "ms.m3.weeks": "Weeks 7–8",
  "ms.m3.deliverable": "Subdomain routing, service discovery, and automatic failure recovery",
  "ms.m3.w0.label": "Week 7 — Routing & Discovery",
  "ms.m3.w0.summary": "Reverse proxy and mDNS announcements",
  "ms.m3.w0.t0": "Caddy reverse proxy (subdomain routing)",
  "ms.m3.w0.t1": "mDNS service announcement and discovery",
  "ms.m3.w1.label": "Week 8 — Resilience",
  "ms.m3.w1.summary": "Health monitoring and network isolation",
  "ms.m3.w1.t0": "Health checks with auto-restart",
  "ms.m3.w1.t1": "Network isolation between app containers",

  "ms.m4.title": "M4 — Observability & Polish",
  "ms.m4.subtitle": "Dashboards, docs, full demo",
  "ms.m4.weeks": "Weeks 9–10",
  "ms.m4.deliverable": "Network topology dashboard, API docs, end-to-end demo scenario",
  "ms.m4.w0.label": "Weeks 9–10",
  "ms.m4.w0.summary": "Observability tooling and final polish",
  "ms.m4.w0.t0": "Network topology dashboard",
  "ms.m4.w0.t1": "Live health status and port map",
  "ms.m4.w0.t2": "API documentation (Swagger UI)",
  "ms.m4.w0.t3": "Full end-to-end demo (offline, multi-app, auto-restart)",

  // ── modal ────────────────────────────────────────────────
  "modal.title": "AppBase has pivoted to a shared-services architecture",
  "modal.subtitle":
    "The original \"one container per app\" design produced 1.25 GB images per app — unsustainable at five apps. The new architecture is shared, multi-tenant, and a fraction of the size.",
  "modal.bullet1":
    "Shared Postgres, shared auth, shared storage — one stack, many apps.",
  "modal.bullet2":
    "Apps are tenants in a database, not running containers. Hundreds of apps cost the same as one.",
  "modal.bullet3":
    "Portable, offline-first, plug-and-play — runs on any commodity machine on the LAN.",
  "modal.cta": "View Official Architecture",
  "modal.dismiss": "Stay on beta",
  "modal.close": "Close",

  // ── architecture page : meta + nav ───────────────────────
  "arch.meta.title": "AppBase — Official Architecture",
  "arch.meta.description":
    "The shared-services, multi-tenant architecture of AppBase: components, data model, comparison with Firebase / AWS Amplify / Supabase, and use cases for clinics and schools.",
  "nav.arch.overview": "Overview",
  "nav.arch.why": "Why we changed",
  "nav.arch.components": "Components",
  "nav.arch.routing": "Routing",
  "nav.arch.data": "Data model",
  "nav.arch.comparison": "Comparison",
  "nav.arch.usecases": "Use cases",
  "nav.arch.compliance": "Compliance",
  "nav.arch.back": "← View beta progress",

  // ── architecture page : hero + why ──────────────────────
  "arch.heading": "Official Architecture",
  "arch.intro":
    "AppBase is a self-hosted, shared-services backend platform for organisations that cannot send their data to the cloud. One installation per organisation, many apps as logical tenants. Runs entirely offline on commodity hardware in under ten minutes.",
  "arch.why.heading": "Why we pivoted",
  "arch.why.before":
    "Before — one Docker container per app: each app produced a 1.25 GB image with its own auth, database, and storage. Five apps meant 6+ GB of duplicated services and no SSO.",
  "arch.why.after":
    "After — shared services: one Postgres, one auth, one storage layer. Apps are rows in a database, scoped by API key. Adding the hundredth app costs no more memory than the first.",

  // ── architecture page : diagrams ─────────────────────────
  "arch.diagram.components.title": "Component map",
  "arch.diagram.components.caption":
    "A single host on the LAN runs the entire stack via Docker Compose. Caddy fronts everything; tenant data is isolated at the application layer.",
  "arch.diagram.routing.title": "Routing map",
  "arch.diagram.routing.caption":
    "Friendly *.{org}.local subdomains, resolved by mDNS on the LAN with CoreDNS as a production fallback.",
  "arch.diagram.data.title": "Data model",
  "arch.diagram.data.caption":
    "Every row carries an org_id and an app_id. Authorization is enforced at the platform layer, not delegated to developers.",
  "arch.node.lan": "LAN — *.{org}.local",
  "arch.node.host": "Single host (mini-PC, server, or laptop)",
  "arch.node.compose": "Docker Compose stack",
  "arch.node.caddy": "Caddy",
  "arch.node.caddy.role": "reverse proxy · 80/443",
  "arch.node.coredns": "CoreDNS",
  "arch.node.coredns.role": "DNS authority · *.{org}.local",
  "arch.node.mdns": "mDNS Announcer",
  "arch.node.mdns.role": "LAN service discovery",
  "arch.node.api": "API Server",
  "arch.node.api.role": "auth · db · storage",
  "arch.node.console": "Console UI",
  "arch.node.console.role": "Next.js admin dashboard",
  "arch.node.postgres": "PostgreSQL",
  "arch.node.postgres.role": "tenant-scoped data",
  "arch.node.storage": "File Storage",
  "arch.node.storage.role": "/var/appbase/",
  "arch.route.console": "console.{org}.local",
  "arch.route.console.target": "Admin dashboard",
  "arch.route.api": "api.{org}.local",
  "arch.route.api.target": "API Server",
  "arch.route.app": "console.{org}.local/apps/{name}",
  "arch.route.app.target": "Per-app developer dashboard",
  "arch.route.frontend": "{appname}.{org}.local",
  "arch.route.frontend.target": "Static files of deployed frontend",
  "arch.data.org": "organizations",
  "arch.data.org.note": "one row — the clinic / school itself",
  "arch.data.users": "users",
  "arch.data.users.note": "admins + end users",
  "arch.data.apps": "apps",
  "arch.data.apps.note": "created by admins; each gets an API key",
  "arch.data.keys": "api_keys",
  "arch.data.keys.note": "scoped credentials per app",
  "arch.data.deployments": "deployments",
  "arch.data.deployments.note": "frontend versions",
  "arch.data.access": "user_app_access",
  "arch.data.access.note": "which user can use which app",

  // ── architecture page : comparison ───────────────────────
  "arch.cmp.heading": "How AppBase compares",
  "arch.cmp.intro":
    "Existing BaaS platforms each excel on different axes. None combine offline-first operation, on-prem data residency, multi-app isolation, and zero-ops deployment for non-DevOps teams.",
  "arch.cmp.product.appbase": "AppBase",
  "arch.cmp.product.firebase": "Firebase",
  "arch.cmp.product.amplify": "AWS Amplify Gen 2",
  "arch.cmp.product.supabase": "Supabase Cloud",
  "arch.cmp.axis.residency": "Data residency",
  "arch.cmp.axis.compliance": "Loi 09-08 fit",
  "arch.cmp.axis.complexity": "Setup complexity",
  "arch.cmp.axis.footprint": "Footprint",
  "arch.cmp.axis.isolation": "Multi-app isolation",
  "arch.cmp.axis.lan": "LAN-native",
  "arch.cmp.axis.plug": "Plug-and-play",
  "arch.cmp.appbase.residency": "On-prem · LAN only",
  "arch.cmp.appbase.compliance": "Native fit — data never leaves the premises",
  "arch.cmp.appbase.complexity": "One install script",
  "arch.cmp.appbase.footprint": "~500 MB total stack",
  "arch.cmp.appbase.isolation": "Tenant-scoped at platform layer",
  "arch.cmp.appbase.lan": "Yes — mDNS + CoreDNS",
  "arch.cmp.appbase.plug": "Yes — under 10 minutes",
  "arch.cmp.firebase.residency": "Google Cloud (US/EU regions)",
  "arch.cmp.firebase.compliance": "Requires CNDP cross-border authorization (Article 43)",
  "arch.cmp.firebase.complexity": "Low for cloud, requires internet",
  "arch.cmp.firebase.footprint": "Cloud — no local footprint",
  "arch.cmp.firebase.isolation": "Project-level only",
  "arch.cmp.firebase.lan": "No — internet-dependent",
  "arch.cmp.firebase.plug": "No — cannot run offline",
  "arch.cmp.amplify.residency": "AWS regions (often EU/US)",
  "arch.cmp.amplify.compliance": "Same cross-border issue · complex DPA",
  "arch.cmp.amplify.complexity": "High — IAM, CDK, configuration",
  "arch.cmp.amplify.footprint": "Cloud — no local footprint",
  "arch.cmp.amplify.isolation": "Per-environment, per-stack",
  "arch.cmp.amplify.lan": "No",
  "arch.cmp.amplify.plug": "No — DevOps required",
  "arch.cmp.supabase.residency": "AWS-backed regions",
  "arch.cmp.supabase.compliance": "Same cross-border issue",
  "arch.cmp.supabase.complexity": "Low cloud · medium self-hosted",
  "arch.cmp.supabase.footprint": "Cloud — no local footprint",
  "arch.cmp.supabase.isolation": "RLS policies per project",
  "arch.cmp.supabase.lan": "No",
  "arch.cmp.supabase.plug": "Cloud only — self-hosted needs DevOps",
  // ── architecture page : use cases ────────────────────────
  "arch.uc.heading": "Use cases",
  "arch.uc.intro":
    "Two real-world scenarios where on-prem operation is not a preference but a hard requirement.",
  "arch.uc.clinics.title": "Clinics — patient records, scheduling, internal messaging",
  "arch.uc.clinics.body":
    "A 30-staff clinic in Fès needs internal applications for patient records, appointment scheduling, and prescription tracking. Patient data is sensitive personal data under loi 09-08 — sending it to Firebase or AWS would require explicit CNDP authorization for cross-border transfer, plus patient consent, plus a documented DPA. Most small clinics simply cannot navigate that process.",
  "arch.uc.clinics.flow":
    "With AppBase, the clinic's IT person installs one mini-PC behind the reception desk. Doctors open records.clinic.local on tablets; nurses open tasks.clinic.local on phones. SSO is automatic across apps. Pulling the internet cable proves nothing leaves the building. Backups are a single Postgres dump on a USB drive, kept in the safe.",
  "arch.uc.schools.title": "Schools — grades, attendance, parent portal",
  "arch.uc.schools.body":
    "A K-12 school manages student grades, attendance, and a parent portal. Children's personal data is doubly protected — under loi 09-08 and the school's accreditation rules. Teachers want a smooth digital experience; the school director cannot afford a data breach or a CNDP investigation.",
  "arch.uc.schools.flow":
    "AppBase runs on a single machine in the principal's office. Teachers connect to grades.school.local from classroom laptops, attendance.school.local from tablets at the entrance. The parent portal runs on the same stack. The school's IT contractor installs once and never returns — there is no cloud account to manage, no monthly bill, no internet outage that breaks the school day.",

  // ── architecture page : compliance ───────────────────────
  "arch.law.heading": "Compliance — Loi 09-08 and data residency in Morocco",
  "arch.law.intro":
    "Moroccan organisations handling personal data operate under a specific legal framework. Cloud platforms designed for the US or EU markets do not address it natively.",
  "arch.law.what":
    "Loi 09-08, promulgated in 2009, governs the protection of natural persons with respect to the processing of personal data in Morocco. It defines personal data, sensitive data (including health data), the rights of data subjects, and the obligations of data controllers.",
  "arch.law.cnpd":
    "The CNDP (Commission Nationale de contrôle de la Protection des Données à caractère Personnel) is the national authority. Most data processing must be declared to the CNDP, and certain processing — particularly involving sensitive data — requires prior authorization, not just declaration.",
  "arch.law.cloud":
    "Article 43 of loi 09-08 prohibits the transfer of personal data to a foreign country that does not provide an adequate level of protection, unless prior authorization is obtained from the CNDP. In practice this means storing patient or student data on Firebase (US/EU regions) or AWS (Frankfurt, Ireland) requires a documented authorization process — including a DPA, the data subject's explicit consent, and CNDP review. Most small organisations never complete this process and operate in legal grey area.",
  "arch.law.appbase":
    "Because AppBase runs entirely on-premises, on a machine inside the organisation's own network, no cross-border transfer occurs. The legal question that blocks cloud adoption simply does not arise. This is the architectural reason AppBase exists, not a marketing afterthought.",
  "arch.law.disclaimer":
    "This page is informational and reflects the author's reading of public legal sources. It is not legal advice. Organisations subject to loi 09-08 should consult a qualified Moroccan data protection lawyer for their specific case.",

  // ── new milestones (post-pivot) ──────────────────────────
  "ms.core.title": "Core BaaS",
  "ms.core.subtitle": "Auth, database, storage, real-time, SDK",
  "ms.core.weeks": "Weeks 1–4",
  "ms.core.deliverable": "Working backend with SDK consumed by a demo app",
  "ms.core.w0.label": "Backend foundation",
  "ms.core.w0.summary": "All four BaaS primitives shipped on a single API",
  "ms.core.t.auth": "better-auth (sessions, API keys)",
  "ms.core.t.db": "Database (collections + CRUD)",
  "ms.core.t.storage": "Storage (buckets, scoped uploads)",
  "ms.core.t.realtime": "Real-time (SSE on collections)",
  "ms.core.t.sdk": "SDK (auth, db, storage, subscribe)",

  "ms.ops.title": "Networking & DevOps",
  "ms.ops.subtitle": "Routing, mDNS, reverse proxy, compose, CLI, health",
  "ms.ops.weeks": "Weeks 5–7",
  "ms.ops.deliverable": "console.{org}.local reachable from any device on the LAN",
  "ms.ops.w0.label": "Infrastructure",
  "ms.ops.w0.summary":
    "Wire the components together so the platform comes up with a single docker-compose up and resolves over the LAN.",
  "ms.ops.t.routing": "Caddy reverse-proxy + subdomain routing",
  "ms.ops.t.mdns": "mDNS + CoreDNS for *.local resolution",
  "ms.ops.t.compose": "docker-compose orchestrating the full stack",
  "ms.ops.t.cli": "Config CLI (init, status, deploy)",
  "ms.ops.t.health": "Health checks across services",
  "ms.ops.t.console": "console.{org}.local reachable from any LAN device",

  "ms.finals.title": "Final touches",
  "ms.finals.subtitle": "Wire BaaS into Ops; single-instance refactor",
  "ms.finals.weeks": "Week 8",
  "ms.finals.deliverable": "BaaS runs as part of the orchestrated stack",
  "ms.finals.w0.label": "Integration",
  "ms.finals.w0.summary":
    "Connect the existing BaaS server into the new Ops infrastructure and refactor toward a single-instance model where time permits.",
  "ms.finals.t.wire": "Connect AppBase BaaS into the Ops infrastructure",
  "ms.finals.t.single": "Configure as single-instance (refactor if time permits)",

  "ms.demo.title": "Demo & Docs",
  "ms.demo.subtitle": "Install guide, SDK docs, walkthrough video",
  "ms.demo.weeks": "Week 9",
  "ms.demo.deliverable": "Reproducible install + recorded demo of the working flow",
  "ms.demo.w0.label": "Hand-off",
  "ms.demo.w0.summary":
    "Everything someone else needs to install AppBase, build against it, and see it work on a local environment.",
  "ms.demo.t.install": "Install AppBase guide + repo link",
  "ms.demo.t.sdk": "AppBase SDK docs",
  "ms.demo.t.video": "Walkthrough video on local environment",

  // ── home: hero ──────────────────────────────────────────
  "home.hero.eyebrow": "Final Year Project · ENSA Fès",
  "home.hero.heading": "A Backend-as-a-Service that lives on your LAN.",
  "home.hero.subhead":
    "AppBase gives clinics, schools, and small offices the same developer experience as Firebase — except every byte stays on a machine they own.",

  // ── home: demo & docs section ───────────────────────────
  "demo.heading": "Demo & Documentation",
  "demo.intro":
    "Once Ops and Final touches land, this section will host the install guide, the SDK reference, and a video walkthrough on a local environment.",
  "demo.install.title": "Install AppBase",
  "demo.install.body": "One-line install + Docker Compose stack on any LAN host.",
  "demo.sdk.title": "AppBase SDK",
  "demo.sdk.body": "TypeScript SDK for auth, database, storage, and real-time.",
  "demo.video.title": "Walkthrough video",
  "demo.video.body": "End-to-end demo recorded on a local environment.",
  "demo.coming": "Coming soon",
  "demo.open": "Open",
};

export default en;
export type Dictionary = Record<keyof typeof en, string>;
