"use client";

import { Box } from "@mui/material";
import SeatBox from "./SeatBox";
import { Seat } from "@/app/lib/types/SeatType";
import { Student } from "../lib/types/StudentType";

interface OfficeMapProps {
	seats: Seat[];
	students: Student[];
	backgroundImage: string;
}

export default function OfficeMap({ seats, students, backgroundImage }: OfficeMapProps) {
	const MAP_WIDTH = 1200;
	const MAP_HEIGHT = 800;

	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				overflow: "auto",
			}}>
			<Box
				sx={{
					position: "relative",
					width: MAP_WIDTH,
					height: MAP_HEIGHT,
					background: `url(${backgroundImage})`,
					backgroundSize: "cover",
					transform: "scale(min(1, min(100vw / " + MAP_WIDTH + "px, 100vh / " + MAP_HEIGHT + "px)))",
					transformOrigin: "center",
				}}>
				{seats.map((seat) => {
					const student = students.find((s) => s.seatId === seat.id);

					return <SeatBox key={seat.id} seat={seat} student={student} />;
				})}
			</Box>
		</Box>
	);
}
