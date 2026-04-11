"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  Loader2,
  ChevronLeft,
  LogIn,
  RefreshCw,
} from "lucide-react";
import { milestones } from "../../data/milestones";
import type { TaskStatus } from "../../data/milestones";

const STATUS_CYCLE: TaskStatus[] = ["upcoming", "in-progress", "done"];

function nextStatus(s: TaskStatus): TaskStatus {
  return STATUS_CYCLE[(STATUS_CYCLE.indexOf(s) + 1) % STATUS_CYCLE.length];
}

export default function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState("en");
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [statuses, setStatuses] = useState<Record<string, TaskStatus>>({});
  const [saving, setSaving] = useState<Record<string, boolean>>({});
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  useEffect(() => {
    params.then(({ locale }) => setLocale(locale));
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) {
      setPassword(saved);
      setAuthed(true);
    }
  }, [params]);

  const fetchStatuses = useCallback(async () => {
    const res = await fetch("/api/tasks");
    const data = await res.json();
    setStatuses(data);
  }, []);

  useEffect(() => {
    if (authed) fetchStatuses();
  }, [authed, fetchStatuses]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    sessionStorage.setItem("admin_pw", password);
    setAuthed(true);
    setError("");
  }

  async function toggleTask(id: string, current: TaskStatus) {
    const next = nextStatus(current);
    setSaving((s) => ({ ...s, [id]: true }));
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({ id, status: next }),
    });
    if (res.status === 401) {
      setError("Wrong password.");
      setAuthed(false);
      sessionStorage.removeItem("admin_pw");
    } else if (res.ok) {
      setStatuses((s) => ({ ...s, [id]: next }));
    }
    setSaving((s) => ({ ...s, [id]: false }));
  }

  async function seed() {
    setSeeding(true);
    setSeedMsg("");
    const res = await fetch("/api/seed", {
      method: "POST",
      headers: { Authorization: `Bearer ${password}` },
    });
    const json = await res.json();
    setSeedMsg(res.ok ? `Seeded ${json.seeded} tasks.` : "Failed.");
    setSeeding(false);
    if (res.ok) fetchStatuses();
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5">
        <div className="w-full max-w-sm">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground mb-8 transition-colors"
          >
            <ChevronLeft size={13} /> Back
          </Link>
          <h1 className="text-xl font-bold mb-6">Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-muted mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-300 bg-white"
                autoFocus
              />
            </div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-foreground text-background rounded-lg px-4 py-2 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <LogIn size={14} /> Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
          >
            <ChevronLeft size={13} /> Back
          </Link>
          <h1 className="text-lg font-bold">Progress Admin</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted">Click any task to cycle its status</span>
          <button
            onClick={fetchStatuses}
            className="p-1.5 rounded border border-border hover:bg-zinc-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={13} className="text-muted" />
          </button>
        </div>
      </div>

      {/* Seed button — run once to populate DB with defaults */}
      <div className="mb-8 p-4 border border-border rounded-lg bg-zinc-50 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-foreground">First time setup</p>
          <p className="text-xs text-muted mt-0.5">
            Seed the database with default statuses from the source file.
          </p>
          {seedMsg && <p className="text-xs text-done mt-1">{seedMsg}</p>}
        </div>
        <button
          onClick={seed}
          disabled={seeding}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-md border border-border bg-white px-3 py-1.5 text-xs font-medium hover:bg-zinc-100 disabled:opacity-50 transition-colors"
        >
          {seeding ? <Loader2 size={12} className="animate-spin" /> : null}
          Seed defaults
        </button>
      </div>

      {/* Milestone list */}
      <div className="space-y-0">
        {milestones.map((ms) => (
          <div key={ms.id} className="border-t border-border py-5">
            <h2 className="text-sm font-semibold text-foreground mb-3">{ms.id.toUpperCase()}</h2>
            {ms.breakdown.map((week) => (
              <div key={week.labelKey} className="mb-4">
                <p className="text-[11px] font-medium text-muted uppercase tracking-wide mb-2">
                  {week.labelKey.replace(/ms\.\w+\.w\d+\.label/, week.labelKey)}
                </p>
                <ul className="space-y-1.5">
                  {week.tasks.map((task) => {
                    const current = (statuses[task.id] ?? task.status) as TaskStatus;
                    const isSaving = saving[task.id];
                    return (
                      <li key={task.id}>
                        <button
                          onClick={() => toggleTask(task.id, current)}
                          disabled={isSaving}
                          className="flex items-center gap-2.5 w-full text-left group rounded-md px-2 py-1.5 hover:bg-zinc-50 transition-colors disabled:opacity-50"
                        >
                          <TaskIcon status={current} spinning={isSaving} />
                          <span
                            className={`text-xs flex-1 ${current === "done" ? "line-through text-muted" : "text-foreground"}`}
                          >
                            {task.titleKey}
                          </span>
                          <StatusPill status={current} />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskIcon({
  status,
  spinning,
}: {
  status: TaskStatus;
  spinning?: boolean;
}) {
  if (spinning) return <Loader2 size={14} className="shrink-0 text-muted animate-spin" />;
  if (status === "done") return <CheckCircle2 size={14} className="shrink-0 text-done" />;
  if (status === "in-progress") return <Loader2 size={14} className="shrink-0 text-in-progress animate-spin" />;
  return <Circle size={14} className="shrink-0 text-zinc-300" />;
}

function StatusPill({ status }: { status: TaskStatus }) {
  const base = "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium";
  if (status === "done") return <span className={`${base} bg-green-50 text-green-700`}>done</span>;
  if (status === "in-progress") return <span className={`${base} bg-amber-50 text-amber-700`}>in-progress</span>;
  return <span className={`${base} bg-zinc-100 text-zinc-500`}>upcoming</span>;
}
