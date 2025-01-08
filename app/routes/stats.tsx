import Navbar from "~/components/navbar";
import "~/styles/page.css";
import "~/styles/stats.css";

export default function Page() {
	return (
		<div className="page">
			<div className="titleBar">
				<div className="title">
					Stats
				</div>
			</div>
			<main>
				<div className="stats">

				</div>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
