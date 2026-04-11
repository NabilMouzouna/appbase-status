import { createClient } from "@libsql/client";

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function ensureSchema() {
  await db.execute(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      status TEXT NOT NULL DEFAULT 'upcoming',
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);
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
