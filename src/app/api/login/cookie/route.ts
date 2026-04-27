import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  // TODO: Set a secure 'session_id' cookie with value 'abc789xyz'
  // Use httpOnly, secure (in production), sameSite: 'strict', maxAge of 1 hour

  if (!process.env.PASSWORD) {
    throw new Error("PASSWORD is not defined in environment variables");
  }

  const body = await req.json();
  const cookieStore = await cookies();

  if (process.env.PASSWORD !== body.password) {
    return NextResponse.json({ message: "Invalid password" }, { status: 401 });
  }

  // Set session_id cookie with value 'abc789xyz'
  cookieStore.set("session_id", "abc789xyz", {
    httpOnly: true, // Use httpOnly
    secure: process.env.NODE_ENV === "production", // secure in production
    sameSite: "strict", // same site strict
    maxAge: 60 * 60, // max age: 1 hour
    path: "/",
  });

  return NextResponse.json({ message: "Logged in!" }, { status: 200 });
}
