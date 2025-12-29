import type { Seat } from "../lib/types/SeatType";
import type { Student } from "../lib/types/StudentType";
import { Box, Typography } from "@mui/material";

interface SeatProps {
	seat: Seat;
	student?: Student;
}

export default function SeatBox({ seat, student }: SeatProps) {
	const isOccupied = !!student;

	return <Box>Hej</Box>;
}
