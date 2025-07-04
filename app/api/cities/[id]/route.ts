// app/api/cities/[id]/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const language = request.headers.get("Accept-Language") || "en";
    const { id } = params;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cities/${id}`,
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
        error: error.response?.data?.message || "Failed to fetch city",
        details: error.response?.data?.errors || {},
      },
      { status: error.response?.status || 500 }
    );
  }
}
