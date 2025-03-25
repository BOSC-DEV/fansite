
import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check } from "lucide-react";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { formatWalletAddress } from "@/utils/formatters";
import { toast } from "sonner";

export const HomeFooter = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("TBC")
      .then(() => {
        setCopied(true);
        toast.success("TBC copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy text");
      });
  };

  return (
    <footer className="py-8 border-t-2 border-western-leather/30 bg-western-parchment/10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="font-wanted text-transparent bg-clip-text bg-gradient-to-r from-western-accent to-western-leather">Book of Scams</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Home
            </Link>
            <Link to="/most-wanted" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Most Wanted
            </Link>
            <Link to="/create-listing" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Report Scammer
            </Link>
          </div>
          
          <div className="text-sm text-western-wood font-western">
            &copy; {new Date().getFullYear()} Book of Scams
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-western-wood/20 text-center">
          <div className="flex items-center justify-center gap-2 text-western-wood">
            <span className="font-western">Ca:</span>
            <span className="font-western cursor-pointer" onClick={copyToClipboard}>TBC</span>
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4 cursor-pointer" onClick={copyToClipboard} />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
