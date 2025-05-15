import Image from "next/image";


const HeroSection = () => {
  return (
    <div className="relative overflow-hidden min-h-[100dvh]">
      <Image 
        className="absolute top-0 right-0 z-0 left-0 w-full h-full object-cover" 
        alt="Document processing background" 
        width={1920} 
        height={1080} 
        src={'/assets/images/cover.jpg'}
        priority
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-blue-900/10 to-purple-900/10 dark:from-blue-950/10 dark:to-purple-950/10 backdrop-blur-[4px]"></div>
      <div className="absolute inset-0 z-20 bg-black/10"></div>
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-30">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Web-Based Document <span className="text-blue-400 dark:text-blue-300">Processing</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 dark:text-gray-200 mb-10 max-w-3xl mx-auto">
            A powerful, free-to-use browser-based platform for editing PDFs, performing OCR, 
            supporting DOCX files, and converting between various file formats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#upload"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              Get Started
            </a>
            <a
              href="#features"
              className="px-8 py-3 bg-white/10 text-white font-medium rounded-lg shadow-lg border border-white/20 hover:bg-white/20 transition-colors duration-200 text-center backdrop-blur-sm"
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
