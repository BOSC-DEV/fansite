
import React from "react";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png" 
        alt="Book of Scams Logo" 
        className="h-5 w-5 object-contain"
      />
    </Link>
  );
};

export default Logo;
