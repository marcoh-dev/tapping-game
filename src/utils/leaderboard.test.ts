import { describe, expect, it } from "vitest";

import type { LeaderboardScore } from "@/types/api";
import { rankScores } from "@/utils/leaderboard";

function score(id: string, userId: string, value: number): LeaderboardScore {
	return {
		_id: id,
		userId,
		score: value,
		mode: "30s",
		isHighscore: true,
		createdAt: "2026-01-01T00:00:00.000Z",
		updatedAt: "2026-01-01T00:00:00.000Z",
		user: { _id: userId, name: userId },
	};
}

describe("rankScores", () => {
	it("ranks each user's best score and marks older highscores as obsolete", () => {
		const ranked = rankScores([
			score("a", "anna", 30),
			score("b", "ben", 25),
			score("c", "anna", 20),
		]);

		expect(ranked.map(({ _id, rank, isObsolete }) => ({ _id, rank, isObsolete }))).toEqual([
			{ _id: "a", rank: 1, isObsolete: false },
			{ _id: "b", rank: 2, isObsolete: false },
			{ _id: "c", rank: null, isObsolete: true },
		]);
	});
});
