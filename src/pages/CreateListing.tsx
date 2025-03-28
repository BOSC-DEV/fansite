
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { FormContainer } from "@/components/createListing/FormContainer";
import { useIsMobile } from "@/hooks/use-mobile";
import { SiteFooter } from "@/components/layout/SiteFooter";

const CreateListing = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Report a Scammer | BOSC</title>
        <meta
          name="description"
          content="Report a scammer to the Book of Scams. Help protect the community from fraud."
        />
      </Helmet>

      <div className="container mx-auto px-4 max-w-3xl flex-grow">
        <PageHeader
          title="Report a Scammer"
          description="Add a new scammer to the Book of Scams"
          actionLabel="Back to Scammers"
          actionLink="/most-wanted"
        />

        <FormContainer />
      </div>

      {!isMobile && <SiteFooter />}
    </div>
  );
};

export default CreateListing;
