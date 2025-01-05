"use client";

import Edit from "@/components/edit";
import Navbar from "@/components/navbar";
import styles from "@/styles/page.module.css";
import { dateToString } from "@/utils/dateUtils";
import { use, useEffect, useState } from "react";

export default function Page({params}: {params: Promise<{ date: string[] | undefined }>}) {
	const p = use(params);
	const [date, setDate] = useState<string>(p.date?.[0] || "2025-01-01");

	useEffect(() => {
		if (date == "2025-01-01") setDate(dateToString(new Date()));
	}, [date]);

	return (
		<div className={styles.page}>
			<main>
				<Edit date={date}></Edit>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
