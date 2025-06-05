
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIsMobile } from '@/hooks/use-mobile';
import { Instagram, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4 relative">
      <Helmet>
        <title>Coming Soon</title>
        <meta name="description" content="Coming soon!" />
      </Helmet>
      
      <h1 
        className={`text-4xl md:text-6xl lg:text-8xl font-bold tracking-wider relative p-2 ${isTapped ? 'scale-110 transition-transform duration-300' : 'transition-transform duration-300'}`}
        style={{
          backgroundImage: `radial-gradient(
            circle at ${mousePosition.x}px ${mousePosition.y}px, 
            #D4A574, #E0B878, #B8A5D9, #8FB1E0, #D889A5
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
      
      {/* Social buttons centered at bottom third */}
      <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-4">
          <a 
            href="https://instagram.com/fandotsite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#D889A5] to-[#B8A5D9] text-white hover:scale-110 transition-transform duration-200 shadow-lg"
            aria-label="Follow us on Instagram"
          >
            <Instagram className="h-6 w-6" />
          </a>
          
          <a 
            href="https://x.com/fandotsite" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#8FB1E0] to-[#B8A5D9] text-white hover:scale-110 transition-transform duration-200 shadow-lg"
            aria-label="Follow us on X (Twitter)"
          >
            <img 
              src="/lovable-uploads/b26a0095-6dd4-4425-9294-0b6ee067135a.png" 
              alt="X (Twitter)" 
              className="h-6 w-6" 
            />
          </a>
          
          <Link 
            to="/docs"
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A574] to-[#E0B878] text-white hover:scale-110 transition-transform duration-200 shadow-lg"
            aria-label="View Documentation"
          >
            <BookOpen className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
