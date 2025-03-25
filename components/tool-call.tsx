import React from "react";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import HKRainfallResponse from './HKRainfallResponse';
import HKRegionalRainfallResponse from './HKRegionalRainfallResponse';
import HKLocalForecastResponse from './HKLocalForecastResponse';
import HKUVIndexResponse from './HKUVIndexResponse';
import HKWarningResponse from './HKWarningResponse';
import HKSpecialTipsResponse from './HKSpecialTipsResponse';
import { RainfallWrapper } from './wrappers/RainfallWrapper';
import { WeatherMessageWrapper } from './WeatherMessageWrapper';

import { ToolCallItem } from "@/lib/assistant";
import { BookOpenText, Clock, Globe, Zap } from "lucide-react";

interface ToolCallProps {
  toolCall: ToolCallItem;
}

function ApiCallCell({ toolCall }: ToolCallProps) {
  const isWeatherTool = ['get_hk_rainfall', 'get_hk_uv_index', 'get_hk_warning_info', 'get_hk_local_forecast'].includes(toolCall.name || '');

  // Always show the lovely message for weather tools
  const weatherMessage = isWeatherTool ? (
    <WeatherMessageWrapper toolName={toolCall.name || ''} isVisible={true} />
  ) : null;

  let weatherData = null;

  // Check if this is a Hong Kong rainfall function call with output
  if (toolCall.name === 'get_hk_rainfall' && toolCall.output) {
    try {
      const rainfallData = JSON.parse(toolCall.output);
      const region = toolCall.parsedArguments?.region;
      
      weatherData = typeof region === 'string' ? 
        <HKRegionalRainfallResponse data={rainfallData} region={region} /> :
        <RainfallWrapper data={rainfallData} />;
    } catch (error) {
      console.error('Error parsing rainfall data:', error);
    }
  }

  // Check if this is a Hong Kong local forecast function call with output
  if (toolCall.name === 'get_hk_local_forecast' && toolCall.output) {
    try {
      const forecastData = JSON.parse(toolCall.output);
      weatherData = <HKLocalForecastResponse data={forecastData} />;
    } catch (error) {
      console.error('Error parsing local forecast data:', error);
    }
  }

  // Check if this is a Hong Kong UV index function call with output
  if (toolCall.name === 'get_hk_uv_index' && toolCall.output) {
    try {
      const uvData = JSON.parse(toolCall.output);
      weatherData = <HKUVIndexResponse data={uvData} />;
    } catch (error) {
      console.error('Error parsing UV index data:', error);
    }
  }

  // Check if this is a Hong Kong warning function call with output
  if (toolCall.name === 'get_hk_warning_info' && toolCall.output) {
    try {
      const warningData = JSON.parse(toolCall.output);
      weatherData = <HKWarningResponse data={warningData} />;
    } catch (error) {
      console.error('Error parsing warning data:', error);
    }
  }

  // Check if this is a Hong Kong special tips function call with output
  if (toolCall.name === 'get_hk_special_tips' && toolCall.output) {
    try {
      const tipsData = JSON.parse(toolCall.output);
      weatherData = <HKSpecialTipsResponse data={tipsData} />;
    } catch (error) {
      console.error('Error parsing special tips data:', error);
    }
  }

  return (
    <div className="flex flex-col w-[70%] relative mb-[-8px]">
      {/* Show weather data or other tool response */}
      <div>
        <div className="flex flex-col text-sm rounded-[16px]">
          {/* Show the lovely message for weather tools */}
          {weatherMessage}

          {/* Show weather data if available */}
          {weatherData && (
            <div className="mt-4">
              {weatherData}
            </div>
          )}

          {/* Show raw output for non-weather tools */}
          {toolCall.output && !isWeatherTool && (
            <div className="bg-[#fafafa] dark:bg-background rounded-xl py-2 ml-4 mt-2">
              <div className="max-h-96 overflow-y-scroll mx-6 p-2 text-xs">
                <SyntaxHighlighter
                  customStyle={{
                    backgroundColor: "transparent",
                    padding: "8px",
                    paddingLeft: "0px",
                    marginTop: 0,
                  }}
                  language="json"
                  style={oneDark}
                >
                  {JSON.stringify(JSON.parse(toolCall.output), null, 2)}
                </SyntaxHighlighter>
              </div>
            </div>
          )}

          {/* Show waiting message if no output yet */}
          {!toolCall.output && !isWeatherTool && (
            <div className="text-muted dark:text-muted-foreground flex items-center gap-2 py-2">
              <Clock size={16} /> Waiting for result...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FileSearchCell({ toolCall }: ToolCallProps) {
  return (
    <div className="flex gap-2 items-center text-secondary dark:text-secondary mb-[-16px] ml-[-8px]">
      <span className="text-lg">📁</span>
      <div className="text-sm font-medium mb-0.5">
        {toolCall.status === "completed"
          ? "Searched files"
          : "Searching files..."}
      </div>
    </div>
  );
}

function WebSearchCell({ toolCall }: ToolCallProps) {
  return (
    <div className="flex gap-2 items-center text-secondary dark:text-secondary mb-[-16px] ml-[-8px]">
      <span className="text-lg">🔍</span>
      <div className="text-sm font-medium">
        {toolCall.status === "completed"
          ? "Searched the web"
          : "Searching the web..."}
      </div>
    </div>
  );
}

export default function ToolCall({ toolCall }: ToolCallProps) {
  return (
    <div className="flex justify-start pt-2">
      {(() => {
        switch (toolCall.tool_type) {
          case "function_call":
            return <ApiCallCell toolCall={toolCall} />;
          case "file_search_call":
            return <FileSearchCell toolCall={toolCall} />;
          case "web_search_call":
            return <WebSearchCell toolCall={toolCall} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}
