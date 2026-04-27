import jwt from "jsonwebtoken";

export function createToken(user: string) {
  return jwt.sign(
    { user },
    process.env.JWT_SECRET!,
    { expiresIn: "2s" }
  );
}
