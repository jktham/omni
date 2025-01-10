import { Link, useLoaderData } from "react-router";
import Calendar from "~/components/calendar";
import Navbar from "~/components/navbar";
import { type Data, getLocalData } from "~/lib/data";
import { dateToString } from "~/lib/date";
import { getDefaultTheme, getLocalTheme } from "~/lib/theme";
import "~/styles/page.css";
import type { Route } from "./+types/calendar";
import Icon from "~/components/icon";

type LoaderData = {
	year: number;
	date: string;
	data: Data;
	theme: string[];
}

export async function loader({params}: Route.LoaderArgs): Promise<LoaderData> {
	return {
		year: Number(params.year || new Date().getFullYear()),
		date: "2000-01-01",
		data: new Map(),
		theme: getDefaultTheme(),
	};
}

clientLoader.hydrate = true as const;
export async function clientLoader({params}: Route.ClientLoaderArgs): Promise<LoaderData> {
	return {
		year: Number(params.year || new Date().getFullYear()),
		date: dateToString(new Date()),
		data: getLocalData(),
		theme: getLocalTheme(),
	};
}

export default function Page() {
	const {year, date, data, theme} = useLoaderData<LoaderData>();
	
	return (
		<div className="page">
			<div className="titleBar">
				<Link className="titleLink" to={`/calendar/${year-1}`} prefetch="render" draggable={false}>
					<Icon>arrow_back_ios</Icon>
				</Link>
				<div className="title">
					{year}
				</div>
				<Link className="titleLink" to={`/calendar/${year+1}`} prefetch="render" draggable={false}>
					<Icon>arrow_forward_ios</Icon>
				</Link>
			</div>
			<main>
				<Calendar year={year} date={date} data={data} theme={theme}></Calendar>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
