import { Link, useLocation } from "react-router";
import clsx from "clsx";
import "~/styles/navbar.css";
import Icon from "./icon";

export default function Navbar() {
	const location = useLocation();
	const path = location.pathname.split("/")[1];

	return (
		<nav className="navbar">
			<Link className={clsx("navlink", path == "home" && "active")} to="/home" prefetch="render">
				<Icon>home</Icon>
			</Link>
			<Link className={clsx("navlink", path == "calendar" && "active")} to="/calendar" prefetch="render">
				<Icon>calendar_month</Icon>
			</Link>
			<Link className={clsx("navlink", path == "edit" && "active")} to="/edit" prefetch="render">
				<Icon>edit_square</Icon>
			</Link>
			<Link className={clsx("navlink", path == "stats" && "active")} to="/stats" prefetch="render">
				<Icon>bar_chart</Icon>
			</Link>
			<Link className={clsx("navlink", path == "settings" && "active")} to="/settings" prefetch="render">
				<Icon>settings</Icon>
			</Link>
		</nav>
	);
}
