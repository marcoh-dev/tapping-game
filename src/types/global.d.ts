import type { MongoClient } from "mongodb";
import type { Mongoose } from "mongoose";

declare global {
	var mongooseCache: { conn: Mongoose | null; promise: Promise<Mongoose> | null } | undefined;
	var mongoClientPromise: Promise<MongoClient> | undefined;
}

export {};
