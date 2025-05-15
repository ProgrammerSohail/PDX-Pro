import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>
        <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Web-Based Document <span className="text-blue-600 dark:text-blue-400">Processing</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              A powerful, free-to-use browser-based platform for editing PDFs, performing OCR, 
              supporting DOCX files, and converting between various file formats.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/process"
                className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 text-center"
              >
                Process Documents
              </Link>
              <a
                href="#features"
                className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-white font-medium rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HeroSection;
