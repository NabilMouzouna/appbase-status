const en = {
  // ── nav / meta ──────────────────────────────────────────
  "meta.title": "AppBase — PFE Progress",
  "meta.description":
    "Progress tracker for AppBase, a self-hosted Backend-as-a-Service platform for LAN environments.",

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
};

export default en;
export type Dictionary = Record<keyof typeof en, string>;
