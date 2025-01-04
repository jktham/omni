import styles from "@/styles/edit.module.css";
import { getLocalEntry, setLocalEntry } from "@/utils/dataUtils";
import { dateOffset } from "@/utils/dateUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Edit({date}: {date: string}) {
	const [rating, setRating] = useState<number>(0);
	const [notes, setNotes] = useState<string>("");

	useEffect(() => {
		const entry = getLocalEntry(date) || {rating: 0, notes: ""};
		setRating(entry.rating);
		setNotes(entry.notes);
	}, [date]);

	return (
		<div className={styles.edit}>
			<div className={styles.titleBar}>
				<Link className={styles.prev} href={`/edit/${dateOffset(date, -1)}`}>
					Prev
				</Link>
				<div className={styles.title}>
					{date}
				</div>
				<Link className={styles.next} href={`/edit/${dateOffset(date, 1)}`}>
					Next
				</Link>
			</div>
			<div className={styles.entry}>
				<input type="number" className={styles.rating} value={rating} onChange={(e) => setRating(Number(e.target.value))} min={0} max={5}/>
				<input type="text" className={styles.notes} value={notes} onChange={(e) => setNotes(e.target.value)}/>
				<button className={styles.save} onClick={() => setLocalEntry(date, {rating: rating, notes: notes})}>
					Save
				</button>
			</div>
		</div>
	);
}
