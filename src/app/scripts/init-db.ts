import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

const init = async () => {
  const dbPath = process.env.SQLITE_DB_PATH || path.join(process.cwd(), 'dev.db');
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  const existing = await db.get(`SELECT * FROM users WHERE email = ?`, ['demo@gmail.com']);

  if (!existing) {
    await db.run(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
      ['Demo User', 'demo@gmail.com', 'demo123']
    );
    console.log('Demo user created.');
  } else {
    console.log('Demo user already exists.');
  }


  await db.close();
};

init().catch((err) => {
  console.error('Failed to initialize DB:', err);
});
