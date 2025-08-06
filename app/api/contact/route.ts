import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const language = request.headers.get("Accept-Language") || "en";

    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/contact`;

    const response = await axios.get(backendUrl, {
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Contact API Error:", error.response?.data || error.message);
    return NextResponse.json(
      {
        error:
          error.response?.data?.message ||
          "Failed to fetch contact information",
        details: error.response?.data?.errors || {},
      },
      { status: error.response?.status || 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, phone, subject, message } =
      await request.json();
    const language = request.headers.get("Accept-Language") || "en";

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/contact/send`,
      { first_name, last_name, email, phone, subject, message },
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
        error: error.response?.data?.message || "Failed",
        details: error.response?.data?.errors || {},
      },
      { status: error.response?.status || 500 }
    );
  }
}
