"use client";

import React, { useState, useEffect, useCallback } from "react";
import { get_hk_all_weather } from "@/config/functions";
import HKAllWeatherCards from "./HKAllWeatherCards";
import { Loader2, RefreshCw } from "lucide-react";

/**
 * This component demonstrates how to use the get_hk_all_weather function
 * to render weather information using our existing components
 */
export default function WeatherResponseDemo() {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Use the get_hk_all_weather function to fetch comprehensive weather data
      const data = await get_hk_all_weather({ unit: "celsius" });
      setWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies since it only uses setState functions which are stable

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      if (!mounted) return;
      await fetchWeatherData();
    };

    fetchData();
    
    // Refresh data every 15 minutes
    const interval = setInterval(fetchData, 15 * 60 * 1000);
    
    // Cleanup function
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [fetchWeatherData]); // Only depend on the memoized fetchWeatherData function

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4 space-y-4">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchWeatherData}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Retry</span>
        </button>
      </div>
    );
  }

  return <HKAllWeatherCards data={weatherData} />;
} 