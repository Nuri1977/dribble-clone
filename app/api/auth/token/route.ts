import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret, raw: true });
  if (!token) {
    return NextResponse.json({ status: 401 });
  }

  return NextResponse.json({ token }, { status: 200 });
}
