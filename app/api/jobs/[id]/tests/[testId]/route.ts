import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string; testId: string } }
) {
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
    const { id, testId } = params;

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}/tests/${testId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error fetching test:", error);
    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch test",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
