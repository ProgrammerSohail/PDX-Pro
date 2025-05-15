'use client';

import { useEffect, useState } from 'react';

const Loading = () => {
  const [dots, setDots] = useState(1);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev % 3) + 1);
    }, 400);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 w-full h-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 dark:border-t-blue-400 rounded-full animate-spin"></div>
      </div>
      <div className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
        Loading{'.'.repeat(dots)}
      </div>
      <div className="mt-2 flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div 
            key={i} 
            className={`w-2.5 h-2.5 rounded-full ${
              i < dots ? 'bg-blue-500 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
            } transition-colors duration-300`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
