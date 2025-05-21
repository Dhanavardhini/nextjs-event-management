import { NextResponse } from "next/server";
import { openDB } from "@/app/lib/sqlite";

export async function GET() {
  try {
    const db = await openDB();
    await db.exec(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        eventType TEXT NOT NULL,
        participants TEXT NOT NULL,
        eventDate TEXT NOT NULL,
        description TEXT
      )
    `);

    const events = await db.all(`SELECT * FROM events ORDER BY id DESC`);

    // Parse participants from JSON string to array before sending back (optional but recommended)
    const parsedEvents = events.map((e) => ({
      ...e,
      participants: JSON.parse(e.participants),
    }));

    return NextResponse.json({ success: true, events: parsedEvents });
  } catch (error) {
    console.error("Failed to load events:", error);
    return NextResponse.json({ success: false, error: "Failed to load events" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const db = await openDB();

    await db.run(
      `INSERT INTO events (name, email, eventType, participants, eventDate, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      data.name,
      data.email,
      data.eventType,
      JSON.stringify(data.participants),
      data.eventDate,
      data.description
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to insert event:", error);
    return NextResponse.json({ success: false, error: "Failed to insert event" }, { status: 500 });
  }
}
