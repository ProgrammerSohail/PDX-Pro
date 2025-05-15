import React from 'react';

interface BottomToolbarProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
}

const BottomToolbar: React.FC<BottomToolbarProps> = ({ zoom, onZoomIn, onZoomOut }) => {
  return (
    <div className="border-t border-gray-700 dark:border-gray-700 p-2 flex justify-end items-center">
      <div className="mr-4 bg-gray-800 dark:bg-gray-800 rounded-lg flex items-center">
        <button 
          className="px-2 py-1 hover:bg-gray-700 dark:hover:bg-gray-700 rounded-l-lg"
          onClick={onZoomOut}
          aria-label="Zoom out"
        >
          &minus;
        </button>
        <span className="px-3">{zoom}%</span>
        <button 
          className="px-2 py-1 hover:bg-gray-700 dark:hover:bg-gray-700 rounded-r-lg"
          onClick={onZoomIn}
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
      <button className="p-2 hover:bg-gray-800 dark:hover:bg-gray-800 rounded-lg">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
        </svg>
      </button>
    </div>
  );
};

export default BottomToolbar; 