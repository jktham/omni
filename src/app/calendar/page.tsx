"use client";

import Calendar from "@/components/calendar";
import Navbar from "@/components/navbar";
import styles from "@/styles/page.module.css";

export default function Page() {
	return (
		<div className={styles.page}>
			<main>
				<Calendar></Calendar>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
