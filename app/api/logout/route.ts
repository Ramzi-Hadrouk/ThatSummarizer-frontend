import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Clear the cookie by setting it with Max-Age=0
  const response = NextResponse.json({ message: "Logged out successfully" }, { status: 200 });

  response.headers.set(
    "Set-Cookie",
    `jwt=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; ${
      process.env.NODE_ENV === "production" ? "Secure" : ""
    }`
  );

  return response;
}

// Optional: Handle unsupported methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
