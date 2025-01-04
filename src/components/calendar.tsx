import styles from "@/styles/calendar.module.css";
import { dateToString, generateCalendar } from "@/utils/dateUtils";

export default function Calendar() {
	const now = new Date();
	const currentYear = now.getFullYear();
	const cal = generateCalendar(currentYear-3, currentYear);

	return (
		<div className={styles.calendar}>
			{Array.from(cal).map(([y, months]) => 
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
										<a className={`${styles.day} ${dateToString(now) == `${y}-${m}-${d}` ? styles.active : ""}`} key={`${y}-${m}-${d}`} href={`/edit?date=${y}-${m}-${d}`}>
											{d}
										</a>
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
