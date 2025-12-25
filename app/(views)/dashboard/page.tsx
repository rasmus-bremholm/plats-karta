import { getAllStudents } from "@/app/actions/studentActions";
import DashboardClient from "@/app/components/DashboardClient";

export default async function Dashboard() {
	const students = await getAllStudents();

	return <DashboardClient students={students} />;
}
