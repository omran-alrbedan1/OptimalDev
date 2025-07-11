import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { id: string; testId: string } }
) {
  try {
    // Debugging: Log the incoming request
    console.log(
      `Received test submission for job ${params.id}, test ${params.testId}`
    );

    const requestData = await request.json();
    console.log("Submission data:", requestData);

    // Process the submission (example implementation)
    const score = calculateScore(requestData.answers);

    return NextResponse.json({
      message: "Test submitted successfully",
      score,
      submissionId: `sub_${Date.now()}`,
    });
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: error.message || "Test submission failed" },
      { status: 500 }
    );
  }
}

// Example scoring function
function calculateScore(answers: Record<string, any>): number {
  // Implement your actual scoring logic here
  return Math.floor(Math.random() * 100); // Temporary mock score
}
