"use client";
import Assistant from "@/components/assistant";
import ToolsPanel from "@/components/tools-panel";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Menu, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Main() {
  const [isToolsPanelOpen, setIsToolsPanelOpen] = useState(false);

  return (
    <div className="flex justify-center h-screen">
      <div className={cn(
        "transition-all duration-300",
        isToolsPanelOpen ? "w-full md:w-[70%]" : "w-full"
      )}>
        <ErrorBoundary>
          <Assistant />
        </ErrorBoundary>
      </div>
      
      {/* Desktop panel */}
      <div className={cn(
        "hidden md:block transition-all duration-300",
        isToolsPanelOpen ? "w-[30%]" : "w-0 overflow-hidden"
      )}>
        <ToolsPanel />
      </div>

      {/* Theme toggle and panel controls */}
      <div className="fixed right-4 top-4 z-10 flex items-center gap-2">
        <ThemeToggle />
        <button 
          onClick={() => setIsToolsPanelOpen(!isToolsPanelOpen)}
          className="hidden md:flex items-center justify-center h-8 w-8 rounded-md bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          {isToolsPanelOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Mobile menu button */}
      <div className="absolute top-4 right-4 md:hidden">
        <button 
          onClick={() => setIsToolsPanelOpen(true)}
          className="flex items-center justify-center h-8 w-8 rounded-md bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-sm"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile overlay panel */}
      {isToolsPanelOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/30 dark:bg-black/50 md:hidden">
          <div className="w-full bg-white dark:bg-gray-800 h-full p-4">
            <button 
              className="mb-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors" 
              onClick={() => setIsToolsPanelOpen(false)}
            >
              <X size={24} />
            </button>
            <ToolsPanel />
          </div>
        </div>
      )}
    </div>
  );
}
