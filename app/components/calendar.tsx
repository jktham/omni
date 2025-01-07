import styles from "~/styles/calendar.module.css";
import { Data } from "~/lib/dataUtils";
import { generateCalendar, stringToDate } from "~/lib/dateUtils";
import { useEffect, useRef } from "react";
import { Link } from "@remix-run/react";

const colorScheme = ["#00000000", "#005ae0", "#00b4dd", "#ffa10a", "#ff600a", "#f50062"];

export default function Calendar({year, date, data}: {year: number; date: string; data: Data}) {
	const cal = generateCalendar(year);
	const activeDay = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		if (activeDay.current) activeDay.current.scrollIntoView({block: "start", behavior: "smooth"});
	});

	return (
		<div className={styles.calendar}>
			<div className={styles.titleBar}>
				<Link className={styles.prev} to={`/calendar/${year-1}`}>
					<span className="material-symbols-outlined">arrow_back_ios</span>
				</Link>
				<div className={styles.title}>
					{year}
				</div>
				<Link className={styles.next} to={`/calendar/${year+1}`}>
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
											<Link className={`${styles.day} ${date == `${y}-${m}-${d}` ? styles.active : ""}`} style={{backgroundColor: `${colorScheme[data?.get(`${y}-${m}-${d}`)?.rating || 0] || "#00000000"}`}} key={`${y}-${m}-${d}`} to={`/edit/${y}-${m}-${d}`} ref={date == `${y}-${m}-${d}` ? activeDay : undefined}>
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
