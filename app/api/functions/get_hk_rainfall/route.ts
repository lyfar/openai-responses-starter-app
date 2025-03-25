// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: Request) {
  try {
    // According to the documentation, use the hourlyRainfall endpoint
    const rainfallResponse = await fetch(
      "https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php?lang=en"
    );

    if (!rainfallResponse.ok) {
      throw new Error(`Failed to fetch rainfall data: ${rainfallResponse.status}`);
    }

    let rainfallData;
    try {
      rainfallData = await rainfallResponse.json();
    } catch (jsonError) {
      console.error("Error parsing rainfall JSON:", jsonError);
      return new Response(
        JSON.stringify({ 
          error: "Failed to parse rainfall data", 
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

    // Check if the data contains hourlyRainfall
    if (!rainfallData.hourlyRainfall || !Array.isArray(rainfallData.hourlyRainfall)) {
      return new Response(
        JSON.stringify({ 
          error: "No rainfall station data available", 
          message: "The API returned no hourlyRainfall data"
        }),
        { 
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    // Process data according to the documentation format
    const processedData = {
      updateTime: rainfallData.obsTime || new Date().toISOString(),
      stations: rainfallData.hourlyRainfall.map((station: any) => ({
        station: station.automaticWeatherStation,
        value: station.value === "M" ? null : parseFloat(station.value),
        unit: station.unit
      })).filter((station: any) => station.value !== null) // Filter out stations under maintenance
    };

    // If no stations data is found, return an error
    if (!processedData.stations || processedData.stations.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: "No valid rainfall station data available", 
          message: "All stations are either under maintenance or no data is available"
        }),
        { 
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
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
    console.error("Error getting Hong Kong rainfall data:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to fetch rainfall data", 
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