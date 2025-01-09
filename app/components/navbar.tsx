import { Link, useLocation } from "react-router";
import clsx from "clsx";
import "~/styles/navbar.css";

export default function Navbar() {
	const location = useLocation();
	const path = location.pathname.split("/")[1];

	return (
		<nav className="navbar">
			<Link className={clsx("navlink", path == "home" && "active")} to="/home" prefetch="render">
				<span className="material-symbols-outlined">home</span>
			</Link>
			<Link className={clsx("navlink", path == "calendar" && "active")} to="/calendar" prefetch="render">
				<span className="material-symbols-outlined">calendar_month</span>
			</Link>
			<Link className={clsx("navlink", path == "edit" && "active")} to="/edit" prefetch="render">
				<span className="material-symbols-outlined">edit_square</span>
			</Link>
			<Link className={clsx("navlink", path == "stats" && "active")} to="/stats" prefetch="render">
				<span className="material-symbols-outlined">bar_chart</span>
			</Link>
			<Link className={clsx("navlink", path == "settings" && "active")} to="/settings" prefetch="render">
				<span className="material-symbols-outlined">settings</span>
			</Link>
		</nav>
	);
}
