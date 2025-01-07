import Calendar from "~/components/calendar";
import Navbar from "~/components/navbar";
import styles from "~/styles/page.module.css";
import { Data, getLocalData } from "~/lib/dataUtils";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { dateToString } from "~/lib/dateUtils";
import { getDefaultTheme, getLocalTheme } from "~/lib/themeUtils";

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
		<div className={styles.page}>
			<main>
				<Calendar year={year} date={date} data={data} theme={theme}></Calendar>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
