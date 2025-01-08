import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs, Link, useLoaderData } from "@remix-run/react";
import Calendar from "~/components/calendar";
import Navbar from "~/components/navbar";
import { Data, getLocalData } from "~/lib/data";
import { dateToString } from "~/lib/date";
import { getDefaultTheme, getLocalTheme } from "~/lib/theme";
import "~/styles/page.css";

type LoaderData = {
	year: number;
	date: string;
	data: Data;
	theme: string[];
}

export async function loader({params}: LoaderFunctionArgs): Promise<LoaderData> {
	return {
		year: Number(params.year || new Date().getFullYear()),
		date: "2000-01-01",
		data: new Map(),
		theme: getDefaultTheme(),
	};
}

clientLoader.hydrate = true;
export async function clientLoader({params}: ClientLoaderFunctionArgs): Promise<LoaderData> {
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
				<Link className="titleLink" to={`/calendar/${year-1}`} prefetch="render">
					<span className="material-symbols-outlined">arrow_back_ios</span>
				</Link>
				<div className="title">
					{year}
				</div>
				<Link className="titleLink" to={`/calendar/${year+1}`} prefetch="render">
					<span className="material-symbols-outlined">arrow_forward_ios</span>
				</Link>
			</div>
			<main>
				<Calendar year={year} date={date} data={data} theme={theme}></Calendar>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
