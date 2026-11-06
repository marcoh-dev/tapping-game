import type { LeaderboardScore } from "@/types/api";

export type RankedScore = LeaderboardScore & {
	isObsolete: boolean;
	rank: number | null;
};

export function rankScores(scores: LeaderboardScore[]): RankedScore[] {
	const seenUsers = new Set<string>();
	let rank = 0;

	return scores.map((entry) => {
		const isObsolete = seenUsers.has(entry.user._id);

		if (!isObsolete) {
			seenUsers.add(entry.user._id);
			rank++;
		}

		return {
			...entry,
			isObsolete,
			rank: isObsolete ? null : rank,
		};
	});
}
