export function dateToString(date: Date) {
	return `${date.getFullYear()}-${("0" + (date.getMonth()+1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
}

export function stringToDate(dateString: string) {
	const y = Number(dateString.split("-")[0]);
	const m = Number(dateString.split("-")[1]);
	const d = Number(dateString.split("-")[2]);
	return new Date(y, m-1, d);
}

export function dateOffset(dateString: string, offset: number) {
	const date = stringToDate(dateString);
	date.setDate(date.getDate() + offset);
	return dateToString(date);
}

export function listDates(startDate: string, endDate: string) {
	const days: string[] = [];
	const date = stringToDate(startDate);
	while (dateToString(date) != endDate && days.length < 10000) {
		days.push(dateToString(date));
		date.setDate(date.getDate() + 1);
	}
	return days;
}

export function generateCalendar(startYear: number, endYear: number) {
	const days = listDates(`${startYear}-01-01`, `${endYear}-01-01`);
	const cal: Map<string, Map<string, string[]>> = new Map();
	for (const day of days) {
		const y = day.split("-")[0];
		const m = day.split("-")[1];
		const d = day.split("-")[2];
		cal.set(y, (cal.get(y) || new Map()).set(m, [...cal.get(y)?.get(m) || [], d]));
	}
	return cal;
}
