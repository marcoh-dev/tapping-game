import dns from "dns";
import mongoose, { type Mongoose } from "mongoose";

import { requireEnv } from "@/lib/env";

const dnsServers = process.env.DNS_SERVERS?.split(",").filter(Boolean);

if (dnsServers?.length) {
	dns.setServers(dnsServers);
}

const cached = (globalThis.mongooseCache ??= { conn: null, promise: null });

export default async function dbConnect(): Promise<Mongoose> {
	if (cached.conn) {
		return cached.conn;
	}

	cached.promise ??= mongoose.connect(requireEnv("MONGODB_URI"), { bufferCommands: false });

	try {
		cached.conn = await cached.promise;
	} catch (error) {
		cached.promise = null;
		throw error;
	}

	return cached.conn;
}
