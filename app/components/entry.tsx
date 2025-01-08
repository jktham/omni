import clsx from "clsx";
import { useEffect, useState } from "react";
import { deleteLocalEntry, getLocalEntry, setLocalEntry } from "~/lib/data";
import { getDefaultTheme, getLocalTheme } from "~/lib/theme";
import "~/styles/entry.css";

export default function Entry({date}: {date: string}) {
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
		<div className="entry">
			<div className="rating">
				<button className={clsx("rateButton", rating == 1 && "active")} style={rating == 1 ? {backgroundColor: theme[0]} : {}} onClick={() => {rating == 1 ? setRating(0) : setRating(1); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_very_dissatisfied</span></button>
				<button className={clsx("rateButton", rating == 2 && "active")} style={rating == 2 ? {backgroundColor: theme[1]} : {}} onClick={() => {rating == 2 ? setRating(0) : setRating(2); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_dissatisfied</span></button>
				<button className={clsx("rateButton", rating == 3 && "active")} style={rating == 3 ? {backgroundColor: theme[2]} : {}} onClick={() => {rating == 3 ? setRating(0) : setRating(3); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_neutral</span></button>
				<button className={clsx("rateButton", rating == 4 && "active")} style={rating == 4 ? {backgroundColor: theme[3]} : {}} onClick={() => {rating == 4 ? setRating(0) : setRating(4); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_satisfied</span></button>
				<button className={clsx("rateButton", rating == 5 && "active")} style={rating == 5 ? {backgroundColor: theme[4]} : {}} onClick={() => {rating == 5 ? setRating(0) : setRating(5); setShouldSave(true);}}><span className="material-symbols-outlined">sentiment_very_satisfied</span></button>
			</div>
			<textarea className="notes" value={notes} placeholder="notes" onChange={(e) => {setNotes(e.target.value); setShouldSave(true);}}/>
			<div className="buttons">
				<button className="btn" onClick={() => {deleteLocalEntry(date); setRating(0); setNotes("");}}>Delete</button>
				<button className="btn" onClick={() => setLocalEntry(date, {rating: rating, notes: notes})}>Save</button>
			</div>
		</div>
	);
}
