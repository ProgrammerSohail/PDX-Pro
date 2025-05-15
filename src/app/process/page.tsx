'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProcessPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to homepage after a short delay
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 100);
    
    return () => clearTimeout(redirectTimer);
  }, [router]);

  return (
    <div className="container mx-auto p-8 text-center">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Redirecting...</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The document processing functionality has been moved to the home page.
        </p>
      </div>
    </div>
  );
}
