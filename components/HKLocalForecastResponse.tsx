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
        <div className="p-3 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <span className="text-xl">🌈</span>
            <h3 className="font-medium">Local Weather Forecast</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-base">🕒</span>
            <time dateTime={data.updateTime}>
              {new Date(data.updateTime).toLocaleString()}
            </time>
          </div>
        </div>

        {/* Forecast Content */}
        <div className="p-4 space-y-4">
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="text-sm font-medium text-secondary flex items-center gap-2 mb-2">
                <span className="text-lg">{section.emoji}</span>
                {section.title}
              </h4>
              <p className="text-sm text-foreground pl-7 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 pb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-base">📊</span>
          <span>Data from Hong Kong Observatory</span>
        </div>
      </div>
    </div>
  );
};

export default HKLocalForecastResponse; 