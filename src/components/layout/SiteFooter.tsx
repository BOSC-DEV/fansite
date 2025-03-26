
import { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, Twitter, Mail } from "lucide-react";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { formatWalletAddress } from "@/utils/formatters";
import { toast } from "sonner";

export const SiteFooter = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(DEVELOPER_WALLET_ADDRESS)
      .then(() => {
        setCopied(true);
        toast.success("Wallet address copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy text");
      });
  };

  return (
    <footer className="py-8 border-t border-western-wood wood-texture">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <span className="text-xl font-wanted text-western-parchment">Book of Scams</span>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            {/* Social links centered */}
            <div className="flex items-center gap-6">
              <a 
                href="https://x.com/bookofscamslol" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-western-parchment hover:text-western-sand transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span className="font-western text-sm">@bookofscamslol</span>
              </a>
              
              <a 
                href="mailto:dev@bookofscamslol" 
                className="flex items-center gap-2 text-western-parchment hover:text-western-sand transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="font-western text-sm">dev@bookofscamslol</span>
              </a>
            </div>
          </div>
          
          <div className="text-sm text-western-parchment font-western">
            &copy; {new Date().getFullYear()} Book of Scams
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-sm text-western-parchment/80 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-western-parchment">
              <span className="font-western">Ca:</span>
              <span className="font-western cursor-pointer" onClick={copyToClipboard}>
                {formatWalletAddress(DEVELOPER_WALLET_ADDRESS)}
              </span>
              {copied ? (
                <Check className="h-4 w-4 ml-2 text-green-400" />
              ) : (
                <Copy className="h-4 w-4 ml-2 cursor-pointer" onClick={copyToClipboard} />
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
