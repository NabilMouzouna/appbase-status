import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function ensureSchema() {
  await db.batch([
    {
      sql: `CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        status TEXT NOT NULL DEFAULT 'upcoming',
        updated_at TEXT DEFAULT (datetime('now'))
      )`,
      args: [],
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
      args: [],
    },
  ]);
}

export async function getTaskStatuses(): Promise<Record<string, string>> {
  await ensureSchema();
  const result = await db.execute("SELECT id, status FROM tasks");
  const map: Record<string, string> = {};
  for (const row of result.rows) {
    map[row.id as string] = row.status as string;
  }
  return map;
}

export async function updateTaskStatus(id: string, status: string) {
  await ensureSchema();
  await db.execute({
    sql: `INSERT INTO tasks (id, status, updated_at) VALUES (?, ?, datetime('now'))
          ON CONFLICT(id) DO UPDATE SET status = ?, updated_at = datetime('now')`,
    args: [id, status, status],
  });
}

export async function seedDefaults(tasks: { id: string; status: string }[]) {
  await ensureSchema();
  for (const t of tasks) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO tasks (id, status) VALUES (?, ?)`,
      args: [t.id, t.status],
    });
  }
}

// ── links (documents) ──────────────────────────────────────

export interface Link {
  key: string;
  status: string;
  url: string | null;
  note_en: string | null;
  note_fr: string | null;
}

export async function getLinks(): Promise<Link[]> {
  await ensureSchema();
  const result = await db.execute(
    "SELECT key, status, url, note_en, note_fr FROM links"
  );
  return result.rows.map((row) => ({
    key: row.key as string,
    status: row.status as string,
    url: (row.url as string) || null,
    note_en: (row.note_en as string) || null,
    note_fr: (row.note_fr as string) || null,
  }));
}

export async function setLink(
  key: string,
  status: string,
  url: string | null,
  note_en: string | null,
  note_fr: string | null
) {
  await ensureSchema();
  await db.execute({
    sql: `INSERT INTO links (key, status, url, note_en, note_fr, updated_at)
          VALUES (?, ?, ?, ?, ?, datetime('now'))
          ON CONFLICT(key) DO UPDATE SET
            status = ?, url = ?, note_en = ?, note_fr = ?, updated_at = datetime('now')`,
    args: [key, status, url, note_en, note_fr, status, url, note_en, note_fr],
  });
}
