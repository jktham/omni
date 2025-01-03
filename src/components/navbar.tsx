import styles from "@/styles/navbar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
	const path = usePathname();

	return (
		<nav className={styles.navbar}>
			<Link className={path == "/home" ? styles.active : ""} href="/home">
				Home
			</Link>
			<Link className={path == "/calendar" ? styles.active : ""} href="/calendar">
				Calendar
			</Link>
			<Link className={path == "/edit" ? styles.active : ""} href="/edit">
				Edit
			</Link>
			<Link className={path == "/stats" ? styles.active : ""} href="/stats">
				Stats
			</Link>
			<Link className={path == "/settings" ? styles.active : ""} href="/settings">
				Settings
			</Link>
		</nav>
	);
}
