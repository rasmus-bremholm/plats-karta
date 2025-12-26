import db from "./db";

db.exec(`
  DELETE FROM students;
  DELETE FROM seats;
`);

const seats = [
	{ id: "seat-1", label: "Plats 1", room: "Matsalen", x: 50, y: 100, width: 100, height: 80 },
	{ id: "seat-2", label: "Plats 2", room: "Matsalen", x: 50, y: 200, width: 100, height: 80 },
	{ id: "seat-3", label: "Plats 1", room: "Rekonden", x: 200, y: 100, width: 100, height: 80 },
	{ id: "seat-4", label: "Plats 2", room: "Rekonden", x: 200, y: 200, width: 100, height: 80 },
	{ id: "seat-5", label: "Plats 3", room: "Rekonden", x: 350, y: 100, width: 100, height: 80 },
];

const insertSeat = db.prepare("INSERT INTO seats (id, label, room, x, y, width, height) VALUES (?, ?, ?, ?, ?, ?, ?)");

for (const seat of seats) {
	insertSeat.run(seat.id, seat.label, seat.room, seat.x, seat.y, seat.width, seat.height);
}

// Add some test students
const insertStudent = db.prepare("INSERT INTO students (id, name, days, start_time, end_time, seat_id) VALUES (?, ?, ?, ?, ?, ?)");

insertStudent.run(crypto.randomUUID(), "Lisa Bellow", JSON.stringify(["Mon", "Tue", "Wed"]), "09:00", "11:00", "seat-1");

insertStudent.run(crypto.randomUUID(), "Carl Anderson", JSON.stringify(["Mon", "Thu", "Fri"]), "09:00", "15:00", "seat-2");

console.log("✅ Database seeded!");
