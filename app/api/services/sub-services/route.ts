// Example for app/api/sliders/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/sub-services`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      }
    );

    const data = response.data?.data || response.data;
    console.log(data);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch sliders" },
      { status: 500 }
    );
  }
}
