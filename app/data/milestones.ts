// ============================================================
// SINGLE SOURCE OF TRUTH — edit this file to update the site.
// ============================================================

export type TaskStatus = "done" | "in-progress" | "upcoming";

export interface Task {
  title: string;
  status: TaskStatus;
}

export interface Week {
  label: string;
  summary: string;
  tasks: Task[];
}

export interface Milestone {
  id: string;
  title: string;
  subtitle: string;
  status: TaskStatus;
  weeks: string;
  deliverable: string;
  breakdown: Week[];
}

// -----------------------------------------------------------
//  MILESTONES — update statuses here as you make progress
// -----------------------------------------------------------

export const milestones: Milestone[] = [
  {
    id: "planning",
    title: "Planning & Architecture",
    subtitle: "Research, ADRs, and system design",
    status: "done",
    weeks: "Pre-M1",
    deliverable:
      "README, architecture docs, ADRs, API spec, monorepo scaffold",
    breakdown: [
      {
        label: "Research & Decisions",
        summary: "Evaluated frameworks, wrote ADRs, designed API surface",
        tasks: [
          { title: "Framework evaluation (Fastify, Express, Hono)", status: "done" },
          { title: "ADR-001: API framework selection", status: "done" },
          { title: "ADR-002: ORM and migration strategy", status: "done" },
          { title: "ADR-003: Auth implementation strategy", status: "done" },
          { title: "API spec design (REST surface)", status: "done" },
          { title: "Architecture document (M1 → M4)", status: "done" },
        ],
      },
    ],
  },
  {
    id: "setup",
    title: "Project Setup",
    subtitle: "Monorepo, tooling, CI pipeline",
    status: "done",
    weeks: "Pre-M1",
    deliverable: "Turborepo monorepo with CI, linting, and shared packages",
    breakdown: [
      {
        label: "Infrastructure",
        summary: "Monorepo scaffold, shared configs, CI workflows",
        tasks: [
          { title: "Turborepo monorepo setup", status: "done" },
          { title: "Shared tsconfig, ESLint, Prettier", status: "done" },
          { title: "GitHub Actions CI (lint, typecheck, test)", status: "done" },
          { title: "Package structure (api, dashboard, sdk, db, types)", status: "done" },
        ],
      },
    ],
  },
  {
    id: "m1",
    title: "M1 — Single Instance BaaS",
    subtitle: "Auth, DB, Storage, SDK, Dashboard",
    status: "done",
    weeks: "Weeks 1–4",
    deliverable:
      "One BaaS unit, working SDK, and a demo app running fully offline",
    breakdown: [
      {
        label: "Week 1 — Auth + API Keys",
        summary: "Authentication system and API key middleware",
        tasks: [
          { title: "better-auth integration (register, login, refresh)", status: "done" },
          { title: "API key issuance and validation middleware", status: "done" },
          { title: "SDK auth module", status: "done" },
        ],
      },
      {
        label: "Week 2 — Database API",
        summary: "Collection CRUD and SDK db module",
        tasks: [
          { title: "Collection management endpoints", status: "done" },
          { title: "Full CRUD on records", status: "done" },
          { title: "SDK db module", status: "done" },
          { title: "Demo app stores & retrieves data", status: "done" },
        ],
      },
      {
        label: "Week 3 — Storage",
        summary: "File upload/download and SDK storage module",
        tasks: [
          { title: "Bucket-based upload/download endpoints", status: "done" },
          { title: "File scoping per user", status: "done" },
          { title: "SDK storage module", status: "done" },
        ],
      },
      {
        label: "Week 4 — Real-time + Dashboard",
        summary: "SSE subscriptions, dashboard UI, Docker packaging",
        tasks: [
          { title: "SSE real-time on DB collections", status: "done" },
          { title: "SDK subscribe() method", status: "done" },
          { title: "App-specific admin dashboard", status: "done" },
          { title: "Docker packaging (single docker run)", status: "done" },
        ],
      },
    ],
  },
  {
    id: "m2",
    title: "M2 — Container Orchestration",
    subtitle: "Multi-app provisioning and isolation",
    status: "upcoming",
    weeks: "Weeks 5–6",
    deliverable:
      "Master control plane that provisions isolated BaaS instances per app",
    breakdown: [
      {
        label: "Week 5 — Control Plane",
        summary: "Master process and app provisioning",
        tasks: [
          { title: "Master control plane at appbase.local", status: "upcoming" },
          { title: "App provisioning / deletion service", status: "upcoming" },
          { title: "Docker SDK integration (dockerode)", status: "upcoming" },
        ],
      },
      {
        label: "Week 6 — Isolation",
        summary: "Per-app databases, storage, and port management",
        tasks: [
          { title: "Per-app SQLite and storage namespaces", status: "upcoming" },
          { title: "Port assignment and management", status: "upcoming" },
          { title: "Master tracks app state and lifecycle", status: "upcoming" },
        ],
      },
    ],
  },
  {
    id: "m3",
    title: "M3 — Network Layer",
    subtitle: "Routing, mDNS, health checks",
    status: "upcoming",
    weeks: "Weeks 7–8",
    deliverable:
      "Subdomain routing, service discovery, and automatic failure recovery",
    breakdown: [
      {
        label: "Week 7 — Routing & Discovery",
        summary: "Reverse proxy and mDNS",
        tasks: [
          { title: "Caddy reverse proxy (subdomain routing)", status: "upcoming" },
          { title: "mDNS service announcement and discovery", status: "upcoming" },
        ],
      },
      {
        label: "Week 8 — Resilience",
        summary: "Health monitoring and network isolation",
        tasks: [
          { title: "Health checks with auto-restart", status: "upcoming" },
          { title: "Network isolation between app containers", status: "upcoming" },
        ],
      },
    ],
  },
  {
    id: "m4",
    title: "M4 — Observability & Polish",
    subtitle: "Dashboards, docs, full demo",
    status: "upcoming",
    weeks: "Weeks 9–10",
    deliverable:
      "Network topology dashboard, API docs, and end-to-end demo scenario",
    breakdown: [
      {
        label: "Weeks 9–10",
        summary: "Observability tooling and final polish",
        tasks: [
          { title: "Network topology dashboard", status: "upcoming" },
          { title: "Live health status and port map", status: "upcoming" },
          { title: "API documentation (Swagger UI)", status: "upcoming" },
          { title: "Full end-to-end demo (offline, multi-app, auto-restart)", status: "upcoming" },
        ],
      },
    ],
  },
];

// -----------------------------------------------------------
//  PROJECT METADATA
// -----------------------------------------------------------

export const project = {
  name: "AppBase",
  tagline:
    "Self-hosted Backend-as-a-Service for LAN environments and private VPCs",
  description:
    "AppBase gives small organizations the same developer experience as Firebase or Supabase — auth, file storage, and a database API — without sending a single byte outside their network.",
  repo: "https://github.com/nabilmouzouna/AppBase",
  author: "Nabil Mouzouna",
  degree: "Network & Telecommunications Engineering",
  university: "PFE — Final Year Project",
};

export const techStack = [
  { layer: "Language", tech: "TypeScript" },
  { layer: "API", tech: "Fastify" },
  { layer: "Auth", tech: "better-auth" },
  { layer: "ORM", tech: "Drizzle" },
  { layer: "Database", tech: "SQLite" },
  { layer: "Frontend", tech: "Next.js" },
  { layer: "Real-time", tech: "SSE" },
  { layer: "Containers", tech: "Docker" },
  { layer: "Proxy", tech: "Caddy" },
  { layer: "Discovery", tech: "mDNS" },
  { layer: "Monorepo", tech: "Turborepo" },
  { layer: "Testing", tech: "Vitest + Playwright" },
];
