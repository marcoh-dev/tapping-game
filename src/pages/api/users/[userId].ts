import { isValidObjectId } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
	const { userId } = request.query;

	try {
		await dbConnect();

		if (request.method === "GET") {
			const user =
				typeof userId === "string" && isValidObjectId(userId)
					? await User.findById(userId)
					: null;

			if (!user) {
				return response.status(404).json({ status: "User not found" });
			}

			return response.status(200).json(user);
		}
	} catch {
		return response.status(500).json({
			status: "User could not be loaded.",
		});
	}

	return response.status(405).json({ status: "Method not allowed" });
}
