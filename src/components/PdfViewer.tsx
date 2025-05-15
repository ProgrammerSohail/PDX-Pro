'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useState, useEffect } from 'react';

// We'll set up the worker in a useEffect hook to ensure it only runs client-side
// This prevents errors during SSR and initial hydration

interface PdfViewerProps {
  fileContent: string | ArrayBuffer | null;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileContent }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [workerInitialized, setWorkerInitialized] = useState(false);

  // Initialize PDF.js worker
  useEffect(() => {
    const initializeWorker = () => {
      try {
        // Recommended way to set workerSrc for Next.js with react-pdf
        // Ensures the worker is correctly resolved from node_modules
        pdfjs.GlobalWorkerOptions.workerSrc = new URL(
          'pdfjs-dist/build/pdf.worker.min.mjs',
          import.meta.url
        ).toString();
        setWorkerInitialized(true);
      } catch (err) {
        console.error('Failed to initialize PDF worker:', err);
        // Fallback to CDN if local resolution fails or for specific environments
        // console.warn('Local worker initialization failed, trying CDN fallback.');
        // try {
        //   pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
        //   setWorkerInitialized(true);
        // } catch (cdnErr) {
        //   console.error('CDN PDF worker initialization also failed:', cdnErr);
        //   setError('Failed to initialize PDF viewer. Please try again later.');
        // }
        setError('Failed to initialize PDF viewer. Please try again later.');
      }
    };

    // Ensure this runs only on the client side
    if (typeof window !== 'undefined') {
      initializeWorker();
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1); // Reset to first page on new document load
    setError(null);
  }

  function onPageLoadSuccess() {
    setIsLoadingPage(false);
  }

  function onPageLoadError() {
    setIsLoadingPage(false);
  }

  function onDocumentLoadError(err: Error) {
    console.error('Error loading PDF document:', err);
    setIsLoadingPage(false);
    setError('Failed to load the PDF document. The file might be corrupted or unsupported.');
  }

  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
    setIsLoadingPage(true);
  };

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages || 1));
    setIsLoadingPage(true);
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
          onClick={() => setError(null)}
          className="mt-2 px-3 py-1 bg-red-200 dark:bg-red-800 rounded hover:bg-red-300 dark:hover:bg-red-700 transition-colors"
        >
          Dismiss
        </button>
      </div>
    );
  }

  if (!workerInitialized) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Initializing PDF viewer...</span>
      </div>
    );
  }

  if (!fileContent) {
    return <div className="text-center py-4 text-gray-500 dark:text-gray-400">Select a PDF file to view.</div>;
  }

  // Check for empty ArrayBuffer or empty string
  if (
    (fileContent instanceof ArrayBuffer && fileContent.byteLength === 0) ||
    (typeof fileContent === 'string' && fileContent.length === 0)
  ) {
    return (
      <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 p-4 rounded-lg border border-yellow-400 dark:border-yellow-800">
        <p className="font-semibold mb-1">Warning</p>
        <p>The selected PDF file is empty or corrupted. Please select a valid PDF file.</p>
      </div>
    );
  }

  return (
    <div className="pdf-viewer-container">
      <div className="bg-gray-100 dark:bg-gray-800 p-3 mb-4 rounded-lg flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <button
            onClick={handlePreviousPage}
            disabled={pageNumber <= 1}
            className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
            aria-label="Previous page"
          >
            &lt;
          </button>
          <span className="text-sm">
            Page <span className="font-medium">{pageNumber}</span> of <span className="font-medium">{numPages || 0}</span>
          </span>
          <button
            onClick={handleNextPage}
            disabled={pageNumber >= (numPages || 1)}
            className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
            aria-label="Next page"
          >
            &gt;
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.6}
            className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="text-sm font-medium">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            disabled={scale >= 3}
            className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded disabled:opacity-50"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={handleResetZoom}
            className="px-3 py-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-xs"
            aria-label="Reset zoom"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex justify-center relative">
        {isLoadingPage && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-800/70 z-10">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        <Document
          file={fileContent}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg"
          error={
            <div className="p-4 text-center text-red-600 dark:text-red-400">
              <p>Failed to load PDF. Please check if the file is valid.</p>
            </div>
          }
          noData={
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <p>No PDF document selected.</p>
            </div>
          }
          loading={
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-gray-500 dark:text-gray-400">Loading PDF...</p>
            </div>
          }
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale} 
            onLoadSuccess={onPageLoadSuccess}
            onRenderError={onPageLoadError}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            error={
              <div className="p-4 text-center text-red-600 dark:text-red-400">
                <p>Error rendering page {pageNumber}.</p>
              </div>
            }
            loading={
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              </div>
            }
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
