
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTapped, setIsTapped] = useState(false);
  const animationRef = useRef<number | null>(null);
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

  useEffect(() => {
    // Only run animation on mobile
    if (!isMobile) return;
    
    let startTime = Date.now();
    
    const animateGradient = () => {
      const elapsed = Date.now() - startTime;
      const x = window.innerWidth / 2 + Math.sin(elapsed / 1000) * (window.innerWidth / 3);
      const y = window.innerHeight / 2 + Math.cos(elapsed / 1500) * (window.innerHeight / 3);
      
      setMousePosition({ x, y });
      animationRef.current = requestAnimationFrame(animateGradient);
    };
    
    animationRef.current = requestAnimationFrame(animateGradient);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  const handleTap = () => {
    setIsTapped(true);
    // Reset the tapped state after the animation completes
    setTimeout(() => setIsTapped(false), 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-center p-4">
      <Helmet>
        <title>Coming Soon</title>
        <meta name="description" content="Coming soon!" />
      </Helmet>
      
      <h1 
        className={`text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider relative p-2 ${isTapped ? 'scale-110 transition-transform duration-300' : 'transition-transform duration-300'}`}
        style={{
          backgroundImage: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px, 
            #E5A97C, #EBCD88, #C5B5E3, #A4C1E8, #E89BA9
          )`,
          backgroundSize: '200% 200%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          transition: isMobile ? 'background-position 2s ease, transform 0.3s ease' : 'background-position 0.2s ease, transform 0.3s ease'
        }}
        onClick={handleTap}
        onTouchStart={handleTap}
      >
        COMING SOON
      </h1>
    </div>
  );
};

export default Index;
