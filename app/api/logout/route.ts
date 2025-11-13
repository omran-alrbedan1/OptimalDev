import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");

    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/logout`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          ...(authHeader && { Authorization: authHeader }),
        },
      }
    );

    return NextResponse.json({ message: "Logged out successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  }
}
