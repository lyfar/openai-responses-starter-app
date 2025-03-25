// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  try {
    // Fetch data from the Hong Kong Observatory API for Current Weather Report
    // According to the documentation, UV Index is part of the Current Weather Report
    const response = await fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Current Weather data: ${response.statusText}`);
    }

    const data = await response.json();

    // Extract UV Index data from the current weather report
    if (!data.uvindex || !data.uvindex.data || data.uvindex.data.length === 0) {
      return new Response(
        JSON.stringify({
          error: "UV Index data not available in the current weather report",
          message: "The API response did not contain UV Index data"
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Process the UV Index data
    const processedData = {
      uvIndex: data.uvindex.data[0]?.value || null,
      intensity: data.uvindex.data[0]?.desc || null,
      message: data.uvindex.message || null,
      updateTime: data.uvindex.updateTime || null,
    };

    // Return the processed data
    return new Response(JSON.stringify(processedData), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching UV Index data:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch UV Index data",
        message: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
} 