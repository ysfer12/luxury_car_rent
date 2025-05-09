'use client';

import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide loader after delay
    const timer = setTimeout(() => {
      setHidden(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white animate-fadeOut">
      <div className="relative h-16 w-16">
        <div className="absolute top-0 left-0 h-full w-full border-4 border-t-gold-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 h-12 w-12 border-4 border-t-transparent border-r-gold-400 border-b-transparent border-l-transparent rounded-full animate-spin animation-reverse"></div>
      </div>
    </div>
  );
}