import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = request.headers.get("Accept-Language") || "en";

    const page = searchParams.get("page") || "1";
    const search = searchParams.get("search") || "";
    const work_sectors = searchParams.get("work_sectors") || "";
    const contract_types = searchParams.get("contract_types") || "";
    const work_modes = searchParams.get("work_modes") || "";
    const experience_levels = searchParams.get("experience_levels") || "";
    const education_levels = searchParams.get("education_levels") || "";
    const countries = searchParams.get("countries") || "";
    const salary_min = searchParams.get("salary_min") || "";
    const salary_max = searchParams.get("salary_max") || "";

    const params = new URLSearchParams();
    params.append("page", page);

    if (search) params.append("search", search);
    if (work_sectors) params.append("work_sectors", work_sectors);
    if (contract_types) params.append("contract_types", contract_types);
    if (work_modes) params.append("work_modes", work_modes);
    if (experience_levels)
      params.append("experience_levels", experience_levels);
    if (education_levels) params.append("education_levels", education_levels);
    if (countries) params.append("countries", countries);
    if (salary_min) params.append("salary_min", salary_min);
    if (salary_max) params.append("salary_max", salary_max);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/jobs?${params.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": language,
        },
      }
    );

    return NextResponse.json({
      data: response.data?.data || response.data,
      meta: response.data?.meta,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
