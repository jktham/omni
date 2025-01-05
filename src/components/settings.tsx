import styles from "@/styles/settings.module.css";
import { deleteLocalData, exportLocalData, importLocalData } from "@/utils/dataUtils";

export default function Settings() {
	return (
		<div className={styles.settings}>
			<div className={styles.titleBar}>
				<div className={styles.title}>
					Settings
				</div>
			</div>
			<div className={styles.section}>
				<div className={styles.sectionTitle}>Data</div>
				<button className={styles.import} onClick={() => importLocalData()}>Import<span className="material-symbols-outlined">upload</span></button>
				<button className={styles.export} onClick={() => exportLocalData()}>Export<span className="material-symbols-outlined">download</span></button>
				<button className={styles.delete} onClick={() => deleteLocalData()}>Delete<span className="material-symbols-outlined">delete</span></button>
			</div>
		</div>
	);
}
