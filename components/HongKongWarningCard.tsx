"use client";

import React from "react";
import { AlertTriangle, AlertCircle, Clock } from "lucide-react";

interface WarningInfo {
  details: Array<{
    contents: string[];
    warningStatementCode: string;
    subtype: string;
    updateTime: string;
  }>;
  updateTime: string | null;
}

interface HongKongWarningCardProps {
  warningInfo: WarningInfo;
}

// Helper function to get warning severity color
const getWarningColor = (warningCode: string) => {
  // Log the warning code for debugging
  console.log("Warning code:", warningCode);
  
  switch (warningCode?.toLowerCase()) {
    case "wfire":
    case "fire":
    case "wfirer":
      return {
        bg: "bg-red-50 dark:bg-red-950",
        border: "border-red-200 dark:border-red-800",
        text: "text-red-700 dark:text-red-300",
        icon: "text-red-600 dark:text-red-400",
        muted: "text-red-600/75 dark:text-red-400/75"
      };
    case "wtcsgnl":
      return {
        bg: "bg-purple-50 dark:bg-purple-950",
        border: "border-purple-200 dark:border-purple-800",
        text: "text-purple-700 dark:text-purple-300",
        icon: "text-purple-600 dark:text-purple-400",
        muted: "text-purple-600/75 dark:text-purple-400/75"
      };
    case "wrain":
      return {
        bg: "bg-blue-50 dark:bg-blue-950",
        border: "border-blue-200 dark:border-blue-800",
        text: "text-blue-700 dark:text-blue-300",
        icon: "text-blue-600 dark:text-blue-400",
        muted: "text-blue-600/75 dark:text-blue-400/75"
      };
    default:
      return {
        bg: "bg-amber-50 dark:bg-amber-950",
        border: "border-amber-200 dark:border-amber-800",
        text: "text-amber-700 dark:text-amber-300",
        icon: "text-amber-600 dark:text-amber-400",
        muted: "text-amber-600/75 dark:text-amber-400/75"
      };
  }
};

// Helper function to format warning type
const formatWarningType = (code: string): string => {
  // Log the code for debugging
  console.log("Warning type code:", code);
  
  const warningTypes: { [key: string]: string } = {
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

const HongKongWarningCard: React.FC<HongKongWarningCardProps> = ({ warningInfo }) => {
  // Add debug logging
  console.log("Warning info received:", warningInfo);

  if (!warningInfo?.details?.length) {
    console.log("No warning details found");
    return null;
  }

  return (
    <div className="space-y-4">
      {warningInfo.details.map((warning, index) => {
        // Log each warning for debugging
        console.log("Processing warning:", warning);
        
        const colors = getWarningColor(warning.warningStatementCode);
        
        return (
          <div
            key={`${warning.warningStatementCode}-${index}`}
            className={`rounded-lg border ${colors.border} ${colors.bg} overflow-hidden`}
          >
            {/* Warning Header */}
            <div className="p-4 flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`h-5 w-5 ${colors.icon}`} />
                <h3 className={`font-medium ${colors.text}`}>
                  {formatWarningType(warning.warningStatementCode)}
                </h3>
              </div>
              <div className={`flex items-center gap-1 text-xs ${colors.muted}`}>
                <Clock className="h-3 w-3" />
                <time dateTime={warning.updateTime}>
                  {new Date(warning.updateTime).toLocaleString()}
                </time>
              </div>
            </div>

            {/* Warning Content */}
            <div className={`px-4 pb-4 ${colors.text}`}>
              {warning.contents?.map((content, contentIndex) => (
                <p key={contentIndex} className="text-sm mb-2 last:mb-0">
                  {content}
                </p>
              ))}
              {/* Fallback if contents is not an array */}
              {!Array.isArray(warning.contents) && warning.contents && (
                <p className="text-sm mb-2">
                  {warning.contents}
                </p>
              )}
            </div>

            {/* Warning Subtype */}
            {warning.subtype && (
              <div className={`px-4 pb-4 flex items-start gap-2 ${colors.text}`}>
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <p className="text-sm">
                  Warning Level: {warning.subtype}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HongKongWarningCard; 