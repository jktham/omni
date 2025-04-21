import { useLoaderData } from "react-router";
import Navbar from "~/components/navbar";
import Week from "~/components/week";
import "~/styles/page.css";
import "~/styles/home.css";
import { type Data, getLocalData, getLocalHighlights, setLocalDataDemo } from "~/lib/data";
import { dateOffset, dateToString, stringToDate } from "~/lib/date";
import { getDefaultTheme, getLocalTheme } from "~/lib/theme";
import type { Route } from "./+types";
import Highlights from "~/components/highlights";

type LoaderData = {
	date: string;
	data: Data;
	theme: string[];
	highlights: string[];
}

export async function loader({params}: Route.LoaderArgs): Promise<LoaderData> {
	return {
		date: "2000-01-01",
		data: new Map(),
		theme: getDefaultTheme(),
		highlights: [],
	};
}

clientLoader.hydrate = true as const;
export async function clientLoader({params}: Route.ClientLoaderArgs): Promise<LoaderData> {
	if (getLocalData().size == 0) {
		if (confirm("no local data, load demo?")) {
			setLocalDataDemo();
		}
	}
	return {
		date: dateToString(new Date()),
		data: getLocalData(),
		theme: getLocalTheme(),
		highlights: getLocalHighlights(),
	};
}

export default function Page() {
	const {date, data, theme, highlights} = useLoaderData<LoaderData>();

	let streak = 0;
	while (data.has(dateOffset(date, -streak-1))) {
		streak++;
	}
	if (data.has(date)) {
		streak++;
	}

	return (
		<div className="page">
			<div className="titleBar home">
				<div className="title">
					omni
				</div>
			</div>
			<main>
				<div className="home">
					<div className="info">
						<p className="date">{stringToDate(date).toLocaleDateString("en-US", {weekday: "long", day: "numeric", month: "long", year: "numeric"})}</p>
						<p className="streak">{Array.from(data.keys()).length} entries<br/>{streak} day streak</p>
					</div>
					<Week date={date} data={data} theme={theme}></Week>
					<Highlights date={date} data={data} highlights={highlights}></Highlights>
				</div>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
