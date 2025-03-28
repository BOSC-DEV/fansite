
import React from "react";
import { Helmet } from "react-helmet-async";
import { MostWanted as MostWantedComponent } from "@/components/scammer/MostWanted";
import { MostWantedHeader } from "@/components/scammer/MostWantedHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { SiteFooter } from "@/components/layout/SiteFooter";

const MostWanted = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Most Wanted Scammers | BOSC</title>
        <meta
          name="description"
          content="Most wanted scammers in the blockchain space. Report and track scammers to protect the community."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-6xl flex-grow">
        <MostWantedHeader />
        <MostWantedComponent />
      </div>
      
      {!isMobile && <SiteFooter />}
    </div>
  );
};

export default MostWanted;
