
import React, { useEffect, useRef, useState } from 'react';
import { toast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

interface CloudflareTurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  theme?: 'light' | 'dark' | 'auto';
}

export const CloudflareTurnstile: React.FC<CloudflareTurnstileProps> = ({ 
  siteKey, 
  onVerify,
  theme = 'auto' 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationShown, setNotificationShown] = useState(false);

  // Load the Cloudflare Turnstile script
  useEffect(() => {
    if (document.getElementById('cloudflare-turnstile-script')) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.id = 'cloudflare-turnstile-script';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      setIsLoaded(true);
      console.log('Cloudflare Turnstile script loaded');
    };
    
    script.onerror = () => {
      setError('Failed to load Cloudflare Turnstile');
      console.error('Failed to load Cloudflare Turnstile script');
    };
    
    document.body.appendChild(script);

    return () => {
      // Don't remove the script on unmount as it might be used by other components
    };
  }, []);

  // Render or re-render Turnstile when needed
  useEffect(() => {
    const renderTurnstile = () => {
      if (!window.turnstile || !containerRef.current) return;
      
      // If there's an existing widget, remove it first
      if (turnstileRef.current !== null) {
        window.turnstile.remove(turnstileRef.current);
      }
      
      try {
        // Render the widget
        turnstileRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            console.log('Turnstile verification successful');
            setError(null);
            
            // Show toast notification only once
            if (!notificationShown) {
              toast({
                title: "Verification successful!",
                description: "You have successfully verified that you're not a robot.",
                duration: 3000,
              });
              setNotificationShown(true);
            }
            
            onVerify(token);
          },
          theme: theme,
          'expired-callback': () => {
            console.log('Turnstile challenge expired, refreshing');
            setError('Verification expired, please try again');
            setNotificationShown(false);
            if (turnstileRef.current !== null) {
              window.turnstile.reset(turnstileRef.current);
            }
          },
          'error-callback': (errorCode: any) => {
            console.error('Turnstile error:', errorCode);
            setError('Verification failed, please try again');
            setNotificationShown(false);
          }
        });
      } catch (err) {
        console.error('Error rendering Turnstile:', err);
        setError('Error rendering verification challenge');
      }
    };

    // Check if turnstile is already loaded
    if (isLoaded && window.turnstile) {
      renderTurnstile();
    } else if (isLoaded) {
      // If script is loaded but turnstile object isn't available yet
      const checkTurnstile = setInterval(() => {
        if (window.turnstile) {
          clearInterval(checkTurnstile);
          renderTurnstile();
        }
      }, 100);
      
      // Clear interval after 5 seconds if turnstile still isn't available
      setTimeout(() => {
        clearInterval(checkTurnstile);
        if (!window.turnstile) {
          setError('Verification service not available');
        }
      }, 5000);
      
      return () => clearInterval(checkTurnstile);
    }

    // Cleanup on unmount or before re-rendering
    return () => {
      if (turnstileRef.current !== null && window.turnstile) {
        window.turnstile.remove(turnstileRef.current);
      }
    };
  }, [siteKey, onVerify, isLoaded, theme, notificationShown]);

  // Reset notification shown state on unmount
  useEffect(() => {
    return () => {
      setNotificationShown(false);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div 
        ref={containerRef} 
        className="mx-auto my-4 flex justify-center"
        aria-label="Cloudflare Turnstile challenge"
      />
      {error && (
        <p className="text-sm text-red-500 mt-1 mb-2">{error}</p>
      )}
      <p className="text-base text-western-wood/70 mt-2 text-center max-w-md">
        This site is protected by Cloudflare Turnstile to ensure you're not a robot.
      </p>
    </div>
  );
};

export default CloudflareTurnstile;
