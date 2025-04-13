
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
    <div className="flex items-center justify-center min-h-screen bg-white text-center p-4">
      <Helmet>
        <title>Coming Soon - Book of Scams</title>
        <meta name="description" content="Our site is coming soon!" />
      </Helmet>
      
      <h1 
        className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider relative p-2"
        style={{
          backgroundImage: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px, 
            #FEC6A1, #FEF7CD, #E5DEFF, #D3E4FD, #FFDEE2
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
