import { useLoaderData } from "@remix-run/react";
import Navbar from "~/components/navbar";
import "~/styles/page.css";
import "~/styles/home.css";

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
		<div className="page">
			<div className="titleBar">
				<div className="title">
					Home
				</div>
			</div>
			<main>
				<div className="home">
					{info}
				</div>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
