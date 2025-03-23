
import { FormContainer } from "./createListing/FormContainer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield } from "lucide-react";

export function CreateListingForm() {
  return (
    <div className="space-y-6">
      <Alert className="border-western-wood bg-western-sand/20">
        <Shield className="h-4 w-4 text-western-accent" />
        <AlertTitle className="text-western-accent">Protected Form</AlertTitle>
        <AlertDescription className="text-western-wood">
          This form is protected by Cloudflare Turnstile to ensure secure and legitimate submissions.
          Your domain is also secured with Cloudflare nameservers for additional protection.
        </AlertDescription>
      </Alert>
      
      <FormContainer />
    </div>
  );
}

export default CreateListingForm;
