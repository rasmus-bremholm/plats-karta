"use client";
import { Box, Stack, Divider } from "@mui/material";
import { HomeOutlined, BuildOutlined, AddCircleOutline } from "@mui/icons-material";
import NavLink from "./NavLink";

export default function Sidebar() {
	return (
		<Box component='nav' sx={{ mt: 2, mx: 2 }}>
			<Stack direction='column' spacing={2} divider={<Divider />}>
				<NavLink href='/' icon={<HomeOutlined />} label='Hem' />
				<NavLink href='/' icon={<BuildOutlined />} label='Redigera' />
				<NavLink href='/dashboard' icon={<AddCircleOutline />} label='Dashboard' />
			</Stack>
		</Box>
	);
}
