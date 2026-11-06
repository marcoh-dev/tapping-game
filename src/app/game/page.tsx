import Game from "@/components/Game";
import { getSession } from "@/lib/auth";
import { getGameMode } from "@/lib/gameModes";
import { getBestScore } from "@/lib/scores";

export default async function GamePage({ searchParams }: PageProps<"/game">) {
	const mode = getGameMode((await searchParams).mode);
	const session = await getSession();
	const highscore = session ? await getBestScore(session.user.id, mode.id) : 0;

	return (
		<main>
			<Game mode={mode} isSignedIn={Boolean(session)} initialHighscore={highscore} />
		</main>
	);
}
