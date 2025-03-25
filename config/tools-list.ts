// List of tools available to the assistant
// No need to include the top-level wrapper object as it is added in lib/tools/tools.ts
// More information on function calling: https://platform.openai.com/docs/guides/function-calling

export const toolsList = [
  {
    name: "get_hk_all_weather",
    description: "Get complete Hong Kong weather information including current conditions, forecast, rainfall, UV index, warnings, and special tips - all in one response",
    parameters: {
      unit: {
        type: "string",
        description: "Temperature unit to use",
        enum: ["celsius", "fahrenheit"],
      },
    },
  },
  {
    name: "get_hk_weather_package",
    description: "Get Hong Kong Observatory weather information including current conditions, forecast, and warnings",
    parameters: {
      unit: {
        type: "string",
        description: "Unit to get weather in",
        enum: ["celsius", "fahrenheit"],
      },
    },
  },
  {
    name: "get_hk_rainfall",
    description: "Get Hong Kong Observatory rainfall data across different districts",
    parameters: {},
  },
  {
    name: "get_hk_local_forecast",
    description: "Get a detailed Hong Kong local weather forecast with general situation and outlook",
    parameters: {},
  },
  {
    name: "get_hk_uv_index",
    description: "Get current UV Index information for Hong Kong",
    parameters: {},
  },
  {
    name: "get_hk_warning_info",
    description: "Get detailed information about active weather warnings in Hong Kong",
    parameters: {},
  },
  {
    name: "get_hk_special_tips",
    description: "Get special weather tips and advisories from the Hong Kong Observatory",
    parameters: {},
  },
  {
    name: "get_joke",
    description: "Get a programming joke",
    parameters: {},
  },
  {
    name: "get_kmb_bus_data",
    description: "Get KMB (Kowloon Motor Bus) data including routes, stops, and real-time ETAs",
    parameters: {
      dataType: {
        type: "string",
        description: "Type of data to retrieve",
        enum: ["routes", "stops", "route-stops", "eta", "route-with-stops"],
      },
      route: {
        type: "string",
        description: "Bus route number (e.g., '1', '960')",
      },
      stopId: {
        type: "string",
        description: "Bus stop ID",
      },
      bound: {
        type: "string",
        description: "Direction of the route (O for outbound, I for inbound)",
        enum: ["O", "I"],
      },
      serviceType: {
        type: "string",
        description: "Service type of the route (usually '1')",
      },
      enhanced: {
        type: "boolean",
        description: "Whether to return enhanced data with calculated minutes to arrival and formatted times",
      },
    },
  },
];
