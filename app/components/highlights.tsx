import { use, useEffect, useState } from "react";
import { setLocalHighlights, type Data } from "~/lib/data";
import { dateOffset } from "~/lib/date";
import "~/styles/highlights.css";

function getDefaultHighlights(data: Data) {
	return [
		"log: $log('abc')",
		"today: $date()",
		"avg mood past week: $avgMood(7, 0)",
		"avg mood prev week: $avgMood(7, 7)",
		"avg mood past month: $avgMood(31, 0)",
		"avg mood prev month: $avgMood(31, 31)",
		"avg mood past year: $avgMood(365, 0)",
		"avg mood prev year: $avgMood(365, 365)",
		"avg mood all time: $avgMood(10000, 0)",
	];
}

function parseHighlight(data: Data, date: string, h: string) {
	const macros = {
		log(s: string) {
			console.log(s);
			return s;
		},
		date() {
			return date;
		},
		avgMood(days: number, offset: number) {
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
		avgTag(tag: string, days: number, offset: number)  {
			return tag;
		},
		daysSinceTag(tag: string)  {
			return tag;
		},
	}

	let matches = h.matchAll(/\$([\w\.]*\((?:[\w"'-\.]*(?:,\s)?)*\))/gm);
	for (let m of matches) {
		try {
			h = h.replaceAll(m[0], eval("macros." + m[1])); // funny eval
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
			<button className="btn" onClick={(e) => setEditMode(!editMode)}>Edit</button>
		</div>
	);
}
