import { AlertTriangle, Shield } from "lucide-react";
export const WarningSection = () => {
  return <section className="py-16 bg-western-parchment/20 border-y-2 border-western-leather/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row gap-6 items-center western-card bg-western-parchment/80 p-6 border-2 border-western-wood transform hover:-rotate-1 duration-300">
          <div className="w-16 h-16 rounded-full bg-western-accent/10 flex items-center justify-center flex-shrink-0 border-2 border-dashed border-western-accent">
            <Shield className="h-8 w-8 text-western-accent" />
          </div>
          <div>
            <h2 className="text-2xl font-wanted text-western-accent mb-2 tracking-wide">IMPORTANT NOTICE</h2>
            <p className="text-western-wood leading-relaxed font-western">The Book of Scams is a community-driven platform. All listings should be supported by evidence, but users are encouraged to conduct their own research. False accusations may have legal consequences. The BOSC token is used solely for platform functionality and does not constitute investment advice.


To support this public good, send any tokens to A6X5A7ZSvez8BK82Z5tnZJC3qarGbsxRVv8Hc3DKBiZx.</p>
          </div>
        </div>
      </div>
    </section>;
};