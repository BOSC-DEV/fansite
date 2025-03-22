
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
      
      // Render the widget
      turnstileRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onVerify,
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

  return <div ref={containerRef} className="mt-4" />;
};

export default CloudflareTurnstile;
