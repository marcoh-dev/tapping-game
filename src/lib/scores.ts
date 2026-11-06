import { isValidObjectId, Types } from "mongoose";

import dbConnect from "@/db/connect";
import Score from "@/db/models/Score";
import User from "@/db/models/User";
import type { LeaderboardScore, User as UserData } from "@/types/api";

type LeaderboardScoreDocument = {
	_id: Types.ObjectId;
	userId: Types.ObjectId;
	score: number;
	mode: string;
	isHighscore: boolean;
	createdAt: Date;
	updatedAt: Date;
	user: { _id: Types.ObjectId; name: string; image?: string };
};

export async function getLeaderboardScores(mode?: string): Promise<LeaderboardScore[]> {
	await dbConnect();

	const scores = await Score.aggregate<LeaderboardScoreDocument>([
		{ $match: mode ? { isHighscore: true, mode } : { isHighscore: true } },
		{ $sort: { score: -1, createdAt: 1 } },
		{
			$lookup: {
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user",
			},
		},
		{ $unwind: "$user" },
	]);

	return scores.map((entry) => ({
		_id: entry._id.toString(),
		userId: entry.userId.toString(),
		score: entry.score,
		mode: entry.mode,
		isHighscore: entry.isHighscore,
		createdAt: entry.createdAt.toISOString(),
		updatedAt: entry.updatedAt.toISOString(),
		user: {
			_id: entry.user._id.toString(),
			name: entry.user.name,
			...(entry.user.image && { image: entry.user.image }),
		},
	}));
}

export async function getBestScore(userId: string, mode: string): Promise<number> {
	await dbConnect();

	const bestScore = await Score.findOne({ userId, mode }).sort({ score: -1 }).select("score");

	return bestScore?.score ?? 0;
}

export async function getUser(userId: string): Promise<UserData | null> {
	if (!isValidObjectId(userId)) {
		return null;
	}

	await dbConnect();

	const user = await User.findById(userId);

	if (!user) {
		return null;
	}

	return {
		_id: user._id.toString(),
		name: user.name,
		...(user.image && { image: user.image }),
	};
}

export async function createScore(score: {
	userId: string;
	score: number;
	mode: string;
	isHighscore: boolean;
}): Promise<void> {
	await dbConnect();
	await Score.create(score);
}
