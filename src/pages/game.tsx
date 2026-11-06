import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Game from "@/components/Game";
import { getGameMode } from "@/lib/gameModes";

export default function GamePage() {
	const router = useRouter();
	const mode = getGameMode(router.query.mode);

	const { status } = useSession();

	const isSignedIn = status === "authenticated";
	return (
		<>
			<Head>
				<title>tapping game</title>
			</Head>
			<main>
				<Game mode={mode} isSignedIn={isSignedIn} />
			</main>
		</>
	);
}
