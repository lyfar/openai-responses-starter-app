"use client";

import { HKAllWeatherCards } from '@/components/HKAllWeatherCards';

/**
 * Component for displaying the Hong Kong weather data in the chatbot response
 * This is a wrapper around HKAllWeatherCards that ensures correct sizing and styling for chatbot responses
 */
interface HKWeatherResponseProps {
  data: any; // Using any for now since we defined the full type in HKAllWeatherCards
}

const HKWeatherResponse: React.FC<HKWeatherResponseProps> = ({ data }) => {
  if (!data) return null;
  
  return (
    <div className="mt-2 mb-4">
      <HKAllWeatherCards data={data} />
    </div>
  );
};

export default HKWeatherResponse; 