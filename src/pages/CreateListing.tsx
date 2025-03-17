
import { Header } from "@/components/Header";
import { CreateListingForm } from "@/components/CreateListingForm";
import { useWallet } from "@/context/WalletContext";
import ConnectWallet from "@/components/ConnectWallet";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const CreateListing = () => {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-8"
          >
            <Link to="/most-wanted">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Most Wanted
            </Link>
          </Button>

          {isConnected ? (
            <CreateListingForm />
          ) : (
            <div className="max-w-2xl mx-auto">
              <ConnectWallet 
                message="Connect your wallet to create a new scammer listing"
                redirectPath="/create-listing"
              />
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 border-t mt-auto">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-bosc">Book of Scams</span>
              <span className="px-2 py-1 bg-bosc/10 text-bosc text-xs font-medium rounded-full">
                $BOSC
              </span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/most-wanted" className="text-sm text-muted-foreground hover:text-foreground">
                Most Wanted
              </Link>
              <Link to="/create-listing" className="text-sm text-muted-foreground hover:text-foreground">
                Report Scammer
              </Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Book of Scams
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateListing;
