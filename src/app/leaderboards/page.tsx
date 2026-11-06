import type { Metadata } from "next";

import Leaderboard, { type LeaderboardScope } from "@/components/Leaderboard";
import { getLeaderboardScores } from "@/lib/scores";
import type { LeaderboardScore } from "@/types/api";

export const metadata: Metadata = {
	title: "Leaderboards",
};

async function loadOnlineScores(mode: string): Promise<LeaderboardScore[] | null> {
	try {
		return await getLeaderboardScores(mode);
	} catch (error) {
		console.error(error);
		return null;
	}
}

export default async function LeaderboardsPage({ searchParams }: PageProps<"/leaderboards">) {
	const { scope: scopeParam, mode } = await searchParams;
	const scope: LeaderboardScope = scopeParam === "local" ? "local" : "global";
	const currentMode = typeof mode === "string" ? mode : "30s";
	const onlineScores = scope === "global" ? await loadOnlineScores(currentMode) : [];

	return <Leaderboard scope={scope} currentMode={currentMode} onlineScores={onlineScores} />;
}
