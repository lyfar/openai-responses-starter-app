'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Cloud, CloudRain, Sun, Thermometer, Wind, Droplets, AlertTriangle, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherData {
  currentWeather: {
    temperature: number;
    temperatureUnit: string;
    humidity: number;
    weatherIcon: number;
    weatherDescription: string;
    updateTime: string;
  };
  forecast: {
    generalSituation: string;
    updateTime: string;
    days: Array<{
      date: string;
      week: string;
      minTemperature: number;
      maxTemperature: number;
      temperatureUnit: string;
      humidity: { min: number; max: number };
      weatherIcon: number;
      forecastWeather: string;
    }>;
  };
  warnings: {
    activeWarnings: string[];
    details: Record<string, {
      name: string;
      code: string;
      type: string;
      actionCode: string;
      issueTime: string;
      updateTime: string;
    }>;
  };
  rainfall: {
    updateTime: string;
    stations: Array<{
      station: string;
      value: number;
      unit: string;
    }>;
  };
  uvIndex: {
    uvIndex: number;
    intensity: string;
    message: string | null;
    updateTime: string | null;
  };
  localForecast: {
    generalSituation: string;
    forecastPeriod: string;
    forecastDesc: string;
    outlook: string;
    updateTime: string;
  };
  warningInfo: {
    details: Array<{
      contents: string[];
      warningStatementCode: string;
      subtype: string;
      updateTime: string;
    }>;
    updateTime: string | null;
  };
}

interface HKAllWeatherCardsProps {
  data: WeatherData;
}

const loveMessages = {
  hot: [
    "Wow, it's quite toasty today, my dear! Remember to stay hydrated! 💦",
    "Such a warm day! Perfect for some iced milk tea together! 🧋",
    "Hot weather alert! Let's find some nice air-conditioned spots! ❄️",
  ],
  mild: [
    "The weather is just perfect today, darling! Like a warm hug! 🤗",
    "What lovely mild weather we're having! Shall we go for yum cha? 🫖",
    "Such pleasant temperatures! Perfect for a stroll in the park! 🌳",
  ],
  cool: [
    "Bit chilly today, sweetheart! Don't forget your jacket! 🧥",
    "Cool weather calls for some hot soup! How about some borscht? 🥣",
    "Perfect weather for some hot pot together! 🍲",
  ],
  rainy: [
    "Don't forget your umbrella, precious! It's a bit wet out there! ☔",
    "Rainy day! Perfect excuse for some cozy indoor time! 🏠",
    "Let me keep you dry with my weather updates! 💕",
  ]
};

function getWeatherMessage(temp: number, description: string): string {
  const randomIndex = Math.floor(Math.random() * 3);
  if (description.toLowerCase().includes('rain')) {
    return loveMessages.rainy[randomIndex];
  }
  if (temp >= 28) {
    return loveMessages.hot[randomIndex];
  }
  if (temp <= 20) {
    return loveMessages.cool[randomIndex];
  }
  return loveMessages.mild[randomIndex];
}

export function HKAllWeatherCards({ data }: HKAllWeatherCardsProps) {
  const weatherMessage = React.useMemo(() => 
    getWeatherMessage(data.currentWeather.temperature, data.currentWeather.weatherDescription),
    [data.currentWeather.temperature, data.currentWeather.weatherDescription]
  );

  return (
    <div className="space-y-6">
      {/* Gweilo's Love Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-pink-200 dark:border-pink-800"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">👻</span>
          <h2 className="text-lg font-medium text-pink-700 dark:text-pink-300">Gweilo's Weather Update</h2>
        </div>
        <p className="text-pink-600 dark:text-pink-300">{weatherMessage}</p>
      </motion.div>

      {/* Current Weather */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800"
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300">
              {data.currentWeather.temperature}°{data.currentWeather.temperatureUnit}
            </h2>
            <p className="text-blue-600 dark:text-blue-400">{data.currentWeather.weatherDescription}</p>
            <div className="flex items-center gap-2 mt-2 text-blue-500 dark:text-blue-400">
              <Droplets size={16} />
              <span>{data.currentWeather.humidity}% humidity</span>
            </div>
          </div>
          <div className="text-5xl">
            {data.currentWeather.weatherDescription.toLowerCase().includes('rain') ? '🌧️' :
             data.currentWeather.weatherDescription.toLowerCase().includes('cloud') ? '☁️' : '☀️'}
          </div>
        </div>
      </motion.div>

      {/* Warnings */}
      {data.warnings.activeWarnings.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-amber-50 to-red-50 dark:from-amber-900/20 dark:to-red-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800"
        >
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-amber-500" />
            <h2 className="text-lg font-medium text-amber-700 dark:text-amber-300">Active Warnings</h2>
          </div>
          <div className="space-y-3">
            {Object.entries(data.warnings.details).map(([code, warning]) => (
              <div key={code} className="flex items-start gap-3 text-amber-600 dark:text-amber-400">
                <span className="text-xl mt-1">⚠️</span>
                <div>
                  <p className="font-medium">{warning.name}</p>
                  <p className="text-sm text-amber-500 dark:text-amber-500">
                    Issued: {new Date(warning.issueTime).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 3-Day Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800"
      >
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="text-emerald-500" />
          <h2 className="text-lg font-medium text-emerald-700 dark:text-emerald-300">3-Day Forecast</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.forecast.days.slice(0, 3).map((day) => (
            <div key={day.date} className="p-4 rounded-lg bg-white/50 dark:bg-black/20">
              <p className="font-medium text-emerald-600 dark:text-emerald-400">{day.week}</p>
              <div className="flex items-center justify-between mt-2">
                <div className="text-emerald-500 dark:text-emerald-400">
                  <p className="text-sm">{day.minTemperature}° - {day.maxTemperature}°</p>
                  <p className="text-xs mt-1">{day.humidity.min}% - {day.humidity.max}%</p>
                </div>
                <div className="text-3xl">
                  {day.forecastWeather.toLowerCase().includes('rain') ? '🌧️' :
                   day.forecastWeather.toLowerCase().includes('cloud') ? '☁️' : '☀️'}
                </div>
              </div>
              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">{day.forecastWeather}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Local Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-6 rounded-xl border border-violet-200 dark:border-violet-800"
      >
        <div className="flex items-center gap-3 mb-4">
          <Cloud className="text-violet-500" />
          <h2 className="text-lg font-medium text-violet-700 dark:text-violet-300">Local Forecast</h2>
        </div>
        <div className="space-y-3">
          <p className="text-violet-600 dark:text-violet-400">{data.localForecast.forecastDesc}</p>
          <p className="text-sm text-violet-500 dark:text-violet-500">{data.localForecast.outlook}</p>
        </div>
      </motion.div>

      {/* UV Index */}
      {data.uvIndex.uvIndex > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sun className="text-yellow-500" />
            <h2 className="text-lg font-medium text-yellow-700 dark:text-yellow-300">UV Index</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-yellow-500">{data.uvIndex.uvIndex}</div>
            <div>
              <p className="text-yellow-600 dark:text-yellow-400 capitalize">{data.uvIndex.intensity}</p>
              {data.uvIndex.message && (
                <p className="text-sm text-yellow-500 mt-1">{data.uvIndex.message}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 