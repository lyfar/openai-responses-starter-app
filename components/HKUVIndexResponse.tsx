import React from "react";

interface UVIndexData {
  uvIndex: number;
  intensity: string;
  message: string | null;
  updateTime: string | null;
}

interface HKUVIndexResponseProps {
  data: UVIndexData;
}

const getUVDetails = (uvIndex: number) => {
  if (uvIndex >= 11) return {
    color: "text-primary",
    emoji: "⚠️",
    bgClass: "bg-background",
    intensityBg: "bg-primary/10"
  };
  if (uvIndex >= 8) return {
    color: "text-primary",
    emoji: "🔆",
    bgClass: "bg-background",
    intensityBg: "bg-primary/10"
  };
  if (uvIndex >= 6) return {
    color: "text-primary",
    emoji: "☀️",
    bgClass: "bg-background",
    intensityBg: "bg-primary/10"
  };
  if (uvIndex >= 3) return {
    color: "text-primary",
    emoji: "🌤️",
    bgClass: "bg-background",
    intensityBg: "bg-primary/10"
  };
  return {
    color: "text-primary",
    emoji: "⛅",
    bgClass: "bg-background",
    intensityBg: "bg-primary/10"
  };
};

const HKUVIndexResponse: React.FC<HKUVIndexResponseProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const { color, emoji, bgClass, intensityBg } = getUVDetails(data.uvIndex);

  return (
    <div className="mt-2 mb-4">
      <div className={`rounded-lg border border-border ${bgClass} overflow-hidden`}>
        {/* Header */}
        <div className="p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <span className="text-lg sm:text-xl">{emoji}</span>
            <h3 className="font-medium text-sm sm:text-base">UV Index</h3>
          </div>
          {data.updateTime && (
            <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
              <span className="text-sm sm:text-base">🕒</span>
              <time dateTime={data.updateTime}>
                {new Date(data.updateTime).toLocaleString()}
              </time>
            </div>
          )}
        </div>

        {/* UV Content */}
        <div className="p-3 sm:p-4 space-y-3">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className={`text-3xl sm:text-4xl font-bold ${color}`}>
              {data.uvIndex}
            </div>
            <div>
              <div className={`text-sm sm:text-lg font-medium text-secondary ${intensityBg} px-2 sm:px-3 py-1 rounded-full`}>
                {data.intensity.charAt(0).toUpperCase() + data.intensity.slice(1)}
              </div>
              {data.message && (
                <div className="text-xs sm:text-sm text-foreground mt-1 sm:mt-2">
                  {data.message}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-3 sm:px-4 pb-2 sm:pb-3 flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
          <span className="text-sm sm:text-base">📊</span>
          <span>Data from Hong Kong Observatory</span>
        </div>
      </div>
    </div>
  );
};

export default HKUVIndexResponse; 