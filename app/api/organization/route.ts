// app/api/organization/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/organization`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle different response structures
    const data =
      response.data?.data !== undefined ? response.data.data : response.data;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Organization API Error:", error);

    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch organization data",
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
