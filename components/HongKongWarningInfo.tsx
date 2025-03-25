"use client";

import React from "react";
import { AlertTriangle, Clock, AlertCircle, ArrowRight, Info } from "lucide-react";

interface WarningDetail {
  warningStatementCode: string;
  subtype?: string;
  updateTime: string;
  contents: string[];
  actionCode?: string;
}

interface HongKongWarningInfoProps {
  data: {
    details: WarningDetail[];
    updateTime: string | null;
  };
}

const HongKongWarningInfo: React.FC<HongKongWarningInfoProps> = ({ data }) => {
  const { details, updateTime } = data;

  // Function to get warning icon and color based on type
  const getWarningStyle = (code: string) => {
    // TC = Tropical Cyclone, WTCSGNL = Tropical Cyclone Warning Signal
    if (code.includes("TC") || code.includes("WTCSGNL")) {
      return {
        icon: <AlertCircle size={20} />,
        color: "bg-red-100 text-red-800 border-red-300",
        iconColor: "text-red-600"
      };
    }
    
    // WFIRE = Fire Danger Warning
    if (code.includes("WFIRE")) {
      return {
        icon: <AlertTriangle size={20} />,
        color: "bg-orange-100 text-orange-800 border-orange-300",
        iconColor: "text-orange-600"
      };
    }
    
    // WFROST = Frost Warning
    if (code.includes("WFROST")) {
      return {
        icon: <Info size={20} />,
        color: "bg-blue-100 text-blue-800 border-blue-300",
        iconColor: "text-blue-600"
      };
    }
    
    // WHOT = Very Hot Weather Warning
    if (code.includes("WHOT")) {
      return {
        icon: <AlertTriangle size={20} />,
        color: "bg-yellow-100 text-yellow-800 border-yellow-300",
        iconColor: "text-yellow-600"
      };
    }
    
    // WCOLD = Cold Weather Warning
    if (code.includes("WCOLD")) {
      return {
        icon: <Info size={20} />,
        color: "bg-indigo-100 text-indigo-800 border-indigo-300",
        iconColor: "text-indigo-600"
      };
    }
    
    // WRAIN = Rainstorm Warning (AMBER, RED, BLACK)
    if (code.includes("WRAIN")) {
      if (code.includes("AMBER")) {
        return {
          icon: <AlertTriangle size={20} />,
          color: "bg-amber-100 text-amber-800 border-amber-300",
          iconColor: "text-amber-600"
        };
      }
      if (code.includes("RED")) {
        return {
          icon: <AlertTriangle size={20} />,
          color: "bg-red-100 text-red-800 border-red-300",
          iconColor: "text-red-600"
        };
      }
      if (code.includes("BLACK")) {
        return {
          icon: <AlertTriangle size={20} />,
          color: "bg-gray-800 text-white border-gray-600",
          iconColor: "text-white"
        };
      }
    }
    
    // Default
    return {
      icon: <Info size={20} />,
      color: "bg-gray-100 text-gray-800 border-gray-300",
      iconColor: "text-gray-600"
    };
  };

  if (!details || details.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden max-w-md mx-auto p-5">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Info size={20} />
          <p>No active weather warnings at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden max-w-md mx-auto">
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Hong Kong Weather Warnings
              </h3>
              {updateTime && (
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                  <Clock size={12} className="mr-1" />
                  {new Date(updateTime).toLocaleString()}
                </p>
              )}
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500 dark:text-red-400" />
          </div>
          
          <div className="space-y-4">
            {details.map((warning, index) => {
              const { icon, color, iconColor } = getWarningStyle(warning.warningStatementCode);
              
              return (
                <div key={index} className={`border rounded-lg overflow-hidden ${color}`}>
                  <div className="p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`${iconColor}`}>{icon}</span>
                      <span className="font-medium">
                        {warning.subtype || warning.warningStatementCode}
                      </span>
                    </div>
                    <span className="text-xs">
                      {new Date(warning.updateTime).toLocaleString(undefined, { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <div className="p-3 bg-white/80 dark:bg-gray-800/80">
                    {warning.contents.map((content, i) => (
                      <p key={i} className="text-sm my-1 whitespace-pre-line">
                        {content}
                      </p>
                    ))}
                    
                    {warning.actionCode && (
                      <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400">
                          <ArrowRight size={14} />
                          <span>Action: {warning.actionCode}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Data source: Hong Kong Observatory</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HongKongWarningInfo; 