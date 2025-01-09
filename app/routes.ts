import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/index.tsx"),
	route("home", "routes/home.tsx"),
	route("calendar/:year?", "routes/calendar.tsx"),
	route("edit/:date?", "routes/edit.tsx"),
	route("stats", "routes/stats.tsx"),
	route("settings", "routes/settings.tsx"),
] satisfies RouteConfig;
