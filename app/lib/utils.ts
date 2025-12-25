export function timeToSliderValue(timeString: string): number {
	const [hours] = timeString.split(":");
	return parseInt(hours);
}

export function sliderValueToTime(value: number): string {
	return `${value.toString().padStart(2, "0")}:00`;
}

export function timeToMinutes(timeString: string): number {
	const [hours, minutes] = timeString.split(":").map(Number);
	const totalMinutes = hours * 60 + minutes;
	return totalMinutes - 8 * 60; // Offset from 08:00
}

export function minutesToTime(minutes: number): string {
	const totalMinutes = minutes + 8 * 60; // Add back the 08:00 offset
	const hours = Math.floor(totalMinutes / 60);
	const mins = totalMinutes % 60;
	return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

export function formatTimeLabel(value: number): string {
	return minutesToTime(value);
}

export function formatSliderLabel(value: number): string {
	return `${value.toString().padStart(2, "0")}:00`;
}
