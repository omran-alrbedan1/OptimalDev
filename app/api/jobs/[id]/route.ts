// app/api/jobs/[id]/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized - Authorization header missing" },
        { status: 401 }
      );
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: authHeader,
          cache: "no-cache",
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch job details" },
      { status: 500 }
    );
  }
}
