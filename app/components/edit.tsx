import styles from "~/styles/edit.module.css";
import { deleteLocalEntry, getLocalEntry, setLocalEntry } from "~/lib/dataUtils";
import { dateOffset } from "~/lib/dateUtils";
import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";
import { getDefaultTheme, getLocalTheme } from "~/lib/themeUtils";

export default function Edit({date}: {date: string}) {
	const [rating, setRating] = useState<number>(0);
	const [notes, setNotes] = useState<string>("");
	const [shouldSave, setShouldSave] = useState<boolean>(false);
	const [theme, setTheme] = useState<string[]>(getDefaultTheme());

	useEffect(() => {
		if (!shouldSave) {
			return;
		}
		setShouldSave(false);

		if (rating == 0 && notes == "") {
			deleteLocalEntry(date);
		} else {
			setLocalEntry(date, {rating: rating, notes: notes});
		}

		return () => {
			setShouldSave(false);
		}
	}, [date, shouldSave, notes, rating]);

	useEffect(() => {
		const entry = getLocalEntry(date) || {rating: 0, notes: ""};
		setRating(entry.rating);
		setNotes(entry.notes);
	}, [date]);

	useEffect(() => {
		setTheme(getLocalTheme());
	}, []);

	return (
		<div className={styles.edit}>
			<div className={"titleBar"}>
				<Link className={"titleLink"} to={`/edit/${dateOffset(date, -1)}`} prefetch="render">
					<span className="material-symbols-outlined">arrow_back_ios</span>
				</Link>
				<div className={"title"}>
					{date}
				</div>
				<Link className={"titleLink"} to={`/edit/${dateOffset(date, 1)}`} prefetch="render">
					<span className="material-symbols-outlined">arrow_forward_ios</span>
				</Link>
			</div>
			<div className={styles.entry}>
				<div className={styles.rating}>
					<button className={clsx(styles.rateButton, rating == 1 && styles.active)} style={rating == 1 ? {backgroundColor: theme[0]} : {}} onClick={() => {rating == 1 ? setRating(0) : setRating(1); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_very_dissatisfied</span></button>
					<button className={clsx(styles.rateButton, rating == 2 && styles.active)} style={rating == 2 ? {backgroundColor: theme[1]} : {}} onClick={() => {rating == 2 ? setRating(0) : setRating(2); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_dissatisfied</span></button>
					<button className={clsx(styles.rateButton, rating == 3 && styles.active)} style={rating == 3 ? {backgroundColor: theme[2]} : {}} onClick={() => {rating == 3 ? setRating(0) : setRating(3); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_neutral</span></button>
					<button className={clsx(styles.rateButton, rating == 4 && styles.active)} style={rating == 4 ? {backgroundColor: theme[3]} : {}} onClick={() => {rating == 4 ? setRating(0) : setRating(4); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_satisfied</span></button>
					<button className={clsx(styles.rateButton, rating == 5 && styles.active)} style={rating == 5 ? {backgroundColor: theme[4]} : {}} onClick={() => {rating == 5 ? setRating(0) : setRating(5); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_very_satisfied</span></button>
				</div>
				<textarea className={styles.notes} value={notes} placeholder="notes" onChange={(e) => {setNotes(e.target.value); setShouldSave(true);}}/>
				<div className={styles.buttons}>
					<button className={"btn"} onClick={() => {deleteLocalEntry(date); setRating(0); setNotes("");}}>Delete</button>
					<button className={"btn"} onClick={() => setLocalEntry(date, {rating: rating, notes: notes})}>Save</button>
				</div>
			</div>
		</div>
	);
}
