"use client";
import { List, Divider } from "@mui/material";
import { HomeOutlined, BuildOutlined, AddCircleOutline } from "@mui/icons-material";
import NavLink from "./NavLink";

export default function Sidebar() {
	return (
		<List component='nav' sx={{ mt: 2, mx: 2 }}>
			<NavLink href='/' icon={<HomeOutlined />} label='Hem' />
			<Divider />
			<NavLink href='/' icon={<BuildOutlined />} label='Redigera' />
			<Divider />
			<NavLink href='/dashboard' icon={<AddCircleOutline />} label='Dashboard' />
		</List>
	);
}
