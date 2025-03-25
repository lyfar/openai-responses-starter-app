'use client';

import React from 'react';
import { useMessagesStore } from '@/stores/messages';
import HKRainfallResponse from '../HKRainfallResponse';

interface RainfallWrapperProps {
  data: any;
}

export function RainfallWrapper({ data }: RainfallWrapperProps) {
  const { messages, addMessage, clearMessages } = useMessagesStore();
  const hasInitialized = React.useRef(false);
  
  React.useEffect(() => {
    if (!hasInitialized.current) {
      // Clear previous messages
      clearMessages();
      
      // Add data response immediately
      addMessage('data-response', data);

      hasInitialized.current = true;
    }
  }, [addMessage, clearMessages, data]);

  // Reset the ref when component unmounts
  React.useEffect(() => {
    return () => {
      hasInitialized.current = false;
    };
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {/* Chat history container */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'data-response' && (
              <div className="mt-4">
                <HKRainfallResponse data={message.content} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 