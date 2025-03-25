# Hong Kong Weather Hub

This project implements a comprehensive Hong Kong weather information system using data from the Hong Kong Observatory APIs.

## Features

- **Current Weather**: Temperature, humidity, and general conditions
- **Weather Forecast**: 9-day forecast with temperature ranges and conditions
- **Local Weather Forecast**: Detailed forecast with general situation and outlook
- **Rainfall Information**: Current rainfall measurements across Hong Kong stations
- **UV Index**: Current UV radiation level with intensity and protection advice
- **Weather Warnings**: Detailed information about active weather warnings
- **Special Weather Tips**: Special weather advisories from the Hong Kong Observatory

## API Endpoints

The following API endpoints are implemented:

| Endpoint | Description | API Path |
|----------|-------------|----------|
| `get_hk_weather_package` | General weather package including current conditions, forecast, and warnings | `/api/functions/get_hk_weather_package` |
| `get_hk_rainfall` | Rainfall data across different districts | `/api/functions/get_hk_rainfall` |
| `get_hk_local_forecast` | Detailed local weather forecast | `/api/functions/get_hk_local_forecast` |
| `get_hk_uv_index` | Current UV Index information | `/api/functions/get_hk_uv_index` |
| `get_hk_warning_info` | Detailed information about active weather warnings | `/api/functions/get_hk_warning_info` |
| `get_hk_special_tips` | Special weather tips and advisories | `/api/functions/get_hk_special_tips` |
| `get_hk_all_weather` | Aggregated data from all the above endpoints | N/A (Client-side function) |

## UI Components

The weather information is presented using these components:

- `HongKongWeather.tsx`: Displays current weather conditions and forecast
- `HongKongRainfall.tsx`: Visualizes rainfall data across stations
- `HongKongUVIndex.tsx`: Shows UV index with appropriate color-coding
- `HongKongLocalForecast.tsx`: Presents detailed forecast information
- `HongKongWarningInfo.tsx`: Displays active weather warnings
- `HongKongSpecialTips.tsx`: Shows special weather advisories
- `HongKongWeatherHub.tsx`: Integrates all components with tabbed navigation

## User Interface

The Hong Kong Weather Hub is available at `/weather` and provides a tabbed interface to navigate between different types of weather information. The UI includes:

- Animated tab navigation for different weather data categories
- Responsive design that works on mobile and desktop
- Automatic data refresh every 15 minutes
- Manual refresh button
- Color-coded alerts and warnings for better visibility

## Chatbot Integration

When users ask about the weather through the chatbot interface, the system will call the comprehensive `get_hk_all_weather` function, which provides a complete weather picture in a single response. This includes current conditions, forecast, warnings, UV index, rainfall, and any special tips.

Refer to `docs/WEATHER_PROMPT_GUIDE.md` for detailed guidelines on how to handle weather-related queries.

## Data Sources

All weather data is sourced from the Hong Kong Observatory's public APIs:

- Current Weather Report: `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en`
- 9-day Forecast: `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en`
- Local Weather Forecast: `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=en`
- Weather Warning Information: `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=en`
- Special Weather Tips: `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=swt&lang=en`
- Rainfall Data: `https://data.weather.gov.hk/weatherAPI/opendata/hourlyRainfall.php?lang=en` 