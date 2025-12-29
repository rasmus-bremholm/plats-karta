import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

interface NavLinkProps {
	href: string;
	icon: React.ReactNode;
	label: string;
}

export default function NavLink({ href, icon, label }: NavLinkProps) {
	return (
		<ListItem disablePadding>
			<ListItemButton component={Link} href={href}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={label} />
			</ListItemButton>
		</ListItem>
	);
}
