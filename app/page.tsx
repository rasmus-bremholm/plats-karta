import OfficeMap from "./components/OfficeMap";
import { getAllStudents } from "./actions/studentActions";
import { getAllSeats } from "./actions/seatActions";

export default async function Home() {
	const students = await getAllStudents();
	const seats = await getAllSeats();

	return <OfficeMap students={students} seats={seats} backgroundImage='' />;
}
