import dbConnect from "@/db/connect";
import Score from "@/db/models/Score";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const { mode } = request.query;
      const filter = {};

      if (mode) {
        filter.mode = mode;
      }
      filter.isHighscore = true;

      const scores = await Score.aggregate([
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

      const { score, mode, isHighscore } = request.body;
      const userId = session.user.id;

      const createdScore = await Score.create({
        userId,
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
  } catch (error) {
    return response.status(500).json({
      status: "Score could not be loaded.",
    });
  }

  response.status(405).json({ status: "Method not allowed" });
}
