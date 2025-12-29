"use client";
import { Box, Stack, Divider } from "@mui/material";
import { Home, Build, AddCircle } from "@mui/icons-material";
import Link from "next/link";

export default function Sidebar() {
	return (
		<Box component='nav' sx={{ mt: 2, mx: 2 }}>
			<Stack direction='row' sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", gap: "12px" }}>
				<Link href='/'>
					<Home /> Hem
				</Link>
				<Divider orientation='vertical' />
				<Link href='/'>
					<Build /> Edit
				</Link>
				<Link href='/dashboard'>
					<AddCircle /> Dashboard
				</Link>
			</Stack>
		</Box>
	);
}
