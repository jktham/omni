import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
	title: "Omni",
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
			</head>
			<body>
				{children}
			</body>
		</html>
	);
}
