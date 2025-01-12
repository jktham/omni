import { useLoaderData } from "react-router";
import Navbar from "~/components/navbar";
import Week from "~/components/week";
import "~/styles/page.css";
import "~/styles/home.css";
import { type Data, getLocalData } from "~/lib/data";
import { dateOffset, dateToString, stringToDate } from "~/lib/date";
import { getDefaultTheme, getLocalTheme } from "~/lib/theme";
import type { Route } from "./+types";

type LoaderData = {
	date: string;
	data: Data;
	theme: string[];
}

export async function loader({params}: Route.LoaderArgs): Promise<LoaderData> {
	return {
		date: "2000-01-01",
		data: new Map(),
		theme: getDefaultTheme(),
	};
}

clientLoader.hydrate = true as const;
export async function clientLoader({params}: Route.ClientLoaderArgs): Promise<LoaderData> {
	return {
		date: dateToString(new Date()),
		data: getLocalData(),
		theme: getLocalTheme(),
	};
}

export default function Page() {
	const {date, data, theme} = useLoaderData<LoaderData>();

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
				</div>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
