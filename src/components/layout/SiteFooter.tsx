
import { Link } from "react-router-dom";
import { Twitter, Mail, Github } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();

  // Don't render the footer at all on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <footer className="py-3 border-t border-western-wood wood-texture w-full mt-auto">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-row gap-4 justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png"
              alt="Book of Scams Logo"
              className="h-12 mr-2"
              style={{ objectFit: "contain" }}
            />
            <span className="text-western-parchment font-western text-base">
              Book of Scams {currentYear} &copy;
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/BOSC-DEV/BOSC-APP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-western-parchment hover:text-western-sand transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="font-western text-sm">GitHub</span>
            </a>
            
            <a 
              href="https://x.com/bookofscamslol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-western-parchment hover:text-western-sand transition-colors"
            >
              <Twitter className="h-5 w-5" />
              <span className="font-western text-sm">@bookofscamslol</span>
            </a>
            
            <a 
              href="mailto:dev@bookofscamslol" 
              className="flex items-center gap-1.5 text-western-parchment hover:text-western-sand transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="font-western text-sm">dev@bookofscamslol</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
