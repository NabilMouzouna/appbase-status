// ============================================================
// MAIN progress tree — shared-services architecture (post-pivot).
// Statuses are stored in Turso and merged at request time.
// Task `id` fields are the DB primary keys.
//
// The previous per-app architecture progress is preserved in
// ./milestones-beta.ts and rendered on /[locale]/beta.
// ============================================================

export type TaskStatus = "done" | "in-progress" | "upcoming";

export interface Task {
  id: string;
  titleKey: string;
  label: string;
  status: TaskStatus;
}

export interface Week {
  labelKey: string;
  summaryKey: string;
  tasks: Task[];
}

export interface Milestone {
  id: string;
  titleKey: string;
  subtitleKey: string;
  status: TaskStatus;
  weeksKey: string;
  deliverableKey: string;
  breakdown: Week[];
}

export const milestones: Milestone[] = [
  {
    id: "planning",
    titleKey: "ms.planning.title",
    subtitleKey: "ms.planning.subtitle",
    status: "done",
    weeksKey: "ms.planning.weeks",
    deliverableKey: "ms.planning.deliverable",
    breakdown: [
      {
        labelKey: "ms.planning.w0.label",
        summaryKey: "ms.planning.w0.summary",
        tasks: [
          { id: "planning-0-0", titleKey: "ms.planning.w0.t0", label: "Framework evaluation (Fastify, Express, Hono)", status: "done" },
          { id: "planning-0-1", titleKey: "ms.planning.w0.t1", label: "ADR-001: API framework selection", status: "done" },
          { id: "planning-0-2", titleKey: "ms.planning.w0.t2", label: "ADR-002: ORM and migration strategy", status: "done" },
          { id: "planning-0-3", titleKey: "ms.planning.w0.t3", label: "ADR-003: Auth implementation strategy", status: "done" },
          { id: "planning-0-4", titleKey: "ms.planning.w0.t4", label: "API spec design (REST surface)", status: "done" },
          { id: "planning-0-5", titleKey: "ms.planning.w0.t5", label: "Architecture document (M1 → M4)", status: "done" },
        ],
      },
    ],
  },
  {
    id: "setup",
    titleKey: "ms.setup.title",
    subtitleKey: "ms.setup.subtitle",
    status: "done",
    weeksKey: "ms.setup.weeks",
    deliverableKey: "ms.setup.deliverable",
    breakdown: [
      {
        labelKey: "ms.setup.w0.label",
        summaryKey: "ms.setup.w0.summary",
        tasks: [
          { id: "setup-0-0", titleKey: "ms.setup.w0.t0", label: "Turborepo monorepo setup", status: "done" },
          { id: "setup-0-1", titleKey: "ms.setup.w0.t1", label: "Shared tsconfig, ESLint, Prettier", status: "done" },
          { id: "setup-0-2", titleKey: "ms.setup.w0.t2", label: "GitHub Actions CI (lint, typecheck, test)", status: "done" },
          { id: "setup-0-3", titleKey: "ms.setup.w0.t3", label: "Package structure (api, dashboard, sdk, db, types)", status: "done" },
        ],
      },
    ],
  },
  {
    id: "core",
    titleKey: "ms.core.title",
    subtitleKey: "ms.core.subtitle",
    status: "done",
    weeksKey: "ms.core.weeks",
    deliverableKey: "ms.core.deliverable",
    breakdown: [
      {
        labelKey: "ms.core.w0.label",
        summaryKey: "ms.core.w0.summary",
        tasks: [
          { id: "core-auth", titleKey: "ms.core.t.auth", label: "better-auth (sessions, API keys)", status: "done" },
          { id: "core-db", titleKey: "ms.core.t.db", label: "Database (collections + CRUD)", status: "done" },
          { id: "core-storage", titleKey: "ms.core.t.storage", label: "Storage (buckets, scoped uploads)", status: "done" },
          { id: "core-realtime", titleKey: "ms.core.t.realtime", label: "Real-time (SSE on collections)", status: "done" },
          { id: "core-sdk", titleKey: "ms.core.t.sdk", label: "SDK (auth, db, storage, subscribe)", status: "done" },
        ],
      },
    ],
  },
  {
    id: "ops",
    titleKey: "ms.ops.title",
    subtitleKey: "ms.ops.subtitle",
    status: "in-progress",
    weeksKey: "ms.ops.weeks",
    deliverableKey: "ms.ops.deliverable",
    breakdown: [
      {
        labelKey: "ms.ops.w0.label",
        summaryKey: "ms.ops.w0.summary",
        tasks: [
          { id: "ops-routing", titleKey: "ms.ops.t.routing", label: "Caddy reverse-proxy + subdomain routing", status: "in-progress" },
          { id: "ops-mdns", titleKey: "ms.ops.t.mdns", label: "mDNS + CoreDNS for *.local resolution", status: "upcoming" },
          { id: "ops-compose", titleKey: "ms.ops.t.compose", label: "docker-compose orchestrating the full stack", status: "upcoming" },
          { id: "ops-cli", titleKey: "ms.ops.t.cli", label: "Config CLI (init, status, deploy)", status: "upcoming" },
          { id: "ops-health", titleKey: "ms.ops.t.health", label: "Health checks across services", status: "upcoming" },
          { id: "ops-console", titleKey: "ms.ops.t.console", label: "console.{org}.local reachable from any LAN device", status: "upcoming" },
        ],
      },
    ],
  },
  {
    id: "finals",
    titleKey: "ms.finals.title",
    subtitleKey: "ms.finals.subtitle",
    status: "upcoming",
    weeksKey: "ms.finals.weeks",
    deliverableKey: "ms.finals.deliverable",
    breakdown: [
      {
        labelKey: "ms.finals.w0.label",
        summaryKey: "ms.finals.w0.summary",
        tasks: [
          { id: "finals-wire", titleKey: "ms.finals.t.wire", label: "Connect AppBase BaaS into the Ops infrastructure", status: "upcoming" },
          { id: "finals-single", titleKey: "ms.finals.t.single", label: "Configure as single-instance (refactor if time permits)", status: "upcoming" },
        ],
      },
    ],
  },
  {
    id: "demo",
    titleKey: "ms.demo.title",
    subtitleKey: "ms.demo.subtitle",
    status: "upcoming",
    weeksKey: "ms.demo.weeks",
    deliverableKey: "ms.demo.deliverable",
    breakdown: [
      {
        labelKey: "ms.demo.w0.label",
        summaryKey: "ms.demo.w0.summary",
        tasks: [
          { id: "demo-install", titleKey: "ms.demo.t.install", label: "Install AppBase guide + repo link", status: "upcoming" },
          { id: "demo-sdk", titleKey: "ms.demo.t.sdk", label: "AppBase SDK docs", status: "upcoming" },
          { id: "demo-video", titleKey: "ms.demo.t.video", label: "Walkthrough video on local environment", status: "upcoming" },
        ],
      },
    ],
  },
];

