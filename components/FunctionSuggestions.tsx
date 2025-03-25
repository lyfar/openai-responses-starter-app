"use client";

import { FC } from 'react';
import { toolsList } from '@/config/tools-list';

interface FunctionSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const FunctionSuggestions: FC<FunctionSuggestionsProps> = ({ onSuggestionClick }) => {
  // Create suggestions for all available functions with emojis
  const suggestions = [
    {
      text: "Weather",
      description: "Get current weather, forecast and warnings",
      action: "get_hk_weather_package unit=celsius",
      emoji: "🌤️"
    },
    {
      text: "Rainfall",
      description: "Get Hong Kong rainfall data",
      action: "get_hk_rainfall",
      emoji: "🌧️"
    },
    {
      text: "UV Index",
      description: "Get Hong Kong UV index",
      action: "get_hk_uv_index",
      emoji: "☀️"
    },
    {
      text: "Warnings",
      description: "Get active weather warnings",
      action: "get_hk_warning_info",
      emoji: "⚠️"
    },
    {
      text: "Local Forecast",
      description: "Get detailed local weather forecast",
      action: "get_hk_local_forecast",
      emoji: "🌈"
    },
    {
      text: "Bus Info",
      description: "Get KMB bus information",
      action: "get_kmb_bus_data routes",
      emoji: "🚌"
    }
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.action)}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background hover:bg-background/90 text-sm text-foreground transition-all border border-border hover:border-secondary shadow-sm"
          title={suggestion.description}
        >
          <span className="text-lg">
            {suggestion.emoji}
          </span>
          {suggestion.text}
        </button>
      ))}
    </div>
  );
};

export default FunctionSuggestions; 