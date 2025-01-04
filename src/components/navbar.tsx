import styles from "@/styles/navbar.module.css";
import { dateToString } from "@/utils/dateUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
	const path = usePathname();

	const [date, setDate] = useState<string>("2000-01-01");

	useEffect(() => {
		setDate(dateToString(new Date()));
	}, []);

	return (
		<nav className={styles.navbar}>
			<Link className={`${styles.navlink} ${path == "/home" ? styles.active : ""}`} href="/home">
				Home
			</Link>
			<Link className={`${styles.navlink} ${path == "/calendar" ? styles.active : ""}`} href="/calendar">
				Calendar
			</Link>
			<Link className={`${styles.navlink} ${path == "/edit" ? styles.active : ""}`} href={`/edit/${date}`}>
				Edit
			</Link>
			<Link className={`${styles.navlink} ${path == "/stats" ? styles.active : ""}`} href="/stats">
				Stats
			</Link>
			<Link className={`${styles.navlink} ${path == "/settings" ? styles.active : ""}`} href="/settings">
				Settings
			</Link>
		</nav>
	);
}
