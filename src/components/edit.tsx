import styles from "@/styles/edit.module.css";
import { deleteLocalEntry, getLocalEntry, setLocalEntry } from "@/utils/dataUtils";
import { dateOffset } from "@/utils/dateUtils";
import Link from "next/link";
import { useEffect, useState } from "react";

const colorScheme = ["#00000000", "#005ae0", "#00b4dd", "#ffa10a", "#ff600a", "#f50062"];

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
					<span className="material-symbols-outlined">arrow_back_ios</span>
				</Link>
				<div className={styles.title}>
					{date}
				</div>
				<Link className={styles.next} href={`/edit/${dateOffset(date, 1)}`}>
					<span className="material-symbols-outlined">arrow_forward_ios</span>
				</Link>
			</div>
			<div className={styles.entry}>
				<div className={styles.rating}>
					<button className={`${styles.rateButton} ${rating == 1 ? styles.active : ""}`} style={rating == 1 ? {backgroundColor: colorScheme[1]} : {}} onClick={() => rating == 1 ? setRating(0) : setRating(1)}><span className="material-symbols-outlined">sentiment_very_dissatisfied</span></button>
					<button className={`${styles.rateButton} ${rating == 2 ? styles.active : ""}`} style={rating == 2 ? {backgroundColor: colorScheme[2]} : {}} onClick={() => rating == 2 ? setRating(0) : setRating(2)}><span className="material-symbols-outlined">sentiment_dissatisfied</span></button>
					<button className={`${styles.rateButton} ${rating == 3 ? styles.active : ""}`} style={rating == 3 ? {backgroundColor: colorScheme[3]} : {}} onClick={() => rating == 3 ? setRating(0) : setRating(3)}><span className="material-symbols-outlined">sentiment_neutral</span></button>
					<button className={`${styles.rateButton} ${rating == 4 ? styles.active : ""}`} style={rating == 4 ? {backgroundColor: colorScheme[4]} : {}} onClick={() => rating == 4 ? setRating(0) : setRating(4)}><span className="material-symbols-outlined">sentiment_satisfied</span></button>
					<button className={`${styles.rateButton} ${rating == 5 ? styles.active : ""}`} style={rating == 5 ? {backgroundColor: colorScheme[5]} : {}} onClick={() => rating == 5 ? setRating(0) : setRating(5)}><span className="material-symbols-outlined">sentiment_very_satisfied</span></button>
				</div>
				<textarea className={styles.notes} value={notes} placeholder="notes" onChange={(e) => setNotes(e.target.value)}/>
				<div className={styles.buttons}>
					<button className={styles.delete} onClick={() => {deleteLocalEntry(date); setRating(0); setNotes("")}}>Clear</button>
					<button className={styles.save} onClick={() => setLocalEntry(date, {rating: rating, notes: notes})}>Save</button>
				</div>
			</div>
		</div>
	);
}
