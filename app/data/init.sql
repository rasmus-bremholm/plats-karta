CREATE TABLE students (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  schedule TEXT NOT NULL,
  seat_id TEXT REFERENCES seats(id)
);

CREATE TABLE seats (
  id TEXT PRIMARY KEY,
  label TEXT,
  x INTEGER NOT NULL,
  y INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL
);
