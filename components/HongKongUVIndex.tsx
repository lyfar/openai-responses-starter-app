import React from "react";
import { Sun, Clock, Shield, AlertTriangle } from "lucide-react";

interface HongKongUVIndexProps {
  data: {
    uvIndex: number | null;
    intensity: string | null;
    message: string | null;
    updateTime: string | null;
  };
}

// Helper function to get color and icon based on UV index
const getUVIndexDetails = (index: number | null) => {
  if (index === null) return { color: "bg-gray-200", textColor: "text-gray-700", icon: <Sun size={24} className="text-gray-600" /> };

  if (index <= 2) {
    return {
      color: "bg-green-100",
      textColor: "text-green-800",
      icon: <Sun size={24} className="text-green-600" />,
    };
  } else if (index <= 5) {
    return {
      color: "bg-yellow-100",
      textColor: "text-yellow-800",
      icon: <Sun size={24} className="text-yellow-600" />,
    };
  } else if (index <= 7) {
    return {
      color: "bg-orange-100",
      textColor: "text-orange-800",
      icon: <Sun size={24} className="text-orange-600" />,
    };
  } else if (index <= 10) {
    return {
      color: "bg-red-100",
      textColor: "text-red-800",
      icon: <AlertTriangle size={24} className="text-red-600" />,
    };
  } else {
    return {
      color: "bg-purple-100",
      textColor: "text-purple-800",
      icon: <AlertTriangle size={24} className="text-purple-600" />,
    };
  }
};

const HongKongUVIndex: React.FC<HongKongUVIndexProps> = ({ data }) => {
  const { uvIndex, intensity, message, updateTime } = data;
  const { color, textColor, icon } = getUVIndexDetails(uvIndex);

  if (!uvIndex) {
    return (
      <div className="rounded-lg overflow-hidden shadow border bg-white p-4">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Sun className="text-gray-600" size={20} />
          <span>UV Index Information</span>
        </h3>
        <p className="text-gray-500">No UV Index data is currently available.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden shadow border">
      <div className={`${color} p-4`}>
        <div className="flex justify-between items-center">
          <h3 className={`text-lg font-semibold mb-2 flex items-center gap-2 ${textColor}`}>
            {icon}
            <span>UV Index: {uvIndex}</span>
          </h3>
          <div className="rounded-full px-3 py-1 text-sm font-medium bg-white/80 shadow-sm">
            {intensity}
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/90 rounded-lg shadow-sm">
          <div className="flex flex-col space-y-3">
            {message && (
              <div className="flex items-start gap-2">
                <Shield size={18} className="text-blue-600 mt-0.5 min-w-[18px]" />
                <p className="text-gray-700 text-sm">{message}</p>
              </div>
            )}
            
            {updateTime && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                <Clock size={14} />
                <span>Updated: {updateTime}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-2 bg-gray-50 text-xs text-gray-500 text-center">
        Data provided by Hong Kong Observatory
      </div>
    </div>
  );
};

export default HongKongUVIndex; 