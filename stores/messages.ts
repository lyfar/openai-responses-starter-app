import { create } from 'zustand';

interface Message {
  id: string;
  type: 'love-message' | 'data-response';
  content: any;
  timestamp: number;
}

interface MessagesState {
  messages: Message[];
  addMessage: (type: Message['type'], content: any) => void;
  clearMessages: () => void;
}

export const useMessagesStore = create<MessagesState>((set) => ({
  messages: [],
  addMessage: (type, content) => set((state) => ({
    messages: [...state.messages, {
      id: Math.random().toString(36).substring(7),
      type,
      content,
      timestamp: Date.now(),
    }],
  })),
  clearMessages: () => set({ messages: [] }),
})); 