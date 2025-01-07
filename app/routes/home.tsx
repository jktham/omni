import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Home from "~/components/home";
import Navbar from "~/components/navbar";
import styles from "~/styles/page.module.css";

export const meta: MetaFunction = () => {
	return [
		{ title: "Omni" },
		{ name: "description", content: "" },
	];
};

export async function loader() {
	return "server " + new Date().getTime();
}

clientLoader.hydrate = true;
export async function clientLoader() {
	return "client " + new Date().getTime();
}

export default function Index() {
	const info = useLoaderData<string>();

	return (
		<div className={styles.page}>
			<main>
				{info}
				<Home></Home>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
