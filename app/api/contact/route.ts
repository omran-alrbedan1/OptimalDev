import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { first_name, last_name, email, phone, subject, notes } =
      await request.json();

    // Validate required fields
    if (!first_name || !last_name || !email || !phone || !subject || !notes) {
      return NextResponse.json(
        {
          error: "All fields are required",
          details: {
            first_name: !first_name ? "First name is required" : null,
            last_name: !last_name ? "Last name is required" : null,
            email: !email ? "Email is required" : null,
            phone: !phone ? "Phone is required" : null,
            subject: !subject ? "Subject is required" : null,
            notes: !notes ? "notes is required" : null,
          },
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const language = request.headers.get("Accept-Language") || "en";
    const backendUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/contact/send`;

    console.log("Sending request to:", backendUrl);
    console.log("Request data:", {
      first_name,
      last_name,
      email,
      phone,
      subject,
      notes,
    });

    const response = await axios.post(
      backendUrl,
      { first_name, last_name, email, phone, subject, notes },
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
        timeout: 10000, // 10 second timeout
      }
    );

    console.log("Backend response:", response.data);

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully",
      data: response.data,
    });
  } catch (error: any) {
    console.error("Contact API Error Details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      backendUrl: process.env.NEXT_PUBLIC_BASE_URL,
    });

    // Handle axios errors
    if (error.response) {
      // Backend returned an error response
      return NextResponse.json(
        {
          error: error.response.data?.message || "Backend server error",
          details: error.response.data?.errors || {},
        },
        { status: error.response.status }
      );
    } else if (error.request) {
      // Request was made but no response received
      return NextResponse.json(
        {
          error:
            "No response from backend server. Please check if the server is running.",
        },
        { status: 502 }
      );
    } else {
      // Something else happened
      return NextResponse.json(
        {
          error: error.message || "Internal server error",
        },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: NextRequest) {
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
    console.error(
      "Contact GET API Error:",
      error.response?.data || error.message
    );
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
