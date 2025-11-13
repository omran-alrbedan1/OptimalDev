import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized - Token missing or invalid" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  try {
    const language = request.headers.get("Accept-Language") || "en";
    const { id } = params;
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/applications/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch application details" },
      { status: 500 }
    );
  }
}
