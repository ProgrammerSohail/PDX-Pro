'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useFileContext } from '@/context/FileContext';
import {
  getLocalStorageItem,
  setLocalStorageItem,
  LOCAL_STORAGE_KEYS,
  UserSettings,
  EditorDocumentState
} from '@/lib/localStorageService';

// Import components
import TopToolbar from '@/components/editer/TopToolbar';
import LeftSidebar from '@/components/editer/LeftSidebar';
import RightSidebar from '@/components/editer/RightSidebar';
import Canvas from '@/components/editer/Canvas';
import BottomToolbar from '@/components/editer/BottomToolbar';

// Editor component - follows the layout structure from the UI reference
export default function EditorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { documentId: contextDocumentId, fileDataUri: contextFileDataUri } = useFileContext();

  const [activeDocument, setActiveDocument] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [activeEditingTool, setActiveEditingTool] = useState<string | null>(() => {
    const settings = getLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS);
    return settings?.activeEditingTool || 'selection'; // Default to selection tool
  });
  
  // Initialize activeCategory for document type
  const [activeCategory, setActiveCategory] = useState<string | null>(() => {
    const settings = getLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS);
    return settings?.editorLeftSidebarCategory || null; 
  });
  
  const [zoom, setZoom] = useState<number>(100);
  const [pdfDataForViewer, setPdfDataForViewer] = useState<string | null>(null);

  // Set up initial state from URL or context
  useEffect(() => {
    const documentIdFromUrl = searchParams.get('documentId');
    if (documentIdFromUrl) {
      setActiveDocument(documentIdFromUrl);
    } else if (contextDocumentId) {
      setActiveDocument(contextDocumentId);
    }

    // Try to load from localStorage first
    const savedEditorState = getLocalStorageItem<EditorDocumentState>(LOCAL_STORAGE_KEYS.EDITOR_STATE);
    
    if (savedEditorState?.pdfDataUri) {
      // We have PDF data in localStorage
      setPdfDataForViewer(savedEditorState.pdfDataUri);
      if (savedEditorState.documentId) {
        setActiveDocument(savedEditorState.documentId);
      }
      if (savedEditorState.category) {
        setActiveCategory(savedEditorState.category);
      }
    } else if (savedEditorState?.pdfStorageSkipped && contextFileDataUri) {
      // PDF was too large for localStorage, but we have it in memory context
      // Use the context PDF data with the saved metadata
      setPdfDataForViewer(contextFileDataUri);
      if (savedEditorState.documentId) {
        setActiveDocument(savedEditorState.documentId);
      }
      if (savedEditorState.category) {
        setActiveCategory(savedEditorState.category);
      }
      console.info('Using in-memory PDF data as it was too large for localStorage');
    } else if (contextFileDataUri) {
      // Only have context data, no localStorage data
      setPdfDataForViewer(contextFileDataUri);
    }
  }, [searchParams, contextDocumentId, contextFileDataUri]);

  // Save PDF state to localStorage whenever it changes
  useEffect(() => {
    if (pdfDataForViewer && activeDocument && activeCategory === 'pdf') {
      setLocalStorageItem<EditorDocumentState>(LOCAL_STORAGE_KEYS.EDITOR_STATE, {
        pdfDataUri: pdfDataForViewer,
        documentId: activeDocument,
        category: activeCategory,
        lastEdited: new Date().toISOString()
      });
    }
  }, [pdfDataForViewer, activeDocument, activeCategory]);

  // Save active editing tool to localStorage when it changes
  useEffect(() => {
    if (activeEditingTool) {
      const currentSettings = getLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS) || {};
      setLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS, {
        ...currentSettings,
        activeEditingTool
      });
    }
  }, [activeEditingTool]);

  // Setup beforeunload event to warn users before refreshing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (pdfDataForViewer && activeCategory === 'pdf') {
        // Standard way to show a confirmation dialog before unloading
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pdfDataForViewer, activeCategory]);

  // Function to handle document type selection (for backward compatibility)
  const handleCategorySelect = (category: string) => {
    setActiveCategory(category);
    
    // Save the selected category to localStorage
    const currentSettings = getLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS) || {};
    setLocalStorageItem<UserSettings>(LOCAL_STORAGE_KEYS.USER_SETTINGS, {
      ...currentSettings,
      editorLeftSidebarCategory: category
    });
  };

  // Function to handle editing tool selection from left sidebar
  const handleEditingToolSelect = (tool: string) => {
    setActiveEditingTool(tool);
  };

  // Function to handle tool selection from right sidebar
  const handleToolSelect = (tool: string) => {
    setActiveTool(tool);
  };

  // Zoom functions
  const handleZoomIn = () => {
    setZoom(prevZoom => Math.min(prevZoom + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prevZoom => Math.max(prevZoom - 10, 50));
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white dark:text-white">
      {/* Top Toolbar */}
      <TopToolbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Editing Tools */}
        <LeftSidebar 
          activeCategory={activeEditingTool} 
          onCategorySelect={handleEditingToolSelect} 
        />

        {/* Main Content Area with Canvas */}
        <Canvas 
          activeDocument={activeDocument}
          activeCategory={activeCategory}
          pdfDataUri={activeCategory === 'pdf' ? pdfDataForViewer : null}
          activeEditingTool={activeEditingTool}
        />

        {/* Right Sidebar - Document Tools */}
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