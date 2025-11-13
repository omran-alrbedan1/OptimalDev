import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");
    const page = searchParams.get("page") || "1";

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Token missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/getAllRequiredExams?page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return NextResponse.json({
      data: response.data.data || [],
      meta: {
        current_page: response.data.current_page,
        last_page: response.data.last_page,
        per_page: response.data.per_page,
        total: response.data.total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching exams:", error);
    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch exams",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
