import Settings from "~/components/settings";
import Navbar from "~/components/navbar";
import styles from "~/styles/page.module.css";

export default function Page() {
	return (
		<div className={styles.page}>
			<main>
				<Settings></Settings>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
