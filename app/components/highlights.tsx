import { use, useEffect, useState } from "react";
import { setLocalHighlights, type Data } from "~/lib/data";
import { dateOffset } from "~/lib/date";
import "~/styles/highlights.css";

function getDefaultHighlights(data: Data) {
	let highlights = [
		"log: $log(test)",
		"today: $date()",
		"avg mood past week: $avgMood(7, 0)",
		"avg mood prev week: $avgMood(7, 7)",
		"avg mood past month: $avgMood(31, 0)",
		"avg mood prev month: $avgMood(31, 31)",
		"avg mood past year: $avgMood(365, 0)",
		"avg mood prev year: $avgMood(365, 365)",
		"avg mood all time: $avgMood(10000, 0)",
		"days since mood 1: $daysSinceMood(1)",
		"days since mood 2: $daysSinceMood(2)",
		"days since mood 3: $daysSinceMood(3)",
		"days since mood 4: $daysSinceMood(4)",
		"days since mood 5: $daysSinceMood(5)",
	];

	for (let m of [1, 2, 3, 4, 5]) {
		highlights = highlights.concat([
			`days with mood ${m} past week: $daysWithMood(${m}, 7, 0)`,
			`days with mood ${m} prev week: $daysWithMood(${m}, 7, 7)`,
			`days with mood ${m} past month: $daysWithMood(${m}, 31, 0)`,
			`days with mood ${m} prev month: $daysWithMood(${m}, 31, 31)`,
			`days with mood ${m} past year: $daysWithMood(${m}, 365, 0)`,
			`days with mood ${m} prev year: $daysWithMood(${m}, 365, 365)`,
			`days with mood ${m} all time: $daysWithMood(${m}, 10000, 0)`,
		]);
	}

	let tags: string[] = [];
	for (let [d, e] of data.entries()) {
		tags = [...new Set([...tags, ...e.tags.map((t) => t.name)])].sort();
	}
	for (let t of tags) {
		highlights = highlights.concat([
			`days since ${t}: $daysSinceTag(${t})`,
			`avg ${t} past week: $avgTag(${t}, 7, 0)`,
			`avg ${t} prev week: $avgTag(${t}, 7, 7)`,
			`avg ${t} past month: $avgTag(${t}, 31, 0)`,
			`avg ${t} prev month: $avgTag(${t}, 31, 31)`,
			`avg ${t} past year: $avgTag(${t}, 365, 0)`,
			`avg ${t} prev year: $avgTag(${t}, 365, 365)`,
			`avg ${t} all time: $avgTag(${t}, 10000, 0)`,
			`total ${t} past week: $totalTag(${t}, 7, 0)`,
			`total ${t} prev week: $totalTag(${t}, 7, 7)`,
			`total ${t} past month: $totalTag(${t}, 31, 0)`,
			`total ${t} prev month: $totalTag(${t}, 31, 31)`,
			`total ${t} past year: $totalTag(${t}, 365, 0)`,
			`total ${t} prev year: $totalTag(${t}, 365, 365)`,
			`total ${t} all time: $totalTag(${t}, 10000, 0)`,
			`days with ${t} past week: $daysWithTag(${t}, 7, 0)`,
			`days with ${t} prev week: $daysWithTag(${t}, 7, 7)`,
			`days with ${t} past month: $daysWithTag(${t}, 31, 0)`,
			`days with ${t} prev month: $daysWithTag(${t}, 31, 31)`,
			`days with ${t} past year: $daysWithTag(${t}, 365, 0)`,
			`days with ${t} prev year: $daysWithTag(${t}, 365, 365)`,
			`days with ${t} all time: $daysWithTag(${t}, 10000, 0)`,
		]);
	}

	return highlights;
}

