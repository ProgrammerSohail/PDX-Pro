'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

// Editor component - follows the layout structure from the UI reference
export default function EditorPage() {
  const searchParams = useSearchParams();
  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(100);
  
  // Get document info from URL parameters
  useEffect(() => {
    const documentId = searchParams.get('documentId');
    const documentType = searchParams.get('type');
    
    if (documentId) {
      setActiveDocument(documentId);
      // Here we would load the document data based on ID and type
    }
  }, [searchParams]);

  // Handle tool selection
  const handleToolSelect = (tool: string) => {
    setActiveTool(tool);
  };

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Top Toolbar */}
      <div className="border-b border-gray-700">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </Link>
            <div className="flex items-center h-full">
              <button className="p-3 border-b-2 border-transparent hover:border-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <span className="text-xs">Upload</span>
              </button>
              <button className="p-3 border-b-2 border-transparent hover:border-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                <span className="text-xs">Edit</span>
              </button>
              <button className="p-3 border-b-2 border-transparent hover:border-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
                <span className="text-xs">Convert</span>
              </button>
              <button className="p-3 border-b-2 border-transparent hover:border-blue-500 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path>
                </svg>
                <span className="text-xs">Save</span>
              </button>
            </div>
          </div>
          <div className="flex items-center">
            <button className="p-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Document Tools */}
        <div className="w-20 border-r border-gray-700 flex flex-col items-center">
          <button 
            className={`p-4 w-full flex flex-col items-center border-l-4 ${activeTool === 'pdf' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 transition-colors`}
            onClick={() => handleToolSelect('pdf')}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span className="text-xs">PDF Tools</span>
          </button>
          <button 
            className={`p-4 w-full flex flex-col items-center border-l-4 ${activeTool === 'word' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 transition-colors`}
            onClick={() => handleToolSelect('word')}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span className="text-xs">Word Tools</span>
          </button>
          <button 
            className={`p-4 w-full flex flex-col items-center border-l-4 ${activeTool === 'image' ? 'border-blue-500' : 'border-transparent'} hover:bg-gray-800 transition-colors`}
            onClick={() => handleToolSelect('image')}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-xs">Image-Editing Tools</span>
          </button>
          <button className="p-4 w-full flex flex-col items-center border-l-4 border-transparent hover:bg-gray-800 transition-colors">
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span className="text-xs">Add</span>
          </button>
        </div>

        {/* Main Content Area with Canvas */}
        <div className="flex-1 relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-black" 
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, #333 20px), 
                               repeating-linear-gradient(90deg, transparent, transparent 19px, #333 20px)`,
              backgroundSize: '20px 20px'
            }}
          >
            {/* Placeholder for document content */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white w-2/3 h-2/3">
              {activeDocument ? (
                <div className="h-full flex items-center justify-center">
                  <p>Document content will be displayed here</p>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p>No document selected. Upload or open a document to edit.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Editing Tools */}
        <div className="w-20 border-l border-gray-700 flex flex-col items-center">
          <button 
            className={`p-4 w-full flex flex-col items-center ${activeTool === 'draw' ? 'bg-gray-800' : 'hover:bg-gray-800'} transition-colors`}
            onClick={() => handleToolSelect('draw')}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
            </svg>
            <span className="text-xs">Draw</span>
          </button>
          <button 
            className={`p-4 w-full flex flex-col items-center ${activeTool === 'highlight' ? 'bg-gray-800' : 'hover:bg-gray-800'} transition-colors`}
            onClick={() => handleToolSelect('highlight')}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
            </svg>
            <span className="text-xs">Highlight</span>
          </button>
          <button 
            className={`p-4 w-full flex flex-col items-center ${activeTool === 'text' ? 'bg-gray-800' : 'hover:bg-gray-800'} transition-colors`}
            onClick={() => handleToolSelect('text')}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            <span className="text-xs">Text</span>
          </button>
          <button 
            className={`p-4 w-full flex flex-col items-center ${activeTool === 'crop' ? 'bg-gray-800' : 'hover:bg-gray-800'} transition-colors`}
            onClick={() => handleToolSelect('crop')}
          >
            <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
            </svg>
            <span className="text-xs">Crop</span>
          </button>
        </div>
      </div>

      {/* Bottom Toolbar with Zoom Controls */}
      <div className="border-t border-gray-700 p-2 flex justify-end items-center">
        <div className="mr-4 bg-gray-800 rounded-lg flex items-center">
          <button 
            className="px-2 py-1 hover:bg-gray-700 rounded-l-lg"
            onClick={handleZoomOut}
            aria-label="Zoom out"
          >
            &minus;
          </button>
          <span className="px-3">{zoom}%</span>
          <button 
            className="px-2 py-1 hover:bg-gray-700 rounded-r-lg"
            onClick={handleZoomIn}
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path>
          </svg>
        </button>
      </div>
    </div>
  );
} 