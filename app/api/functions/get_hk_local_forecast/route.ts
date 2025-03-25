// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  try {
    // According to the documentation, local weather forecast uses dataType=flw
    const forecastResponse = await fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en"
    );

    if (!forecastResponse.ok) {
      throw new Error(`Failed to fetch local forecast data: ${forecastResponse.status}`);
    }

    let forecastData;
    try {
      forecastData = await forecastResponse.json();
    } catch (jsonError) {
      console.error("Error parsing forecast JSON:", jsonError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to parse forecast data", 
          message: jsonError instanceof Error ? jsonError.message : String(jsonError)
        }),
        { 
          status: 500,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Format the data according to the API documentation
    const processedData: Record<string, unknown> = {
      generalSituation: forecastData.generalSituation || "",
      forecastPeriod: forecastData.forecastPeriod || "",
      forecastDesc: forecastData.forecastDesc || "",
      outlook: forecastData.outlook || "",
      updateTime: forecastData.updateTime || new Date().toISOString()
    };

    // Additional information if available
    if (forecastData.tcInfo) {
      processedData.tcInfo = forecastData.tcInfo;
    }

    if (forecastData.fireDangerWarning) {
      processedData.fireDangerWarning = forecastData.fireDangerWarning;
    }

    return new Response(
      JSON.stringify(processedData),
      { 
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  } catch (error) {
    console.error("Error getting Hong Kong local forecast data:", error);
    return new Response(
      JSON.stringify({ 
        error: "Error getting Hong Kong local forecast data",
        message: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
} 