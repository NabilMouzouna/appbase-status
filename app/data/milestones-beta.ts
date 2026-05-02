// ============================================================
// BETA progress tree — original per-app architecture (M1 → M4).
// Preserved on /[locale]/beta for reference. Statuses still
// merge from Turso (same DB, same task IDs).
// ============================================================

import type { Milestone } from "./milestones";

export const betaMilestones: Milestone[] = [
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
    id: "m1",
    titleKey: "ms.m1.title",
    subtitleKey: "ms.m1.subtitle",
    status: "done",
    weeksKey: "ms.m1.weeks",
    deliverableKey: "ms.m1.deliverable",
    breakdown: [
      {
        labelKey: "ms.m1.w0.label",
        summaryKey: "ms.m1.w0.summary",
        tasks: [
          { id: "m1-0-0", titleKey: "ms.m1.w0.t0", label: "better-auth integration (register, login, refresh)", status: "done" },
          { id: "m1-0-1", titleKey: "ms.m1.w0.t1", label: "API key issuance and validation middleware", status: "done" },
          { id: "m1-0-2", titleKey: "ms.m1.w0.t2", label: "SDK auth module", status: "done" },
        ],
      },
      {
        labelKey: "ms.m1.w1.label",
        summaryKey: "ms.m1.w1.summary",
        tasks: [
          { id: "m1-1-0", titleKey: "ms.m1.w1.t0", label: "Collection management endpoints", status: "done" },
          { id: "m1-1-1", titleKey: "ms.m1.w1.t1", label: "Full CRUD on records", status: "done" },
          { id: "m1-1-2", titleKey: "ms.m1.w1.t2", label: "SDK db module", status: "done" },
          { id: "m1-1-3", titleKey: "ms.m1.w1.t3", label: "Demo app stores & retrieves data", status: "done" },
        ],
      },
      {
        labelKey: "ms.m1.w2.label",
        summaryKey: "ms.m1.w2.summary",
        tasks: [
          { id: "m1-2-0", titleKey: "ms.m1.w2.t0", label: "Bucket-based upload/download endpoints", status: "done" },
          { id: "m1-2-1", titleKey: "ms.m1.w2.t1", label: "File scoping per user", status: "done" },
          { id: "m1-2-2", titleKey: "ms.m1.w2.t2", label: "SDK storage module", status: "done" },
        ],
      },
      {
        labelKey: "ms.m1.w3.label",
        summaryKey: "ms.m1.w3.summary",
        tasks: [
          { id: "m1-3-0", titleKey: "ms.m1.w3.t0", label: "SSE real-time on DB collections", status: "done" },
          { id: "m1-3-1", titleKey: "ms.m1.w3.t1", label: "SDK subscribe() method", status: "done" },
          { id: "m1-3-2", titleKey: "ms.m1.w3.t2", label: "App-specific admin dashboard", status: "done" },
          { id: "m1-3-3", titleKey: "ms.m1.w3.t3", label: "Docker packaging (single docker run)", status: "done" },
        ],
      },
    ],
  },
  {
    id: "m2",
    titleKey: "ms.m2.title",
    subtitleKey: "ms.m2.subtitle",
    status: "upcoming",
    weeksKey: "ms.m2.weeks",
    deliverableKey: "ms.m2.deliverable",
    breakdown: [
      {
        labelKey: "ms.m2.w0.label",
        summaryKey: "ms.m2.w0.summary",
        tasks: [
          { id: "m2-0-0", titleKey: "ms.m2.w0.t0", label: "Master control plane at appbase.local", status: "upcoming" },
          { id: "m2-0-1", titleKey: "ms.m2.w0.t1", label: "App provisioning / deletion service", status: "upcoming" },
          { id: "m2-0-2", titleKey: "ms.m2.w0.t2", label: "Docker SDK integration (dockerode)", status: "upcoming" },
        ],
      },
      {
        labelKey: "ms.m2.w1.label",
        summaryKey: "ms.m2.w1.summary",
        tasks: [
          { id: "m2-1-0", titleKey: "ms.m2.w1.t0", label: "Per-app SQLite and storage namespaces", status: "upcoming" },
          { id: "m2-1-1", titleKey: "ms.m2.w1.t1", label: "Port assignment and management", status: "upcoming" },
          { id: "m2-1-2", titleKey: "ms.m2.w1.t2", label: "Master tracks app state and lifecycle", status: "upcoming" },
        ],
      },
    ],
  },
  {
    id: "m3",
    titleKey: "ms.m3.title",
    subtitleKey: "ms.m3.subtitle",
    status: "upcoming",
    weeksKey: "ms.m3.weeks",
    deliverableKey: "ms.m3.deliverable",
    breakdown: [
      {
        labelKey: "ms.m3.w0.label",
        summaryKey: "ms.m3.w0.summary",
        tasks: [
          { id: "m3-0-0", titleKey: "ms.m3.w0.t0", label: "Caddy reverse proxy (subdomain routing)", status: "upcoming" },
          { id: "m3-0-1", titleKey: "ms.m3.w0.t1", label: "mDNS service announcement and discovery", status: "upcoming" },
        ],
      },
      {
        labelKey: "ms.m3.w1.label",
        summaryKey: "ms.m3.w1.summary",
        tasks: [
          { id: "m3-1-0", titleKey: "ms.m3.w1.t0", label: "Health checks with auto-restart", status: "upcoming" },
          { id: "m3-1-1", titleKey: "ms.m3.w1.t1", label: "Network isolation between app containers", status: "upcoming" },
        ],
      },
    ],
  },
  {
    id: "m4",
    titleKey: "ms.m4.title",
    subtitleKey: "ms.m4.subtitle",
    status: "upcoming",
    weeksKey: "ms.m4.weeks",
    deliverableKey: "ms.m4.deliverable",
    breakdown: [
      {
        labelKey: "ms.m4.w0.label",
        summaryKey: "ms.m4.w0.summary",
        tasks: [
          { id: "m4-0-0", titleKey: "ms.m4.w0.t0", label: "Network topology dashboard", status: "upcoming" },
          { id: "m4-0-1", titleKey: "ms.m4.w0.t1", label: "Live health status and port map", status: "upcoming" },
          { id: "m4-0-2", titleKey: "ms.m4.w0.t2", label: "API documentation (Swagger UI)", status: "upcoming" },
          { id: "m4-0-3", titleKey: "ms.m4.w0.t3", label: "Full end-to-end demo (offline, multi-app, auto-restart)", status: "upcoming" },
        ],
      },
    ],
  },
];

export function getAllBetaTaskDefaults() {
  return betaMilestones.flatMap((ms) =>
    ms.breakdown.flatMap((w) =>
      w.tasks.map((t) => ({ id: t.id, status: t.status }))
    )
  );
}
