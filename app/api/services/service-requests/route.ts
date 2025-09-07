import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const requestData = await request.json();

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/service-requests`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error.message || "Request failed" },
      { status: error.response?.status || 500 }
    );
  }
}
