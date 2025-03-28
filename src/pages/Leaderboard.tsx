
import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { useIsMobile } from "@/hooks/use-mobile";
import { SiteFooter } from "@/components/layout/SiteFooter";

const Leaderboard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Leaderboard | BOSC</title>
        <meta
          name="description"
          content="Top contributors to the Book of Scams. See who's helping the most to protect the community."
        />
      </Helmet>

      <div className="container mx-auto px-4 max-w-6xl flex-grow">
        <PageHeader
          title="Leaderboard"
          subtitle="Top contributors to the Book of Scams"
          backButtonLabel="Back to Scammers"
          onBackButtonClick={() => navigate("/most-wanted")}
        />

        <LeaderboardTable />
      </div>

      {!isMobile && <SiteFooter />}
    </div>
  );
};

export default Leaderboard;
