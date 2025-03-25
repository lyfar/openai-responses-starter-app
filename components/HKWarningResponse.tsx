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

interface HKWarningResponseProps {
  data: WarningInfo;
}

// Helper function to get warning severity color
const getWarningColor = (warningCode: string) => {
  switch (warningCode?.toLowerCase()) {
    case "wfire":
    case "fire":
    case "wfirer":
      return {
        bg: "bg-red-950",
        border: "border-red-900",
        text: "text-red-50",
        icon: "text-red-400",
        muted: "text-red-200"
      };
    case "wtcsgnl":
      return {
        bg: "bg-purple-950",
        border: "border-purple-900",
        text: "text-purple-50",
        icon: "text-purple-400",
        muted: "text-purple-200"
      };
    case "wrain":
      return {
        bg: "bg-blue-950",
        border: "border-blue-900",
        text: "text-blue-50",
        icon: "text-blue-400",
        muted: "text-blue-200"
      };
    default:
      return {
        bg: "bg-amber-950",
        border: "border-amber-900",
        text: "text-amber-50",
        icon: "text-amber-400",
        muted: "text-amber-200"
      };
  }
};

// Helper function to format warning type
const formatWarningType = (code: string): string => {
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

const HKWarningResponse: React.FC<HKWarningResponseProps> = ({ data }) => {
  if (!data?.details?.length) {
    return null;
  }

  return (
    <div className="mt-2 mb-4">
      <div className="space-y-2">
        {data.details.map((warning, index) => {
          const colors = getWarningColor(warning.warningStatementCode);
          
          return (
            <div
              key={`${warning.warningStatementCode}-${index}`}
              className={`rounded-lg border ${colors.border} ${colors.bg} overflow-hidden`}
            >
              {/* Warning Header */}
              <div className="p-3 flex items-start justify-between gap-3">
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
              <div className={`px-3 pb-3 ${colors.text}`}>
                {warning.contents?.map((content, contentIndex) => (
                  <p key={contentIndex} className="text-sm mb-2 last:mb-0">
                    {content}
                  </p>
                ))}
                {!Array.isArray(warning.contents) && warning.contents && (
                  <p className="text-sm mb-2">
                    {warning.contents}
                  </p>
                )}
              </div>

              {/* Warning Subtype */}
              {warning.subtype && (
                <div className={`px-3 pb-3 flex items-start gap-2 ${colors.text}`}>
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
    </div>
  );
};

export default HKWarningResponse; 