// todo: slow
function parseHighlight(data: Data, date: string, h: string) {
	const macros: { [index: string]: Function } = {
		log: function (s: string) {
			console.log(s);
			return s;
		},
		date: function () {
			return date;
		},
		avgMood: function (days: number, offset: number) {
			let sum = 0;
			let count = 0;
			for (let i=0; i<days; i++) {
				const m = data.get(dateOffset(date, -i - offset))?.mood || 0;
				if (m != 0) {
					count += 1;
					sum += m;
				}
			}
			let avg = sum / count || 0;
			return Math.round(avg*100)/100;
		},
		daysSinceMood: function (mood: number)  {
			for (let i=0; i<10000; i++) {
				const m = data.get(dateOffset(date, -i))?.mood || 0;
				if (m == mood) {
					return i;
				}
			}
			return -1;
		},
		daysWithMood: function (mood: number, days: number, offset: number)  {
			let sum = 0;
			for (let i=0; i<days; i++) {
				const m = data.get(dateOffset(date, -i - offset))?.mood || 0;
				if (m == mood) {
					sum += 1;
				}
			}
			return sum;
		},
		avgTag: function (tag: string, days: number, offset: number)  {
			let sum = 0;
			for (let i=0; i<days; i++) {
				const t = data.get(dateOffset(date, -i - offset))?.tags.find((t) => t.name == tag);
				if (t) {
					sum += t.value || 1;
				}
			}
			let avg = sum / days || 0;
			return Math.round(avg*100)/100;
		},
		totalTag: function (tag: string, days: number, offset: number)  {
			let sum = 0;
			for (let i=0; i<days; i++) {
				const t = data.get(dateOffset(date, -i - offset))?.tags.find((t) => t.name == tag);
				if (t) {
					sum += t.value || 1;
				}
			}
			let avg = sum || 0;
			return Math.round(avg*100)/100;
		},
		daysSinceTag: function (tag: string)  {
			for (let i=0; i<10000; i++) {
				const t = data.get(dateOffset(date, -i))?.tags.find((t) => t.name == tag);
				if (t) {
					return i;
				}
			}
			return -1;
		},
		daysWithTag: function (tag: string, days: number, offset: number)  {
			let sum = 0;
			for (let i=0; i<days; i++) {
				const t = data.get(dateOffset(date, -i - offset))?.tags.find((t) => t.name == tag);
				if (t) {
					sum += 1;
				}
			}
			return sum;
		},
	}

	let matches = h.matchAll(/\$([\w\.]*)\(([\w"'-\.]*)(?:,\s)?([\w"'-\.]*)(?:,\s)?([\w"'-\.]*)(?:,\s)?\)/gm);
	for (let m of matches) {
		try {
			h = h.replaceAll(m[0], macros[m[1]](m[2], m[3], m[4]));
		} catch(e) {
			console.log(e);
		}
	}

	return h;
}

export default function Highlights({date, data, highlights}: {date: string; data: Data, highlights: string[]}) {
	const [editMode, setEditMode] = useState<boolean>(false);
	const [currentHighlights, setCurrentHighlights] = useState<string[]>([...highlights]);
	const [shouldSave, setShouldSave] = useState<boolean>(false);
	
	let allHighlights = Array.from(new Set([...getDefaultHighlights(data), ...highlights]));

	useEffect(() => {
		setCurrentHighlights([...highlights]);
	}, [highlights]);

	useEffect(() => {
		if (!shouldSave) {
			return;
		}
		setShouldSave(false);
		
		setLocalHighlights(currentHighlights);
	}, [currentHighlights, shouldSave]);

	return (
		<div className="highlights">
			<div className="highlightsTitle">Highlights</div>
			<div className="highlightsList">
				{!editMode && currentHighlights.map((h, i) => <div className="highlight" key={i}>
					<span>{parseHighlight(data, date, h)}</span>
				</div>)}
				{editMode && allHighlights.map((h, i) => <div className="highlight" key={i}>
					<span>{parseHighlight(data, date, h)}</span>
					<input type="checkbox" defaultChecked={currentHighlights.includes(h)} onChange={(e) => {e.target.checked ? setCurrentHighlights([...currentHighlights, h]) : setCurrentHighlights(currentHighlights.filter((h2) => h !== h2)); setShouldSave(true);}}></input>
				</div>)}
			</div>
			<button className="btn" onClick={(e) => setEditMode(!editMode)}>{editMode ? "Done" : "Edit"}</button>
		</div>
	);
}
