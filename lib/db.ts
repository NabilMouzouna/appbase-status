// Uses the Turso HTTP API (v2/pipeline) directly — no native binary, no DLL issues.
// When TURSO_DATABASE_URL is unset or starts with "file:", returns empty data gracefully.

export interface Link {
  key: string;
  status: string;
  url: string | null;
  note_en: string | null;
  note_fr: string | null;
}

export interface Notification {
  id: string;
  message_en: string;
  message_fr: string | null;
  message_ar: string | null;
  active: boolean;
  created_at: string | null;
}

type TursoArg = { type: "text"; value: string } | { type: "null" };

interface TursoStmt {
  sql: string;
  args?: TursoArg[];
}

type TursoCell = { type: string; value: string | null };

function getHttpUrl(): string | null {
  const raw = process.env.TURSO_DATABASE_URL;
  if (!raw || raw.startsWith("file:")) return null;
  return raw.replace(/^libsql:\/\//, "https://");
}

async function pipeline(stmts: TursoStmt[]): Promise<TursoCell[][][]> {
  const baseUrl = getHttpUrl();
  if (!baseUrl) return stmts.map(() => []);

  const token = process.env.TURSO_AUTH_TOKEN;
  const requests = [
    ...stmts.map((stmt) => ({ type: "execute", stmt })),
    { type: "close" },
  ];

  const res = await fetch(`${baseUrl}/v2/pipeline`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ requests }),
  });

  if (!res.ok) {
    throw new Error(`Turso HTTP ${res.status}: ${await res.text()}`);
  }

  const data = await res.json() as {
    results: Array<{
      type: string;
      response?: { type: string; result?: { cols: unknown[]; rows: TursoCell[][] } };
    }>;
  };

  return data.results
    .filter((r) => r.type === "ok" && r.response?.type === "execute")
    .map((r) => r.response!.result!.rows);
}

const SCHEMA_STMTS: TursoStmt[] = [
  {
    sql: `CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'upcoming',
      updated_at TEXT DEFAULT (datetime('now'))
    )`,
  },
  {
    sql: `CREATE TABLE IF NOT EXISTS links (
      key TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'unavailable',
      url TEXT,
      note_en TEXT,
      note_fr TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    )`,
  },
  {
    sql: `CREATE TABLE IF NOT EXISTS notifications (
      id TEXT PRIMARY KEY,
      message_en TEXT NOT NULL,
      message_fr TEXT,
      message_ar TEXT,
      active TEXT NOT NULL DEFAULT '1',
      created_at TEXT DEFAULT (datetime('now'))
    )`,
  },
];

let schemaEnsured = false;

async function ensureSchema() {
  if (schemaEnsured || !getHttpUrl()) return;
  await pipeline(SCHEMA_STMTS);
  schemaEnsured = true;
}

function arg(val: string | null | undefined): TursoArg {
  return val == null ? { type: "null" } : { type: "text", value: val };
}

export async function getTaskStatuses(): Promise<Record<string, string>> {
  await ensureSchema();
  const [rows] = await pipeline([{ sql: "SELECT id, status FROM tasks" }]);
  const map: Record<string, string> = {};
  for (const row of rows) {
    if (row[0]?.value && row[1]?.value) map[row[0].value] = row[1].value;
  }
  return map;
}

export async function updateTaskStatus(id: string, status: string) {
  await ensureSchema();
  await pipeline([
    {
      sql: `INSERT INTO tasks (id, status, updated_at) VALUES (?, ?, datetime('now'))
            ON CONFLICT(id) DO UPDATE SET status = ?, updated_at = datetime('now')`,
      args: [arg(id), arg(status), arg(status)],
    },
  ]);
}

export async function seedDefaults(tasks: { id: string; status: string }[]) {
  await ensureSchema();
  if (tasks.length === 0) return;
  await pipeline(
    tasks.map((t) => ({
      sql: `INSERT OR IGNORE INTO tasks (id, status) VALUES (?, ?)`,
      args: [arg(t.id), arg(t.status)],
    }))
  );
}

export async function getLinks(): Promise<Link[]> {
  await ensureSchema();
  const [rows] = await pipeline([
    { sql: "SELECT key, status, url, note_en, note_fr FROM links" },
  ]);
  return rows.map((row) => ({
    key: row[0]?.value ?? "",
    status: row[1]?.value ?? "unavailable",
    url: row[2]?.value ?? null,
    note_en: row[3]?.value ?? null,
    note_fr: row[4]?.value ?? null,
  }));
}

export async function getNotifications(activeOnly = false): Promise<Notification[]> {
  await ensureSchema();
  const sql = activeOnly
    ? "SELECT id, message_en, message_fr, message_ar, active, created_at FROM notifications WHERE active = '1' ORDER BY created_at DESC"
    : "SELECT id, message_en, message_fr, message_ar, active, created_at FROM notifications ORDER BY created_at DESC";
  const [rows] = await pipeline([{ sql }]);
  return rows.map((row) => ({
    id: row[0]?.value ?? "",
    message_en: row[1]?.value ?? "",
    message_fr: row[2]?.value ?? null,
    message_ar: row[3]?.value ?? null,
    active: (row[4]?.value ?? "0") === "1",
    created_at: row[5]?.value ?? null,
  }));
}

export async function upsertNotification(
  id: string,
  message_en: string,
  message_fr: string | null,
  message_ar: string | null,
  active: boolean
) {
  await ensureSchema();
  const activeStr = active ? "1" : "0";
  await pipeline([
    {
      sql: `INSERT INTO notifications (id, message_en, message_fr, message_ar, active)
            VALUES (?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
              message_en = ?, message_fr = ?, message_ar = ?, active = ?`,
      args: [
        arg(id), arg(message_en), arg(message_fr), arg(message_ar), arg(activeStr),
        arg(message_en), arg(message_fr), arg(message_ar), arg(activeStr),
      ],
    },
  ]);
}

export async function deleteNotification(id: string) {
  await ensureSchema();
  await pipeline([
    { sql: "DELETE FROM notifications WHERE id = ?", args: [arg(id)] },
  ]);
}

export async function setLink(
  key: string,
  status: string,
  url: string | null,
  note_en: string | null,
  note_fr: string | null
) {
  await ensureSchema();
  await pipeline([
    {
      sql: `INSERT INTO links (key, status, url, note_en, note_fr, updated_at)
            VALUES (?, ?, ?, ?, ?, datetime('now'))
            ON CONFLICT(key) DO UPDATE SET
              status = ?, url = ?, note_en = ?, note_fr = ?, updated_at = datetime('now')`,
      args: [
        arg(key), arg(status), arg(url), arg(note_en), arg(note_fr),
        arg(status), arg(url), arg(note_en), arg(note_fr),
      ],
    },
  ]);
}
