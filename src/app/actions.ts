"use server";

import { getSession } from "@/lib/auth";
import { GAME_MODES } from "@/lib/gameModes";
import { createScore, getBestScore } from "@/lib/scores";

type SaveScoreResult = { ok: true; isHighscore: boolean } | { ok: false; status: string };

export async function saveScore(score: number, mode: string): Promise<SaveScoreResult> {
	const session = await getSession();

	if (!session) {
		return { ok: false, status: "Not authorized" };
	}

	if (!Number.isInteger(score) || score <= 0 || !GAME_MODES.some(({ id }) => id === mode)) {
		return { ok: false, status: "Invalid score" };
	}

	const isHighscore = score > (await getBestScore(session.user.id, mode));

	await createScore({ userId: session.user.id, score, mode, isHighscore });

	return { ok: true, isHighscore };
}
