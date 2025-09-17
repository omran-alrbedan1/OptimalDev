import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const requestData = await request.json();

    console.log("Received request data:", JSON.stringify(requestData, null, 2));

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
    console.error("Backend Error:", error.response?.data || error.message);

    // Pass through the backend validation errors
    if (error.response?.status === 422) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.response.data,
        },
        { status: 422 }
      );
    }

    return NextResponse.json(
      {
        error:
          error.response?.data?.message || error.message || "Request failed",
      },
      { status: error.response?.status || 500 }
    );
  }
}
