import { Box, Typography } from "@mui/material";
import Link from "next/link";

interface NavLinkProps {
	href: string;
	icon: React.ReactNode;
	label: string;
}

export default function NavLink({ href, icon, label }: NavLinkProps) {
	return (
		<Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
			<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
				{icon}
				<Typography>{label}</Typography>
			</Box>
		</Link>
	);
}
