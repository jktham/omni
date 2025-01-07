import Edit from "~/components/edit";
import Navbar from "~/components/navbar";
import styles from "~/styles/page.module.css";
import { dateToString } from "~/lib/dateUtils";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";

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
		<div className={styles.page}>
			<main>
				<Edit date={date}></Edit>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
