
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFFAF3] to-[#FFF8EB] text-center p-4">
      <Helmet>
        <title>Coming Soon</title>
        <meta name="description" content="Coming soon!" />
      </Helmet>
      
      <h1 
        className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider relative p-2"
        style={{
          backgroundImage: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px, 
            #A55F3E, #C7AA5B, #947BE4, #7495E5, #E58088
          )`,
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          transition: 'background-position 0.2s ease'
        }}
      >
        COMING SOON
      </h1>
    </div>
  );
};

export default Index;
