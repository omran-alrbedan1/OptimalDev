// Example for app/api/filter-options/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/filter-options`,
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
      { error: error.message || "Failed to fetch filter-options" },
      { status: 500 }
    );
  }
}
