
import { useState } from "react";
import { Shield, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { formatWalletAddress } from "@/utils/formatters";

export const WarningSection = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(DEVELOPER_WALLET_ADDRESS)
      .then(() => {
        setCopied(true);
        toast.success("Address copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy address");
      });
  };

  return (
    <section className="py-12 md:py-16 bg-western-parchment/20 border-y-2 border-western-leather/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row gap-6 items-start western-card bg-western-parchment/80 p-4 md:p-6 border-2 border-western-wood transform hover:-rotate-1 duration-300">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-western-accent/10 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-western-accent">
            <Shield className="h-7 w-7 md:h-8 md:w-8 text-western-accent" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-wanted text-western-accent mb-2 tracking-wide">IMPORTANT NOTICE</h2>
            <div>
              <p className="text-western-wood leading-relaxed font-western">
                The Book of Scams is a community-driven platform. All listings should be supported by evidence, but users are encouraged to conduct their own research. False accusations may have legal consequences. The BOSC token is used solely for platform functionality and does not constitute investment advice.
              </p>
            </div>
            
            <div className="mt-3 flex flex-col space-y-2">
              <div className="flex items-center">
                <button 
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 bg-western-sand/20 hover:bg-western-sand/30 text-western-wood py-1.5 px-3 rounded border border-western-wood/30 transition-colors"
                >
                  <span className="font-mono text-sm">
                    {formatWalletAddress(DEVELOPER_WALLET_ADDRESS)}
                  </span>
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
