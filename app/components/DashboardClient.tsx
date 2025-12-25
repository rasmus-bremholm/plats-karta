"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import { Student } from "../lib/types/StudentType";
import StudentList from "./StudentList";
import StudentForm from "./StudentForm";

interface DashboardClientProps {
	students: Student[];
}

export default function DashboardClient({ students }: DashboardClientProps) {
	const [editingStudent, setEditingStudent] = useState<Student | null>(null);

	const handleEditStudent = (student: Student) => {
		setEditingStudent(student);
	};

	const handleFormReset = () => {
		setEditingStudent(null);
	};

	return (
		<Box sx={{ display: "flex", mt: 2, gap: 4 }}>
			<Box id='studentList' sx={{ flex: "0 0 400px" }}>
				<StudentList students={students} onEditStudent={handleEditStudent} />
			</Box>
			<StudentForm editingStudent={editingStudent} onReset={handleFormReset} />
		</Box>
	);
}
