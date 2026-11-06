import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";

import GlobalStyle from "@/styles";

type FetchError = Error & { info?: unknown; status?: number };

async function fetcher(resource: string): Promise<unknown> {
	const result = await fetch(resource);

	if (!result.ok) {
		const error: FetchError = new Error("An error occurred while fetching the data.");
		error.info = await result.json();
		error.status = result.status;
		throw error;
	}

	return result.json();
}

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps<{ session: Session | null }>) {
	return (
		<>
			<GlobalStyle />
			<SWRConfig value={{ fetcher }}>
				<SessionProvider session={session}>
					<Component {...pageProps} />
				</SessionProvider>
			</SWRConfig>
		</>
	);
}
