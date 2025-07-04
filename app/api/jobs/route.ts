import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const language = request.headers.get("Accept-Language") || "en";

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jobs?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      }
    );

    return NextResponse.json({
      data: response.data?.data || response.data,
      meta: response.data?.meta,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
