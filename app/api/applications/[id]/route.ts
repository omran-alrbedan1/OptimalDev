import { NextResponse } from "next/server";

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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/applications/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store", 
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData?.message || "Failed to fetch application details" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch application details" },
      { status: 500 }
    );
  }
}
