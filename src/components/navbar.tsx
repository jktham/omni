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
				<span className="material-symbols-outlined">home</span>
			</Link>
			<Link className={`${styles.navlink} ${path == "/calendar" ? styles.active : ""}`} href="/calendar">
				<span className="material-symbols-outlined">calendar_month</span>
			</Link>
			<Link className={`${styles.navlink} ${path.split("/")[1] == "edit" ? styles.active : ""}`} href={`/edit/${date}`}>
				<span className="material-symbols-outlined">edit_square</span>
			</Link>
			<Link className={`${styles.navlink} ${path == "/stats" ? styles.active : ""}`} href="/stats">
				<span className="material-symbols-outlined">bar_chart</span>
			</Link>
			<Link className={`${styles.navlink} ${path == "/settings" ? styles.active : ""}`} href="/settings">
				<span className="material-symbols-outlined">settings</span>
			</Link>
		</nav>
	);
}
