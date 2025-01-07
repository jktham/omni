import styles from "~/styles/navbar.module.css";
import { Link, useLocation } from "@remix-run/react";

export default function Navbar() {
	const location = useLocation();
	const path = location.pathname.split("/")[1];

	return (
		<nav className={styles.navbar}>
			<Link className={`${styles.navlink} ${path == "home" ? styles.active : ""}`} to="/home">
				<span className="material-symbols-outlined">home</span>
			</Link>
			<Link className={`${styles.navlink} ${path == "calendar" ? styles.active : ""}`} to="/calendar">
				<span className="material-symbols-outlined">calendar_month</span>
			</Link>
			<Link className={`${styles.navlink} ${path == "edit" ? styles.active : ""}`} to="/edit">
				<span className="material-symbols-outlined">edit_square</span>
			</Link>
			<Link className={`${styles.navlink} ${path == "stats" ? styles.active : ""}`} to="/stats">
				<span className="material-symbols-outlined">bar_chart</span>
			</Link>
			<Link className={`${styles.navlink} ${path == "settings" ? styles.active : ""}`} to="/settings">
				<span className="material-symbols-outlined">settings</span>
			</Link>
		</nav>
	);
}
