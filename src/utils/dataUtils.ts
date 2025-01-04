export type Entry = {
	rating: number;
	notes: string;
};

export type Data = Map<string, Entry>;

export function getLocalData() {
	const raw = localStorage.getItem("data") || "[]";
	const data: Data = new Map(JSON.parse(raw));
	return data;
}

export function setLocalData(data: Data) {
	localStorage.setItem("data", JSON.stringify(Array.from(data.entries())));
}

export function getLocalEntry(date: string) {
	const data = getLocalData();
	const entry = data.get(date);
	return entry;
}

export function setLocalEntry(date: string, entry: Entry) {
	const data = getLocalData();
	data.set(date, entry);
	setLocalData(data);
}

export function deleteLocalEntry(date: string) {
	const data = getLocalData();
	data.delete(date);
	setLocalData(data);
}
