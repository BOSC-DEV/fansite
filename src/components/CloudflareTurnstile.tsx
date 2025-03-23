
import React, { useEffect, useRef } from 'react';

interface CloudflareTurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
}

export const CloudflareTurnstile: React.FC<CloudflareTurnstileProps> = ({ siteKey, onVerify }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<number | null>(null);

  useEffect(() => {
    // Load the Cloudflare Turnstile script
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (turnstileRef.current !== null) {
        window.turnstile?.remove(turnstileRef.current);
      }
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const renderTurnstile = () => {
      if (!window.turnstile || !containerRef.current) return;
      
      // If there's an existing widget, remove it first
      if (turnstileRef.current !== null) {
        window.turnstile.remove(turnstileRef.current);
      }
      
      // Render the widget
      turnstileRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
        theme: 'light',
        'expired-callback': () => {
          console.log('Turnstile challenge expired, refreshing');
          if (turnstileRef.current !== null) {
            window.turnstile.reset(turnstileRef.current);
          }
        },
        'error-callback': (error: any) => {
          console.error('Turnstile error:', error);
        }
      });
    };

    // Check if turnstile is already loaded
    if (window.turnstile) {
      renderTurnstile();
    } else {
      // If not loaded yet, wait for it
      const handleLoad = () => renderTurnstile();
      window.addEventListener('turnstile:ready', handleLoad);
      return () => window.removeEventListener('turnstile:ready', handleLoad);
    }
  }, [siteKey, onVerify]);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef} 
        className="mx-auto my-4 flex justify-center"
        aria-label="Cloudflare Turnstile challenge"
      />
      <p className="text-xs text-western-wood/70 mt-2 text-center max-w-md">
        This site is protected by Cloudflare Turnstile to ensure you're not a robot.
      </p>
    </div>
  );
};

export default CloudflareTurnstile;
