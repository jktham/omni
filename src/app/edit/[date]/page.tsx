"use client";

import Edit from "@/components/edit";
import Navbar from "@/components/navbar";
import styles from "@/styles/page.module.css";
import { Suspense, use } from "react";

export default function Page({params}: {params: Promise<{ date: string }>}) {
	const p = use(params);
	const date = p.date;

	return (
		<div className={styles.page}>
			<main>
				<Suspense fallback="loading">
					<Edit date={date}></Edit>
				</Suspense>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
