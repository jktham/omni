import styles from "@/styles/calendar.module.css";

function dateToString(date: Date) {
	return `${date.getFullYear()}-${("0" + (date.getMonth()+1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
}

export default function Calendar() {
	let now = new Date();
	let currentYear = now.getFullYear();

	let days: string[] = [];
	let date = new Date(currentYear-4, 0);
	while (date.getFullYear() <= currentYear) {
		days.push(dateToString(date));
		date.setDate(date.getDate() + 1);
	}

	let cal: Map<string, Map<string, string[]>> = new Map();
	for (let day of days) {
		let y = day.split("-")[0];
		let m = day.split("-")[1];
		let d = day.split("-")[2];
		cal.set(y, (cal.get(y) || new Map()).set(m, [...cal.get(y)?.get(m) || [], d]));
	}

	return (
		<div className={styles.calendar}>
			{Array.from(cal).map(([y, months]) => 
				<div className={styles.year} key={`${y}`}>
					{Array.from(months).map(([m, days]) =>
						<div className={styles.month} key={`${y}-${m}`}>
							{days.map((d) =>
								<div className={styles.day} key={`${y}-${m}-${d}`} onClick={() => console.log(`${y}-${m}-${d}`)}>
									{dateToString(now) == `${y}-${m}-${d}` ? `${d}` : ""}
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
