"use client";

import {
	Box,
	Typography,
	TextField,
	Button,
	ToggleButton,
	ToggleButtonGroup,
	Checkbox,
	Divider,
	Dialog,
	DialogActions,
	DialogTitle,
	Slider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Student } from "../lib/types/StudentType";
import { Seat } from "../lib/types/SeatType";
import { formatTimeLabel, timeToMinutes } from "@/app/lib/utils";
import { getAllSeats } from "../actions/seatActions";

interface StudentFormProps {
	editingStudent: Student | null;
	onReset: () => void;
}

export default function StudentForm({ editingStudent, onReset }: StudentFormProps) {
	const [seats, setSeats] = useState<Seat[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<string>("");
	const [selectedSeat, setSelectedSeats] = useState<string>("");
	const [name, setName] = useState("");
	const [days, setDays] = useState<string[]>([""]);
	const [timeRange, setTimeRange] = useState<number[]>([0, 510]);

	const rooms = [...new Set(seats.map((s) => s.room))];

	const avalibleSeats = selectedRoom ? seats.filter((s) => s.room === selectedRoom) : [];

	useEffect(() => {
		getAllSeats().then(setSeats);
	}, []);

	useEffect(() => {
		if (editingStudent) {
			setName(editingStudent.name);
			setTimeRange([timeToMinutes(editingStudent.startTime), timeToMinutes(editingStudent.endTime)]);
			setDays(editingStudent.days);
		}
	}, [editingStudent]);

	const handleReset = () => {
		setName("");
		setTimeRange([0, 510]);
		onReset();
	};

	const handleDays = (event: React.MouseEvent<HTMLElement>, newDays: string[]) => {
		setDays(newDays);
	};

	const timeMarks = [
		{ value: 0, label: "08:00" },
		{ value: 510, label: "16:30" },
	];

	return (
		<Box id='form' component='form' autoComplete='off' sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
			<Typography variant='h6'>{editingStudent ? "Redigera Deltagare" : "Ny Deltagare"}</Typography>
			<TextField label='Namn' required value={name} onChange={(e) => setName(e.target.value)} />
			<Box>
				<Typography id='time'>Schema: </Typography>
				<Slider
					aria-label='time'
					value={timeRange}
					onChange={(e, newValue) => setTimeRange(newValue as number[])}
					defaultValue={8}
					min={0}
					max={510}
					step={30}
					marks={timeMarks}
					valueLabelDisplay='auto'
					valueLabelFormat={formatTimeLabel}
					getAriaLabel={formatTimeLabel}
					sx={{ width: "50%" }}
				/>
			</Box>
			<Box>
				<ToggleButtonGroup value={days} onChange={handleDays}>
					<ToggleButton value='mon'>Mån</ToggleButton>
					<ToggleButton value='tue'>Tis</ToggleButton>
					<ToggleButton value='wed'>Ons</ToggleButton>
					<ToggleButton value='thu'>Tor</ToggleButton>
					<ToggleButton value='fri'>Fre</ToggleButton>
				</ToggleButtonGroup>
			</Box>

			<Box>
				<Button variant='outlined' type='submit'>
					Spara
				</Button>
				{editingStudent && (
					<Button variant='outlined' onClick={handleReset}>
						Avbryt
					</Button>
				)}
			</Box>
		</Box>
	);
}
