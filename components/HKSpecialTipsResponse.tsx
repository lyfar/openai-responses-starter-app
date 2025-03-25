import React from "react";

interface SpecialTipsData {
  tips: string[];
  updateTime: string | null;
}

interface HKSpecialTipsResponseProps {
  data: SpecialTipsData;
}

const HKSpecialTipsResponse: React.FC<HKSpecialTipsResponseProps> = ({ data }) => {
  if (!data?.tips || data.tips.length === 0) {
    return (
      <div className="mt-2 mb-4">
        <div className="rounded-lg border border-border bg-background p-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-lg">💭</span>
            <p>No special weather tips or advisories available at this time.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2 mb-4">
      <div className="rounded-lg border border-border bg-background overflow-hidden">
        {/* Header */}
        <div className="p-3 flex items-center justify-between border-b border-border">
          <div className="flex items-center gap-2 text-primary">
            <span className="text-xl">💡</span>
            <h3 className="font-medium">Special Weather Tips</h3>
          </div>
          {data.updateTime && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-base">🕒</span>
              <time dateTime={data.updateTime}>
                {new Date(data.updateTime).toLocaleString()}
              </time>
            </div>
          )}
        </div>

        {/* Tips Content */}
        <div className="p-4">
          <ul className="space-y-3">
            {data.tips.map((tip, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 text-sm text-foreground"
              >
                <span className="text-lg mt-[-2px]">✨</span>
                {tip}
              </li>
            ))}
          </ul>
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

export default HKSpecialTipsResponse; 