import React, { useState, useEffect } from 'react';
import PdfViewer from '@/components/PdfViewer';
import { useFileContext } from '@/context/FileContext';

interface CanvasProps {
  activeDocument: string | null;
  activeCategory: string | null;
  pdfDataUri?: string | null;
  activeEditingTool?: string | null;
}

const Canvas: React.FC<CanvasProps> = ({ activeDocument, activeCategory, pdfDataUri, activeEditingTool }) => {
  const { fileSizeEstimate, isFileTooLargeForStorage } = useFileContext();
  const [showStorageWarning, setShowStorageWarning] = useState(false);
  
  // Show warning if PDF is large and couldn't be stored in localStorage
  useEffect(() => {
    if (activeCategory === 'pdf' && pdfDataUri && isFileTooLargeForStorage()) {
      setShowStorageWarning(true);
      // Hide the warning after 6 seconds
      const timer = setTimeout(() => setShowStorageWarning(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [activeCategory, pdfDataUri, isFileTooLargeForStorage]);

  // This function would be expanded to handle different drawing operations
  const getEditingToolCursor = (tool: string | null): string => {
    switch (tool) {
      case 'selection': return 'default';
      case 'text': return 'text';
      case 'rectangle': return 'crosshair';
      case 'circle': return 'crosshair';
      case 'line': return 'crosshair';
      case 'pen': return 'url(/cursors/pen.svg), auto';
      case 'brush': return 'url(/cursors/brush.svg), auto';
      case 'eraser': return 'url(/cursors/eraser.svg), auto';
      case 'fill': return 'url(/cursors/fill.svg), auto';
      case 'eyedropper': return 'url(/cursors/eyedropper.svg), auto';
      case 'zoom': return 'zoom-in';
      case 'hand': return 'grab';
      default: return 'default';
    }
  };

  return (
    <div className="flex-1 relative overflow-auto bg-gray-700">
      {showStorageWarning && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-yellow-600 text-white p-2 text-center">
          Warning: PDF is too large for local storage. Your edits will not persist if you refresh the page.
          <button 
            className="ml-4 px-2 py-0.5 bg-yellow-700 rounded hover:bg-yellow-800"
            onClick={() => setShowStorageWarning(false)}
          >
            Dismiss
          </button>
        </div>
      )}
      <div 
        className="absolute inset-0 bg-black dark:bg-black" 
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, #222 20px), 
                           repeating-linear-gradient(90deg, transparent, transparent 19px, #222 20px)`,
          backgroundSize: '20px 20px',
          minHeight: '100%',
          cursor: getEditingToolCursor(activeEditingTool || null),
        }}
      >
        <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 p-2 rounded-br-lg z-10">
          {activeEditingTool && (
            <span className="text-sm mr-4">Active Tool: {activeEditingTool}</span>
          )}
          {activeCategory && (
            <span className="text-sm">Document Type: {activeCategory}</span>
          )}
        </div>
        
        {activeCategory === 'pdf' && pdfDataUri && activeDocument ? (
          <div className="w-full h-full flex items-center justify-center">
            <PdfViewer fileContent={pdfDataUri} />
          </div>
        ) : activeDocument ? (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center p-10 bg-gray-800 rounded-lg">
              <p className="text-xl">Document: {activeDocument}</p>
              <p>Category: {activeCategory}</p>
              <p className="mt-4">Preview for this file type is not yet implemented in the editor.</p>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4">
            <div className="text-center p-10 bg-gray-800 rounded-lg">
              <p className="text-xl">No document selected.</p>
              <p>Upload or open a document to start editing.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Canvas; 