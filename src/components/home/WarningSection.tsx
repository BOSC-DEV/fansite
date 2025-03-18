
import { AlertTriangle } from "lucide-react";

export const WarningSection = () => {
  return (
    <section className="py-16 bg-alert/5">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-16 h-16 rounded-full bg-alert/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-8 w-8 text-alert animate-pulse" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Important Disclaimer</h2>
            <p className="text-muted-foreground">
              The Book of Scams is a community-driven platform. All listings should be supported by evidence, 
              but users are encouraged to conduct their own research. False accusations may have legal consequences.
              The $BOSC token is used solely for platform functionality and does not constitute investment advice.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
