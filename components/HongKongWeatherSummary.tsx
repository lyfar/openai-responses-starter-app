"use client";

import React from "react";
import { CloudSun, Droplets, Sun, AlertTriangle, Lightbulb, Calendar } from "lucide-react";

interface HongKongWeatherSummaryProps {
  data: any; // The complete weather data from get_hk_all_weather
}

const HongKongWeatherSummary: React.FC<HongKongWeatherSummaryProps> = ({ data }) => {
  if (!data) return null;
  
  const { currentWeather, forecast, warnings, rainfall, uvIndex, localForecast, warningInfo, specialTips } = data;

  // Helper function to format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  // Check if there are active warnings
  const hasActiveWarnings = warningInfo?.details?.length > 0 || warnings?.activeWarnings?.length > 0;
  
  // Check if there are special tips
  const hasSpecialTips = specialTips?.tips?.length > 0;
  
  // Check if there's rainfall (any station with value > 0)
  const hasRainfall = rainfall?.stations?.some((station: any) => station.value > 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden max-w-2xl mx-auto">
      <div className="p-4">
        {/* Header and current weather */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold">Hong Kong Weather</h2>
          <span className="text-xs text-gray-500">
            Updated: {formatDate(currentWeather?.updateTime)}
          </span>
        </div>
        
        {/* Current conditions */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold">
                {currentWeather?.temperature}°{currentWeather?.temperatureUnit}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {currentWeather?.weatherDescription}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Humidity: {currentWeather?.humidity}%
              </div>
            </div>
            <CloudSun size={40} className="text-blue-500 dark:text-blue-400" />
          </div>
        </div>
        
        {/* Local forecast */}
        {localForecast && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CloudSun size={18} className="text-blue-500" />
              <h3 className="text-md font-semibold">Today&apos;s Forecast</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                {localForecast.forecastDesc}
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                <Calendar size={12} className="mr-1" />
                <span>{localForecast.forecastPeriod}</span>
              </div>
            </div>
          </div>
        )}

        {/* Active warnings */}
        {hasActiveWarnings && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle size={18} className="text-amber-500" />
              <h3 className="text-md font-semibold">Weather Warnings</h3>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
              <ul className="space-y-1 text-sm">
                {warnings?.activeWarnings?.map((warning: string, i: number) => (
                  <li key={`warning-${i}`} className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                    <span className="text-amber-800 dark:text-amber-300">{warning}</span>
                  </li>
                ))}
                {warningInfo?.details?.map((detail: any, i: number) => (
                  <li key={`detail-${i}`} className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                    <span className="text-amber-800 dark:text-amber-300">
                      {detail.subtype || detail.warningStatementCode}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {/* UV Index */}
        {uvIndex?.uvIndex !== null && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Sun size={18} className="text-yellow-500" />
              <h3 className="text-md font-semibold">UV Index</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Current level: <span className="font-semibold">{uvIndex.uvIndex}</span> ({uvIndex.intensity})
                </span>
                {uvIndex.message && (
                  <span className="text-xs text-blue-600 dark:text-blue-400">
                    {uvIndex.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Rainfall summary if there is rain */}
        {hasRainfall && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplets size={18} className="text-blue-500" />
              <h3 className="text-md font-semibold">Rainfall Summary</h3>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
              <div className="text-sm mb-1">
                {rainfall?.stations
                  .filter((s: any) => s.value > 0)
                  .slice(0, 3)
                  .map((s: any) => (
                    <div key={s.station} className="flex justify-between">
                      <span>{s.station}</span>
                      <span>{s.value} {s.unit}</span>
                    </div>
                  ))
                }
                {rainfall?.stations.filter((s: any) => s.value > 0).length > 3 && (
                  <div className="text-xs text-gray-500 mt-1">
                    +{rainfall.stations.filter((s: any) => s.value > 0).length - 3} more stations with rainfall
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500">
                Updated: {formatDate(rainfall?.updateTime)}
              </div>
            </div>
          </div>
        )}
        
        {/* Special tips */}
        {hasSpecialTips && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb size={18} className="text-amber-500" />
              <h3 className="text-md font-semibold">Special Weather Tips</h3>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-3">
              <ul className="space-y-2 text-sm">
                {specialTips?.tips?.slice(0, 2).map((tip: any, i: number) => (
                  <li key={`tip-${i}`} className="text-amber-800 dark:text-amber-300">
                    {tip.desc}
                  </li>
                ))}
                {specialTips?.tips?.length > 2 && (
                  <li className="text-xs text-amber-600">
                    +{specialTips.tips.length - 2} more tips
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
        
        {/* Week forecast summary */}
        {forecast?.days && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={18} className="text-blue-500" />
              <h3 className="text-md font-semibold">Next Days</h3>
            </div>
            <div className="overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {forecast.days.slice(0, 5).map((day: any, i: number) => (
                  <div key={`day-${i}`} className="flex flex-col items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-900 min-w-[80px]">
                    <span className="text-xs font-medium">{day.week.substring(0, 3)}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(day.date.substring(0, 4) + "-" + day.date.substring(4, 6) + "-" + day.date.substring(6, 8)).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
                    </span>
                    <div className="my-1 text-center">
                      <span className="text-xs">
                        {day.minTemperature}° - {day.maxTemperature}°{day.temperatureUnit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Footer note */}
        <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          Data source: Hong Kong Observatory
        </div>
      </div>
    </div>
  );
};

export default HongKongWeatherSummary; 