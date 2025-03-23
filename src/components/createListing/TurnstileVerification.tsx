
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, CheckCircle2 } from "lucide-react";
import { CloudflareTurnstile } from "@/components/CloudflareTurnstile";
import { toast } from "sonner";

// Get Cloudflare Turnstile site key from environment variables or use development key as fallback
const TURNSTILE_SITE_KEY = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000BB';

interface TurnstileVerificationProps {
  onVerify: (token: string) => void;
  token: string | null;
}

export function TurnstileVerification({ onVerify, token }: TurnstileVerificationProps) {
  const handleVerify = (token: string) => {
    onVerify(token);
    toast.success("Verification successful!", {
      icon: <CheckCircle2 className="h-4 w-4" />,
      duration: 3000
    });
  };

  return (
    <div className="mt-6 border-t border-western-wood/20 pt-6">
      <Alert className="mb-4 border-western-accent/30 bg-western-accent/10">
        <Shield className="h-4 w-4 text-western-accent" />
        <AlertDescription className="text-western-wood">
          Protected by Cloudflare Turnstile - Verify you're not a robot
        </AlertDescription>
      </Alert>
      
      <CloudflareTurnstile 
        siteKey={TURNSTILE_SITE_KEY} 
        onVerify={handleVerify} 
        theme="auto"
      />
      
      {!token && (
        <p className="text-sm text-western-accent mt-2">
          * Required to submit the form
        </p>
      )}
      
      {token && (
        <div className="flex items-center gap-2 text-green-600 mt-2">
          <CheckCircle2 className="h-4 w-4" />
          <p className="text-sm">Verification successful</p>
        </div>
      )}
    </div>
  );
}
