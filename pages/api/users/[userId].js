import dbConnect from "@/db/connect";
import User from "@/db/models/User";

export default async function handler(request, response) {
  await dbConnect();
  const { userId } = request.query;

  try {
    if (request.method === "GET") {
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ status: "User not found" });
      }
      return response.status(200).json(user);
    }
  } catch (error) {
    return response.status(500).json({
      status: "User could not be loaded.",
    });
  }

  response.status(405).json({ status: "Method not allowed" });
}
