import type { Metadata } from "next";

import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry";

export const metadata: Metadata = {
	title: "tapping game",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en">
			<body>
				<StyledComponentsRegistry>
					<div id="app">{children}</div>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
