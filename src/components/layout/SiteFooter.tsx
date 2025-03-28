
import { Link } from "react-router-dom";
import { Twitter, Mail, Github } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <footer className={`py-2 border-t border-western-wood wood-texture mt-auto ${isMobile ? 'mb-16' : ''}`}>
      <div className="container mx-auto max-w-6xl px-4">
        <div className={`flex ${isMobile ? 'flex-col gap-1' : 'flex-row gap-2'} justify-between items-center`}>
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png"
              alt="Book of Scams Logo"
              className={`${isMobile ? 'h-6' : 'h-8'} mr-2`}
              style={{ objectFit: "contain" }}
            />
            <span className="text-western-parchment font-western text-xs">
              Book of Scams {currentYear} &copy; All Rights Reserved
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            <a 
              href="https://github.com/BOSC-DEV/BOSC-APP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-western-parchment hover:text-western-sand transition-colors"
            >
              <Github className={`${isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
              <span className="font-western text-xs">GitHub</span>
            </a>
            
            <a 
              href="https://x.com/bookofscamslol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-western-parchment hover:text-western-sand transition-colors"
            >
              <Twitter className={`${isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
              <span className="font-western text-xs">@bookofscamslol</span>
            </a>
            
            <a 
              href="mailto:dev@bookofscamslol" 
              className="flex items-center gap-1 text-western-parchment hover:text-western-sand transition-colors"
            >
              <Mail className={`${isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
              <span className="font-western text-xs">dev@bookofscamslol</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
