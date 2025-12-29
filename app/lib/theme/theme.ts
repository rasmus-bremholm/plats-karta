"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#1976d2",
		},
		secondary: {
			main: "#dc004e",
		},
		error: {
			light: "#ffcdd2", // Override this for occupied seats
			main: "#f44336",
			dark: "#d32f2f",
		},
		success: {
			light: "#c8e6c9", // Override this for available seats
			main: "#4caf50",
			dark: "#388e3c",
		},
	},
	typography: {
		fontFamily: "var(--font-geist-sans)",
	},
});
