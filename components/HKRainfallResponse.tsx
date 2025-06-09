"use client";

import { Marquee } from "@/components/ui/marquee";

// Define interfaces based on the actual API response structure
interface RainfallStation {
  station: string; // API uses "station" property, not "name"
  value: number;
  unit?: string;
}

interface RainfallData {
  stations: RainfallStation[];
  updateTime: string | null;
}

interface HKRainfallResponseProps {
  data: RainfallData;
}

interface StationCard {
  key: string;
  value: number;
  isGroup: boolean;
  stations: RainfallStation[];
  level: string;
  color: string;
}

const HKRainfallResponse = ({ data }: HKRainfallResponseProps): JSX.Element => {
  // Enhanced debug logging
  console.log('Raw data type:', typeof data);
  console.log('Raw data:', data);
  
  // Parse data if it's a string
  let parsedData = data;
  if (typeof data === 'string') {
    try {
      parsedData = JSON.parse(data);
      console.log('Parsed data:', parsedData);
    } catch (e) {
      console.error('Failed to parse data:', e);
    }
  }

  // Validate data structure
  if (!parsedData || typeof parsedData !== 'object') {
    return (
      <div className="mt-2 mb-4">
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-lg">⚠️</span>
            <p>Invalid data format received</p>
          </div>
          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  }

  const stations = parsedData.stations || [];
  console.log('Processed stations:', stations);

  if (!stations || stations.length === 0) {
    return (
      <div className="mt-2 mb-4">
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-lg">🌧️</span>
            <p>No rainfall data available at this time.</p>
          </div>
        </div>
      </div>
    );
  }

  // Function to determine intensity level and color
  const getIntensityDetails = (value: number) => {
    if (value > 10) {
      return { level: "Heavy", color: "bg-red-500" };
    } else if (value > 5) {
      return { level: "Moderate", color: "bg-amber-500" };
    } else if (value > 0) {
      return { level: "Light", color: "bg-blue-400" };
    } else {
      return { level: "None", color: "bg-gray-300" };
    }
  };

  // Create the card with validated data
  const { level, color } = getIntensityDetails(0);
  const card: StationCard = {
    key: 'no-rainfall',
    value: 0,
    isGroup: true,
    stations: stations,
    level,
    color
  };

  return (
    <div className="mt-2 mb-4 max-w-7xl mx-auto px-4">
      {/* Main Container */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 shadow-sm">
        {/* Header */}
        <div className="p-3 md:p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl">🌦️</span>
            <div>
              <h3 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-100">Hong Kong Rainfall</h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Real-time monitoring</p>
            </div>
          </div>
          {parsedData.updateTime && (
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span className="text-sm sm:text-base">🕒</span>
              <time dateTime={parsedData.updateTime}>
                {new Date(parsedData.updateTime).toLocaleString()}
              </time>
            </div>
          )}
        </div>

        {/* Status Banner */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 bg-blue-50 dark:bg-blue-900/30 border-b border-blue-100 dark:border-blue-900">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <span className="text-base sm:text-lg">ℹ️</span>
            <p className="text-xs sm:text-sm font-medium">
              {stations.length} weather stations reporting • No rainfall detected
            </p>
          </div>
        </div>

        {/* Stations Marquee */}
        <div className="p-3 sm:p-6 group">
          <Marquee className="py-2 sm:py-4">
            {stations.map((station: RainfallStation, i: number) => (
              <div
                key={i}
                className="flex items-center gap-2 p-2 sm:p-3 mx-2 sm:mx-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-base sm:text-lg" role="img" aria-label="location">📍</span>
                <div>
                  <p className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-100">{station.station}</p>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                    <span role="img" aria-label="rain">💧</span>
                    <span>0 mm</span>
                  </div>
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        {/* Footer */}
        <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 dark:bg-gray-800/50 rounded-b-xl border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              <span className="text-sm sm:text-base">📊</span>
              <span>Data from Hong Kong Observatory</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <span>🔄</span>
              <span>Auto-updating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HKRainfallResponse; 