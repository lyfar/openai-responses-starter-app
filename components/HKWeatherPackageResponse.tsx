"use client";

import { FC } from "react";
import { CloudSun, Droplets, ThermometerSun, AlertTriangle } from "lucide-react";

interface WeatherDay {
  date: string;
  week: string;
  minTemperature: number;
  maxTemperature: number;
  temperatureUnit: string;
  humidity: {
    min: number;
    max: number;
  };
  weatherIcon: number;
  forecastWeather: string;
}

interface ForecastData {
  generalSituation: string;
  updateTime: string;
  days: WeatherDay[];
}

interface CurrentWeather {
  temperature: number;
  temperatureUnit: string;
  humidity: number;
  weatherIcon: number;
  weatherDescription: string;
  updateTime: string;
}

interface WarningsData {
  activeWarnings: string[];
  details: Record<string, any>;
}

interface WeatherPackageData {
  currentWeather: CurrentWeather;
  forecast: ForecastData;
  warnings: WarningsData;
}

interface HKWeatherPackageResponseProps {
  data: WeatherPackageData;
}

const HKWeatherPackageResponse: FC<HKWeatherPackageResponseProps> = ({ data }) => {
  if (!data) return null;

  const { currentWeather, forecast, warnings } = data;

  // Helper function to format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  // Helper function to format forecast date
  const formatForecastDate = (dateStr: string) => {
    if (!dateStr) return "";
    // Handle YYYYMMDD format
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    if (isNaN(date.getTime())) return "";
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to format warning code
  const formatWarningCode = (code: string): string => {
    const warningTypes: Record<string, string> = {
      "WFIRE": "Fire Danger Warning",
      "FIRE": "Fire Danger Warning",
      "WFIRER": "Fire Danger Warning",
      "WTCSGNL": "Tropical Cyclone Warning",
      "WRAIN": "Rainstorm Warning",
      "WFROST": "Frost Warning",
      "WHOT": "Hot Weather Warning",
      "WCOLD": "Cold Weather Warning",
      "WMSGNL": "Strong Monsoon Warning",
      "WTMW": "Tsunami Warning",
      "WTHUNDER": "Thunderstorm Warning"
    };

    return warningTypes[code] || code;
  };

  return (
    <div className="mt-2 mb-4">
      <div className="rounded-xl border border-border bg-[#0A0A0A] overflow-hidden">
        {/* Header with current weather */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CloudSun className="h-5 w-5 text-[#00FF47]" />
              <h3 className="font-medium text-[#00FF47]">Current Weather</h3>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDate(currentWeather.updateTime)}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Temperature */}
            <div className="bg-[#1A1A1A] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <ThermometerSun className="h-5 w-5 text-[#00FF47]" />
                <span className="text-sm font-medium text-gray-300">Temperature</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {currentWeather.temperature}°{currentWeather.temperatureUnit}
              </div>
              <div className="text-sm text-gray-300 mt-1">
                {currentWeather.weatherDescription}
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-[#1A1A1A] p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-5 w-5 text-[#00FF47]" />
                <span className="text-sm font-medium text-gray-300">Humidity</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {currentWeather.humidity}%
              </div>
            </div>
          </div>
        </div>

        {/* Forecast section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <CloudSun className="h-5 w-5 text-[#00FF47]" />
            <h3 className="font-medium text-[#00FF47]">9-Day Forecast</h3>
          </div>
          
          <div className="space-y-3">
            {forecast.days.map((day, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 w-24">
                    {index === 0 ? 'Today' : day.week}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-400 text-xs">
                    {day.humidity.min}-{day.humidity.max}%
                  </span>
                  <span className="text-white font-medium w-20 text-right">
                    {day.minTemperature}°-{day.maxTemperature}°
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warnings section */}
        {warnings && warnings.activeWarnings && warnings.activeWarnings.length > 0 && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium text-amber-500">Active Warnings</h3>
            </div>
            <div className="space-y-2">
              {warnings.activeWarnings.map((warning, index) => (
                <div
                  key={index}
                  className="text-sm bg-amber-900/20 text-amber-300 px-3 py-2 rounded-md flex items-center gap-2"
                >
                  <span className="text-amber-500">⚠️</span>
                  {formatWarningCode(warning)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-3 text-xs text-gray-400 flex items-center gap-2">
          <span className="text-base">📊</span>
          <span>Data from Hong Kong Observatory</span>
        </div>
      </div>
    </div>
  );
};

export default HKWeatherPackageResponse; 