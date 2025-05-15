import React from 'react';
import PdfViewer from '@/components/PdfViewer';

interface CanvasProps {
  activeDocument: string | null;
  activeCategory: string | null;
  pdfDataUri?: string | null;
}

const Canvas: React.FC<CanvasProps> = ({ activeDocument, activeCategory, pdfDataUri }) => {
  return (
    <div className="flex-1 relative overflow-auto bg-gray-700">
      <div 
        className="absolute inset-0 bg-black dark:bg-black" 
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, #222 20px), 
                           repeating-linear-gradient(90deg, transparent, transparent 19px, #222 20px)`,
          backgroundSize: '20px 20px',
          minHeight: '100%',
        }}
      >
        <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 p-2 rounded-br-lg z-10">
          {activeCategory && (
            <span className="text-sm">Active Category: {activeCategory}</span>
          )}
        </div>
        
        <div className="w-full h-full flex items-center justify-center p-4">
          {activeCategory === 'pdf' && pdfDataUri && activeDocument ? (
            <div className="w-full h-full max-w-4xl max-h-[calc(100vh-150px)] overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <PdfViewer fileContent={pdfDataUri} />
            </div>
          ) : activeDocument ? (
            <div className="text-center p-10 bg-gray-800 rounded-lg">
              <p className="text-xl">Document: {activeDocument}</p>
              <p>Category: {activeCategory}</p>
              <p className="mt-4">Preview for this file type is not yet implemented in the editor.</p>
            </div>
          ) : (
            <div className="text-center p-10 bg-gray-800 rounded-lg">
              <p className="text-xl">No document selected.</p>
              <p>Upload or open a document to start editing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas; 