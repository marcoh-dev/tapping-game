export function requireEnv(name: string): string {
	const value = process.env[name];

	if (!value) {
		throw new Error(`Please define the ${name} environment variable inside .env.local`);
	}

	return value;
}
