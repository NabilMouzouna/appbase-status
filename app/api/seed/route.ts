import { NextRequest, NextResponse } from "next/server";
import { seedDefaults } from "../../../lib/db";
import { getAllTaskDefaults } from "../../data/milestones";

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 403 });
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const defaults = getAllTaskDefaults();
  await seedDefaults(defaults);
  return NextResponse.json({ ok: true, seeded: defaults.length });
}
