
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const Logo = () => {
  const isMobile = useIsMobile();
  
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png" 
        alt="Book of Scams Logo" 
        className={isMobile ? "h-5 w-5 object-contain" : "h-7 w-7 object-contain"}
      />
      
      {!isMobile && (
        <span className="ml-2 text-western-parchment font-wanted text-sm uppercase tracking-wide">
          Book of Scams
        </span>
      )}
    </Link>
  );
};

export default Logo;
