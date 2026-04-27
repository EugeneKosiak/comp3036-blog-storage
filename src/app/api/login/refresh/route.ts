import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { tokenStore } from "@/app/lib/store";
import { createToken } from "@/app/lib/jwt";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken || !tokenStore.has(refreshToken)) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }

  const user = tokenStore.get(refreshToken)!;

  const newToken = createToken(user);

  return NextResponse.json({
    message: "Token Reissued",
    token: newToken,
  });
}
