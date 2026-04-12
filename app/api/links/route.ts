import { NextRequest, NextResponse } from "next/server";
import { getLinks, setLink } from "../../../lib/db";

export async function GET() {
  try {
    const links = await getLinks();
    return NextResponse.json(links);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "Admin not configured" },
      { status: 403 }
    );
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${adminPassword}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { key, status, url, note_en, note_fr } = body as {
    key?: string;
    status?: string;
    url?: string;
    note_en?: string;
    note_fr?: string;
  };

  if (!key || !status) {
    return NextResponse.json(
      { error: "key and status required" },
      { status: 400 }
    );
  }

  const validKeys = ["presentation", "report"];
  const validStatuses = ["unavailable", "in-progress", "available"];

  if (!validKeys.includes(key)) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await setLink(key, status, url || null, note_en || null, note_fr || null);
  return NextResponse.json({ ok: true });
}
