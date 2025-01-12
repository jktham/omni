import { Link } from "react-router";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { Data } from "~/lib/data";
import { dateOffset, generateCalendar, stringToDate } from "~/lib/date";
import { getBrightness } from "~/lib/theme";
import "~/styles/week.css";

export default function Week({date, data, theme}: {date: string; data: Data, theme: string[]}) {
	const weekday = (stringToDate(date).getDay() + 6) % 7
	const currentWeek: string[] = [];
	for (let i=0; i<7; i++) {
		currentWeek.push(dateOffset(date, i-weekday));
	}

	return (
		<div className="week">
			<div className="days">
				{currentWeek.map((d) => {
					const mood = data?.get(d)?.mood;
					let bg = "";
					let fg = "";
					if (mood == undefined) {
						bg = "#00000000";
						fg = "#aaaaaa";
					} else if (mood == 0) {
						bg = "#00000000";
						fg = "#ffffff";
					} else {
						bg = theme[mood-1];
						fg = getBrightness(bg) > 0.7 ? "#000000" : "#ffffff";
					}
					return (
						<Link className={clsx("day", date == d && "current")} style={{backgroundColor: bg}} key={d} to={`/edit/${d}`} prefetch="render" draggable={false}>
							<p style={{color: fg}}>{d?.split("-")[2]}</p>
						</Link>
					)
				})}
			</div>
		</div>
	);
}
