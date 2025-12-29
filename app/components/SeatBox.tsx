import type { Seat } from "../lib/types/SeatType";
import type { Student } from "../lib/types/StudentType";
import { Box, Typography } from "@mui/material";

interface SeatProps {
	seat: Seat;
	student?: Student;
}

export default function SeatBox({ seat, student }: SeatProps) {
	const isOccupied = !!student;

	return (
		<Box
			sx={{
				position: "absolute",
				left: seat.x,
				top: seat.y,
				width: seat.width,
				height: seat.height,
				border: "2px solid",
				borderRadius: 2,
				borderColor: (theme) => theme.palette.divider,
				backgroundColor: isOccupied ? (theme) => theme.palette.error.light : (theme) => theme.palette.success.light,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				cursor: "pointer",
				"&:hover": {
					opacity: 0.8,
					borderColor: (theme) => theme.palette.primary.main,
				},
			}}>
			<Typography variant='caption' fontWeight='bold'>
				{student?.name || "Ledig"}
			</Typography>
			{student && (
				<Typography variant='caption' fontSize={10}>
					{student.startTime}--{student.endTime}
				</Typography>
			)}
		</Box>
	);
}
