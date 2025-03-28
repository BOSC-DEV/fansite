
import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Mail, Github } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <footer className={`py-1 border-t border-western-wood/30 wood-texture mt-auto ${isMobile ? 'mb-12' : ''}`}>
      <div className="container mx-auto px-2">
        {isMobile ? (
          <div className="flex justify-center gap-6 py-1">
            <a 
              href="https://github.com/BOSC-DEV/BOSC-APP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-western-parchment hover:text-western-sand transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
            
            <a 
              href="https://x.com/bookofscamslol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-western-parchment hover:text-western-sand transition-colors"
            >
              <Twitter className="h-4 w-4" />
            </a>
            
            <a 
              href="mailto:dev@bookofscamslol" 
              className="text-western-parchment hover:text-western-sand transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png"
                alt="Book of Scams Logo"
                className="h-4 mr-1"
              />
              <span className="text-western-parchment font-western text-xs">
                Book of Scams {currentYear} &copy;
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/BOSC-DEV/BOSC-APP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-western-parchment hover:text-western-sand transition-colors"
              >
                <Github className="h-3 w-3" />
                <span className="font-western text-xs">GitHub</span>
              </a>
              
              <a 
                href="https://x.com/bookofscamslol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-western-parchment hover:text-western-sand transition-colors"
              >
                <Twitter className="h-3 w-3" />
                <span className="font-western text-xs">@bookofscamslol</span>
              </a>
              
              <a 
                href="mailto:dev@bookofscamslol" 
                className="flex items-center gap-1 text-western-parchment hover:text-western-sand transition-colors"
              >
                <Mail className="h-3 w-3" />
                <span className="font-western text-xs">dev@bookofscamslol</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};

export default SiteFooter;
