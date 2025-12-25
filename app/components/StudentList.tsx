"use client";
import { useState } from "react";
import {
	Box,
	List,
	ListItem,
	ListItemText,
	IconButton,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Button,
	Icon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Student } from "@/app/lib/types/StudentType";
import { deleteStudent } from "@/app/actions/studentActions";

interface SutdentListProps {
	students: Student[];
	onEditStudent: (student: Student) => void;
}

export default function StudentList({ students, onEditStudent }: SutdentListProps) {
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

	const handleDeleteClick = (student: Student) => {
		setSelectedStudent(student);
		setDeleteDialogOpen(true);
	};

	const handleConfirm = async () => {
		if (selectedStudent) {
			await deleteStudent(selectedStudent.id);
			setDeleteDialogOpen(false);
			setSelectedStudent(null);
		}
	};

	const formatSchedule = (student: Student) => {
		const seatLabel = student.seatId ? `Plats ${student.seatId.slice(-2)}` : "Ingen plats";
		return `${seatLabel} ${student.startTime}-${student.endTime}`;
	};

	return (
		<>
			<Box>
				<List>
					{students.map((student) => (
						<ListItem
							key={student.id}
							secondaryAction={
								<>
									<IconButton edge='end' onClick={() => onEditStudent(student)}>
										<EditIcon />
									</IconButton>
									<IconButton edge='end' onClick={() => handleDeleteClick(student)}>
										<DeleteIcon />
									</IconButton>
								</>
							}>
							<Checkbox edge='start' />
							<ListItemText primary={student.name} secondary={formatSchedule(student)} />
						</ListItem>
					))}
				</List>
			</Box>

			{/* Delete Dialog */}
			<Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
				<DialogTitle>Radera Deltagare?</DialogTitle>
				<DialogContent>
					<DialogContentText>Är du säker på att du vill radera {selectedStudent?.name}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setDeleteDialogOpen(false)}>Avbryt</Button>
					<Button onClick={handleConfirm} color='error'>
						Radera
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
