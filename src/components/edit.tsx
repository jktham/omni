import styles from "@/styles/edit.module.css";
import { dateOffset, dateToString } from "@/utils/dateUtils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Edit() {
	const searchParams = useSearchParams();
	const date = searchParams.get("date") || dateToString(new Date());

	return (
		<div className={styles.edit}>
			<div className={styles.titleBar}>
				<Link className={styles.prev} href={`/edit?date=${dateOffset(date, -1)}`}>
					Prev
				</Link>
				<div className={styles.title}>
					{date}
				</div>
				<Link className={styles.next} href={`/edit?date=${dateOffset(date, 1)}`}>
					Next
				</Link>
			</div>
		</div>
	);
}
