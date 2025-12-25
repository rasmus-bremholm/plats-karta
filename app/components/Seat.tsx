import type { Seat } from "../lib/types/SeatType";

interface SeatProps {
	seat: Seat;
}

export default function Seat({ seat }: SeatProps) {
	return <div>Hej</div>;
}
