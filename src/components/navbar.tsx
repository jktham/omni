import styles from "@/styles/navbar.module.css";
import { SetStateAction } from "react";

export default function Navbar({page, setPage}: {page: string; setPage: React.Dispatch<SetStateAction<string>>}) {
	return (
		<nav className={styles.navbar}>
			<button className={page == "home" ? styles.active : ""} onClick={() => setPage("home")}>
				Home
			</button>
			<button className={page == "calendar" ? styles.active : ""} onClick={() => setPage("calendar")}>
				Calendar
			</button>
			<button className={page == "edit" ? styles.active : ""} onClick={() => setPage("edit")}>
				Edit
			</button>
			<button className={page == "stats" ? styles.active : ""} onClick={() => setPage("stats")}>
				Stats
			</button>
			<button className={page == "settings" ? styles.active : ""} onClick={() => setPage("settings")}>
				Settings
			</button>
		</nav>
	);
}
