import { MongoClient } from "mongodb";

import { requireEnv } from "@/lib/env";

const uri = requireEnv("MONGODB_URI");

function connect(): Promise<MongoClient> {
	return new MongoClient(uri).connect();
}

const clientPromise =
	process.env.NODE_ENV === "development"
		? (globalThis.mongoClientPromise ??= connect())
		: connect();

export default clientPromise;
