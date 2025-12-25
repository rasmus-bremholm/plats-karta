"use server";

import db from "@/app/lib/database/db";
import { Seat } from "@/app/lib/types/SeatType";
import { revalidatePath } from "next/cache";

export async function getAllSeats(): Promise<Seat[]> {
	const stmt = db.prepare("SELECT * FROM seats");
	return stmt.all() as Seat[];
}

export async function getSeatById(id: string): Promise<Seat | null> {
	const stmt = db.prepare("SELECT * FROM seats WHERE id = ?");
	return (stmt.get(id) as Seat) || null;
}

export async function createSeat(data: Omit<Seat, "id">) {
	const id = crypto.randomUUID();
	const stmt = db.prepare("INSERT INTO seats (id, label, x, y, width, height) VALUES (?,?,?,?,?,?)");

	stmt.run(id, data.label || null, data.x, data.y, data.width, data.height);
	revalidatePath("/");

	return { id, ...data };
}

export async function updateSeat(id: string, data: Partial<Omit<Seat, "id">>) {
	const fields = [];
	const values = [];

	if (data.label !== undefined) {
		fields.push("label = ?");
		values.push(data.label);
	}
	if (data.x !== undefined) {
		fields.push("x = ?");
		values.push(data.x);
	}
	if (data.y !== undefined) {
		fields.push("y = ?");
		values.push(data.y);
	}
	if (data.width !== undefined) {
		fields.push("width = ?");
		values.push(data.width);
	}
	if (data.height !== undefined) {
		fields.push("height = ?");
		values.push(data.height);
	}

	if (fields.length === 0) return;

	const stmt = db.prepare(`UPDATE seats SET ${fields.join(", ")} WHERE id = ?`);
	stmt.run(...values, id);
	revalidatePath("/");
}

export async function deleteSeat(id: string) {
	const stmt = db.prepare("DELETE FROM seats WHERE id = ?");
	stmt.run(id);
	revalidatePath("/");
}
