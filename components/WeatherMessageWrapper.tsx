'use client';

import * as React from 'react';
import { RainfallMessage } from './messages/RainfallMessage';
import { UVIndexMessage } from './messages/UVIndexMessage';
import { WarningMessage } from './messages/WarningMessage';
import { LocalForecastMessage } from './messages/LocalForecastMessage';

interface WeatherMessageWrapperProps {
  toolName: string;
  isVisible: boolean;
}

export function WeatherMessageWrapper({ toolName, isVisible }: WeatherMessageWrapperProps) {
  // Return the appropriate message component based on the tool name
  switch (toolName) {
    case 'get_hk_rainfall':
      return <RainfallMessage isVisible={isVisible} />;
    case 'get_hk_uv_index':
      return <UVIndexMessage isVisible={isVisible} />;
    case 'get_hk_warning_info':
      return <WarningMessage isVisible={isVisible} />;
    case 'get_hk_local_forecast':
      return <LocalForecastMessage isVisible={isVisible} />;
    default:
      return null;
  }
} 