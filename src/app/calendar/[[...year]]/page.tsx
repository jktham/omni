"use client";

import Calendar from "@/components/calendar";
import Navbar from "@/components/navbar";
import styles from "@/styles/page.module.css";
import { Data, getLocalData } from "@/utils/dataUtils";
import { dateToString } from "@/utils/dateUtils";
import { use, useEffect, useState } from "react";

export default function Page({params}: {params: Promise<{ year: string[] | undefined }>}) {
	const p = use(params);
	const [year, setYear] = useState<number>(Number(p.year?.[0]) || 2025);
	const [date, setDate] = useState<string>("2025-01-01");
	const [data, setData] = useState<Data>(new Map());

	useEffect(() => {
		if (year == 2025) setYear(new Date().getFullYear());
		setDate(dateToString(new Date()));
		setData(getLocalData());
	}, [year]);
	
	return (
		<div className={styles.page}>
			<main>
				<Calendar year={year} date={date} data={data}></Calendar>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
