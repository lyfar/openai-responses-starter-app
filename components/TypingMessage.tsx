'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

interface TypingMessageProps {
  message: string;
}

const TypingMessage: React.FC<TypingMessageProps> = ({ message }: TypingMessageProps) => {
  const characters: string[] = message.split('');

  return (
    <div className="mr-4 rounded-[16px] px-4 py-2 md:mr-24 bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground font-light">
      <div>
        {characters.map((char: string, index: number) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.05,
              delay: index * 0.03, // Adjust this value to control typing speed
            }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default TypingMessage; 