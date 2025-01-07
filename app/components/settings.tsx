import styles from "~/styles/settings.module.css";
import { deleteLocalData, exportLocalData, importLocalData } from "~/lib/dataUtils";

export default function Settings() {
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
		</div>
	);
}
