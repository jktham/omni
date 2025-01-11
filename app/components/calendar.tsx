import { Link } from "react-router";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import type { Data } from "~/lib/data";
import { generateCalendar, stringToDate } from "~/lib/date";
import { getBrightness } from "~/lib/theme";
import "~/styles/calendar.css";

export default function Calendar({year, date, data, theme}: {year: number; date: string; data: Data, theme: string[]}) {
	const cal = generateCalendar(year, year+1);
	const currentDay = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (currentDay.current) currentDay.current.scrollIntoView({block: "start", behavior: "smooth"});
	}, [currentDay]);

	return (
		<div className="calendar">
			<div className="years">
				{Array.from(cal).map(([y, months]) => 
					<div className="year" key={y}>
						<div className="months">
							{Array.from(months).map(([m, days]) =>
								<div className="month" key={m}>
									<div className="monthTitle">
										{m}
									</div>
									<div className="days">
										{days[0] && [...Array((stringToDate(`${y}-${m}-${days[0]}`).getDay() + 6) % 7)].map((e, i) => <div className="daySpacer" key={i}></div>)}
										{days.map((d) => {
											const mood = data?.get(`${y}-${m}-${d}`)?.mood;
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
												<Link className={clsx("day", date == `${y}-${m}-${d}` && "current")} style={{backgroundColor: bg}} key={d} to={`/edit/${y}-${m}-${d}`} ref={date == `${y}-${m}-${d}` ? currentDay : undefined} prefetch="render" draggable={false}>
													<p style={{color: fg}}>{d}</p>
												</Link>
											)
										})}
									</div>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
