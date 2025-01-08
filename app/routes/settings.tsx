import { useState, useEffect } from "react";
import Navbar from "~/components/navbar";
import { exportLocalData, deleteLocalData, importLocalData } from "~/lib/data";
import { getBrightness, getDefaultTheme, getLocalTheme, getLocalThemeName, setLocalTheme, themes } from "~/lib/theme";
import "~/styles/page.css";
import "~/styles/settings.css";

export default function Page() {
	const [persistent, setPersistent] = useState<boolean>(false);
	const [theme, setTheme] = useState<string[]>(getDefaultTheme());
	const [themeName, setThemeName] = useState<string>("default");
	const [shouldSave, setShouldSave] = useState<boolean>(false);

	const requestPersistence = () => {
		navigator.storage.persist().then((p) => setPersistent(p));
	};

	useEffect(() => {
		navigator.storage.persisted().then((p) => setPersistent(p));
	}, []);

	useEffect(() => {
		setTheme(getLocalTheme());
		setThemeName(getLocalThemeName());
	}, []);

	useEffect(() => {
		if (!shouldSave) {
			return;
		}
		setShouldSave(false);
		
		setLocalTheme(themeName);
		setTheme(getLocalTheme());
	}, [shouldSave, themeName]);

	return (
		<div className="page">
			<div className="titleBar">
				<div className="title">
					Settings
				</div>
			</div>
			<main>
				<div className="settings">
					<div className="section">
						<div className="sectionTitle">Data</div>
						<button className="btn" onClick={() => importLocalData()}>Import<span className="material-symbols-outlined">upload</span></button>
						<button className="btn" onClick={() => exportLocalData()}>Export<span className="material-symbols-outlined">download</span></button>
						<button className="btn" onClick={() => deleteLocalData()}>Delete<span className="material-symbols-outlined">delete</span></button>
					</div>
					<div className="section">
						<div className="sectionTitle">Storage</div>
						<div className="sectionText">{persistent ? "Persistent" : "Not persistent"}</div>
						<button className="btn" onClick={() => requestPersistence()}>Request</button>
					</div>
					<div className="section">
						<div className="sectionTitle">Theme</div>
						<select className="themeSelect" value={themeName} onChange={(e) => {setThemeName(e.target.value); setShouldSave(true)}}>
							{Array.from(themes).map(([name]) => <option value={name} key={name}>{name}</option>)}
						</select>
						<div className="themePreview">
							<div style={{backgroundColor: theme[0]}}><p style={getBrightness(theme[0]) > 0.7 ? {color: "#000000"} : {color: "#ffffff"}}>1</p></div>
							<div style={{backgroundColor: theme[1]}}><p style={getBrightness(theme[1]) > 0.7 ? {color: "#000000"} : {color: "#ffffff"}}>2</p></div>
							<div style={{backgroundColor: theme[2]}}><p style={getBrightness(theme[2]) > 0.7 ? {color: "#000000"} : {color: "#ffffff"}}>3</p></div>
							<div style={{backgroundColor: theme[3]}}><p style={getBrightness(theme[3]) > 0.7 ? {color: "#000000"} : {color: "#ffffff"}}>4</p></div>
							<div style={{backgroundColor: theme[4]}}><p style={getBrightness(theme[4]) > 0.7 ? {color: "#000000"} : {color: "#ffffff"}}>5</p></div>
						</div>
					</div>
				</div>
			</main>
			<Navbar></Navbar>
		</div>
	);
}
