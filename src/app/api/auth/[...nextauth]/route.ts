import type { NextRequest } from "next/server";
import NextAuth from "next-auth";

import { getAuthOptions } from "@/lib/auth";

function handler(
	request: NextRequest,
	context: RouteContext<"/api/auth/[...nextauth]">,
): Promise<Response> {
	return NextAuth(request, context, getAuthOptions());
}

export { handler as GET, handler as POST };
