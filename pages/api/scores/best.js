import dbConnect from "@/db/connect";
import Score from "@/db/models/Score";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const session = await getServerSession(request, response, authOptions);

      if (!session) {
        return response.status(401).json({
          status: "Not authorized",
        });
      }

      const { mode } = request.query;

      const filter = {
        userId: session.user.id,
      };

      if (mode) {
        filter.mode = mode;
      }

      const bestScore = await Score.findOne(filter)
        .sort({ score: -1 })
        .select("score mode");

      return response.status(200).json(bestScore || { score: 0 });
    }
  } catch (error) {
    return response.status(500).json({
      status: "The best score could not be loaded.",
    });
  }

  response.status(405).json({ status: "Method not allowed" });
}
