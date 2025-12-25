import { NextResponse } from "next/server";

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

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData?.message || "Failed to fetch profile",
          details: errorData,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch profile" },
      { status: 500 }
    );
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

    const formJson: Record<string, any> = {};
    formData.forEach((value, key) => {
      formJson[key] = value;
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": language,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formJson),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData?.message || "Profile update failed",
          details: errorData?.errors || {},
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Profile update failed" },
      { status: 500 }
    );
  }
}
