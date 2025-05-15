import React from 'react';

interface RightSidebarProps {
  activeTool: string | null;
  onToolSelect: (tool: string) => void;
}

const RightSidebar: React.FC<RightSidebarProps> = ({ activeTool, onToolSelect }) => {
  return (
    <div className="w-20 border-l border-gray-700 dark:border-gray-700 flex flex-col items-center">
      <button 
        className={`p-4 w-full flex flex-col items-center ${activeTool === 'draw' ? 'bg-gray-800 dark:bg-gray-800' : 'hover:bg-gray-800 dark:hover:bg-gray-800'} transition-colors`}
        onClick={() => onToolSelect('draw')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
        </svg>
        <span className="text-xs">Draw</span>
      </button>
      <button 
        className={`p-4 w-full flex flex-col items-center ${activeTool === 'highlight' ? 'bg-gray-800 dark:bg-gray-800' : 'hover:bg-gray-800 dark:hover:bg-gray-800'} transition-colors`}
        onClick={() => onToolSelect('highlight')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
        </svg>
        <span className="text-xs">Highlight</span>
      </button>
      <button 
        className={`p-4 w-full flex flex-col items-center ${activeTool === 'text' ? 'bg-gray-800 dark:bg-gray-800' : 'hover:bg-gray-800 dark:hover:bg-gray-800'} transition-colors`}
        onClick={() => onToolSelect('text')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
        </svg>
        <span className="text-xs">Text</span>
      </button>
      <button 
        className={`p-4 w-full flex flex-col items-center ${activeTool === 'crop' ? 'bg-gray-800 dark:bg-gray-800' : 'hover:bg-gray-800 dark:hover:bg-gray-800'} transition-colors`}
        onClick={() => onToolSelect('crop')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
        </svg>
        <span className="text-xs">Crop</span>
      </button>
    </div>
  );
};

export default RightSidebar; 