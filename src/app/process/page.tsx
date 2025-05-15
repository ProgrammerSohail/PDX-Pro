'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PdfViewer from '@/components/PdfViewer';
import DocxViewer from '@/components/DocxViewer';

export default function ProcessPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string | null>(null);

  const handleFileChange = useCallback((file: File | null) => {
    setSelectedFile(file);
    setFileType(file?.type || null);
    setFileContent(null); // Clear previous content
    setError(null);

    if (file) {
      const isPdf = file.type === 'application/pdf';
      const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      
      if (!isPdf && !isDocx) {
        setError('Unsupported file type. Please upload a PDF or DOCX file.');
        return;
      }

      // Generate a unique document ID
      setDocumentId(Date.now().toString());
      
      setIsLoading(true);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        setFileContent(e.target?.result || null);
        setIsLoading(false);
      };
      
      reader.onerror = () => {
        setError('Error reading file. Please try again.');
        setIsLoading(false);
      };
      
      // Read file based on type
      if (isPdf || isDocx) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file);
      }
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  }, [handleFileChange]);

  const handleOpenInEditor = () => {
    if (documentId && fileType) {
      const type = fileType === 'application/pdf' ? 'pdf' : 'docx';
      router.push(`/editor?documentId=${documentId}&type=${type}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Process Document</h1>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center cursor-pointer 
                    ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700'}
                    hover:border-blue-500 dark:hover:border-blue-500 transition-colors`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input 
          id="file-input"
          type="file" 
          onChange={handleInputChange}
          accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
          className="hidden" 
        />
        <div className="flex flex-col items-center justify-center">
          <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PDF or DOCX (Max. 30MB)</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {selectedFile && !isLoading && !error && (
        <div className="mb-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
            <h2 className="text-xl font-semibold mb-2">Selected File</h2>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium">Name:</span> {selectedFile.name}
              </div>
              <div>
                <span className="font-medium">Type:</span> {fileType?.split('/')[1] || fileType}
              </div>
              <div>
                <span className="font-medium">Size:</span> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
              <div>
                <span className="font-medium">Last Modified:</span> {new Date(selectedFile.lastModified).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Document Preview</h2>
            <button 
              onClick={handleOpenInEditor}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
              Open in Editor
            </button>
          </div>
        </div>
      )}

      {/* Viewer components will be rendered here based on fileType */}
      {!error && !isLoading && fileType === 'application/pdf' && <PdfViewer fileContent={fileContent} />}
      {!error && !isLoading && fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && <DocxViewer fileContent={fileContent} />}
    </div>
  );
}
