
import React from 'react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#9b87f5] to-[#6E59A5] text-white">
      <Helmet>
        <title>Coming Soon - Book of Scams</title>
        <meta name="description" content="Our site is coming soon!" />
      </Helmet>
      
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 tracking-wide drop-shadow-lg">
          COMING SOON
        </h1>
        <p className="text-xl opacity-80">
          We're working hard to bring you something amazing.
        </p>
      </div>
    </div>
  );
};

export default Index;
