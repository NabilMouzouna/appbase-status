import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Loader2,
  ChevronRight,
  ExternalLink,
  Mail,
  FileText,
  FileSpreadsheet,
  Download,
  Code2,
  PlayCircle,
} from "lucide-react";
import { getDictionary, isLocale, locales } from "../../lib/i18n/dictionaries";
import type { Locale } from "../../lib/i18n/dictionaries";
import { getTaskStatuses, getLinks } from "../../lib/db";
import type { Link as DBLink } from "../../lib/db";
import { milestones, project } from "../data/milestones";
import type { Milestone, TaskStatus } from "../data/milestones";
import { SidebarNav } from "../components/sidebar-nav";
import { Banner } from "../components/banner";
import {
  ComponentMap,
  RoutingMap,
  DataModel,
} from "../components/architecture-diagrams";

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
    title: d["meta.title"],
    description: d["meta.description"],
  };
}

const COMPARISON_PRODUCTS = [
  "appbase",
  "firebase",
  "amplify",
  "supabase",
] as const;

const COMPARISON_AXES = [
  "residency",
  "compliance",
  "complexity",
  "footprint",
  "isolation",
  "lan",
  "plug",
] as const;

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

export default async function HomePage({
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

  const currentMs =
    data.find((m) => m.status === "in-progress") ??
    data.find((m) => m.status === "upcoming") ??
    data[data.length - 1];
  const nextMs =
    data
      .slice(data.indexOf(currentMs) + 1)
      .find((m) => m.status === "upcoming") ?? null;

  const otherLocales = (["en", "fr", "ar"] as Locale[]).filter(
    (l) => l !== lang
  );

  const linksMap: Record<string, DBLink> = {};
  for (const link of dbLinks) {
    linksMap[link.key] = link;
  }

  const navItems = [
    { id: "progress", label: d["nav.progress"] },
    { id: "milestones", label: d["nav.milestones"] },
    { id: "what", label: d["nav.what"] },
    { id: "usecases", label: d["nav.usecases"] },
    { id: "comparison", label: d["nav.comparison"] },
    { id: "architecture", label: d["nav.architecture"] },
    { id: "documents", label: d["nav.documents"] },
    { id: "demo", label: d["nav.demo"] },
    { id: "contact", label: d["nav.contact"] },
  ];

  return (
    <>
      <Banner
        message={d["banner.message"]}
        ctaLabel={d["banner.cta"]}
        ctaHref={`/${lang}/beta`}
        closeLabel={d["banner.close"]}
      />

      <div className="layout-wrapper" dir={lang === "ar" ? "rtl" : "ltr"}>
        {/* ── sidebar ─────────────────────────────────── */}
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
              {d["home.hero.eyebrow"]}
            </p>
          </div>

          <SidebarNav items={navItems} variant="desktop" />

          <div className="mt-auto pt-8 space-y-4">
            <Link
              href={`/${lang}/beta`}
              className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
            >
              <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 px-1.5 py-0.5 text-[8px] font-bold tracking-wider">
                {d["meta.beta"]}
              </span>
              {d["nav.beta"]} →
            </Link>
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
              className="text-xs text-muted hover:text-foreground transition-colors block"
            >
              {d["footer.admin"]} &rarr;
            </Link>
          </div>
        </aside>

        {/* ── mobile nav ──────────────────────────────── */}
        <SidebarNav items={navItems} variant="mobile" />

        {/* ── main ─────────────────────────────────────── */}
        <main className="main-content" style={{ maxWidth: "880px" }}>
          {/* mobile locale switcher */}
          <div className="flex justify-end gap-2 mb-6 md:hidden">
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

          {/* ── compact header ───────────────────────── */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/ensaf.png"
                alt="ENSA Fes"
                width={80}
                height={36}
                className="object-contain opacity-80"
              />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-3">
              {d["home.hero.eyebrow"]}
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.1] mb-4">
              {d["home.hero.heading"]}
            </h1>
            <p className="text-lg leading-relaxed text-muted max-w-2xl">
              {d["home.hero.subhead"]}
            </p>
          </header>

          {/* ── PROGRESS (FIRST) ─────────────────────── */}
          <section id="progress" className="scroll-mt-20">
            <ProgressCard
              currentMs={currentMs}
              nextMs={nextMs}
              doneTasks={doneTasks}
              totalTasks={totalTasks}
              pct={pct}
              d={d}
            />
          </section>

          {/* ── milestones tracker ───────────────────── */}
          <Section id="milestones" heading={d["milestones.heading"]}>
            <div className="rounded-2xl border border-border bg-white overflow-hidden">
              {data.map((ms, i) => (
                <MilestoneCard
                  key={ms.id}
                  milestone={ms}
                  d={d}
                  isFirst={i === 0}
                  isCurrent={ms.id === currentMs.id}
                />
              ))}
            </div>
          </Section>

          {/* ── what is AppBase ──────────────────────── */}
          <Section id="what" heading={d["nav.what"]}>
            <p className="text-base leading-8 text-muted mb-3">{d["what.p1"]}</p>
            <p className="text-base leading-8 text-muted">{d["what.p2"]}</p>
          </Section>

          {/* ── use cases ────────────────────────────── */}
          <Section id="usecases" heading={d["arch.uc.heading"]}>
            <p className="text-base leading-8 text-muted mb-6">
              {d["arch.uc.intro"]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UseCaseCard
                title={d["arch.uc.clinics.title"]}
                body={d["arch.uc.clinics.body"]}
                flow={d["arch.uc.clinics.flow"]}
              />
              <UseCaseCard
                title={d["arch.uc.schools.title"]}
                body={d["arch.uc.schools.body"]}
                flow={d["arch.uc.schools.flow"]}
              />
            </div>
          </Section>

          {/* ── comparison ───────────────────────────── */}
          <Section id="comparison" heading={d["arch.cmp.heading"]}>
            <p className="text-base leading-8 text-muted mb-6">
              {d["arch.cmp.intro"]}
            </p>
            <ComparisonTable d={d} />
          </Section>

          {/* ── architecture (diagrams) ──────────────── */}
          <Section id="architecture" heading={d["nav.architecture"]}>
            <p className="text-base leading-8 text-muted mb-6">
              {d["arch.intro"]}
            </p>
            <div className="space-y-8">
              <DiagramBlock
                title={d["arch.diagram.components.title"]}
                caption={d["arch.diagram.components.caption"]}
              >
                <ComponentMap
                  labels={{
                    lan: d["arch.node.lan"],
                    host: d["arch.node.host"],
                    compose: d["arch.node.compose"],
                    caddy: d["arch.node.caddy"],
                    caddyRole: d["arch.node.caddy.role"],
                    coredns: d["arch.node.coredns"],
                    corednsRole: d["arch.node.coredns.role"],
                    mdns: d["arch.node.mdns"],
                    mdnsRole: d["arch.node.mdns.role"],
                    api: d["arch.node.api"],
                    apiRole: d["arch.node.api.role"],
                    console: d["arch.node.console"],
                    consoleRole: d["arch.node.console.role"],
                    postgres: d["arch.node.postgres"],
                    postgresRole: d["arch.node.postgres.role"],
                    storage: d["arch.node.storage"],
                    storageRole: d["arch.node.storage.role"],
                  }}
                />
              </DiagramBlock>

              <DiagramBlock
                title={d["arch.diagram.routing.title"]}
                caption={d["arch.diagram.routing.caption"]}
              >
                <RoutingMap
                  rows={[
                    { url: d["arch.route.console"], target: d["arch.route.console.target"] },
                    { url: d["arch.route.api"], target: d["arch.route.api.target"] },
                    { url: d["arch.route.app"], target: d["arch.route.app.target"] },
                    { url: d["arch.route.frontend"], target: d["arch.route.frontend.target"] },
                  ]}
                />
              </DiagramBlock>

              <DiagramBlock
                title={d["arch.diagram.data.title"]}
                caption={d["arch.diagram.data.caption"]}
              >
                <DataModel
                  org={{ name: d["arch.data.org"], note: d["arch.data.org.note"] }}
                  entities={[
                    { name: d["arch.data.users"], note: d["arch.data.users.note"] },
                    { name: d["arch.data.apps"], note: d["arch.data.apps.note"] },
                    { name: d["arch.data.keys"], note: d["arch.data.keys.note"] },
                    { name: d["arch.data.deployments"], note: d["arch.data.deployments.note"] },
                    { name: d["arch.data.access"], note: d["arch.data.access.note"] },
                  ]}
                />
              </DiagramBlock>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
                {d["arch.law.heading"]}
              </p>
              <p className="text-sm leading-7 text-muted">{d["arch.law.intro"]}</p>
              <p className="mt-3 text-sm leading-7 text-muted italic border-l-2 border-border ps-3">
                {d["arch.law.disclaimer"]}
              </p>
            </div>
          </Section>

          {/* ── documents (admin controlled) ─────────── */}
          <Section id="documents" heading={d["documents.heading"]}>
            <div className="space-y-3">
              <DocumentCard
                icon={<FileText size={18} className="shrink-0 text-muted" />}
                title={d["documents.presentation"]}
                link={linksMap["presentation"]}
                fallbackUrl={project.presentation}
                d={d}
                lang={lang}
              />
              <DocumentCard
                icon={
                  <FileSpreadsheet size={18} className="shrink-0 text-muted" />
                }
                title={d["documents.report"]}
                link={linksMap["report"]}
                d={d}
                lang={lang}
              />
            </div>
          </Section>

          {/* ── demo & docs ──────────────────────────── */}
          <Section id="demo" heading={d["demo.heading"]}>
            <p className="text-base leading-8 text-muted mb-6">
              {d["demo.intro"]}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <DemoCard
                icon={<Download size={20} className="shrink-0" />}
                title={d["demo.install.title"]}
                body={d["demo.install.body"]}
                link={linksMap["install"]}
                d={d}
                lang={lang}
              />
              <DemoCard
                icon={<Code2 size={20} className="shrink-0" />}
                title={d["demo.sdk.title"]}
                body={d["demo.sdk.body"]}
                link={linksMap["sdk"]}
                d={d}
                lang={lang}
              />
              <DemoCard
                icon={<PlayCircle size={20} className="shrink-0" />}
                title={d["demo.video.title"]}
                body={d["demo.video.body"]}
                link={linksMap["video"]}
                d={d}
                lang={lang}
              />
            </div>
          </Section>

          {/* ── contact ──────────────────────────────── */}
          <Section id="contact" heading={d["contact.heading"]}>
            <p className="text-base leading-8 text-muted mb-4">
              {d["about.body"]}
            </p>
            <div className="flex items-center gap-2 text-base mb-6">
              <span className="font-medium">{project.author}</span>
              <span className="text-muted">·</span>
              <span className="text-muted text-sm">{d["header.degree"]}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold border-2 border-foreground rounded-full px-5 py-2 hover:bg-foreground hover:text-background transition-colors text-foreground"
              >
                {d["contact.github"]}
                <ExternalLink size={12} />
              </a>
              <a
                href={project.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold border-2 border-border rounded-full px-5 py-2 hover:border-foreground transition-colors text-foreground"
              >
                {d["contact.linkedin"]}
                <ExternalLink size={12} />
              </a>
              <a
                href={`mailto:${project.email}`}
                className="inline-flex items-center gap-2 text-sm font-semibold border-2 border-border rounded-full px-5 py-2 hover:border-foreground transition-colors text-foreground"
              >
                <Mail size={14} />
                {d["contact.email"]}
              </a>
            </div>
          </Section>

          {/* ── footer ───────────────────────────────── */}
          <footer className="mt-24 pt-6 border-t border-border flex items-center justify-between text-sm text-muted">
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
    </>
  );
}

// ──────────────────────────────────────────────────────────
// Components
// ──────────────────────────────────────────────────────────

type Dict = Awaited<ReturnType<typeof getDictionary>>;

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
    <section id={id} className="mt-20 scroll-mt-20">
      <h2 className="text-2xl font-semibold tracking-tight mb-5">{heading}</h2>
      {children}
    </section>
  );
}

function ProgressCard({
  currentMs,
  nextMs,
  doneTasks,
  totalTasks,
  pct,
  d,
}: {
  currentMs: Milestone;
  nextMs: Milestone | null;
  doneTasks: number;
  totalTasks: number;
  pct: number;
  d: Dict;
}) {
  const currentTasks = currentMs.breakdown.flatMap((w) => w.tasks);
  return (
    <div className="rounded-3xl border border-border bg-white p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted mb-1.5">
            {d["progress.current"]}
          </p>
          <h3 className="text-2xl font-semibold tracking-tight">
            {d[currentMs.titleKey as keyof Dict] as string}
          </h3>
          <p className="text-sm text-muted mt-1">
            {d[currentMs.subtitleKey as keyof Dict] as string}
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="font-mono text-3xl font-semibold tracking-tight">
            {pct}%
          </span>
          <p className="text-xs text-muted mt-0.5">
            {doneTasks} / {totalTasks} {d["progress.tasks"]}
          </p>
        </div>
      </div>

      <div className="progress-track mb-6">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      <ul className="space-y-2.5">
        {currentTasks.map((task) => (
          <li key={task.id} className="flex items-start gap-2.5 text-sm">
            <TaskIcon status={task.status} />
            <span
              className={
                task.status === "done"
                  ? "text-muted line-through"
                  : task.status === "in-progress"
                  ? "text-foreground font-medium"
                  : "text-foreground"
              }
            >
              {d[task.titleKey as keyof Dict] as string}
            </span>
          </li>
        ))}
      </ul>

      {nextMs && (
        <div className="mt-6 pt-5 border-t border-border flex items-center justify-between text-sm">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted">
            {d["progress.next"]}
          </span>
          <span className="text-foreground font-medium">
            {d[nextMs.titleKey as keyof Dict] as string}
          </span>
        </div>
      )}
    </div>
  );
}

function MilestoneCard({
  milestone: ms,
  d,
  isFirst,
  isCurrent,
}: {
  milestone: Milestone;
  d: Dict;
  isFirst: boolean;
  isCurrent: boolean;
}) {
  const allTasks = ms.breakdown.flatMap((w) => w.tasks);
  const done = allTasks.filter((t) => t.status === "done").length;

  return (
    <details
      className={`group ${isFirst ? "" : "border-t border-border"}`}
      open={isCurrent}
    >
      <summary className="flex items-center gap-3 px-5 py-4 cursor-pointer list-none hover:bg-zinc-50/50 transition-colors">
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

      <div className="px-5 pb-5 ps-12">
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

function UseCaseCard({
  title,
  body,
  flow,
}: {
  title: string;
  body: string;
  flow: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <h3 className="text-base font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm leading-7 text-muted mb-3">{body}</p>
      <p className="text-sm leading-7 text-foreground border-l-2 border-foreground ps-3">
        {flow}
      </p>
    </div>
  );
}

function DiagramBlock({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm leading-7 text-muted mb-4">{caption}</p>
      {children}
    </div>
  );
}

function ComparisonTable({ d }: { d: Dict }) {
  return (
    <div className="overflow-x-auto">
      <div
        className="rounded-2xl border border-border overflow-hidden"
        style={{ minWidth: "600px" }}
      >
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-zinc-50 border-b border-r border-border w-[120px]" />
              {COMPARISON_PRODUCTS.map((p) => {
                const isAppBase = p === "appbase";
                return (
                  <th
                    key={p}
                    className={`border-b border-l border-border ${
                      isAppBase ? "bg-foreground" : "bg-zinc-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2 px-5 py-5">
                      {p === "appbase" && (
                        <Image
                          src="/outlined-logo.png"
                          alt="AppBase"
                          width={22}
                          height={22}
                          className="invert opacity-90"
                        />
                      )}
                      {p === "firebase" && <FirebaseLogo />}
                      {p === "amplify" && <AmplifyLogo />}
                      {p === "supabase" && <SupabaseLogo />}
                      <span
                        className={`font-semibold text-xs leading-snug text-center ${
                          isAppBase ? "text-background" : "text-foreground"
                        }`}
                      >
                        {d[`arch.cmp.product.${p}` as keyof Dict] as string}
                      </span>
                      {isAppBase && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-background/50 -mt-1">
                          This project
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_AXES.map((axis) => (
              <tr key={axis} className="border-t border-border">
                <td className="px-4 py-4 bg-zinc-50 border-r border-border align-top">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted leading-none">
                    {d[`arch.cmp.axis.${axis}` as keyof Dict] as string}
                  </span>
                </td>
                {COMPARISON_PRODUCTS.map((p) => {
                  const isAppBase = p === "appbase";
                  return (
                    <td
                      key={p}
                      className={`px-5 py-4 border-l border-border text-xs leading-relaxed align-top ${
                        isAppBase
                          ? "bg-zinc-50/70 font-medium text-foreground"
                          : "bg-white text-muted"
                      }`}
                    >
                      {d[`arch.cmp.${p}.${axis}` as keyof Dict] as string}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
  const note = lang === "fr" ? link?.note_fr : link?.note_en;

  const statusLabel = d[`documents.status.${status}` as keyof Dict] as string;
  const statusColors: Record<string, string> = {
    unavailable: "bg-zinc-100 text-zinc-500",
    "in-progress": "bg-amber-50 text-amber-700",
    available: "bg-green-50 text-green-700",
  };

  return (
    <div className="flex items-center gap-4 p-5 border border-border rounded-2xl bg-white">
      {icon}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-semibold text-foreground">
            {title}
          </span>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              statusColors[status] ?? statusColors.unavailable
            }`}
          >
            {statusLabel}
          </span>
        </div>
        {note && <p className="text-sm text-muted mt-0.5">{note}</p>}
      </div>
      {(status === "available" || url) && url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground border-2 border-border rounded-full px-4 py-1.5 hover:border-foreground transition-colors shrink-0"
        >
          {d["documents.open"]}
          <ExternalLink size={11} />
        </a>
      )}
    </div>
  );
}

function DemoCard({
  icon,
  title,
  body,
  link,
  d,
  lang,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  link?: DBLink;
  d: Dict;
  lang: Locale;
}) {
  const status = link?.status ?? "unavailable";
  const url = link?.url ?? null;
  const note = lang === "fr" ? link?.note_fr : link?.note_en;
  const isAvailable = status === "available" && url;

  return (
    <div className="rounded-2xl border border-border bg-white p-5 flex flex-col">
      <div className="text-foreground mb-3">{icon}</div>
      <h3 className="text-base font-semibold text-foreground mb-1.5">
        {title}
      </h3>
      <p className="text-sm leading-7 text-muted mb-4 flex-1">{body}</p>
      {note && <p className="text-xs text-muted mb-3">{note}</p>}
      {isAvailable ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-background bg-foreground rounded-full px-4 py-2 hover:bg-foreground/90 transition-colors"
        >
          {d["demo.open"]}
          <ExternalLink size={11} />
        </a>
      ) : (
        <span className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-muted bg-zinc-100 rounded-full px-4 py-2">
          {d["demo.coming"]}
        </span>
      )}
    </div>
  );
}

// ── status atoms ──────────────────────────────────────────

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

// ── product logos ─────────────────────────────────────────

function FirebaseLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="75.37 20.86 442.36 555.61"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <path d="M213.918 560.499C237.166 569.856 262.387 575.408 288.87 576.333C324.71 577.585 358.792 570.175 389.261 556.099C352.724 541.744 319.634 520.751 291.392 494.651C273.086 523.961 246.01 547.113 213.918 560.499Z" fill="#FF9100" />
      <path d="M291.389 494.66C226.923 435.038 187.815 348.743 191.12 254.092C191.228 251.019 191.39 247.947 191.58 244.876C180.034 241.89 167.98 240.068 155.576 239.635C137.821 239.015 120.626 241.217 104.393 245.788C87.1838 275.933 76.7989 310.521 75.5051 347.569C72.1663 443.18 130.027 526.723 213.914 560.508C246.007 547.121 273.082 523.998 291.389 494.66Z" fill="#FFC400" />
      <path d="M291.39 494.657C306.378 470.671 315.465 442.551 316.523 412.254C319.306 332.559 265.731 264.003 191.581 244.873C191.391 247.944 191.229 251.016 191.121 254.089C187.816 348.74 226.924 435.035 291.39 494.657Z" fill="#FF9100" />
      <path d="M308.231 20.8584C266 54.6908 232.652 99.302 212.475 150.693C200.924 180.129 193.665 211.748 191.546 244.893C265.696 264.023 319.272 332.579 316.489 412.273C315.431 442.57 306.317 470.663 291.355 494.677C319.595 520.804 352.686 541.77 389.223 556.124C462.56 522.224 514.593 449.278 517.606 362.997C519.558 307.096 498.08 257.273 467.731 215.219C435.68 170.742 308.231 20.8584 308.231 20.8584Z" fill="#DD2C00" />
    </svg>
  );
}

function AmplifyLogo() {
  return (
    <svg
      viewBox="0 0 24 22"
      width="20"
      height="18"
      aria-hidden="true"
      fill="#FF9900"
    >
      <path d="M14.3128 20.0394C14.3651 20.1298 14.4618 20.1855 14.5664 20.1855H16.8444C17.0698 20.1855 17.2107 19.942 17.098 19.7472L8.82308 5.44278C8.71037 5.24795 8.4286 5.24795 8.31589 5.44278L7.09981 7.54494C7.09518 7.55294 7.09518 7.56281 7.09981 7.57081L7.10128 7.57334C7.1106 7.58946 7.09894 7.60961 7.08029 7.60961C7.07163 7.60961 7.06363 7.61422 7.0593 7.62171L0.0396396 19.7616C-0.0730193 19.9565 0.0678714 20.2 0.293265 20.2H10.9633C11.1887 20.2 11.3296 19.9564 11.2169 19.7616L10.1254 17.8749C10.0731 17.7845 9.97646 17.7288 9.87184 17.7288H4.4145C4.3018 17.7288 4.23135 17.607 4.28771 17.5096L8.4417 10.3288C8.49805 10.2314 8.63894 10.2314 8.6953 10.3288L14.3128 20.0394Z" />
      <path d="M10.1282 2.30989C10.0759 2.40032 10.0759 2.51172 10.1282 2.60214L20.2155 20.0394C20.2678 20.1298 20.3645 20.1855 20.4691 20.1855H22.7412C22.9666 20.1855 23.1075 19.942 22.9948 19.7472L11.7715 0.346077C11.6588 0.151242 11.377 0.151243 11.2643 0.346077L10.1282 2.30989Z" />
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width="16"
      height="18"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="sb-a-home"
          x1="237.109"
          x2="419.106"
          y1="223.219"
          y2="146.89"
          gradientTransform="matrix(1 0 0 -1 0 513)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#249361" />
          <stop offset="1" stopColor="#3ecf8e" />
        </linearGradient>
        <linearGradient
          id="sb-b-home"
          x1="245.829"
          x2="328.829"
          y1="411.681"
          y2="255.438"
          gradientTransform="matrix(1 0 0 -1 0 513)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#000" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M297.6 501c-12.9 16.3-39.2 7.4-39.5-13.4L253.6 183h204.8c37.1 0 57.8 42.8 34.7 71.9z"
        fill="url(#sb-a-home)"
      />
      <path
        d="M297.6 501c-12.9 16.3-39.2 7.4-39.5-13.4L253.6 183h204.8c37.1 0 57.8 42.8 34.7 71.9z"
        fill="url(#sb-b-home)"
        fillOpacity=".2"
      />
      <path
        d="M214.4 11c12.9-16.3 39.2-7.4 39.5 13.4l2 304.5H53.7c-37.1 0-57.8-42.8-34.7-71.9z"
        fill="#3ecf8e"
      />
    </svg>
  );
}
