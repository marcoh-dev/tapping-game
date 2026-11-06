import { MongoClient } from "mongodb";

import { requireEnv } from "@/lib/env";

let clientPromise: Promise<MongoClient> | undefined;

function connect(): Promise<MongoClient> {
	return new MongoClient(requireEnv("MONGODB_URI")).connect();
}

export function getMongoClient(): Promise<MongoClient> {
	if (process.env.NODE_ENV === "development") {
		return (globalThis.mongoClientPromise ??= connect());
	}

	return (clientPromise ??= connect());
}
