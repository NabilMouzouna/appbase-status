import {
  Server,
  Network,
  Globe,
  Database,
  HardDrive,
  Boxes,
  ShieldCheck,
} from "lucide-react";

export interface ComponentLabels {
  lan: string;
  host: string;
  compose: string;
  caddy: string;
  caddyRole: string;
  coredns: string;
  corednsRole: string;
  mdns: string;
  mdnsRole: string;
  api: string;
  apiRole: string;
  console: string;
  consoleRole: string;
  postgres: string;
  postgresRole: string;
  storage: string;
  storageRole: string;
}

export function ComponentMap({ labels }: { labels: ComponentLabels }) {
  const services: Array<{
    icon: React.ReactNode;
    title: string;
    role: string;
  }> = [
    { icon: <ShieldCheck size={14} className="text-muted" />, title: labels.caddy, role: labels.caddyRole },
    { icon: <Globe size={14} className="text-muted" />, title: labels.coredns, role: labels.corednsRole },
    { icon: <Network size={14} className="text-muted" />, title: labels.mdns, role: labels.mdnsRole },
    { icon: <Server size={14} className="text-muted" />, title: labels.api, role: labels.apiRole },
    { icon: <Boxes size={14} className="text-muted" />, title: labels.console, role: labels.consoleRole },
    { icon: <Database size={14} className="text-muted" />, title: labels.postgres, role: labels.postgresRole },
    { icon: <HardDrive size={14} className="text-muted" />, title: labels.storage, role: labels.storageRole },
  ];

  return (
    <div className="border border-border rounded-lg bg-white p-4">
      <div className="text-xs font-mono text-muted mb-2">{labels.lan}</div>
      <div className="border border-border rounded-md p-3 bg-zinc-50">
        <div className="text-xs font-mono text-muted mb-2">{labels.host}</div>
        <div className="border border-border rounded-md p-3 bg-white">
          <div className="text-xs font-mono text-muted mb-3">{labels.compose}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {services.map((s) => (
              <div
                key={s.title}
                className="flex items-start gap-2 border border-border rounded-md px-3 py-2 bg-zinc-50"
              >
                <span className="mt-0.5 shrink-0">{s.icon}</span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground font-mono">
                    {s.title}
                  </div>
                  <div className="text-xs text-muted">{s.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface RoutingRow {
  url: string;
  target: string;
}

export function RoutingMap({ rows }: { rows: RoutingRow[] }) {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-white">
      <div className="divide-y divide-border">
        {rows.map((r) => (
          <div
            key={r.url}
            className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 sm:gap-3 px-4 py-3 items-center"
          >
            <span className="text-sm font-mono text-foreground break-all">
              {r.url}
            </span>
            <span className="text-muted text-xs sm:text-sm select-none" aria-hidden="true">
              →
            </span>
            <span className="text-sm text-muted">{r.target}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export interface DataEntity {
  name: string;
  note: string;
}

export function DataModel({
  org,
  entities,
}: {
  org: DataEntity;
  entities: DataEntity[];
}) {
  return (
    <div className="border border-border rounded-lg bg-white p-4">
      <div className="border border-border rounded-md px-3 py-2 bg-zinc-50">
        <div className="font-mono text-sm font-semibold text-foreground">
          {org.name}
        </div>
        <div className="text-xs text-muted mt-0.5">{org.note}</div>
      </div>
      <div
        className="text-muted text-xs ms-4 my-1 select-none"
        aria-hidden="true"
      >
        ↓
      </div>
      <div className="ms-4 ps-4 border-s border-border space-y-2">
        {entities.map((c) => (
          <div
            key={c.name}
            className="border border-border rounded-md px-3 py-2 bg-white"
          >
            <div className="font-mono text-sm font-semibold text-foreground">
              {c.name}
            </div>
            <div className="text-xs text-muted mt-0.5">{c.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
