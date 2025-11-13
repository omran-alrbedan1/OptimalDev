import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");
    console.log("Auth Header:", authHeader);

    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized - Authorization header missing" },
        { status: 401 }
      );
    }

    const id = params.id;

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jobs/${id}/apply`,
      {},
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
    console.error("Error applying for job:", error);
    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to apply for job";

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
