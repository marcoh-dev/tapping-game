import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import dbConnect from "@/db/connect";
import Score from "@/db/models/Score";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import type { LeaderboardScore } from "@/types/api";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	try {
		await dbConnect();

		if (request.method === "GET") {
			const { mode } = request.query;
			const filter: { isHighscore: boolean; mode?: string } = { isHighscore: true };

			if (typeof mode === "string") {
				filter.mode = mode;
			}

			const scores = await Score.aggregate<LeaderboardScore>([
				{ $match: filter },
				{
					$sort: {
						score: -1,
						createdAt: 1,
					},
				},
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

			return response.status(200).json(scores);
		}

		if (request.method === "POST") {
			const session = await getServerSession(request, response, authOptions);

			if (!session) {
				return response.status(401).json({
					status: "Not authorized",
				});
			}

			const { score, mode, isHighscore } = request.body as Record<string, unknown>;

			if (
				typeof score !== "number" ||
				typeof mode !== "string" ||
				typeof isHighscore !== "boolean"
			) {
				return response.status(400).json({ status: "Invalid score" });
			}

			const createdScore = await Score.create({
				userId: session.user.id,
				score,
				mode,
				isHighscore,
			});

			return response.status(201).json({
				status: "Score saved successfully",
				_id: createdScore._id,
				isHighscore,
			});
		}
	} catch {
		return response.status(500).json({
			status: "Score could not be loaded.",
		});
	}

	return response.status(405).json({ status: "Method not allowed" });
}
