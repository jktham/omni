import styles from "@/styles/calendar.module.css";
import { Data, getLocalData } from "@/utils/dataUtils";
import { dateToString, generateCalendar } from "@/utils/dateUtils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const colorScheme = ["#00000000", "#005ae0", "#00b4dd", "#ffa10a", "#ff600a", "#f50062"];

export default function Calendar() {
	const year = new Date().getUTCFullYear();
	const cal = generateCalendar(year-3, year);

	const [data, setData] = useState<Data>();
	const [date, setDate] = useState<string>("2001-01-01");

	const activeDay = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		setData(getLocalData());
		setDate(dateToString(new Date()));
	}, []);

	useEffect(() => {
		if (activeDay.current) activeDay.current.scrollIntoView({block: "start", behavior: "smooth"});
	});

	return (
		<div className={styles.calendar}>
			{Array.from(cal).reverse().map(([y, months]) => 
				<div className={styles.year} key={`${y}`}>
					<div className={styles.yearTitle}>
						{y}
					</div>
					<div className={styles.months}>
						{Array.from(months).map(([m, days]) =>
							<div className={styles.month} key={`${y}-${m}`}>
								<div className={styles.monthTitle}>
									{m}
								</div>
								<div className={styles.days}>
									{days.map((d) =>
										<Link className={`${styles.day} ${date == `${y}-${m}-${d}` ? styles.active : ""}`} style={{backgroundColor: `${colorScheme[data?.get(`${y}-${m}-${d}`)?.rating || 0] || "#00000000"}`}} key={`${y}-${m}-${d}`} href={`/edit/${y}-${m}-${d}`} ref={date == `${y}-${m}-${d}` ? activeDay : undefined}>
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
	);
}
