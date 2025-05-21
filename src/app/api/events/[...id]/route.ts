import { NextResponse } from "next/server";
import { openDB } from "@/app/lib/sqlite";

function extractId(params: { id: string | string[] }) {
  return Array.isArray(params.id) ? params.id[0] : params.id;
}

export async function GET(req: Request, { params }: { params: { id: string | string[] } }) {
  try {
    const id = extractId(params);
    const db = await openDB();
    const event = await db.get(`SELECT * FROM events WHERE id = ?`, id);

    if (!event) {
      return NextResponse.json({ success: false, error: "Event not found" }, { status: 404 });
    }

    event.participants = JSON.parse(event.participants);
    return NextResponse.json({ success: true, event });
  } catch (error) {
    console.error("Failed to get event:", error);
    return NextResponse.json({ success: false, error: "Failed to get event" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string | string[] } }) {
  try {
    const id = extractId(params);
    const data = await req.json();
    const db = await openDB();

    await db.run(
      `UPDATE events SET
        name = ?,
        email = ?,
        eventType = ?,
        participants = ?,
        eventDate = ?,
        description = ?
      WHERE id = ?`,
      data.name,
      data.email,
      data.eventType,
      JSON.stringify(data.participants),
      data.eventDate,
      data.description,
      id
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update event:", error);
    return NextResponse.json({ success: false, error: "Failed to update event" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string | string[] } }) {
  try {
    const id = extractId(params);
    const db = await openDB();
    await db.run(`DELETE FROM events WHERE id = ?`, id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json({ success: false, error: "Failed to delete event" }, { status: 500 });
  }
}
