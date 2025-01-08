import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs, Link, useLoaderData } from "@remix-run/react";
import Entry from "~/components/entry";
import Navbar from "~/components/navbar";
import { dateOffset, dateToString } from "~/lib/date";
import "~/styles/page.css";

type LoaderData = {
	date: string;
}

export async function loader({params}: LoaderFunctionArgs): Promise<LoaderData> {
	return {
		date: params.date || dateToString(new Date()),
	};
}

clientLoader.hydrate = true;
export async function clientLoader({params}: ClientLoaderFunctionArgs): Promise<LoaderData> {
	return {
		date: params.date || dateToString(new Date()),
	};
}

export default function Page() {
	const {date} = useLoaderData<LoaderData>();

	return (
		<div className="page">
			<div className="titleBar">
				<Link className="titleLink" to={`/edit/${dateOffset(date, -1)}`} prefetch="render">
					<span className="material-symbols-outlined">arrow_back_ios</span>
				</Link>
				<div className="title">
					{date}
				</div>
				<Link className="titleLink" to={`/edit/${dateOffset(date, 1)}`} prefetch="render">
					<span className="material-symbols-outlined">arrow_forward_ios</span>
				</Link>
			</div>
			<main>
				<Entry date={date}></Entry>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
