"use server";

import db from "@/app/lib/database/db";
import { Student } from "@/app/lib/types/StudentType";
import { revalidatePath } from "next/cache";

export async function getAllStudents(): Promise<Student[]> {
	const stmt = db.prepare("SELECT * FROM students ORDER BY name");
	const rows = stmt.all() as any[];

	// Parse JSON days array
	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		days: JSON.parse(row.days),
		startTime: row.start_time,
		endTime: row.end_time,
		seatId: row.seat_id,
	}));
}

export async function getStudentById(id: string): Promise<Student | null> {
	const stmt = db.prepare("SELECT * FROM students WHERE id = ?");
	const row = stmt.get(id) as any;

	if (!row) return null;

	return {
		id: row.id,
		name: row.name,
		days: JSON.parse(row.days),
		startTime: row.start_time,
		endTime: row.end_time,
		seatId: row.seat_id,
	};
}

export async function createStudent(data: Omit<Student, "id">) {
	const id = crypto.randomUUID();
	const stmt = db.prepare("INSERT INTO students (id, name, days, start_time, end_time, seat_id) VALUES (?, ?, ?, ?, ?, ?)");

	stmt.run(
		id,
		data.name,
		JSON.stringify(data.days), // Serialize array to JSON
		data.startTime,
		data.endTime,
		data.seatId || null
	);
	revalidatePath("/");
	revalidatePath("/dashboard");

	return { id, ...data };
}

export async function updateStudent(id: string, data: Partial<Omit<Student, "id">>) {
	const updates: string[] = [];
	const values: any[] = [];

	if (data.name !== undefined) {
		updates.push("name = ?");
		values.push(data.name);
	}
	if (data.days !== undefined) {
		updates.push("days = ?");
		values.push(JSON.stringify(data.days));
	}
	if (data.startTime !== undefined) {
		updates.push("start_time = ?");
		values.push(data.startTime);
	}
	if (data.endTime !== undefined) {
		updates.push("end_time = ?");
		values.push(data.endTime);
	}
	if (data.seatId !== undefined) {
		updates.push("seat_id = ?");
		values.push(data.seatId);
	}

	if (updates.length === 0) return;

	const stmt = db.prepare(`UPDATE students SET ${updates.join(", ")} WHERE id = ?`);
	stmt.run(...values, id);

	revalidatePath("/");
	revalidatePath("/dashboard");
}

export async function deleteStudent(id: string) {
	const stmt = db.prepare("DELETE FROM students WHERE id = ?");
	stmt.run(id);
	revalidatePath("/");
	revalidatePath("/dashboard");
}

export async function getStudentsWithSeats() {
	const stmt = db.prepare(`
		SELECT
			students.*,
			seats.label as seat_label,
			seats.x as seat_x,
			seats.y as seat_y
		FROM students
		LEFT JOIN seats ON students.seat_id = seats.id
		ORDER BY students.name
	`);

	const rows = stmt.all() as any[];

	// Parse JSON days and map snake_case to camelCase
	return rows.map((row) => ({
		id: row.id,
		name: row.name,
		days: JSON.parse(row.days),
		startTime: row.start_time,
		endTime: row.end_time,
		seatId: row.seat_id,
		seatLabel: row.seat_label,
		seatX: row.seat_x,
		seatY: row.seat_y,
	}));
}
