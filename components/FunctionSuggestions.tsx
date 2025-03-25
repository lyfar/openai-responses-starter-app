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
      action: "What's the weather like in Hong Kong right now? Please show me in Celsius.",
      emoji: "🌤️"
    },
    {
      text: "Rainfall",
      description: "Get Hong Kong rainfall data",
      action: "How much rain has fallen in Hong Kong recently?",
      emoji: "🌧️"
    },
    {
      text: "UV Index",
      description: "Get Hong Kong UV index",
      action: "What's the UV index in Hong Kong today? Should I wear sunscreen?",
      emoji: "☀️"
    },
    {
      text: "Warnings",
      description: "Get active weather warnings",
      action: "Are there any weather warnings in Hong Kong I should know about?",
      emoji: "⚠️"
    },
    {
      text: "Local Forecast",
      description: "Get detailed local weather forecast",
      action: "What's the detailed weather forecast for different areas in Hong Kong?",
      emoji: "🌈"
    },
    {
      text: "Bus Info",
      description: "Get KMB bus information",
      action: "Can you show me the KMB bus routes and schedules?",
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