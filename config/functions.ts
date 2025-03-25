// Functions mapping to tool calls
// Define one function per tool call - each tool call should have a matching function
// Parameters for a tool call are passed as an object to the corresponding function

export const get_hk_weather_package = async ({
  unit,
}: {
  unit: string;
}) => {
  console.log("Getting comprehensive HK weather package with unit:", unit);
  const res = await fetch(
    `/api/functions/get_hk_weather_package?unit=${unit}`
  ).then((res) => res.json());

  console.log("executed get_hk_weather_package function");

  return res;
};

export const get_hk_rainfall = async () => {
  console.log("Getting HK rainfall data");
  const res = await fetch(
    `/api/functions/get_hk_rainfall`
  ).then((res) => res.json());

  console.log("executed get_hk_rainfall function");

  return res;
};

export const get_joke = async () => {
  const res = await fetch(`/api/functions/get_joke`).then((res) => res.json());
  return res;
};

export const get_kmb_bus_data = async ({
  dataType,
  route,
  stopId,
  serviceType,
  bound,
  enhanced,
}: {
  dataType?: string;
  route?: string;
  stopId?: string;
  serviceType?: string;
  bound?: string;
  enhanced?: boolean;
}) => {
  console.log("Getting KMB bus data with parameters:", { dataType, route, stopId, serviceType, bound, enhanced });
  
  // Build the query string
  const params = new URLSearchParams();
  if (dataType) params.append("dataType", dataType);
  if (route) params.append("route", route);
  if (stopId) params.append("stopId", stopId);
  if (serviceType) params.append("serviceType", serviceType);
  if (bound) params.append("bound", bound);
  if (enhanced !== undefined) params.append("enhanced", enhanced.toString());
  
  const res = await fetch(
    `/api/functions/get_kmb_bus_data?${params.toString()}`
  ).then((res) => res.json());

  console.log("executed get_kmb_bus_data function");

  return res;
};

export const get_hk_local_forecast = async () => {
  console.log("Getting HK local weather forecast");
  const res = await fetch(
    `/api/functions/get_hk_local_forecast`
  ).then((res) => res.json());

  console.log("executed get_hk_local_forecast function");

  return res;
};

export const get_hk_uv_index = async () => {
  console.log("Getting HK UV Index information");
  const res = await fetch(
    `/api/functions/get_hk_uv_index`
  ).then((res) => res.json());

  console.log("executed get_hk_uv_index function");

  return res;
};

export const get_hk_warning_info = async () => {
  console.log("Getting HK weather warning information");
  const res = await fetch(
    `/api/functions/get_hk_warning_info`
  ).then((res) => res.json());

  console.log("executed get_hk_warning_info function");

  return res;
};

export const get_hk_special_tips = async () => {
  console.log("Getting HK special weather tips");
  const res = await fetch(
    `/api/functions/get_hk_special_tips`
  ).then((res) => res.json());

  console.log("executed get_hk_special_tips function");

  return res;
};

export const get_hk_all_weather = async ({
  unit = "celsius",
}: {
  unit?: string;
} = {}) => {
  console.log("Getting comprehensive Hong Kong weather information");
  
  try {
    // Call all weather-related functions in parallel
    const [
      weatherPackage,
      rainfall,
      uvIndex,
      localForecast,
      warningInfo,
      specialTips
    ] = await Promise.all([
      get_hk_weather_package({ unit }),
      get_hk_rainfall(),
      get_hk_uv_index(),
      get_hk_local_forecast(),
      get_hk_warning_info(),
      get_hk_special_tips()
    ]);
    
    // Combine all results into a single comprehensive response
    const result = {
      currentWeather: weatherPackage.currentWeather,
      forecast: weatherPackage.forecast,
      warnings: weatherPackage.warnings,
      rainfall: rainfall,
      uvIndex: uvIndex,
      localForecast: localForecast,
      warningInfo: warningInfo,
      specialTips: specialTips
    };
    
    console.log("executed get_hk_all_weather function");
    return result;
  } catch (error) {
    console.error("Error fetching comprehensive weather data:", error);
    return { error: "Could not retrieve complete weather information" };
  }
};

export const functionsMap = {
  get_hk_weather_package: get_hk_weather_package,
  get_hk_rainfall: get_hk_rainfall,
  get_hk_local_forecast: get_hk_local_forecast,
  get_hk_uv_index: get_hk_uv_index,
  get_hk_warning_info: get_hk_warning_info,
  get_hk_special_tips: get_hk_special_tips,
  get_hk_all_weather: get_hk_all_weather,
  get_joke: get_joke,
  get_kmb_bus_data: get_kmb_bus_data,
};
