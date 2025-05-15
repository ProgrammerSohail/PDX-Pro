import Link from "next/link";

const FileUpload = () => {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-20">
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-blue-600 dark:bg-blue-800 p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Get Started</h2>
          <p className="mb-6 opacity-90">
            Upload your documents and start processing them instantly. All processing happens in your browser for maximum privacy.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Edit PDF documents
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              OCR text recognition
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Convert file formats
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              Vector conversion
            </li>
          </ul>
        </div>
        
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <Link href="/process" className="w-full">
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer">
              <div className="flex flex-col items-center justify-center">
                <svg className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Drag & drop files or click to select
                </p>
                <span className="inline-block px-5 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors">
                  Browse Files
                </span>
              </div>
            </div>
          </Link>
          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
            Supported formats: PDF, DOCX, Images
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default FileUpload;
