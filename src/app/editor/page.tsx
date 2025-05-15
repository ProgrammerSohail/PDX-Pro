'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Import components
import TopToolbar from '@/components/editer/TopToolbar';
import LeftSidebar from '@/components/editer/LeftSidebar';
import RightSidebar from '@/components/editer/RightSidebar';
import Canvas from '@/components/editer/Canvas';
import BottomToolbar from '@/components/editer/BottomToolbar';

// Editor component - follows the layout structure from the UI reference
export default function EditorPage() {
  const searchParams = useSearchParams();
  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(100);
  
  // Get document info from URL parameters
  useEffect(() => {
    const documentId = searchParams.get('documentId');
    const documentType = searchParams.get('type');
    
    if (documentId) {
      setActiveDocument(documentId);
      // Set initial active category based on document type
      if (documentType) {
        setActiveCategory(getCategoryFromType(documentType));
      }
    }
  }, [searchParams]);

  // Helper function to determine category from file type
  const getCategoryFromType = (type: string): string => {
    const typeMap: Record<string, string> = {
      'pdf': 'pdf',
      'doc': 'office',
      'docx': 'office',
      'xls': 'office',
      'xlsx': 'office',
      'ppt': 'office',
      'pptx': 'office',
      'odt': 'openoffice',
      'odp': 'openoffice',
      'ods': 'openoffice',
      'jpg': 'graphics',
      'jpeg': 'graphics',
      'png': 'graphics',
      'gif': 'graphics',
      'bmp': 'graphics',
      'ps': 'postscript',
      'eps': 'postscript',
      'html': 'web',
      'htm': 'web',
      'txt': 'text',
      'rtf': 'text',
      'mp4': 'multimedia',
      'mov': 'multimedia',
      'mp3': 'multimedia',
      'wav': 'multimedia',
      'u3d': '3d',
      'prc': '3d',
      'fdf': 'forms',
      'xfdf': 'forms'
    };
    
    return typeMap[type] || 'pdf';
  };

  // Handle tool selection
  const handleToolSelect = (tool: string) => {
    setActiveTool(tool);
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
  };

  // Handle zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white dark:text-white">
      {/* Top Toolbar */}
      <TopToolbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Document Tools */}
        <LeftSidebar 
          activeCategory={activeCategory} 
          onCategorySelect={handleCategorySelect} 
        />

        {/* Main Content Area with Canvas */}
        <Canvas 
          activeDocument={activeDocument}
          activeCategory={activeCategory}
        />

        {/* Right Sidebar - Editing Tools */}
        <RightSidebar 
          activeTool={activeTool}
          onToolSelect={handleToolSelect}
        />
      </div>

      {/* Bottom Toolbar with Zoom Controls */}
      <BottomToolbar 
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
      />
    </div>
  );
} 