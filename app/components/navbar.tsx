import styles from "~/styles/navbar.module.css";
import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

export default function Navbar() {
	const location = useLocation();
	const path = location.pathname.split("/")[1];

	return (
		<nav className={styles.navbar}>
			<Link className={clsx(styles.navlink, path == "home" && styles.active)} to="/home" prefetch="render">
				<span className="material-symbols-outlined">home</span>
			</Link>
			<Link className={clsx(styles.navlink, path == "calendar" && styles.active)} to="/calendar" prefetch="render">
				<span className="material-symbols-outlined">calendar_month</span>
			</Link>
			<Link className={clsx(styles.navlink, path == "edit" && styles.active)} to="/edit" prefetch="render">
				<span className="material-symbols-outlined">edit_square</span>
			</Link>
			<Link className={clsx(styles.navlink, path == "stats" && styles.active)} to="/stats" prefetch="render">
				<span className="material-symbols-outlined">bar_chart</span>
			</Link>
			<Link className={clsx(styles.navlink, path == "settings" && styles.active)} to="/settings" prefetch="render">
				<span className="material-symbols-outlined">settings</span>
			</Link>
		</nav>
	);
}
