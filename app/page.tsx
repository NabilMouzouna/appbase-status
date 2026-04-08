import { milestones, project, techStack } from "./data/milestones";
import type { Milestone, Task, TaskStatus } from "./data/milestones";
import Image from "next/image";

// ── helpers ────────────────────────────────────────────────

function countTasks(m: Milestone[]): { done: number; total: number } {
  let done = 0;
  let total = 0;
  for (const ms of m) {
    for (const w of ms.breakdown) {
      for (const t of w.tasks) {
        total++;
        if (t.status === "done") done++;
      }
    }
  }
  return { done, total };
}

const { done, total } = countTasks(milestones);
const pct = Math.round((done / total) * 100);

function statusDot(s: TaskStatus) {
  if (s === "done") return "bg-done";
  if (s === "in-progress") return "bg-in-progress";
  return "bg-upcoming/40";
}

function statusLabel(s: TaskStatus) {
  if (s === "done") return "Completed";
  if (s === "in-progress") return "In Progress";
  return "Upcoming";
}

function statusBadge(s: TaskStatus) {
  const base = "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium";
  if (s === "done") return `${base} bg-green-50 text-green-700`;
  if (s === "in-progress") return `${base} bg-amber-50 text-amber-700`;
  return `${base} bg-zinc-100 text-zinc-500`;
}

// ── page ───────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      {/* ── hero ── */}
      <header className="animate-fade-up">
        <p className="text-xs font-medium uppercase tracking-widest text-muted">
          {project.university}
        </p>
        <div className="flex flex-col my-3 ">
        <Image src="/outlined-logo.png" alt="Logo" width={70} height={70} />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.name}</h1>
        </div>
        <p className="mt-3 text-base leading-relaxed text-muted">
          {project.tagline}
        </p>
      </header>

      {/* ── overall progress ── */}
      <section className="mt-12 animate-fade-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Overall Progress
          </h2>
          <span className="font-mono text-sm text-muted">
            {done}/{total} tasks — {pct}%
          </span>
        </div>
        <div className="progress-track mt-3">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-4 flex gap-5 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-done" />
            Completed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-in-progress" />
            In Progress
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-upcoming/40" />
            Upcoming
          </span>
        </div>
      </section>

      {/* ── milestones ── */}
      <section className="mt-16">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Milestones
        </h2>

        <div className="mt-6 space-y-0">
          {milestones.map((ms, i) => (
            <MilestoneCard key={ms.id} milestone={ms} index={i} />
          ))}
        </div>
      </section>

      {/* ── tech stack ── */}
      <section
        className="mt-20 animate-fade-up"
        style={{ animationDelay: "0.25s" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Tech Stack
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t.layer}
              className="rounded-md border border-border bg-white px-3 py-1.5 font-mono text-xs text-foreground"
            >
              {t.tech}
            </span>
          ))}
        </div>
      </section>

      {/* ── about ── */}
      <section
        className="mt-20 animate-fade-up"
        style={{ animationDelay: "0.3s" }}
      >
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
          About This Project
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-6 flex flex-col gap-1 text-sm text-muted">
          <span>
            <span className="text-foreground font-medium">{project.author}</span>{" "}
            — {project.degree}
          </span>
        </div>
      </section>

      {/* ── footer ── */}
      <footer className="mt-24 border-t border-border pt-6 text-xs text-muted">
        <p>
          To update progress, edit{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-foreground">
            app/data/milestones.ts
          </code>
        </p>
      </footer>
    </div>
  );
}

// ── milestone card ─────────────────────────────────────────

function MilestoneCard({
  milestone: ms,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const tasksDone = ms.breakdown.reduce(
    (acc, w) => acc + w.tasks.filter((t) => t.status === "done").length,
    0
  );
  const tasksTotal = ms.breakdown.reduce(
    (acc, w) => acc + w.tasks.length,
    0
  );

  return (
    <details
      className="group animate-fade-up border-t border-border first:border-t-0"
      style={{ animationDelay: `${0.1 + index * 0.05}s` }}
      open={ms.status === "in-progress"}
    >
      <summary className="flex items-start gap-4 py-5">
        {/* status dot */}
        <span
          className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${statusDot(ms.status)}`}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-foreground">
              {ms.title}
            </h3>
            <span className={statusBadge(ms.status)}>{statusLabel(ms.status)}</span>
          </div>
          <p className="mt-0.5 text-xs text-muted">{ms.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:inline font-mono text-xs text-muted">
            {tasksDone}/{tasksTotal}
          </span>
          <svg
            className="chevron h-4 w-4 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </summary>

      {/* expanded content */}
      <div className="pb-6 pl-6.5 sm:pl-6.5">
        <p className="mb-4 text-xs text-muted">
          <span className="font-medium text-foreground">{ms.weeks}</span>
          {" · "}
          {ms.deliverable}
        </p>

        {ms.breakdown.map((week) => (
          <div key={week.label} className="mb-5 last:mb-0">
            <h4 className="text-xs font-semibold text-foreground">
              {week.label}
            </h4>
            <p className="mb-2 text-xs text-muted">{week.summary}</p>
            <ul className="space-y-1.5">
              {week.tasks.map((task) => (
                <TaskRow key={task.title} task={task} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}

// ── task row ───────────────────────────────────────────────

function TaskRow({ task }: { task: Task }) {
  return (
    <li className="flex items-center gap-2.5 text-xs">
      {task.status === "done" ? (
        <svg
          className="h-3.5 w-3.5 shrink-0 text-done"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : task.status === "in-progress" ? (
        <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center">
          <span className="absolute h-full w-full rounded-full bg-in-progress/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-in-progress" />
        </span>
      ) : (
        <span className="h-3.5 w-3.5 shrink-0 rounded-full border border-zinc-300" />
      )}
      <span className={task.status === "done" ? "text-muted line-through" : "text-foreground"}>
        {task.title}
      </span>
    </li>
  );
}
