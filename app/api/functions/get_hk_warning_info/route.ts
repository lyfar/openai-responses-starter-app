import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch warning information data from HKO API
    const response = await fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=en"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const warningData = await response.json();

    // Process the warning data
    const details = warningData.details || [];
    const updateTime = warningData.updateTime || null;

    // Return processed data
    return NextResponse.json({
      details,
      updateTime
    });
  } catch (error) {
    console.error("Error fetching HK warning information:", error);
    return NextResponse.json(
      { error: "Failed to fetch Hong Kong warning information" },
      { status: 500 }
    );
  }
} 