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
