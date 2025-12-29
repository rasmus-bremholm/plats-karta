"use client";
import { useState } from "react";
import Seat from "./components/SeatBox";

export default function Home() {
	const [roomImage, setRoomImage] = useState("/matsalen.svg");
	const seats = [
		{ id: "desk-1", x: 50, y: 280, width: 120 },
		{ id: "desk-2", x: 50, y: 420, width: 120 },
	];

	return (
		<div className='office-map' style={{ position: "relative" }}>
			{/* Room Image */}
			<img src={roomImage} alt='' />
			{/* Seats */}
			{seats.map((seat) => (
				<Seat
					key={seat.id}
					seat={seat}
					style={{ position: "absolute", left: seat.x, top: seat.y, width: seat.width, height: seat.width }}
					onClick={() => handleSeatClick(seat.id)}
				/>
			))}
		</div>
	);
}
