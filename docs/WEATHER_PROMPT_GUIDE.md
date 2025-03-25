# Weather Response Guidelines

When a user asks about the weather in Hong Kong, use the `get_hk_all_weather` function to provide a comprehensive response that includes all weather-related information in a single answer.

## When to Use the Comprehensive Weather Function

Use the `get_hk_all_weather` function when:
- User asks about the current weather in Hong Kong
- User asks for a weather forecast for Hong Kong
- User asks about rainfall, UV index, or weather warnings
- Any general query about Hong Kong weather conditions

## How to Format Weather Responses

There are two ways to format weather data in responses:

### 1. Using the Formatter Utility (Recommended)

We've created a utility function `formatWeatherResponse()` in `lib/weather-formatter.ts` that converts the response from `get_hk_all_weather` into a well-formatted markdown response. Use this approach for consistency.

Example usage:
```typescript
import { formatWeatherResponse } from '@/lib/weather-formatter';

// After getting weather data
const weatherData = await get_hk_all_weather({ unit: "celsius" });
const formattedResponse = formatWeatherResponse(weatherData);

// Now you can use formattedResponse directly in your answer
```

### 2. Creating a Custom Format

If you need to highlight specific weather information based on the user's query, you can create a custom format. For example, if the user specifically asks about rainfall, you can emphasize that section while still providing other weather information.

## Sample Weather Prompts and Responses

### User Asking for Weather

```
User: What's the weather like in Hong Kong today?
```

The assistant should call `get_hk_all_weather` and provide a comprehensive response that includes:

1. Current weather conditions (temperature, humidity, general conditions)
2. Weather forecast for today
3. Any active weather warnings
4. Current UV index if available
5. Rainfall information if relevant
6. Any special weather tips

### User Asking for Specific Weather Information

Even if the user asks for specific information (e.g., "What's the UV index in Hong Kong?"), it's often helpful to provide comprehensive weather information while highlighting the specific data they requested.

```
User: Is it raining in Hong Kong right now?
```

The assistant should still call `get_hk_all_weather` but emphasize the rainfall information in the response, while also providing a complete weather picture.

## Benefits of Comprehensive Weather Responses

1. Users get a complete weather picture in a single response
2. Reduces the need for follow-up queries 
3. Provides context that might be relevant to the user's needs (e.g., informing them about weather warnings even if they only asked about temperature)
4. Creates a more user-friendly experience

## Visual Components

For applications with UI capabilities, we also have a `HongKongWeatherSummary` component that can display the complete weather information in a visually appealing card. This component takes the response from `get_hk_all_weather` and renders it appropriately.

Always format the response to be easily readable with clear sections and appropriate emphasis on the most important or user-requested information. 