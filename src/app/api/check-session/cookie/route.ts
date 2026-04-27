import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();

  // TODO: Check if 'session_id' cookie exists and equals 'abc789xyz'
  // Return 200 with "Admin access granted" if valid, 401 with "Unauthorized" if not


  const session = cookieStore.get("session_id");

  // Validate cookie
  if (session && session.value === "abc789xyz") {
    return NextResponse.json(
      { message: "Admin access granted" },
      { status: 200 }
    );
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
