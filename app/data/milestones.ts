// ============================================================
// STRUCTURE ONLY — statuses are stored in Turso and merged
// at request time. Task `id` fields are the DB primary keys.
// ============================================================

export type TaskStatus = "done" | "in-progress" | "upcoming";

export interface Task {
  id: string;
  titleKey: string; // translation key
  status: TaskStatus; // default; overridden by DB at runtime
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
  status: TaskStatus; // derived from tasks at runtime
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
          { id: "planning-0-0", titleKey: "ms.planning.w0.t0", status: "done" },
          { id: "planning-0-1", titleKey: "ms.planning.w0.t1", status: "done" },
          { id: "planning-0-2", titleKey: "ms.planning.w0.t2", status: "done" },
          { id: "planning-0-3", titleKey: "ms.planning.w0.t3", status: "done" },
          { id: "planning-0-4", titleKey: "ms.planning.w0.t4", status: "done" },
          { id: "planning-0-5", titleKey: "ms.planning.w0.t5", status: "done" },
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
          { id: "setup-0-0", titleKey: "ms.setup.w0.t0", status: "done" },
          { id: "setup-0-1", titleKey: "ms.setup.w0.t1", status: "done" },
          { id: "setup-0-2", titleKey: "ms.setup.w0.t2", status: "done" },
          { id: "setup-0-3", titleKey: "ms.setup.w0.t3", status: "done" },
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
          { id: "m1-0-0", titleKey: "ms.m1.w0.t0", status: "done" },
          { id: "m1-0-1", titleKey: "ms.m1.w0.t1", status: "done" },
          { id: "m1-0-2", titleKey: "ms.m1.w0.t2", status: "done" },
        ],
      },
      {
        labelKey: "ms.m1.w1.label",
        summaryKey: "ms.m1.w1.summary",
        tasks: [
          { id: "m1-1-0", titleKey: "ms.m1.w1.t0", status: "done" },
          { id: "m1-1-1", titleKey: "ms.m1.w1.t1", status: "done" },
          { id: "m1-1-2", titleKey: "ms.m1.w1.t2", status: "done" },
          { id: "m1-1-3", titleKey: "ms.m1.w1.t3", status: "done" },
        ],
      },
      {
        labelKey: "ms.m1.w2.label",
        summaryKey: "ms.m1.w2.summary",
        tasks: [
          { id: "m1-2-0", titleKey: "ms.m1.w2.t0", status: "done" },
          { id: "m1-2-1", titleKey: "ms.m1.w2.t1", status: "done" },
          { id: "m1-2-2", titleKey: "ms.m1.w2.t2", status: "done" },
        ],
      },
      {
        labelKey: "ms.m1.w3.label",
        summaryKey: "ms.m1.w3.summary",
        tasks: [
          { id: "m1-3-0", titleKey: "ms.m1.w3.t0", status: "done" },
          { id: "m1-3-1", titleKey: "ms.m1.w3.t1", status: "done" },
          { id: "m1-3-2", titleKey: "ms.m1.w3.t2", status: "done" },
          { id: "m1-3-3", titleKey: "ms.m1.w3.t3", status: "done" },
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
          { id: "m2-0-0", titleKey: "ms.m2.w0.t0", status: "upcoming" },
          { id: "m2-0-1", titleKey: "ms.m2.w0.t1", status: "upcoming" },
          { id: "m2-0-2", titleKey: "ms.m2.w0.t2", status: "upcoming" },
        ],
      },
      {
        labelKey: "ms.m2.w1.label",
        summaryKey: "ms.m2.w1.summary",
        tasks: [
          { id: "m2-1-0", titleKey: "ms.m2.w1.t0", status: "upcoming" },
          { id: "m2-1-1", titleKey: "ms.m2.w1.t1", status: "upcoming" },
          { id: "m2-1-2", titleKey: "ms.m2.w1.t2", status: "upcoming" },
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
          { id: "m3-0-0", titleKey: "ms.m3.w0.t0", status: "upcoming" },
          { id: "m3-0-1", titleKey: "ms.m3.w0.t1", status: "upcoming" },
        ],
      },
      {
        labelKey: "ms.m3.w1.label",
        summaryKey: "ms.m3.w1.summary",
        tasks: [
          { id: "m3-1-0", titleKey: "ms.m3.w1.t0", status: "upcoming" },
          { id: "m3-1-1", titleKey: "ms.m3.w1.t1", status: "upcoming" },
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
          { id: "m4-0-0", titleKey: "ms.m4.w0.t0", status: "upcoming" },
          { id: "m4-0-1", titleKey: "ms.m4.w0.t1", status: "upcoming" },
          { id: "m4-0-2", titleKey: "ms.m4.w0.t2", status: "upcoming" },
          { id: "m4-0-3", titleKey: "ms.m4.w0.t3", status: "upcoming" },
        ],
      },
    ],
  },
];

// Flat list of all tasks with their defaults — used for DB seeding
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
  author: "Nabil Mouzouna",
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
