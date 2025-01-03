"use client";

import Edit from "@/components/edit";
import Navbar from "@/components/navbar";
import styles from "@/styles/page.module.css";

export default function Page() {
	return (
		<div className={styles.page}>
			<main>
				<Edit></Edit>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
