'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Define the props interface
interface PdfViewerProps {
  fileContent: string | ArrayBuffer | null;
}

// Set up PDF.js worker once globally
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `/pdfjs-dist/pdf.worker.min.mjs`;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileContent }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pdfDataUri, setPdfDataUri] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null); // To keep track of created object URLs

  // Memoize the document options
  const documentOptions = useMemo(() => ({
    cMapUrl: '/pdfjs-dist/cmaps/',
    cMapPacked: true,
  }), []);

  useEffect(() => {
    // Clean up previous object URL if it exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPdfDataUri(null); // Reset data URI to trigger loading state for new file
    setIsLoading(true); // Set loading true when fileContent changes
    setError(null); // Clear previous errors

    if (fileContent) {
      try {
        if (fileContent instanceof ArrayBuffer) {
          const blob = new Blob([fileContent], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          objectUrlRef.current = url; // Store the new object URL
          setPdfDataUri(url);
          setIsLoading(false);
        } else if (typeof fileContent === 'string') {
          setPdfDataUri(fileContent);
          setIsLoading(false);
        } else {
          setError("Invalid PDF data type.");
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error processing PDF data:', err);
        setError('Error preparing PDF for display. Please try a different file.');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false); // No file content, so not loading
    }

    // Cleanup function to revoke object URL when component unmounts or fileContent changes again
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
    };
  }, [fileContent]);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page
    setIsLoading(false);
    setError(null);
  }, []);

  const onDocumentLoadError = useCallback((err: Error) => {
    console.error('Error loading PDF document:', err);
    setIsLoading(false);
    if (err.name === 'RenderingCancelledException' || err.message.includes('Transport destroyed')) {
      setError('PDF loading was interrupted. Please try reloading the file.');
    } else {
      setError('Failed to load the PDF document. The file might be corrupted or unsupported.');
    }
  }, []);

  const onPageRenderError = useCallback(() => {
    console.warn('Error rendering page. Trying to reset view.');
    setError("Error rendering page. Try a different zoom level or reload the file.");
  }, []);

  // Reset view when file is cleared
  useEffect(() => {
    if (!fileContent) {
      setNumPages(null);
      setPageNumber(1);
      setScale(1);
      setError(null);
      setIsLoading(false); 
    }
  }, [fileContent]);

  // Auto-fit PDF to viewport
  useEffect(() => {
    if (pdfDataUri && numPages) {
      // Set a default scale that works well for full screen view
      // We could make this more sophisticated by calculating based on viewport size
      const viewportWidth = window.innerWidth;
      
      // Adjust scale based on viewport width
      if (viewportWidth < 768) { // Mobile
        setScale(0.8);
      } else if (viewportWidth < 1280) { // Tablet/small desktop
        setScale(1);
      } else { // Large screens
        setScale(1.2);
      }
    }
  }, [pdfDataUri, numPages]);

  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
  };

  const handleZoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.2, 0.6));
  };

  const handleResetZoom = () => {
    setScale(1);
  };

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-lg border border-red-400 dark:border-red-800">
        <p className="font-semibold mb-1">Error</p>
        <p>{error}</p>
        <button 
          onClick={() => {
            setError(null); 
            // Potentially add a retry mechanism or clear file state here
          }}
          className="mt-2 px-3 py-1 bg-red-200 dark:bg-red-800 rounded hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (!fileContent) {
    return <div className="text-center py-4 text-gray-500 dark:text-gray-400">Select a PDF file to view.</div>;
  }
  
  if (isLoading || !pdfDataUri) { // Show loading if isLoading is true OR pdfDataUri is not yet set
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Loading PDF...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Navigation controls */}
      <div className="flex justify-between items-center p-2 bg-gray-800/80 text-white">
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={pageNumber <= 1}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            aria-label="Previous page"
          >
            &lt;
          </button>
          <span className="text-sm">
            Page {pageNumber} of {numPages || '-'}
          </span>
          <button
            onClick={handleNextPage}
            disabled={!numPages || pageNumber >= numPages}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.6}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= 3}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleResetZoom}
            className="px-3 py-1 bg-gray-700 rounded text-xs"
            aria-label="Reset zoom"
          >
            Reset
          </button>
        </div>
      </div>

      {/* PDF display area */}
      <div className="flex-1 overflow-auto flex justify-center items-center bg-gray-800/50">
        <Document
          file={pdfDataUri}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex justify-center items-center p-10">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-2 text-white">Loading document...</span>
            </div>
          }
          options={documentOptions}
          key={pdfDataUri}
        >
          {numPages && (
            <Page 
              pageNumber={pageNumber} 
              scale={scale}
              loading={
                <div className="flex justify-center items-center p-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  <span className="ml-2 text-white">Rendering page...</span>
                </div>
              }
              renderTextLayer={true}
              renderAnnotationLayer={true}
              onRenderError={onPageRenderError}
              className="shadow-lg"
            />
          )}
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
