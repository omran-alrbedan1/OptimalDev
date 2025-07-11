import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Token missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const body = await request.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/change-password`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to change password";

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
