import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const path = usePathname();

	return (
		<nav className={styles.navbar}>
			<Link className={`${styles.navlink} ${path.split("/")[1] == "home" ? styles.active : ""}`} href="/home">
				<span className="material-symbols-outlined">home</span>
			</Link>
			<Link className={`${styles.navlink} ${path.split("/")[1] == "calendar" ? styles.active : ""}`} href="/calendar">
				<span className="material-symbols-outlined">calendar_month</span>
			</Link>
			<Link className={`${styles.navlink} ${path.split("/")[1] == "edit" ? styles.active : ""}`} href="/edit">
				<span className="material-symbols-outlined">edit_square</span>
			</Link>
			<Link className={`${styles.navlink} ${path.split("/")[1] == "stats" ? styles.active : ""}`} href="/stats">
				<span className="material-symbols-outlined">bar_chart</span>
			</Link>
			<Link className={`${styles.navlink} ${path.split("/")[1] == "settings" ? styles.active : ""}`} href="/settings">
				<span className="material-symbols-outlined">settings</span>
			</Link>
		</nav>
	);
}
