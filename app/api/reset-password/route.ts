import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { email, token, password, password_confirmation } =
      await request.json();
    const language = request.headers.get("Accept-Language") || "en";

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
      { email, token, password, password_confirmation },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.message || "Failed",
        details: error.response?.data?.errors || {},
      },
      { status: error.response?.status || 500 }
    );
  }
}
