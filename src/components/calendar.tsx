import styles from "@/styles/calendar.module.css";

function range(start: number, end: number) {
	return [...Array(end-start+1).keys()].map((a) => start+a);
}

export default function Calendar() {
	return (
		<div className={styles.calendar}>
			{range(2022, 2025).map((y) => 
				<div className={styles.year} key={y*365}>
					{range(1, 12).map((m) =>
						<div className={styles.month} key={y*365+m*31}>
							{range(1, 31).map((d) =>
								<div className={styles.day} key={y*365+m*31+d}>
									{`${d}`}
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
