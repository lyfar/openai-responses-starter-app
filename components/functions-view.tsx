"use client";

import { toolsList } from "@/config/tools-list";
import { Code, ArrowDown } from "lucide-react";
import React from "react";

type ToolParameter = {
  type: string;
  description?: string;
  enum?: string[];
  properties?: { [key: string]: ToolParameter };
};

// Example outputs for each function type
const functionExamples: { [key: string]: any } = {
  get_hk_uv_index: {
    uvIndex: 3,
    intensity: "Moderate",
    message: "Protection against sun exposure is needed",
    updateTime: "2024-03-25T10:45:00+08:00"
  },
  get_hk_warning_info: {
    details: [{
      warningStatementCode: "WHOT",
      subtype: "Hot Weather Warning",
      updateTime: "2024-03-25T10:45:00+08:00",
      contents: ["Very hot weather is expected today."]
    }],
    updateTime: "2024-03-25T10:45:00+08:00"
  },
  get_hk_rainfall: {
    updateTime: "2024-03-25T10:45:00+08:00",
    stations: [{
      station: "Central",
      value: 0.5,
      unit: "mm"
    }]
  },
  get_hk_local_forecast: {
    generalSituation: "The weather is fine over southern China and the northern part of the South China Sea.",
    forecastPeriod: "Tonight and tomorrow",
    forecastDesc: "Fine and dry. Hot during the day with light to moderate southerly winds.",
    outlook: "Hot during the day and relatively humid in the next couple of days.",
    updateTime: "2024-03-25T10:45:00+08:00"
  },
  get_hk_special_tips: {
    tips: ["Remember to stay hydrated in hot weather"],
    updateTime: "2024-03-25T10:45:00+08:00"
  },
  get_kmb_bus_data: {
    route: "1",
    bound: "1",
    serviceType: "1",
    stops: ["CENTRAL", "ADMIRALTY"],
    eta: [{
      stop: "CENTRAL",
      time: "2024-03-25T10:50:00+08:00",
      rmk: "On time"
    }]
  }
};

const getToolArgs = (parameters: {
  [key: string]: ToolParameter | undefined;
}) => {
  return (
    <div className="ml-4 space-y-2">
      {Object.entries(parameters).map(([key, value]) => {
        if (!value) return null;
        
        return (
          <div key={key} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-blue-600 dark:text-blue-400 font-medium text-xs">{key}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">{value.type}</span>
            </div>
            {value.description && (
              <div className="text-xs text-gray-400 dark:text-gray-500 ml-2">{value.description}</div>
            )}
            {value.enum && (
              <div className="ml-2 flex flex-wrap gap-1">
                {value.enum.map((option) => (
                  <span key={option} className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {option}
                  </span>
                ))}
              </div>
            )}
            {value.properties && (
              <div className="ml-2 mt-1 border-l-2 border-gray-100 dark:border-gray-700 pl-2">
                {getToolArgs(value.properties)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Get the display name for a tool
const getToolDisplayName = (name: string) => {
  return name.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
};

export default function FunctionsView() {
  return (
    <div className="flex flex-col space-y-6">
      {toolsList.map((tool) => (
        <div key={tool.name} className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-500 dark:text-blue-400 rounded-md p-1.5">
              <Code size={14} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {getToolDisplayName(tool.name)}
              </div>
              {tool.description && (
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {tool.description}
                </div>
              )}
            </div>
          </div>
          
          {/* Parameters section */}
          {tool.parameters && Object.keys(tool.parameters).length > 0 && (
            <div className="ml-8 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-md">
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Parameters:</div>
              {getToolArgs(tool.parameters)}
            </div>
          )}

          {/* Return type section */}
          {functionExamples[tool.name] && (
            <div className="ml-8 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <div className="flex items-center gap-1 text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
                <ArrowDown size={12} className="text-blue-500 dark:text-blue-400" />
                <span>Returns:</span>
              </div>
              <pre className="text-xs text-gray-600 dark:text-gray-300 overflow-x-auto">
                {JSON.stringify(functionExamples[tool.name], null, 2)}
              </pre>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
