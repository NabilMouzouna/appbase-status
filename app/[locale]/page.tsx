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
  FileText,
  FileSpreadsheet,
  Mail,
} from "lucide-react";
import { getDictionary, isLocale, locales } from "../../lib/i18n/dictionaries";
import type { Locale } from "../../lib/i18n/dictionaries";
import { getTaskStatuses, getLinks } from "../../lib/db";
import type { Link as DBLink } from "../../lib/db";
import { milestones, project, techStack } from "../data/milestones";
import type { Milestone, TaskStatus } from "../data/milestones";
import { SidebarNav } from "../components/sidebar-nav";

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

    const allTasks = weeks.flatMap((w) => w.tasks);
    const doneTasks = allTasks.filter((t) => t.status === "done").length;
    const inProgressTasks = allTasks.filter(
      (t) => t.status === "in-progress"
    ).length;
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

  const [dbStatuses, dbLinks] = await Promise.all([
    getTaskStatuses().catch(() => ({}) as Record<string, string>),
    getLinks().catch(() => [] as DBLink[]),
  ]);

  const data = applyStatuses(milestones, dbStatuses);

  const allTasks = data.flatMap((ms) => ms.breakdown.flatMap((w) => w.tasks));
  const doneTasks = allTasks.filter((t) => t.status === "done").length;
  const totalTasks = allTasks.length;
  const pct = Math.round((doneTasks / totalTasks) * 100);

  const otherLocales = (["en", "fr", "ar"] as Locale[]).filter(
    (l) => l !== lang
  );

  const linksMap: Record<string, DBLink> = {};
  for (const link of dbLinks) {
    linksMap[link.key] = link;
  }

  const navItems = [
    { id: "overview", label: d["nav.overview"] },
    { id: "problem", label: d["nav.problem"] },
    { id: "how", label: d["nav.how"] },
    { id: "progress", label: d["nav.progress"] },
    { id: "milestones", label: d["nav.milestones"] },
    { id: "documents", label: d["nav.documents"] },
    { id: "tech", label: d["nav.tech"] },
    { id: "contact", label: d["nav.contact"] },
  ];

  return (
    <div className="layout-wrapper" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* ── sidebar (desktop) ─────────────────────────── */}
      <aside className="sidebar">
        <div className="mb-8">
          <div className="flex items-center gap-2.5 mb-1">
            <Image
              src="/outlined-logo.png"
              alt="AppBase logo"
              width={28}
              height={28}
              className="shrink-0"
            />
            <span className="text-sm font-bold tracking-tight">
              {project.name}
            </span>
          </div>
          <p className="text-[10px] text-muted uppercase tracking-widest mt-1">
            {d["header.badge"]}
          </p>
        </div>

        <SidebarNav items={navItems} variant="desktop" />

        <div className="mt-auto pt-8 space-y-4">
          <div className="flex gap-2">
            {otherLocales.map((l) => (
              <Link
                key={l}
                href={`/${l}`}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-xs font-semibold text-muted hover:text-foreground hover:bg-zinc-100 transition-colors uppercase"
              >
                {l}
              </Link>
            ))}
          </div>
          <Link
            href={`/${lang}/admin`}
            className="text-xs text-muted hover:text-foreground transition-colors"
          >
            {d["footer.admin"]} &rarr;
          </Link>
        </div>
      </aside>

      {/* ── mobile nav ────────────────────────────────── */}
      <SidebarNav items={navItems} variant="mobile" />

      {/* ── main content ──────────────────────────────── */}
      <main className="main-content">
        {/* ── locale switcher (mobile only) ───────────── */}
        <div className="flex justify-end gap-2 mb-8 md:hidden">
          {otherLocales.map((l) => (
            <Link
              key={l}
              href={`/${l}`}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-xs font-semibold text-muted hover:text-foreground hover:bg-zinc-100 transition-colors uppercase"
            >
              {l}
            </Link>
          ))}
        </div>

        {/* ── overview ────────────────────────────────── */}
        <section id="overview">
          <header>
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/ensaf.png"
                alt="ENSA Fes"
                width={90}
                height={40}
                className="object-contain opacity-80"
              />
            </div>

            <p className="text-sm font-medium uppercase tracking-widest text-muted mb-4">
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
              <h1 className="text-4xl font-bold tracking-tight">
                {project.name}
              </h1>
            </div>

            <p className="text-lg leading-relaxed text-muted mb-5">
              {d["header.tagline"]}
            </p>

            <div className="flex flex-wrap gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-1.5 hover:bg-zinc-50 transition-colors text-foreground"
              >
                <GithubIcon />
                {d["contact.github"]}
                <ExternalLink size={12} className="text-muted" />
              </a>
              <a
                href={project.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-1.5 hover:bg-zinc-50 transition-colors text-foreground"
              >
                <LinkedInIcon />
                {d["contact.linkedin"]}
                <ExternalLink size={12} className="text-muted" />
              </a>
              <a
                href={`mailto:${project.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-1.5 hover:bg-zinc-50 transition-colors text-foreground"
              >
                <Mail size={14} />
                {d["contact.email"]}
              </a>
            </div>
          </header>

          <div className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              {d["what.heading"]}
            </h2>
            <p className="text-base leading-8 text-muted">{d["what.p1"]}</p>
            <p className="mt-3 text-base leading-8 text-muted">{d["what.p2"]}</p>
          </div>
        </section>

        {/* ── the problem ─────────────────────────────── */}
        <Section id="problem" heading={d["problem.heading"]}>
          <p className="text-base leading-8 text-muted mb-4">
            {d["problem.intro"]}
          </p>
          <div className="divide-y divide-border border border-border rounded-lg overflow-hidden">
            {[
              {
                name: "Firebase / Supabase Cloud",
                key: "problem.firebase" as const,
                icon: (
                  <Server
                    size={13}
                    className="shrink-0 text-muted mt-0.5"
                  />
                ),
              },
              {
                name: "Supabase Self-hosted",
                key: "problem.supabase" as const,
                icon: (
                  <Server
                    size={13}
                    className="shrink-0 text-muted mt-0.5"
                  />
                ),
              },
              {
                name: "Appwrite",
                key: "problem.appwrite" as const,
                icon: (
                  <Boxes
                    size={13}
                    className="shrink-0 text-muted mt-0.5"
                  />
                ),
              },
              {
                name: "PocketBase",
                key: "problem.pocketbase" as const,
                icon: (
                  <Database
                    size={13}
                    className="shrink-0 text-muted mt-0.5"
                  />
                ),
              },
            ].map((row) => (
              <div key={row.name} className="flex gap-3 px-4 py-3 bg-white">
                {row.icon}
                <div className="min-w-0">
                  <span className="text-sm font-semibold text-foreground font-mono">
                    {row.name}
                  </span>
                  <p className="text-sm text-muted leading-relaxed mt-0.5">
                    {d[row.key]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-base leading-8 text-muted border-l-2 border-foreground pl-4">
            {d["problem.gap"]}
          </p>
        </Section>

        {/* ── how it works ────────────────────────────── */}
        <Section id="how" heading={d["how.heading"]}>
          <div className="space-y-4">
            {[
              {
                label: "M1",
                icon: (
                  <ShieldCheck
                    size={15}
                    className="shrink-0 text-done mt-0.5"
                  />
                ),
                text: d["how.m1"],
              },
              {
                label: "M2",
                icon: (
                  <Boxes
                    size={15}
                    className="shrink-0 text-in-progress mt-0.5"
                  />
                ),
                text: d["how.m2"],
              },
              {
                label: "M3",
                icon: (
                  <Network
                    size={15}
                    className="shrink-0 text-muted mt-0.5"
                  />
                ),
                text: d["how.m3"],
              },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                {item.icon}
                <div>
                  <span className="font-mono text-sm font-bold text-foreground">
                    {item.label}{" "}
                  </span>
                  <span className="text-base leading-8 text-muted">
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── progress bar ────────────────────────────── */}
        <Section id="progress" heading={d["progress.heading"]}>
          <div className="flex items-baseline justify-between mb-2">
            <div className="flex gap-4 text-sm text-muted">
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
            <span className="font-mono text-sm text-muted">
              {doneTasks} {d["progress.of"]} {totalTasks} &middot; {pct}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </Section>

        {/* ── milestones ──────────────────────────────── */}
        <Section id="milestones" heading={d["milestones.heading"]}>
          <div className="space-y-0">
            {data.map((ms, i) => (
              <MilestoneCard key={ms.id} milestone={ms} d={d} index={i} />
            ))}
          </div>
        </Section>

        {/* ── documents ───────────────────────────────── */}
        <Section id="documents" heading={d["documents.heading"]}>
          <div className="space-y-3">
            <DocumentCard
              icon={<FileText size={16} className="shrink-0 text-muted" />}
              title={d["documents.presentation"]}
              link={linksMap["presentation"]}
              fallbackUrl={project.presentation}
              d={d}
              lang={lang}
            />
            <DocumentCard
              icon={
                <FileSpreadsheet
                  size={16}
                  className="shrink-0 text-muted"
                />
              }
              title={d["documents.report"]}
              link={linksMap["report"]}
              d={d}
              lang={lang}
            />
          </div>
        </Section>

        {/* ── tech stack ──────────────────────────────── */}
        <Section id="tech" heading={d["tech.heading"]}>
          <div className="flex flex-wrap gap-2">
            {techStack.map((t) => (
              <span
                key={t.layer}
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 font-mono text-sm text-foreground"
              >
                <span className="text-muted text-xs">{t.layer}</span>
                {t.tech}
              </span>
            ))}
          </div>
        </Section>

        {/* ── contact ─────────────────────────────────── */}
        <Section id="contact" heading={d["contact.heading"]}>
          <div className="space-y-4">
            <div>
              <p className="text-base leading-8 text-muted">
                {d["about.body"]}
              </p>
              <div className="mt-4 flex items-center gap-2 text-base">
                <HardDrive size={16} className="text-muted" />
                <span className="font-medium">{project.author}</span>
                <span className="text-muted">&middot;</span>
                <span className="text-muted text-sm">
                  {d["header.degree"]}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-1.5 hover:bg-zinc-50 transition-colors text-foreground"
              >
                <GithubIcon />
                {d["contact.github"]}
                <ExternalLink size={12} className="text-muted" />
              </a>
              <a
                href={project.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-1.5 hover:bg-zinc-50 transition-colors text-foreground"
              >
                <LinkedInIcon />
                {d["contact.linkedin"]}
                <ExternalLink size={12} className="text-muted" />
              </a>
              <a
                href={`mailto:${project.email}`}
                className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-4 py-1.5 hover:bg-zinc-50 transition-colors text-foreground"
              >
                <Mail size={14} />
                {d["contact.email"]}
              </a>
            </div>
          </div>
        </Section>

        {/* ── footer ──────────────────────────────────── */}
        <footer className="mt-20 pt-6 border-t border-border flex items-center justify-between text-sm text-muted">
          <span>
            {project.name} &copy; {new Date().getFullYear()}
          </span>
          <Link
            href={`/${lang}/admin`}
            className="hover:text-foreground transition-colors"
          >
            {d["footer.admin"]} &rarr;
          </Link>
        </footer>
      </main>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────

function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-14 scroll-mt-20">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
        {heading}
      </h2>
      {children}
    </section>
  );
}

// ── Document card ──────────────────────────────────────────

type Dict = Awaited<ReturnType<typeof getDictionary>>;

function DocumentCard({
  icon,
  title,
  link,
  fallbackUrl,
  d,
  lang,
}: {
  icon: React.ReactNode;
  title: string;
  link?: DBLink;
  fallbackUrl?: string;
  d: Dict;
  lang: Locale;
}) {
  const status = link?.status ?? "unavailable";
  const url = link?.url ?? fallbackUrl ?? null;
  const note =
    lang === "fr" ? link?.note_fr : link?.note_en;

  const statusLabel =
    d[`documents.status.${status}` as keyof Dict] as string;

  const statusColors: Record<string, string> = {
    unavailable: "bg-zinc-100 text-zinc-500",
    "in-progress": "bg-amber-50 text-amber-700",
    available: "bg-green-50 text-green-700",
  };

  return (
    <div className="flex items-center gap-3 p-4 border border-border rounded-lg bg-white">
      {icon}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-semibold text-foreground">
            {title}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[status] ?? statusColors.unavailable}`}
          >
            {statusLabel}
          </span>
        </div>
        {note && (
          <p className="text-sm text-muted mt-0.5">{note}</p>
        )}
      </div>
      {(status === "available" || url) && url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground border border-border rounded-full px-4 py-1.5 hover:bg-zinc-50 transition-colors shrink-0"
        >
          {d["documents.open"]}
          <ExternalLink size={11} />
        </a>
      )}
    </div>
  );
}

