import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(
  request: Request,
  { params }: { params: { id: string; testId: string } }
) {
  try {
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");

    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized - Authorization header missing" },
        { status: 401 }
      );
    }

    const { id, testId } = params;
    const requestData = await request.json();

    if (!requestData || !requestData.answers) {
      return NextResponse.json(
        { error: "Bad Request - Answers are required" },
        { status: 400 }
      );
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}/tests/${testId}/submit`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: authHeader,
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error submitting test:", error);
    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Failed to submit test";

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
