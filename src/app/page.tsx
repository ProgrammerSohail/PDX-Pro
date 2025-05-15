import FeaturesSection from "@/components/home/FeaturesSection";
import FileUpload from "@/components/home/FileUpload";
import HeroSection from "@/components/home/HeroSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 text-foreground">
      {/* Hero Section */}
     <HeroSection />

      {/* File Upload Section */}
      <div id="upload">
        <FileUpload />
      </div>
      

      {/* Features Section */}
    <FeaturesSection />

      
    
    </div>
  );
}
