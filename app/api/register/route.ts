// app/api/register/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const language = request.headers.get("Accept-Language") || "en";

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/register`,
      formData,
      {
        headers: {
          "Accept-Language": language,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.response?.data?.message || "Registration failed",
        details: error.response?.data?.errors || {},
      },
      { status: error.response?.status || 500 }
    );
  }
}
