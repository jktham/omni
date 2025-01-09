export const themes: Map<string, string[]> = new Map([
	["default", ["#005ae0", "#00b4dd", "#ffa10a", "#ff600a", "#f50062"]],
	["mood", ["#9F51F2", "#8981F5", "#48B2DD", "#14D4A5", "#62D510"]],
	["autumn", ["#003049", "#d62828", "#f77f00", "#fcbf49", "#eae2b7"]],
	["ice", ["#03045e", "#0077b6", "#00b4d8", "#90e0ef", "#caf0f8"]],
]);

export function getLocalTheme() {
	const name = localStorage.getItem("theme") || "default";
	const theme = themes.get(name) || themes.get("default")!;
	return theme;
}

export function setLocalTheme(name: string) {
	localStorage.setItem("theme", name);
}

export function getLocalThemeName() {
	const name = localStorage.getItem("theme") || "default";
	return name;
}

export function getDefaultTheme() {
	const theme = themes.get("default")!;
	return theme;
}

export function getBrightness(color: string) {
	const r = parseInt("0x" + color.substring(1, 3));
	const g = parseInt("0x" + color.substring(3, 5));
	const b = parseInt("0x" + color.substring(5, 7));
	const lum = (r / 255.0) * 0.2126 + (g / 255.0) * 0.7152 + (b / 255.0) * 0.0722;
	return lum;
}