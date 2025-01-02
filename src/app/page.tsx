"use client"

import Home from "@/components/home";
import Calendar from "@/components/calendar";
import Edit from "@/components/edit";
import Stats from "@/components/stats";
import Settings from "@/components/settings";
import Navbar from "@/components/navbar";
import styles from "@/styles/page.module.css";
import { useEffect, useState } from "react";

export default function Page() {
	const [page, setPage] = useState<string>("");

	useEffect(() => {
		setPage(localStorage.getItem("page") || "home");
	}, []);

	useEffect(() => {
		localStorage.setItem("page", page);
	}, [page]);

	return (
		<div className={styles.page}>
			<main>
				{page == "home" && <Home></Home>}
				{page == "calendar" && <Calendar></Calendar>}
				{page == "edit" && <Edit></Edit>}
				{page == "stats" && <Stats></Stats>}
				{page == "settings" && <Settings></Settings>}
			</main>
			<Navbar page={page} setPage={setPage}></Navbar>
		</div>
	);
}
