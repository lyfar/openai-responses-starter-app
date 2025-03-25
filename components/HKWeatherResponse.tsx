"use client";

import React from "react";
import HKAllWeatherCards from "./HKAllWeatherCards";

/**
 * Component for displaying the Hong Kong weather data in the chatbot response
 * This is a wrapper around HKAllWeatherCards that ensures correct sizing and styling for chatbot responses
 */
interface HKWeatherResponseProps {
  data: any; // Weather data from get_hk_all_weather
}

const HKWeatherResponse: React.FC<HKWeatherResponseProps> = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="mt-2 mb-4 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
        <HKAllWeatherCards data={data} />
      </div>
    </div>
  );
};

export default HKWeatherResponse; 