export function getAllTaskDefaults() {
  return milestones.flatMap((ms) =>
    ms.breakdown.flatMap((w) =>
      w.tasks.map((t) => ({ id: t.id, status: t.status }))
    )
  );
}

export const project = {
  name: "AppBase",
  github: "https://github.com/NabilMouzouna/AppBase---PFE-project",
  linkedin: "https://linkedin.com/in/nabil-mouzouna-71212124a/",
  email: "mrnabilmouzouna@gmail.com",
  presentation: "https://canva.link/6ge0832qdm04rvj",
  author: "Nabil Mouzouna",
};

export const techStack = [
  { layer: "Language", tech: "TypeScript" },
  { layer: "API", tech: "Fastify" },
  { layer: "Auth", tech: "better-auth" },
  { layer: "ORM", tech: "Drizzle" },
  { layer: "Database", tech: "Postgres" },
  { layer: "Frontend", tech: "Next.js" },
  { layer: "Real-time", tech: "SSE" },
  { layer: "Containers", tech: "Docker Compose" },
  { layer: "Proxy", tech: "Caddy" },
  { layer: "DNS", tech: "CoreDNS + mDNS" },
  { layer: "Monorepo", tech: "Turborepo" },
  { layer: "Testing", tech: "Vitest + Playwright" },
];