// ── Milestone card ─────────────────────────────────────────

function MilestoneCard({
  milestone: ms,
  d,
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
            <span className="text-base font-semibold text-foreground">
              {d[ms.titleKey as keyof Dict] as string}
            </span>
            <StatusBadge status={ms.status} d={d} />
          </div>
          <p className="text-sm text-muted mt-0.5">
            {d[ms.subtitleKey as keyof Dict] as string}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono text-sm text-muted hidden sm:block">
            {done}/{allTasks.length}
          </span>
          <ChevronRight
            size={14}
            className="text-muted transition-transform group-open:rotate-90"
          />
        </div>
      </summary>

      <div className="pb-5 ps-7">
        <p className="text-sm text-muted mb-4">
          <span className="font-medium text-foreground">
            {d[ms.weeksKey as keyof Dict] as string}
          </span>
          {" \u00b7 "}
          {d[ms.deliverableKey as keyof Dict] as string}
        </p>

        {ms.breakdown.map((week) => (
          <div key={week.labelKey} className="mb-4 last:mb-0">
            <p className="text-sm font-semibold text-foreground mb-0.5">
              {d[week.labelKey as keyof Dict] as string}
            </p>
            <p className="text-sm text-muted mb-2">
              {d[week.summaryKey as keyof Dict] as string}
            </p>
            <ul className="space-y-2">
              {week.tasks.map((task) => (
                <li key={task.id} className="flex items-start gap-2 text-sm">
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

// ── Small UI atoms ─────────────────────────────────────────

function StatusIcon({ status }: { status: TaskStatus }) {
  if (status === "done")
    return <CheckCircle2 size={16} className="shrink-0 text-done" />;
  if (status === "in-progress")
    return (
      <Loader2
        size={16}
        className="shrink-0 text-in-progress animate-spin"
      />
    );
  return <Circle size={16} className="shrink-0 text-upcoming/40" />;
}

function TaskIcon({ status }: { status: TaskStatus }) {
  if (status === "done")
    return (
      <CheckCircle2 size={13} className="shrink-0 text-done mt-0.5" />
    );
  if (status === "in-progress")
    return (
      <Loader2
        size={13}
        className="shrink-0 text-in-progress mt-0.5 animate-spin"
      />
    );
  return <Circle size={13} className="shrink-0 text-upcoming/30 mt-0.5" />;
}

function GithubIcon() {
  return (
    <svg
      height="14"
      width="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      height="14"
      width="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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
