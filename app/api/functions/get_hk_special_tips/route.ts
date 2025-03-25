import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch special weather tips data from HKO API
    const response = await fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=swt&lang=en"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const tipsData = await response.json();

    // Process the tips data
    // The response structure may contain special weather tips and update time
    const tips = tipsData.swt || [];
    const updateTime = tipsData.updateTime || null;

    // Return processed data
    return NextResponse.json({
      tips,
      updateTime
    });
  } catch (error) {
    console.error("Error fetching HK special weather tips:", error);
    return NextResponse.json(
      { error: "Failed to fetch Hong Kong special weather tips" },
      { status: 500 }
    );
  }
} 