import styles from "~/styles/settings.module.css";
import { deleteLocalData, exportLocalData, importLocalData } from "~/lib/dataUtils";
import { useEffect, useState } from "react";

export default function Settings() {
	const [persistent, setPersistent] = useState<boolean>(false);

	const requestPersistence = () => {
		navigator.storage.persist().then((p) => setPersistent(p));
	};

	useEffect(() => {
		navigator.storage.persisted().then((p) => setPersistent(p));
	}, []);

	return (
		<div className={styles.settings}>
			<div className={"titleBar"}>
				<div className={"title"}>
					Settings
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.sectionTitle}>Data</div>
				<button className={"btn"} onClick={() => importLocalData()}>Import<span className="material-symbols-outlined">upload</span></button>
				<button className={"btn"} onClick={() => exportLocalData()}>Export<span className="material-symbols-outlined">download</span></button>
				<button className={"btn"} onClick={() => deleteLocalData()}>Delete<span className="material-symbols-outlined">delete</span></button>
			</div>
			<div className={styles.section}>
				<div className={styles.sectionTitle}>Storage</div>
				<div>{persistent ? "Persistent" : "Not persistent"}</div>
				<button className={"btn"} onClick={() => requestPersistence()}>Request</button>
			</div>
		</div>
	);
}
