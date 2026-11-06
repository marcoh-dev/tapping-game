import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connection } from "next/server";
import { getServerSession, type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { requireEnv } from "@/lib/env";
import { getMongoClient } from "@/lib/mongodb";

let authOptions: NextAuthOptions | undefined;

function createAuthOptions(): NextAuthOptions {
	return {
		adapter: MongoDBAdapter(getMongoClient()),

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
}

export function getAuthOptions(): NextAuthOptions {
	return (authOptions ??= createAuthOptions());
}

export async function getSession() {
	await connection();
	return getServerSession(getAuthOptions());
}
