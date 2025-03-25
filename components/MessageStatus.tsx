'use client';
import React from 'react';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';

type MessageStatusProps = {
  status: 'idle' | 'loading' | 'error' | 'success';
  error?: string;
  onRetry?: () => void;
};

const MessageStatus: React.FC<MessageStatusProps> = ({ 
  status, 
  error, 
  onRetry 
}) => {
  if (status === 'idle') return null;
  
  return (
    <div className="flex items-center gap-2 text-sm mt-1">
      {status === 'loading' && (
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          <Loader2 size={16} className="animate-spin" />
          <span>Sending message...</span>
        </div>
      )}
      
      {status === 'error' && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle size={16} />
          <span>{error || 'Failed to send message'}</span>
          {onRetry && (
            <button 
              onClick={onRetry}
              className="ml-2 px-2 py-1 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded text-xs"
            >
              Retry
            </button>
          )}
        </div>
      )}
      
      {status === 'success' && (
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle size={16} />
          <span>Message sent successfully</span>
        </div>
      )}
    </div>
  );
};

export default MessageStatus; 