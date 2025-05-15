'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface FileContextType {
  documentId: string | null;
  fileDataUri: string | null;
  setFileData: (id: string | null, dataUri: string | null) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [fileDataUri, setFileDataUri] = useState<string | null>(null);

  const setFileData = (id: string | null, dataUri: string | null) => {
    setDocumentId(id);
    setFileDataUri(dataUri);
  };

  return (
    <FileContext.Provider value={{ documentId, fileDataUri, setFileData }}>
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