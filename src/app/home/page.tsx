"use client";

import Home from "@/components/home";
import Navbar from "@/components/navbar";
import styles from "@/styles/page.module.css";

export default function Page() {
	return (
		<div className={styles.page}>
			<main>
				<Home></Home>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
