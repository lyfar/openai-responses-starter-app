'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import TypingMessage from '../TypingMessage';

interface LocalForecastMessageProps {
  isVisible: boolean;
}

const loveMessages = [
  "Let me peek into the weather crystal ball for you, sunshine! 🔮",
  "Time to plan your day with the perfect weather forecast, my dear! 🌅",
  "Let's see what Mother Nature has planned for us today, sweetheart! 🌈",
  "Checking the forecast to make sure your day is as beautiful as you! ✨",
];

export function LocalForecastMessage({ isVisible }: LocalForecastMessageProps) {
  const message = React.useMemo(() => 
    loveMessages[Math.floor(Math.random() * loveMessages.length)],
    []
  );

  if (!isVisible) return null;

  return (
    <div className="chat-message">
      <div className="flex items-start gap-2 max-w-xl mb-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
          <span role="img" aria-label="Assistant">👻</span>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {/* Love Message */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <TypingMessage message={message} />
          </motion.div>
          
          {/* Typing Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className="flex gap-1 px-2"
          >
            <span className="text-xs text-gray-400 dark:text-gray-500">Fetching local forecast</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-xs text-gray-400 dark:text-gray-500"
            >
              ...
            </motion.span>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 