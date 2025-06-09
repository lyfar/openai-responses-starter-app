import React from "react";

interface LocalForecastData {
  generalSituation: string;
  forecastPeriod: string;
  forecastDesc: string;
  outlook: string;
  updateTime: string;
}

interface HKLocalForecastResponseProps {
  data: LocalForecastData;
}

const HKLocalForecastResponse: React.FC<HKLocalForecastResponseProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  const sections = [
    {
      title: "General Situation",
      content: data.generalSituation,
      emoji: "🌍"
    },
    {
      title: data.forecastPeriod,
      content: data.forecastDesc,
      emoji: "🌤️"
    },
    ...(data.outlook ? [{
      title: "Outlook",
      content: data.outlook,
      emoji: "🔮"
    }] : [])
  ];

  return (
    <div className="mt-2 mb-4">
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        {/* Header */}
        <div className="p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <span className="text-lg sm:text-xl">🌈</span>
            <h3 className="font-medium text-sm sm:text-base">Local Weather Forecast</h3>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
            <span className="text-sm sm:text-base">🕒</span>
            <time dateTime={data.updateTime}>
              {new Date(data.updateTime).toLocaleString()}
            </time>
          </div>
        </div>

        {/* Forecast Content */}
        <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-xs sm:text-sm font-medium text-secondary flex items-center gap-2 mb-1 sm:mb-2">
                <span className="text-base sm:text-lg">{section.emoji}</span>
                {section.title}
              </h4>
              <p className="text-xs sm:text-sm text-foreground pl-6 sm:pl-7 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
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

export default HKLocalForecastResponse; 