const FeaturesSection = () => {
  return (
    <div id="features" className="container mx-auto px-4 py-12 sm:py-20">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">Key Features</h2>
      <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        Our platform offers powerful document processing capabilities that run entirely in your browser.
      </p>
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-blue-600 dark:text-blue-400 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">PDF Editing</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Edit text, add annotations, fill forms, and manipulate pages in PDF documents.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-blue-600 dark:text-blue-400 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">DOCX Support</h3>
        <p className="text-gray-600 dark:text-gray-300">
          View and convert Word documents with preserved formatting and styling.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-blue-600 dark:text-blue-400 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Vector Tracing</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Convert bitmap images to scalable vector graphics for better quality.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="text-blue-600 dark:text-blue-400 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">OCR Technology</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Extract text from images and scanned documents with high accuracy.
        </p>
      </div>
    </div>
  </div>
  );
};

export default FeaturesSection;
