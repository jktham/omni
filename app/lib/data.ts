import { dateOffset, dateToString, listDates } from "~/lib/date";

export type Tag = {
	name: string;
	value: number | null;
}

export type Entry = {
	mood: number;
	notes: string;
	tags: Tag[];
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
		localStorage.removeItem("highlights");
	}
}

export function setLocalDataDemo() {
	if (confirm("overwrite local data with demo?")) {
		const demoData: Data = new Map();

		const today = dateToString(new Date());
		const dates = listDates(dateOffset(today, -365 * 4), dateOffset(today, 1));

		for (const date of dates) {
			const entry: Entry = {
				mood: Math.floor(Math.random() * 6),
				notes: "asdf",
				tags: [{
					name: "a",
					value: Math.floor(Math.random() * 10) + 1,
				}],
			}
			if (Math.random() > 0.8) {
				entry.tags.push({
					name: "b",
					value: null,
				})
			}
			if (Math.random() > 0.5) {
				entry.tags.push({
					name: "c",
					value: Math.round(Math.random()*100)/100,
				})
			}
			if (Math.random() > 0.01) demoData.set(date, entry);
		}

		localStorage.setItem("data", JSON.stringify(Array.from(demoData.entries())));

		let highlights = [
			"avg mood past week: $avgMood(7, 0)",
			"avg mood prev week: $avgMood(7, 7)",
			`avg a past month: $avgTag(a, 31, 0)`,
			`days since b: $daysSinceTag(b)`,
			`total c all time: $totalTag(c, 10000, 0)`,
			`days with c past year: $daysWithTag(c, 365, 0)`,
		];
		setLocalHighlights(highlights);
	}
}

export function tagsToString(tags: Tag[]) {
	const str = tags.map((tag) => tag.value != null ? `${tag.name}: ${tag.value}` : `${tag.name}`).join(", ");
	return str;
}

export function stringToTags(str: string) {
	const tags: Tag[] = str.split(",").map((t) => {
		const split = t.trim().split(":").map((t) => t.trim());

		const tag: Tag = {
			name: split[0],
			value: Number(split[1]),
		}
		if (split[1] == "" || Number.isNaN(tag.value)) {
			tag.value = null;
		}
		return tag;
	});
	return tags.filter((t) => t.name != "");
}

export function getLocalHighlights() {
	const raw = localStorage.getItem("highlights") || "[]";
	const highlights: string[] = JSON.parse(raw);
	return highlights;
}

export function setLocalHighlights(highlights: string[]) {
	localStorage.setItem("highlights", JSON.stringify(highlights));
}