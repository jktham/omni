import { useLoaderData } from "react-router";
import MoodGraph from "~/components/moodGraph";
import Navbar from "~/components/navbar";
import TagsGraph from "~/components/tagsGraph";
import { type Data, getLocalData } from "~/lib/data";
import { getDefaultTheme, getLocalTheme } from "~/lib/theme";
import "~/styles/page.css";
import "~/styles/stats.css";

type LoaderData = {
	data: Data;
	theme: string[];
}

export async function loader(): Promise<LoaderData> {
	return {
		data: new Map(),
		theme: getDefaultTheme(),
	};
}

clientLoader.hydrate = true as const;
export async function clientLoader(): Promise<LoaderData> {
	return {
		data: getLocalData(),
		theme: getLocalTheme(),
	};
}

export default function Page() {
	const {data, theme} = useLoaderData<LoaderData>();

	return (
		<div className="page">
			<div className="titleBar">
				<div className="title">
					Stats
				</div>
			</div>
			<main>
				<div className="stats">
					<MoodGraph data={data} theme={theme}></MoodGraph>
					<TagsGraph data={data} theme={theme}></TagsGraph>
				</div>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
