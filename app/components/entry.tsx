import clsx from "clsx";
import { useEffect, useState } from "react";
import { deleteLocalEntry, getLocalEntry, setLocalEntry, type Tag, type Entry, tagsToString, stringToTags } from "~/lib/data";
import { getDefaultTheme, getLocalTheme } from "~/lib/theme";
import "~/styles/entry.css";
import Icon from "./icon";

export default function Entry({date}: {date: string}) {
	const [mood, setMood] = useState<number>(0);
	const [notes, setNotes] = useState<string>("");
	const [tags, setTags] = useState<string>("");
	const [shouldSave, setShouldSave] = useState<boolean>(false);
	const [theme, setTheme] = useState<string[]>(getDefaultTheme());

	useEffect(() => {
		if (!shouldSave) {
			return;
		}
		setShouldSave(false);

		if (mood == 0 && notes == "" && tags == "") {
			deleteLocalEntry(date);
		} else {
			setLocalEntry(date, {mood: mood, notes: notes, tags: stringToTags(tags)});
		}

		return () => {
			setShouldSave(false);
		}
	}, [date, shouldSave, notes, mood, tags]);

	useEffect(() => {
		const entry: Entry = getLocalEntry(date) || {mood: 0, notes: "", tags: []};
		setMood(entry.mood);
		setNotes(entry.notes);
		setTags(tagsToString(entry.tags));
	}, [date]);

	useEffect(() => {
		setTheme(getLocalTheme());
	}, []);

	return (
		<div className="entry">
			<div className="moodSection">
				<button className={clsx("moodButton", mood == 1 && "active")} style={mood == 1 ? {backgroundColor: theme[0]} : {}} onClick={() => {mood == 1 ? setMood(0) : setMood(1); setShouldSave(true);}}><Icon>sentiment_very_dissatisfied</Icon></button>
				<button className={clsx("moodButton", mood == 2 && "active")} style={mood == 2 ? {backgroundColor: theme[1]} : {}} onClick={() => {mood == 2 ? setMood(0) : setMood(2); setShouldSave(true);}}><Icon>sentiment_dissatisfied</Icon></button>
				<button className={clsx("moodButton", mood == 3 && "active")} style={mood == 3 ? {backgroundColor: theme[2]} : {}} onClick={() => {mood == 3 ? setMood(0) : setMood(3); setShouldSave(true);}}><Icon>sentiment_neutral</Icon></button>
				<button className={clsx("moodButton", mood == 4 && "active")} style={mood == 4 ? {backgroundColor: theme[3]} : {}} onClick={() => {mood == 4 ? setMood(0) : setMood(4); setShouldSave(true);}}><Icon>sentiment_satisfied</Icon></button>
				<button className={clsx("moodButton", mood == 5 && "active")} style={mood == 5 ? {backgroundColor: theme[4]} : {}} onClick={() => {mood == 5 ? setMood(0) : setMood(5); setShouldSave(true);}}><Icon>sentiment_very_satisfied</Icon></button>
			</div>
			<textarea className="notes" value={notes} placeholder="notes" onChange={(e) => {setNotes(e.target.value); setShouldSave(true);}}/>
			<textarea className="tags" value={tags} placeholder="tags" onChange={(e) => {setTags(e.target.value); setShouldSave(true);}}/>
			<div className="buttons">
				<button className="btn" onClick={() => {if (confirm("delete entry?")) {deleteLocalEntry(date); setMood(0); setNotes(""); setTags("");}}}>Delete</button>
				{/* <button className="btn" onClick={() => setLocalEntry(date, {mood: mood, notes: notes, tags: stringToTags(tags)})}>Save</button> */}
			</div>
		</div>
	);
}
