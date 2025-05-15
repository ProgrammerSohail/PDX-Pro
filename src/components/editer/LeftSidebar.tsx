import React from 'react';

interface LeftSidebarProps {
  activeCategory: string | null;
  onCategorySelect: (category: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ activeCategory, onCategorySelect }) => {
  return (
    <div className="w-20 border-r border-gray-700 dark:border-gray-700 flex flex-col items-center overflow-y-auto">
      {/* PDF Files */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'pdf' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('pdf')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span className="text-xs">PDF</span>
      </button>
      
      {/* Office Documents */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'office' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('office')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
        </svg>
        <span className="text-xs">Office</span>
      </button>
      
      {/* OpenOffice Documents */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'openoffice' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('openoffice')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
        </svg>
        <span className="text-xs">OpenOffice</span>
      </button>
      
      {/* Graphics Files */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'graphics' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('graphics')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <span className="text-xs">Graphics</span>
      </button>
      
      {/* PostScript Files */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'postscript' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('postscript')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
        <span className="text-xs">PostScript</span>
      </button>
      
      {/* Web Files */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'web' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('web')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span className="text-xs">Web</span>
      </button>
      
      {/* Text Files */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'text' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('text')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <span className="text-xs">Text</span>
      </button>
      
      {/* Multimedia Files */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'multimedia' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('multimedia')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <span className="text-xs">Multimedia</span>
      </button>
      
      {/* 3D Model Files */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === '3d' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('3d')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
        <span className="text-xs">3D Models</span>
      </button>
      
      {/* Form Data Files */}
      <button 
        className={`p-4 w-full flex flex-col items-center border-l-4 ${activeCategory === 'forms' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors`}
        onClick={() => onCategorySelect('forms')}
      >
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <span className="text-xs">Forms</span>
      </button>
      
      {/* OCR/Scan Button */}
      <button className="p-4 w-full flex flex-col items-center border-l-4 border-transparent hover:bg-gray-800 dark:hover:bg-gray-800 transition-colors">
        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
        </svg>
        <span className="text-xs">OCR/Scan</span>
      </button>
    </div>
  );
};

export default LeftSidebar;
