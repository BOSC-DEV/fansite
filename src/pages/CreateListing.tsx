
import { Header } from "@/components/Header";
import { CreateListingForm } from "@/components/CreateListingForm";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SiteFooter } from "@/components/layout/SiteFooter";

const CreateListing = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col old-paper">
      <Header />

      <main className={`flex-1 py-[12px] md:py-[24px] overflow-y-auto ${isMobile ? 'pb-32' : 'pb-16'}`}>
        <div className="container mx-auto px-4">
          <div className="paper-texture border-2 border-western-wood rounded-sm p-6 py-[24px] mb-6">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-wanted text-western-accent mb-2">Post a Bounty</h1>
              <p className="text-western-wood max-w-2xl mx-auto">
                Report a scammer to the community and offer a bounty for information leading to recovery of funds
              </p>
            </div>
            <CreateListingForm />
          </div>
        </div>
      </main>
      
      <SiteFooter />
    </div>
  );
};

export default CreateListing;
