'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { estimateDataSize } from '@/lib/localStorageService';

interface FileContextType {
  documentId: string | null;
  fileDataUri: string | null;
  fileSizeEstimate: number; // Size estimation in bytes
  setFileData: (id: string | null, dataUri: string | null) => void;
  isFileTooLargeForStorage: () => boolean;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

// Estimate the maximum practical size for localStorage (5MB is conservative)
const MAX_PRACTICAL_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export const FileContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [fileDataUri, setFileDataUri] = useState<string | null>(null);
  const [fileSizeEstimate, setFileSizeEstimate] = useState<number>(0);

  const setFileData = (id: string | null, dataUri: string | null) => {
    setDocumentId(id);
    setFileDataUri(dataUri);
    
    // Calculate and store size estimate for the file data
    if (dataUri) {
      const sizeEstimate = estimateDataSize({ pdfDataUri: dataUri });
      setFileSizeEstimate(sizeEstimate);
      if (sizeEstimate > MAX_PRACTICAL_STORAGE_SIZE) {
        console.warn(`File is large (${Math.round(sizeEstimate/1024/1024)}MB), may exceed localStorage limits.`);
      }
    } else {
      setFileSizeEstimate(0);
    }
  };
  
  // Helper to check if current file is too large for localStorage
  const isFileTooLargeForStorage = (): boolean => {
    return fileSizeEstimate > MAX_PRACTICAL_STORAGE_SIZE;
  };

  return (
    <FileContext.Provider value={{ 
      documentId, 
      fileDataUri, 
      fileSizeEstimate,
      setFileData,
      isFileTooLargeForStorage
    }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFileContext = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFileContext must be used within a FileContextProvider');
  }
  return context;
}; 