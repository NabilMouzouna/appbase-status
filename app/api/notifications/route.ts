import { NextRequest, NextResponse } from "next/server";
import {
  getNotifications,
  upsertNotification,
  deleteNotification,
} from "../../../lib/db";

function checkAuth(request: NextRequest): NextResponse | null {
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
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD;
    const authHeader = request.headers.get("authorization");
    const isAdmin =
      !!adminPassword && authHeader === `Bearer ${adminPassword}`;
    const notifications = await getNotifications(!isAdmin);
    return NextResponse.json(notifications);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch notifications" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const unauth = checkAuth(request);
  if (unauth) return unauth;

  const body = await request.json();
  const { id, message_en, message_fr, message_ar, active } = body as {
    id?: string;
    message_en?: string;
    message_fr?: string;
    message_ar?: string;
    active?: boolean;
  };

  if (!message_en || !message_en.trim()) {
    return NextResponse.json(
      { error: "message_en required" },
      { status: 400 }
    );
  }

  const finalId =
    id && id.trim()
      ? id
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  await upsertNotification(
    finalId,
    message_en.trim(),
    message_fr?.trim() || null,
    message_ar?.trim() || null,
    active !== false
  );
  return NextResponse.json({ ok: true, id: finalId });
}

export async function DELETE(request: NextRequest) {
  const unauth = checkAuth(request);
  if (unauth) return unauth;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  await deleteNotification(id);
  return NextResponse.json({ ok: true });
}
