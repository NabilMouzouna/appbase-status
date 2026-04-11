import { NextRequest, NextResponse } from "next/server";
import { getTaskStatuses, updateTaskStatus } from "../../../lib/db";

export async function GET() {
  try {
    const statuses = await getTaskStatuses();
    return NextResponse.json(statuses);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 403 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, status } = body as { id?: string; status?: string };

  if (!id || !status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  const validStatuses = ["done", "in-progress", "upcoming"];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await updateTaskStatus(id, status);
  return NextResponse.json({ ok: true });
}
