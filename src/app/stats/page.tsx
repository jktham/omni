"use client";

import Stats from "@/components/stats";
import Navbar from "@/components/navbar";
import styles from "@/styles/page.module.css";

export default function Page() {
	return (
		<div className={styles.page}>
			<main>
				<Stats></Stats>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
