// TODO
import { cookies } from "next/headers";
import { sessionStore } from "@/app/lib/store";
import { NextResponse } from "next/server";

export async function POST() {

    const cookieStore = await cookies();
    const sessionID = cookieStore.get("session_id")?.value;
    
    if (sessionID) {
        sessionStore.delete(sessionID);
    }
    
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("session_id", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(0), // Expire immediately
    });
  return response;
}