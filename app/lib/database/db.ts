import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "students.db");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS seats (
    id TEXT PRIMARY KEY,
    label TEXT,
    location TEXT NOT NULL,
    room TEXT NOT NULL,
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    days TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    seat_id TEXT REFERENCES seats(id) ON DELETE SET NULL
  );
`);

console.log("Database created @:", dbPath);

export default db;
