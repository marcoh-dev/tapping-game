"use client";

import { useServerInsertedHTML } from "next/navigation";
import { type ReactNode, useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

import GlobalStyle from "@/styles";

export default function StyledComponentsRegistry({ children }: { children: ReactNode }) {
	const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

	useServerInsertedHTML(() => {
		const styles = styledComponentsStyleSheet.getStyleElement();
		styledComponentsStyleSheet.instance.clearTag();
		return <>{styles}</>;
	});

	const content = (
		<>
			<GlobalStyle />
			{children}
		</>
	);

	if (typeof window !== "undefined") {
		return content;
	}

	return (
		<StyleSheetManager sheet={styledComponentsStyleSheet.instance}>{content}</StyleSheetManager>
	);
}
