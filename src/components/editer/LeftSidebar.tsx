import React, { useState, useEffect } from 'react';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  LOCAL_STORAGE_KEYS,
  UserSettings
} from '@/lib/localStorageService';
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from '@heroicons/react/24/outline'; // Example icons

interface LeftSidebarProps {
  activeCategory: string | null;
  onCategorySelect: (category: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeCategory, onCategorySelect }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const settings = getLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS);
    return settings?.editorLeftSidebarCollapsed ?? false; // Default to not collapsed
  });

  useEffect(() => {
    const settings = getLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS) || {};
    setLocalStorageItem(LOCAL_STORAGE_KEYS.USER_SETTINGS, {
      ...settings,
      editorLeftSidebarCollapsed: isCollapsed,
    });
  }, [isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Replace categories with editing tools
  const editingTools = [
    { 
      name: 'Selection', 
      id: 'selection', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
    },
    { 
      name: 'Text', 
      id: 'text', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /> 
    },
    { 
      name: 'Rectangle', 
      id: 'rectangle', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
    },
    { 
      name: 'Circle', 
      id: 'circle', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    },
    { 
      name: 'Line', 
      id: 'line', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 20h16M4 4l16 16" />
    },
    { 
      name: 'Pen', 
      id: 'pen', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    },
    { 
      name: 'Brush', 
      id: 'brush', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    },
    { 
      name: 'Eraser', 
      id: 'eraser', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    },
    { 
      name: 'Fill', 
      id: 'fill', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343" />
    },
    { 
      name: 'Eyedropper', 
      id: 'eyedropper', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    },
    { 
      name: 'Zoom', 
      id: 'zoom', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    },
    { 
      name: 'Hand', 
      id: 'hand', 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
    }
  ];

  return (
    <div className={`transition-all duration-300 ease-in-out border-r border-gray-700 dark:border-gray-700 flex flex-col items-center overflow-y-auto relative ${isCollapsed ? 'w-12' : 'w-48 md:w-20'}`}>
      {/* Tool Buttons */}
      <div className="flex-grow w-full">
        {editingTools.map(tool => (
          <button 
            key={tool.id}
            title={tool.name}
            className={`p-3 w-full flex items-center border-l-4 ${activeCategory === tool.id ? 'border-blue-500 bg-gray-700 dark:bg-gray-700' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors ${isCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => onCategorySelect(tool.id)}
          >
            <svg className={`w-5 h-5 ${isCollapsed ? '' : 'mr-2'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {tool.icon}
            </svg>
            {!isCollapsed && <span className="text-xs whitespace-nowrap">{tool.name}</span>}
          </button>
        ))}
      </div>
      
      {/* Toggle Button */}
      <button 
        onClick={toggleSidebar}
        className="p-2 w-full hover:bg-gray-700 dark:hover:bg-gray-700 transition-colors mt-auto sticky bottom-0 bg-gray-800 dark:bg-gray-900 border-t border-gray-700 dark:border-gray-700"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? 
          <ChevronDoubleRightIcon className="w-5 h-5 mx-auto" /> : 
          <ChevronDoubleLeftIcon className="w-5 h-5 mx-auto" />
        }
      </button>
    </div>
  );
};

export default LeftSidebar;
