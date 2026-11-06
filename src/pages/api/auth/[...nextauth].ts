import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { requireEnv } from "@/lib/env";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
	adapter: MongoDBAdapter(clientPromise),

	providers: [
		GithubProvider({
			clientId: requireEnv("GITHUB_ID"),
			clientSecret: requireEnv("GITHUB_SECRET"),
			authorization: {
				params: {
					scope: "read:user",
				},
			},
			profile(profile) {
				return {
					id: profile.id.toString(),
					name: profile.name ?? profile.login,
					image: profile.avatar_url,
				};
			},
		}),
	],

	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;
			return session;
		},
	},
};

export default NextAuth(authOptions);
