import React, { useState, useEffect } from 'react';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  LOCAL_STORAGE_KEYS,
  UserSettings
} from '@/lib/localStorageService';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline';

interface RightSidebarProps {
  activeTool: string | null;
  onToolSelect: (tool: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ activeTool, onToolSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const settings = getLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS);
    // Default to true (collapsed) for the right sidebar if not set, as it often contains tools used less frequently
    return settings?.editorRightSidebarCollapsed ?? true; 
  });

  useEffect(() => {
    const settings = getLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS) || {};
    // Only update if the value has actually changed to avoid unnecessary writes
    if (settings.editorRightSidebarCollapsed !== isCollapsed) {
      setLocalStorageItem(LOCAL_STORAGE_KEYS.USER_SETTINGS, {
        ...settings,
        editorRightSidebarCollapsed: isCollapsed,
      });
    }
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const tools = [
    {
      id: 'draw',
      name: 'Draw',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
    },
    {
      id: 'highlight',
      name: 'Highlight',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
    },
    {
      id: 'text',
      name: 'Text',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
    },
    {
      id: 'crop',
      name: 'Crop',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
    }
  ];

  return (
    <div className={`transition-all duration-300 ease-in-out border-l border-gray-700 dark:border-gray-700 flex flex-col items-center overflow-y-auto relative ${isCollapsed ? 'w-12' : 'w-48 md:w-20'}`}>
      {/* Toggle Button - Placed at the top for right sidebar convention */}
      <button 
        onClick={toggleSidebar}
        className="p-2 w-full hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors sticky top-0 bg-gray-800 dark:bg-gray-900 border-b border-gray-700 dark:border-gray-700 z-10"
        title={isCollapsed ? "Expand Tools" : "Collapse Tools"}
      >
        {isCollapsed ? 
          <ChevronDoubleLeftIcon className="w-5 h-5 mx-auto" /> : 
          <ChevronDoubleRightIcon className="w-5 h-5 mx-auto" />
        }
      </button>

      {/* Tool Buttons */}
      <div className="flex-grow w-full">
        {tools.map(tool => (
          <button 
            key={tool.id}
            title={tool.name}
            className={`p-3 w-full flex items-center ${activeTool === tool.id ? 'bg-gray-700 dark:bg-gray-700' : 'hover:bg-gray-800 dark:hover:bg-gray-800'} transition-colors ${isCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => onToolSelect(tool.id)}
          >
            <svg className={`w-5 h-5 ${isCollapsed ? '' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {tool.icon}
            </svg>
            {!isCollapsed && <span className="text-xs whitespace-nowrap">{tool.name}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RightSidebar; 