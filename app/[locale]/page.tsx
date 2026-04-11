import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Loader2,
  ChevronRight,
  Server,
  Network,
  ShieldCheck,
  HardDrive,
  Database,
  Boxes,
  ExternalLink,
} from "lucide-react";
import { getDictionary, isLocale, locales } from "../../lib/i18n/dictionaries";
import type { Locale } from "../../lib/i18n/dictionaries";
import { getTaskStatuses } from "../../lib/db";
import { milestones, project, techStack } from "../data/milestones";
import type { Milestone, TaskStatus } from "../data/milestones";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Merge DB statuses into the static milestone structure
function applyStatuses(
  ms: Milestone[],
  overrides: Record<string, string>
): Milestone[] {
  return ms.map((milestone) => {
    const weeks = milestone.breakdown.map((week) => ({
      ...week,
      tasks: week.tasks.map((task) => ({
        ...task,
        status: (overrides[task.id] ?? task.status) as TaskStatus,
      })),
    }));

    // Derive milestone-level status from tasks
    const allTasks = weeks.flatMap((w) => w.tasks);
    const doneTasks = allTasks.filter((t) => t.status === "done").length;
    const inProgressTasks = allTasks.filter((t) => t.status === "in-progress").length;
    let status: TaskStatus = "upcoming";
    if (doneTasks === allTasks.length) status = "done";
    else if (doneTasks > 0 || inProgressTasks > 0) status = "in-progress";

    return { ...milestone, breakdown: weeks, status };
  });
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? (locale as Locale) : "en";
  const d = await getDictionary(lang);

  const dbStatuses = await getTaskStatuses().catch(() => ({} as Record<string, string>));
  const data = applyStatuses(milestones, dbStatuses);

  const allTasks = data.flatMap((ms) => ms.breakdown.flatMap((w) => w.tasks));
  const doneTasks = allTasks.filter((t) => t.status === "done").length;
  const totalTasks = allTasks.length;
  const pct = Math.round((doneTasks / totalTasks) * 100);

  const otherLocales = (["en", "fr", "ar"] as Locale[]).filter((l) => l !== lang);

  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
      {/* ── locale switcher ───────────────────────────── */}
      <div className="flex justify-end gap-3 mb-12">
        {otherLocales.map((l) => (
          <Link
            key={l}
            href={`/${l}`}
            className="text-xs font-medium text-muted hover:text-foreground transition-colors uppercase tracking-widest"
          >
            {l}
          </Link>
        ))}
      </div>

      {/* ── hero ──────────────────────────────────────── */}
      <header>
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="/ensaf.png"
            alt="ENSA Fès"
            width={90}
            height={40}
            className="object-contain opacity-80"
          />
        </div>

        <p className="text-xs font-medium uppercase tracking-widest text-muted mb-4">
          {d["header.badge"]}
        </p>

        <div className="flex items-center gap-4 mb-3">
          <Image
            src="/outlined-logo.png"
            alt="AppBase logo"
            width={52}
            height={52}
            className="shrink-0"
          />
          <h1 className="text-4xl font-bold tracking-tight">{project.name}</h1>
        </div>

        <p className="text-base leading-relaxed text-muted mb-5">
          {d["header.tagline"]}
        </p>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-1.5 hover:bg-zinc-50 transition-colors text-foreground"
        >
          <GithubIcon />
          {d["header.github"]}
          <ExternalLink size={12} className="text-muted" />
        </a>
      </header>

      {/* ── what is appbase ───────────────────────────── */}
      <Section heading={d["what.heading"]} top={14}>
        <p className="text-sm leading-7 text-muted">{d["what.p1"]}</p>
        <p className="mt-3 text-sm leading-7 text-muted">{d["what.p2"]}</p>
      </Section>

      {/* ── the problem ───────────────────────────────── */}
      <Section heading={d["problem.heading"]}>
        <p className="text-sm leading-7 text-muted mb-4">{d["problem.intro"]}</p>
        <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
          {[
            { name: "Firebase / Supabase Cloud", key: "problem.firebase" as const, icon: <Server size={13} className="shrink-0 text-muted mt-0.5" /> },
            { name: "Supabase Self-hosted", key: "problem.supabase" as const, icon: <Server size={13} className="shrink-0 text-muted mt-0.5" /> },
            { name: "Appwrite", key: "problem.appwrite" as const, icon: <Boxes size={13} className="shrink-0 text-muted mt-0.5" /> },
            { name: "PocketBase", key: "problem.pocketbase" as const, icon: <Database size={13} className="shrink-0 text-muted mt-0.5" /> },
          ].map((row) => (
            <div key={row.name} className="flex gap-3 px-4 py-3 bg-white">
              {row.icon}
              <div className="min-w-0">
                <span className="text-xs font-semibold text-foreground font-mono">{row.name}</span>
                <p className="text-xs text-muted leading-relaxed mt-0.5">{d[row.key]}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-7 text-muted border-l-2 border-foreground pl-4">
          {d["problem.gap"]}
        </p>
      </Section>

      {/* ── how it works ──────────────────────────────── */}
      <Section heading={d["how.heading"]}>
        <div className="space-y-4">
          {[
            { label: "M1", icon: <ShieldCheck size={15} className="shrink-0 text-done mt-0.5" />, text: d["how.m1"] },
            { label: "M2", icon: <Boxes size={15} className="shrink-0 text-in-progress mt-0.5" />, text: d["how.m2"] },
            { label: "M3", icon: <Network size={15} className="shrink-0 text-muted mt-0.5" />, text: d["how.m3"] },
          ].map((item) => (
            <div key={item.label} className="flex gap-3">
              {item.icon}
              <div>
                <span className="font-mono text-xs font-bold text-foreground">{item.label} </span>
                <span className="text-sm leading-7 text-muted">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── progress bar ──────────────────────────────── */}
      <Section heading={d["progress.heading"]}>
        <div className="flex items-baseline justify-between mb-2">
          <div className="flex gap-4 text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-done" />
              {d["legend.done"]}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-in-progress" />
              {d["legend.inprogress"]}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-upcoming/40" />
              {d["legend.upcoming"]}
            </span>
          </div>
          <span className="font-mono text-xs text-muted">
            {doneTasks} {d["progress.of"]} {totalTasks} · {pct}%
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
      </Section>

      {/* ── milestones ────────────────────────────────── */}
      <Section heading={d["milestones.heading"]}>
        <div className="space-y-0">
          {data.map((ms, i) => (
            <MilestoneCard key={ms.id} milestone={ms} d={d} index={i} />
          ))}
        </div>
      </Section>

      {/* ── tech stack ────────────────────────────────── */}
      <Section heading={d["tech.heading"]}>
        <div className="flex flex-wrap gap-2">
          {techStack.map((t) => (
            <span
              key={t.layer}
              className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-2.5 py-1 font-mono text-xs text-foreground"
            >
              <span className="text-muted text-[10px]">{t.layer}</span>
              {t.tech}
            </span>
          ))}
        </div>
      </Section>

      {/* ── about ─────────────────────────────────────── */}
      <Section heading={d["about.heading"]}>
        <p className="text-sm leading-7 text-muted">{d["about.body"]}</p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <HardDrive size={14} className="text-muted" />
          <span className="font-medium">{project.author}</span>
          <span className="text-muted">·</span>
          <span className="text-muted text-xs">{d["header.degree"]}</span>
        </div>
      </Section>

      {/* ── footer ────────────────────────────────────── */}
      <footer className="mt-20 pt-6 border-t border-border flex items-center justify-between text-xs text-muted">
        <span>{project.name} © {new Date().getFullYear()}</span>
        <Link
          href={`/${lang}/admin`}
          className="hover:text-foreground transition-colors"
        >
          {d["footer.admin"]} →
        </Link>
      </footer>
    </main>
  );
}

// ── reusable section wrapper ────────────────────────────────

function Section({
  heading,
  children,
  top = 12,
}: {
  heading: string;
  children: React.ReactNode;
  top?: number;
}) {
  return (
    <section className={`mt-${top}`}>
      <h2 className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-4">
        {heading}
      </h2>
      {children}
    </section>
  );
}

// ── milestone card ──────────────────────────────────────────

type Dict = Awaited<ReturnType<typeof getDictionary>>;

function MilestoneCard({
  milestone: ms,
  d,
  index,
}: {
  milestone: Milestone;
  d: Dict;
  index: number;
}) {
  const allTasks = ms.breakdown.flatMap((w) => w.tasks);
  const done = allTasks.filter((t) => t.status === "done").length;

  return (
    <details
      className="group border-t border-border"
      open={ms.status === "in-progress" || ms.status === "done"}
    >
      <summary className="flex items-center gap-3 py-4 cursor-pointer list-none">
        <StatusIcon status={ms.status} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-semibold text-foreground">
              {d[ms.titleKey as keyof Dict] as string}
            </span>
            <StatusBadge status={ms.status} d={d} />
          </div>
          <p className="text-xs text-muted mt-0.5">
            {d[ms.subtitleKey as keyof Dict] as string}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-xs text-muted hidden sm:block">
            {done}/{allTasks.length}
          </span>
          <ChevronRight
            size={14}
            className="text-muted transition-transform group-open:rotate-90"
          />
        </div>
      </summary>

      <div className="pb-5 ps-7">
        <p className="text-xs text-muted mb-4">
          <span className="font-medium text-foreground">
            {d[ms.weeksKey as keyof Dict] as string}
          </span>
          {" · "}
          {d[ms.deliverableKey as keyof Dict] as string}
        </p>

        {ms.breakdown.map((week) => (
          <div key={week.labelKey} className="mb-4 last:mb-0">
            <p className="text-xs font-semibold text-foreground mb-0.5">
              {d[week.labelKey as keyof Dict] as string}
            </p>
            <p className="text-xs text-muted mb-2">
              {d[week.summaryKey as keyof Dict] as string}
            </p>
            <ul className="space-y-1.5">
              {week.tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-2 text-xs">
                  <TaskIcon status={task.status} />
                  <span
                    className={
                      task.status === "done"
                        ? "text-muted line-through"
                        : "text-foreground"
                    }
                  >
                    {d[task.titleKey as keyof Dict] as string}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}

// ── small ui atoms ──────────────────────────────────────────

function StatusIcon({ status }: { status: TaskStatus }) {
  if (status === "done")
    return <CheckCircle2 size={16} className="shrink-0 text-done" />;
  if (status === "in-progress")
    return <Loader2 size={16} className="shrink-0 text-in-progress animate-spin" />;
  return <Circle size={16} className="shrink-0 text-upcoming/40" />;
}

function TaskIcon({ status }: { status: TaskStatus }) {
  if (status === "done")
    return <CheckCircle2 size={13} className="shrink-0 text-done mt-0.5" />;
  if (status === "in-progress")
    return <Loader2 size={13} className="shrink-0 text-in-progress mt-0.5 animate-spin" />;
  return <Circle size={13} className="shrink-0 text-upcoming/30 mt-0.5" />;
}

function GithubIcon() {
  return (
    <svg height="14" width="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function StatusBadge({ status, d }: { status: TaskStatus; d: Dict }) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium";
  if (status === "done")
    return (
      <span className={`${base} bg-green-50 text-green-700`}>
        {d["status.done"]}
      </span>
    );
  if (status === "in-progress")
    return (
      <span className={`${base} bg-amber-50 text-amber-700`}>
        {d["status.in-progress"]}
      </span>
    );
  return (
    <span className={`${base} bg-zinc-100 text-zinc-500`}>
      {d["status.upcoming"]}
    </span>
  );
}
