import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
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

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
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
    const status = error.response?.status || 500;
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch profile";

    return NextResponse.json({ error: errorMessage }, { status });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const language = request.headers.get("Accept-Language") || "en";
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Unauthorized - Token missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile`,
      formData,
      {
        headers: {
          "Accept-Language": language,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.message || "Profile update failed",
        details: error.response?.data?.errors || {},
      },
      { status: error.response?.status || 500 }
    );
  }
}
