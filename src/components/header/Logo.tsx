
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export const Logo = ({ className }: LogoProps) => {
  return (
    <div className={cn("flex-shrink-0", className)}>
      <Link to="/" className="flex items-center space-x-2">
        <img 
          src="/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png" 
          alt="Book of Scams Logo" 
          className="h-8 w-8"
          style={{ objectFit: "contain" }}
        />
        <span className="font-wanted text-western-leather dark:text-western-parchment text-sm">Book of Scams</span>
      </Link>
    </div>
  );
};

export default Logo;
