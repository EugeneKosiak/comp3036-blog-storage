import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sessionStore } from "@/app/lib/store";

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();

  // TODO: Check if 'session_id' cookie exists and equals 'abc789xyz'
  // Return 200 with "Admin access granted" if valid, 401 with "Unauthorized" if not

  const sessionID = cookieStore.get("session_id")?.value;
  
  if (!sessionID) {
    return NextResponse.json({ message: "Unauthorised" }, { status: 401 });
  }
  if (!sessionStore.has(sessionID)) {
    return NextResponse.json({ message: "Invalid Session" }, { status: 401 });
  }
  return NextResponse.json(
    { message: "Admin access granted to " + sessionStore.get(sessionID) },
    { status: 200 }
  );
}
