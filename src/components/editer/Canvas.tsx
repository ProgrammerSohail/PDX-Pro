import React from 'react';

interface CanvasProps {
  activeDocument: string | null;
  activeCategory: string | null;
}

const Canvas: React.FC<CanvasProps> = ({ activeDocument, activeCategory }) => {
  return (
    <div className="flex-1 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-black dark:bg-black" 
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 19px, #333 20px), 
                           repeating-linear-gradient(90deg, transparent, transparent 19px, #333 20px)`,
          backgroundSize: '20px 20px'
        }}
      >
        {/* Display tools based on activeCategory */}
        <div className="absolute top-0 left-0 bg-gray-900 bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90 p-2 rounded-br-lg">
          {activeCategory && (
            <span className="text-sm">Active Category: {activeCategory}</span>
          )}
        </div>
        
        {/* Placeholder for document content */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white dark:border-white w-2/3 h-2/3">
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
  );
};

export default Canvas; 