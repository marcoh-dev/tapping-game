import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

import dbConnect from "@/db/connect";
import Score from "@/db/models/Score";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	try {
		await dbConnect();

		if (request.method === "GET") {
			const session = await getServerSession(request, response, authOptions);

			if (!session) {
				return response.status(401).json({
					status: "Not authorized",
				});
			}

			const { mode } = request.query;
			const filter: { userId: string; mode?: string } = { userId: session.user.id };

			if (typeof mode === "string") {
				filter.mode = mode;
			}

			const bestScore = await Score.findOne(filter).sort({ score: -1 }).select("score mode");

			return response.status(200).json(bestScore ?? { score: 0 });
		}
	} catch {
		return response.status(500).json({
			status: "The best score could not be loaded.",
		});
	}

	return response.status(405).json({ status: "Method not allowed" });
}
