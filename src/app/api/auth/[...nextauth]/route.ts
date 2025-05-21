import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { openDB } from "@/app/lib/sqlite";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";
const handler = NextAuth(authOptions);

export async function EventPost(req: Request) {
  const data = await req.json();

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

  const insert = await db.run(
    `INSERT INTO events (name, email, eventType, participants, eventDate, description)
     VALUES (?, ?, ?, ?, ?, ?)`,
    data.name,
    data.email,
    data.eventType,
    JSON.stringify(data.participants), 
    data.eventDate,
    data.description
  );

  return NextResponse.json({ success: true, id: insert.lastID });
}

export { handler as GET };
