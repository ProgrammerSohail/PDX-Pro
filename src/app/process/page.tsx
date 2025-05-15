'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PdfViewer from '@/components/PdfViewer';
import DocxViewer from '@/components/DocxViewer';

// Define supported file types
const SUPPORTED_EXTENSIONS = [
  // PDF Files
  '.pdf',
  // Microsoft Office Documents
  '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
  // OpenOffice/StarOffice Documents
  '.odt', '.odp', '.ods', '.odg', '.odf', '.sxw', '.sxi', '.sxc', '.sxd', '.stw',
  // Graphics Files
  '.psd', '.ai', '.bmp', '.gif', '.jpeg', '.jpg', '.png', '.tif', '.tiff',
  // PostScript Files
  '.ps', '.eps',
  // Web Files
  '.htm', '.html',
  // Text Files
  '.txt', '.rtf',
  // Multimedia Files
  '.mp4', '.mov', '.mp3', '.wav', '.swf',
  // 3D Model Files
  '.u3d', '.prc',
  // Form Data Files
  '.fdf', '.xfdf',
  // Other Files
  '.xps', '.xml'
];

// Map file extensions to MIME types
const MIME_TYPES: Record<string, string> = {
  // PDF Files
  '.pdf': 'application/pdf',
  // Microsoft Office Documents
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  // OpenOffice/StarOffice Documents
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.odp': 'application/vnd.oasis.opendocument.presentation',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  '.odg': 'application/vnd.oasis.opendocument.graphics',
  '.odf': 'application/vnd.oasis.opendocument.formula',
  // Graphics Files
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.bmp': 'image/bmp',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.psd': 'image/vnd.adobe.photoshop',
  '.ai': 'application/postscript',
  // PostScript Files
  '.ps': 'application/postscript',
  '.eps': 'application/postscript',
  // Web Files
  '.htm': 'text/html',
  '.html': 'text/html',
  // Text Files
  '.txt': 'text/plain',
  '.rtf': 'application/rtf',

  '.fdf': 'application/vnd.fdf',
  '.xfdf': 'application/vnd.adobe.xfdf'
};

// Map file types to categories for the editor
const FILE_CATEGORIES: Record<string, string> = {
  'application/pdf': 'pdf',
  'application/msword': 'office',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'office',
  'application/vnd.ms-excel': 'office',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'office',
  'application/vnd.ms-powerpoint': 'office',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'office',
  'application/vnd.oasis.opendocument.text': 'openoffice',
  'application/vnd.oasis.opendocument.presentation': 'openoffice',
  'application/vnd.oasis.opendocument.spreadsheet': 'openoffice',
  'application/vnd.oasis.opendocument.graphics': 'openoffice',
  'application/vnd.oasis.opendocument.formula': 'openoffice',
  'image/jpeg': 'graphics',
  'image/png': 'graphics',
  'image/gif': 'graphics',
  'image/bmp': 'graphics',
  'image/tiff': 'graphics',
  'image/vnd.adobe.photoshop': 'graphics',
  'application/postscript': 'postscript',
  'text/html': 'web',
  'text/plain': 'text',
  'application/rtf': 'text',
  'video/mp4': 'multimedia',
  'video/quicktime': 'multimedia',
  'audio/mpeg': 'multimedia',
  'audio/wav': 'multimedia',
  'application/x-shockwave-flash': 'multimedia',
  'application/vnd.fdf': 'forms',
  'application/vnd.adobe.xfdf': 'forms'
};

export default function ProcessPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [documentId, setDocumentId] = useState<string | null>(null);

  const isFileSupported = (file: File): boolean => {
    // Check by MIME type
    if (Object.values(MIME_TYPES).includes(file.type)) {
      return true;
    }
    
    // Check by file extension
    const fileName = file.name.toLowerCase();
    return SUPPORTED_EXTENSIONS.some(ext => fileName.endsWith(ext));
  };

  const getFileCategory = (file: File): string => {
    // Get category by MIME type
    if (file.type && FILE_CATEGORIES[file.type]) {
      return FILE_CATEGORIES[file.type];
    }
    
    // Try to determine by extension
    const fileName = file.name.toLowerCase();
    for (const ext of SUPPORTED_EXTENSIONS) {
      if (fileName.endsWith(ext) && MIME_TYPES[ext] && FILE_CATEGORIES[MIME_TYPES[ext]]) {
        return FILE_CATEGORIES[MIME_TYPES[ext]];
      }
    }
    
    return 'unknown';
  };

  const handleFileChange = useCallback((file: File | null) => {
    setSelectedFile(file);
    setFileType(file?.type || null);
    setFileContent(null); // Clear previous content
    setError(null);

    if (file) {
      if (!isFileSupported(file)) {
        setError('Unsupported file type. Please upload one of the supported file types.');
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
      
      // For binary files, read as array buffer; for text files, read as text
      const textTypes = ['text/plain', 'text/html', 'application/rtf'];
      if (textTypes.includes(file.type)) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
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
    if (documentId && selectedFile) {
      const category = getFileCategory(selectedFile);
      router.push(`/editor?documentId=${documentId}&type=${category}`);
    }
  };

  // Helper to get display name for file type
  const getFileTypeDisplay = (file: File | null): string => {
    if (!file) return '';
    
    if (file.type) {
      // Use MIME type description if available
      return file.type.split('/')[1] || file.type;
    }
    
    // Use file extension
    const extension = file.name.substring(file.name.lastIndexOf('.'));
    return extension.substring(1).toUpperCase();
  };

  // Determine if we can render a preview
  const canPreview = (file: File | null): boolean => {
    if (!file) return false;
    
    return (
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.type.startsWith('image/') ||
      file.type === 'text/plain' ||
      file.type === 'text/html'
    );
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
          accept={SUPPORTED_EXTENSIONS.join(',')}
          className="hidden" 
        />
        <div className="flex flex-col items-center justify-center">
          <svg className="w-10 h-10 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Multiple file formats supported (Max. 30MB)</p>
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
                <span className="font-medium">Type:</span> {getFileTypeDisplay(selectedFile)}
              </div>
              <div>
                <span className="font-medium">Size:</span> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </div>
              <div>
                <span className="font-medium">Last Modified:</span> {new Date(selectedFile.lastModified).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Category:</span> {getFileCategory(selectedFile)}
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
      
      {/* For other file types that we can't render yet, show placeholder */}
      {!error && !isLoading && selectedFile && 
       fileType !== 'application/pdf' && 
       fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
        <div className="border rounded-lg p-8 flex flex-col items-center justify-center text-center">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 className="text-xl font-semibold mb-2">Preview not available</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Preview for {selectedFile.name} is not available in the browser. Open in editor to work with this file.
          </p>
          <button 
            onClick={handleOpenInEditor}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Open in Editor
          </button>
        </div>
      )}
    </div>
  );
}
