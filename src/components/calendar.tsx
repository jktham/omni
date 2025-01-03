import styles from "@/styles/calendar.module.css";
import { dateToString } from "@/utils/dateUtils";

export default function Calendar() {
	const now = new Date();
	const currentYear = now.getFullYear();

	const days: string[] = [];
	const date = new Date(currentYear-4, 0);
	while (date.getFullYear() <= currentYear) {
		days.push(dateToString(date));
		date.setDate(date.getDate() + 1);
	}

	const cal: Map<string, Map<string, string[]>> = new Map();
	for (const day of days) {
		const y = day.split("-")[0];
		const m = day.split("-")[1];
		const d = day.split("-")[2];
		cal.set(y, (cal.get(y) || new Map()).set(m, [...cal.get(y)?.get(m) || [], d]));
	}

	return (
		<div className={styles.calendar}>
			{Array.from(cal).map(([y, months]) => 
				<div className={styles.year} key={`${y}`}>
					{Array.from(months).map(([m, days]) =>
						<div className={styles.month} key={`${y}-${m}`}>
							{days.map((d) =>
								<a className={`${styles.day} ${dateToString(now) == `${y}-${m}-${d}` ? styles.active : ""}`} key={`${y}-${m}-${d}`} href={`/edit?date=${y}-${m}-${d}`}>
									{d}
								</a>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
