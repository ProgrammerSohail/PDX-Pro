'use client';

import { useEffect, useState } from 'react';
import mammoth from 'mammoth';

interface DocxViewerProps {
  fileContent: string | ArrayBuffer | null;
}

const DocxViewer: React.FC<DocxViewerProps> = ({ fileContent }) => {
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (fileContent instanceof ArrayBuffer) {
      setIsLoading(true);
      setError(null);
      
      mammoth.convertToHtml({ arrayBuffer: fileContent }, {
        styleMap: [
          "p[style-name='Heading 1'] => h1:fresh",
          "p[style-name='Heading 2'] => h2:fresh",
          "p[style-name='Heading 3'] => h3:fresh",
          "p[style-name='Heading 4'] => h4:fresh",
          "p[style-name='Heading 5'] => h5:fresh",
          "p[style-name='Heading 6'] => h6:fresh"
        ]
      })
        .then((result) => {
          setHtmlContent(result.value);
          setError(null);
          setIsLoading(false);
          
          if (result.messages.length > 0) {
            console.info("Mammoth messages:", result.messages);
          }
        })
        .catch((err) => {
          console.error('Error converting DOCX:', err);
          setError('Error converting DOCX file: ' + (err.message || 'Unknown error'));
          setHtmlContent(null);
          setIsLoading(false);
        });
    } else if (fileContent !== null) {
        // Handle other potential fileContent types if necessary, or show an error
        setError('Unsupported file content type for DOCX viewer.');
        setHtmlContent(null);
        setIsLoading(false);
    } else {
        setHtmlContent(null);
        setError(null);
        setIsLoading(false);
    }
  }, [fileContent]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
        {error}
      </div>
    );
  }

  if (!htmlContent) {
    return <div className="text-center py-4 text-gray-500">Select a DOCX file to view.</div>;
  }

  // Use dangerouslySetInnerHTML to render the HTML converted from DOCX
  return (
    <div className="docx-viewer-container">
      <div 
        className="docx-content p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg overflow-auto max-h-[80vh]"
        dangerouslySetInnerHTML={{ __html: htmlContent }} 
      />
      <style jsx global>{`
        .docx-content {
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
          line-height: 1.6;
        }
        .docx-content h1 {
          font-size: 2em;
          margin-top: 0.67em;
          margin-bottom: 0.67em;
          font-weight: bold;
        }
        .docx-content h2 {
          font-size: 1.5em;
          margin-top: 0.83em;
          margin-bottom: 0.83em;
          font-weight: bold;
        }
        .docx-content h3 {
          font-size: 1.17em;
          margin-top: 1em;
          margin-bottom: 1em;
          font-weight: bold;
        }
        .docx-content h4 {
          font-size: 1em;
          margin-top: 1.33em;
          margin-bottom: 1.33em;
          font-weight: bold;
        }
        .docx-content h5 {
          font-size: .83em;
          margin-top: 1.67em;
          margin-bottom: 1.67em;
          font-weight: bold;
        }
        .docx-content h6 {
          font-size: .67em;
          margin-top: 2.33em;
          margin-bottom: 2.33em;
          font-weight: bold;
        }
        .docx-content p {
          margin-top: 1em;
          margin-bottom: 1em;
        }
        .docx-content table {
          border-collapse: collapse;
          margin: 1em 0;
        }
        .docx-content table, .docx-content th, .docx-content td {
          border: 1px solid #ccc;
          padding: 0.5em;
        }
        .docx-content img {
          max-width: 100%;
          height: auto;
        }
        .docx-content ul, .docx-content ol {
          margin-top: 1em;
          margin-bottom: 1em;
          padding-left: 2em;
        }
        .docx-content ul {
          list-style-type: disc;
        }
        .docx-content ol {
          list-style-type: decimal;
        }
        .dark .docx-content {
          color: #e5e7eb;
        }
        .dark .docx-content a {
          color: #93c5fd;
        }
        .dark .docx-content table, .dark .docx-content th, .dark .docx-content td {
          border-color: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default DocxViewer;
