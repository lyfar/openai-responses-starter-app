export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unit = searchParams.get("unit") || "celsius";

    // Fetch data from multiple HKO APIs in parallel
    const [currentWeather, forecast, warnings] = await Promise.all([
      // Current Weather
      fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en")
        .then(res => res.ok ? res.json() : null),
      
      // 9-day Forecast
      fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en")
        .then(res => res.ok ? res.json() : null),
      
      // Weather Warnings
      fetch("https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en")
        .then(res => res.ok ? res.json() : null),
    ]);

    // Icon code to description mapping
    const weatherIconMap: Record<number, string> = {
      50: "Sunny",
      51: "Sunny Periods", 
      52: "Sunny Intervals",
      60: "Cloudy",
      61: "Overcast",
      62: "Light Rain",
      63: "Rain",
      64: "Heavy Rain",
      65: "Thunderstorms",
      76: "Thunderstorms with Rain",
      77: "Thunderstorms with Heavy Rain",
      80: "Mist",
      81: "Mist",
      82: "Fog",
      83: "Fog",
      90: "Hot",
      91: "Warm",
      92: "Cool",
      93: "Cold"
    };

    // Process current weather data
    let currentWeatherData = null;
    if (currentWeather) {
      // Extract temperature
      const temperature = currentWeather.temperature?.data?.find(
        (item: any) => item.place === "Hong Kong Observatory"
      )?.value;

      // Convert temperature if needed
      let convertedTemperature = temperature;
      if (unit?.toLowerCase() === "fahrenheit" && temperature !== undefined) {
        convertedTemperature = (temperature * 9/5) + 32;
      }

      // Get weather icon and description
      const iconCode = Array.isArray(currentWeather.icon) && currentWeather.icon.length > 0 
        ? currentWeather.icon[0] 
        : null;

      const weatherDescription = iconCode && weatherIconMap[iconCode] 
        ? weatherIconMap[iconCode] 
        : "Unknown";

      currentWeatherData = {
        temperature: convertedTemperature,
        temperatureUnit: unit?.toLowerCase() === "fahrenheit" ? "F" : "C",
        humidity: currentWeather.humidity?.data?.[0]?.value,
        weatherIcon: iconCode,
        weatherDescription: weatherDescription,
        updateTime: currentWeather.updateTime
      };
    }

    // Process forecast data
    let forecastData = null;
    if (forecast) {
      forecastData = {
        generalSituation: forecast.generalSituation,
        updateTime: forecast.updateTime,
        days: forecast.weatherForecast?.map((day: any) => {
          // Convert temperatures if needed
          let minTemp = day.forecastMintemp.value;
          let maxTemp = day.forecastMaxtemp.value;
          
          if (unit?.toLowerCase() === "fahrenheit") {
            minTemp = (minTemp * 9/5) + 32;
            maxTemp = (maxTemp * 9/5) + 32;
          }

          return {
            date: day.forecastDate,
            week: day.week,
            minTemperature: minTemp,
            maxTemperature: maxTemp,
            temperatureUnit: unit?.toLowerCase() === "fahrenheit" ? "F" : "C",
            humidity: {
              min: day.forecastMinrh.value,
              max: day.forecastMaxrh.value
            },
            weatherIcon: day.ForecastIcon,
            forecastWeather: day.forecastWeather
          };
        })
      };
    }

    // Process warnings
    let warningsData = null;
    if (warnings) {
      // Extract active warnings
      const activeWarnings = Object.entries(warnings)
        .filter(entry => entry[1])
        .map(entry => entry[0]);

      warningsData = {
        activeWarnings: activeWarnings,
        details: warnings
      };
    }

    return new Response(
      JSON.stringify({
        currentWeather: currentWeatherData,
        forecast: forecastData,
        warnings: warningsData
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting Hong Kong weather package:", error);
    return new Response(
      JSON.stringify({ error: "Error getting Hong Kong weather package" }),
      { status: 500 }
    );
  }
} 