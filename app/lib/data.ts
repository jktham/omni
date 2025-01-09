import { dateOffset, dateToString, listDates } from "~/lib/date";

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

export function importLocalData() {
	const input = document.createElement('input');
	input.type = "file";
	input.accept = "application/json";
	input.style.display = "none";
	input.addEventListener("change", function() {
		const reader = new FileReader();
		reader.onload = function(e) {
			if (e?.target?.result && typeof e.target.result == "string") {
				const data: Data = new Map(JSON.parse(e.target.result));
				if (confirm("overwrite local data?")) {
					setLocalData(data)
				}
			}
		};
		if (this?.files?.[0]) reader.readAsText(this.files[0]);
	});

	document.body.appendChild(input);
	input.click();
}

export function exportLocalData() {
	const data: Data = getLocalData();
	const file = new Blob([JSON.stringify(Array.from(data.entries()))], {type: "application/json"});
	const a = document.createElement('a');
	a.style.display = "none";
	a.href = URL.createObjectURL(file);
	a.download = `omni_${dateToString(new Date())}.json`;
	document.body.appendChild(a);
	a.click();
}

export function deleteLocalData() {
	if (confirm("delete local data?")) {
		localStorage.removeItem("data");
	}
}

export function setLocalDataDemo() {
	if (confirm("overwrite local data?")) {
		const demoData: Data = new Map();

		const today = dateToString(new Date());
		const dates = listDates(dateOffset(today, -700), dateOffset(today, 1));

		for (const date of dates) {
			const entry: Entry = {
				rating: Math.floor(Math.random() * 6),
				notes: "asdf",
			}
			demoData.set(date, entry);
		}

		localStorage.setItem("data", JSON.stringify(Array.from(demoData.entries())));
	}
}
