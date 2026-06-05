import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

interface JwtPayload {
  userId: string;
}

export function signJWT(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyJWT(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
}

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload = verifyJWT(token);
  if (!payload) return null;

  return { userId: payload.userId };
}

export async function requireAuth(): Promise<{ userId: string }> {
  const session = await getSession();
  
  if (!session) {
    redirect("/login");
  }
  
  return session;
}
