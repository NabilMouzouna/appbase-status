import type { Metadata } from "next";
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
  ChevronLeft,
  ExternalLink,
  Mail,
} from "lucide-react";
import {
  getDictionary,
  isLocale,
  locales,
} from "../../../lib/i18n/dictionaries";
import type { Locale } from "../../../lib/i18n/dictionaries";
import { getTaskStatuses } from "../../../lib/db";
import { betaMilestones } from "../../data/milestones-beta";
import { project, techStack } from "../../data/milestones";
import type { Milestone, TaskStatus } from "../../data/milestones";
import { SidebarNav } from "../../components/sidebar-nav";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = await getDictionary(locale);
  return {
    title: d["meta.beta.title"],
    description: d["meta.description"],
  };
}

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

export default async function BetaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = isLocale(locale) ? (locale as Locale) : "en";
  const d = await getDictionary(lang);

  const dbStatuses = await getTaskStatuses().catch(
    () => ({}) as Record<string, string>
  );
  const data = applyStatuses(betaMilestones, dbStatuses);

  const allTasks = data.flatMap((ms) => ms.breakdown.flatMap((w) => w.tasks));
  const doneTasks = allTasks.filter((t) => t.status === "done").length;
  const totalTasks = allTasks.length;
  const pct = Math.round((doneTasks / totalTasks) * 100);

  const otherLocales = (["en", "fr", "ar"] as Locale[]).filter(
    (l) => l !== lang
  );

  const navItems = [
    { id: "overview", label: d["nav.overview"] },
    { id: "problem", label: d["nav.problem"] },
    { id: "how", label: d["nav.how"] },
    { id: "progress", label: d["nav.progress"] },
    { id: "milestones", label: d["nav.milestones"] },
    { id: "tech", label: d["nav.tech"] },
    { id: "contact", label: d["nav.contact"] },
  ];

  return (
    <div className="layout-wrapper" dir={lang === "ar" ? "rtl" : "ltr"}>
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
            <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-2 py-0.5 text-[9px] font-bold tracking-wider">
              {d["meta.beta"]}
            </span>
          </div>
          <p className="text-[10px] text-muted uppercase tracking-widest mt-1">
            {d["header.badge"]}
          </p>
        </div>

        <SidebarNav items={navItems} variant="desktop" />

        <div className="mt-auto pt-8 space-y-4">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
          >
            <ChevronLeft size={12} />
            {d["nav.beta.back"]}
          </Link>
          <div className="flex gap-2">
            {otherLocales.map((l) => (
              <Link
                key={l}
                href={`/${l}/beta`}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-xs font-semibold text-muted hover:text-foreground hover:bg-zinc-100 transition-colors uppercase"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <SidebarNav items={navItems} variant="mobile" />

      <main className="main-content">
        <div className="flex justify-between gap-2 mb-8 md:hidden">
          <Link
            href={`/${lang}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
          >
            <ChevronLeft size={12} />
            {d["nav.beta.back"]}
          </Link>
          <div className="flex gap-2">
            {otherLocales.map((l) => (
              <Link
                key={l}
                href={`/${l}/beta`}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-border text-xs font-semibold text-muted hover:text-foreground hover:bg-zinc-100 transition-colors uppercase"
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        <section id="overview">
          <header>
            <p className="text-sm font-medium uppercase tracking-widest text-amber-700 mb-4">
              {d["meta.beta"]} · {d["nav.beta"]}
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
          </header>

          <div className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
              {d["what.heading"]}
            </h2>
            <p className="text-base leading-8 text-muted">{d["what.p1"]}</p>
            <p className="mt-3 text-base leading-8 text-muted">{d["what.p2"]}</p>
          </div>
        </section>

        <Section id="problem" heading={d["problem.heading"]}>
          <p className="text-base leading-8 text-muted mb-4">
            {d["problem.intro"]}
          </p>
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

        <Section id="how" heading={d["how.heading"]}>
          <div className="space-y-4">
            {[
              { label: "M1", icon: <ShieldCheck size={15} className="shrink-0 text-done mt-0.5" />, text: d["how.m1"] },
              { label: "M2", icon: <Boxes size={15} className="shrink-0 text-in-progress mt-0.5" />, text: d["how.m2"] },
              { label: "M3", icon: <Network size={15} className="shrink-0 text-muted mt-0.5" />, text: d["how.m3"] },
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

        <Section id="milestones" heading={d["milestones.heading"]}>
          <div className="space-y-0">
            {data.map((ms, i) => (
              <MilestoneCard key={ms.id} milestone={ms} d={d} index={i} />
            ))}
          </div>
        </Section>

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
                {d["contact.github"]}
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

        <footer className="mt-20 pt-6 border-t border-border flex items-center justify-between text-sm text-muted">
          <span>
            {project.name} &copy; {new Date().getFullYear()}
          </span>
          <Link
            href={`/${lang}`}
            className="hover:text-foreground transition-colors"
          >
            {d["nav.beta.back"]}
          </Link>
        </footer>
      </main>
    </div>
  );
}

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

type Dict = Awaited<ReturnType<typeof getDictionary>>;

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
          {" · "}
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

function StatusIcon({ status }: { status: TaskStatus }) {
  if (status === "done")
    return <CheckCircle2 size={16} className="shrink-0 text-done" />;
  if (status === "in-progress")
    return (
      <Loader2 size={16} className="shrink-0 text-in-progress animate-spin" />
    );
  return <Circle size={16} className="shrink-0 text-upcoming/40" />;
}

function TaskIcon({ status }: { status: TaskStatus }) {
  if (status === "done")
    return <CheckCircle2 size={13} className="shrink-0 text-done mt-0.5" />;
  if (status === "in-progress")
    return (
      <Loader2
        size={13}
        className="shrink-0 text-in-progress mt-0.5 animate-spin"
      />
    );
  return <Circle size={13} className="shrink-0 text-upcoming/30 mt-0.5" />;
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
