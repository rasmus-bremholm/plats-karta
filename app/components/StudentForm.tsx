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
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Student } from "../lib/types/StudentType";
import { Seat } from "../lib/types/SeatType";
import { createStudent, getAllStudents, updateStudent } from "../actions/studentActions";
import { formatTimeLabel, timeToMinutes, minutesToTime } from "@/app/lib/utils";
import { getAllSeats } from "../actions/seatActions";

interface StudentFormProps {
	editingStudent: Student | null;
	onReset: () => void;
}

export default function StudentForm({ editingStudent, onReset }: StudentFormProps) {
	const [seats, setSeats] = useState<Seat[]>([]);
	const [students, setStudents] = useState<Student[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<string>("");
	const [selectedSeat, setSelectedSeat] = useState<string>("");
	const [name, setName] = useState("");
	const [days, setDays] = useState<string[]>([]);
	const [timeRange, setTimeRange] = useState<number[]>([0, 510]);

	const rooms = [...new Set(seats.map((s) => s.room))];

	const availableSeats = selectedRoom
		? seats.filter((seat) => {
				if (seat.room !== selectedRoom) return false;
				if (days.length === 0) return true;

				const hasConflict = students.some((student) => {
					if (student.seatId !== seat.id) return false;
					if (editingStudent && student.id === editingStudent.id) return false;

					const hasOverlappingDays = days.some((day) => student.days.includes(day));
					if (!hasOverlappingDays) return false;

					const selectedStart = minutesToTime(timeRange[0]);
					const selectedEnd = minutesToTime(timeRange[1]);
					const timesOverlap =
						// Change this to <= if it gets annoying...
						selectedStart < student.endTime && selectedEnd > student.startTime;
					return timesOverlap;
				});
				return !hasConflict;
		  })
		: [];

	useEffect(() => {
		getAllSeats().then(setSeats);
		getAllStudents().then(setStudents);
	}, []);

	useEffect(() => {
		if (editingStudent) {
			setName(editingStudent.name);
			setTimeRange([timeToMinutes(editingStudent.startTime), timeToMinutes(editingStudent.endTime)]);
			setDays(editingStudent.days);
		}

		if (editingStudent?.seatId) {
			const studentSeat = seats.find((s) => s.id === editingStudent.seatId);
			if (studentSeat) {
				setSelectedRoom(studentSeat.room);
				setSelectedSeat(editingStudent.seatId);
			}
		}
	}, [editingStudent, seats]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const studentData = {
			name,
			days,
			startTime: minutesToTime(timeRange[0]),
			endTime: minutesToTime(timeRange[1]),
			seatId: selectedSeat || null,
		};

		try {
			if (editingStudent) {
				await updateStudent(editingStudent.id, studentData);
			} else {
				await createStudent(studentData);
			}
			handleReset();
		} catch (error) {
			console.error("Failed to save student:", error);
		}
	};

	const handleReset = () => {
		setName("");
		setDays([]);
		setTimeRange([0, 510]);
		setSelectedRoom("");
		setSelectedSeat("");
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
		<Box id='form' component='form' autoComplete='off' onSubmit={handleSubmit} sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
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
				<FormControl fullWidth>
					<InputLabel>Rum</InputLabel>
					<Select
						value={selectedRoom}
						label='Rum'
						onChange={(e) => {
							setSelectedRoom(e.target.value);
							setSelectedSeat("");
						}}>
						<MenuItem value=''>
							<em>Välj rum</em>
						</MenuItem>
						{rooms.map((room) => (
							<MenuItem key={room} value={room}>
								{room}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>
			<Box>
				<FormControl fullWidth disabled={!selectedRoom}>
					<InputLabel>Plats</InputLabel>
					<Select value={selectedSeat} label='Plats' onChange={(e) => setSelectedSeat(e.target.value)}>
						<MenuItem value=''>
							<em>Ingen plats</em>
						</MenuItem>
						{availableSeats.map((seat) => (
							<MenuItem key={seat.id} value={seat.id}>
								{seat.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Box>

			<Box>
				<Button variant='contained' type='submit'>
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
