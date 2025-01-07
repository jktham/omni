import styles from "~/styles/calendar.module.css";
import { Data } from "~/lib/dataUtils";
import { generateCalendar, stringToDate } from "~/lib/dateUtils";
import { useEffect, useRef } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { colorScheme } from "~/lib/colorScheme";

export default function Calendar({year, date, data}: {year: number; date: string; data: Data}) {
	const cal = generateCalendar(year);
	const currentDay = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (currentDay.current) currentDay.current.scrollIntoView({block: "start", behavior: "smooth"});
	}, [currentDay]);

	return (
		<div className={styles.calendar}>
			<div className={"titleBar"}>
				<Link className={"titleLink"} to={`/calendar/${year-1}`} prefetch="render">
					<span className="material-symbols-outlined">arrow_back_ios</span>
				</Link>
				<div className={"title"}>
					{year}
				</div>
				<Link className={"titleLink"} to={`/calendar/${year+1}`} prefetch="render">
					<span className="material-symbols-outlined">arrow_forward_ios</span>
				</Link>
			</div>
			<div className={styles.years}>
				{Array.from(cal).map(([y, months]) => 
					<div className={styles.year} key={y}>
						<div className={styles.months}>
							{Array.from(months).map(([m, days]) =>
								<div className={styles.month} key={m}>
									<div className={styles.monthTitle}>
										{m}
									</div>
									<div className={styles.days}>
										{days[0] && [...Array((stringToDate(`${y}-${m}-${days[0]}`).getDay() + 6) % 7)].map((e, i) => <div className={styles.daySpacer} key={i}></div>)}
										{days.map((d) =>
											<Link className={clsx(styles.day, date == `${y}-${m}-${d}` && styles.current)} style={{backgroundColor: `${colorScheme[data?.get(`${y}-${m}-${d}`)?.rating || 0] || "#00000000"}`}} key={d} to={`/edit/${y}-${m}-${d}`} ref={date == `${y}-${m}-${d}` ? currentDay : undefined} prefetch="render">
												{d}
											</Link>
										)}
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
