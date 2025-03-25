import React from "react";
import { CloudRain, Clock } from "lucide-react";

interface RainfallStation {
  station: string;
  value: number;
}

interface RainfallData {
  stations: RainfallStation[];
  updateTime: string;
}

interface HKRegionalRainfallResponseProps {
  data: RainfallData;
  region: string;
}

const HKRegionalRainfallResponse: React.FC<HKRegionalRainfallResponseProps> = ({ data, region }) => {
  if (!data?.stations) {
    return null;
  }

  // Filter stations based on region
  const regionalStations = data.stations.filter(station => {
    const stationName = station.station.toLowerCase();
    const searchRegion = region.toLowerCase();
    
    // For Sai Kung, include both Sai Kung and Pak Tam Chung stations
    if (searchRegion === "sai kung") {
      return stationName.includes("sai kung") || 
             stationName.includes("pak tam chung") ||
             stationName.includes("kau sai chau");
    }
    
    return stationName.includes(searchRegion);
  });

  if (regionalStations.length === 0) {
    return (
      <div className="mt-2 mb-4">
        <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-3">
          <div className="text-blue-700 dark:text-blue-300">
            No rainfall data available for {region}.
          </div>
        </div>
      </div>
    );
  }

  // Get max rainfall value for relative bar sizing
  const maxRainfall = Math.max(...regionalStations.map(s => s.value));

  return (
    <div className="mt-2 mb-4">
      <div className="rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 overflow-hidden">
        {/* Header */}
        <div className="p-3 flex items-center justify-between border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
            <CloudRain className="h-5 w-5" />
            <h3 className="font-medium">{region} Rainfall</h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-600/75 dark:text-blue-400/75">
            <Clock className="h-3 w-3" />
            <time dateTime={data.updateTime}>
              {new Date(data.updateTime).toLocaleString()}
            </time>
          </div>
        </div>

        {/* Rainfall Data */}
        <div className="p-3">
          <div className="space-y-2">
            {regionalStations.map((station, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-32 text-sm text-blue-700 dark:text-blue-300">
                  {station.station}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-blue-100 dark:bg-blue-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 dark:bg-blue-400 rounded-full transition-all duration-500"
                      style={{ 
                        width: maxRainfall > 0 ? `${(station.value / maxRainfall) * 100}%` : '0%'
                      }}
                    />
                  </div>
                  <div className="w-12 text-sm text-blue-700 dark:text-blue-300 text-right">
                    {station.value} mm
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HKRegionalRainfallResponse; 