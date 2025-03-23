
import React from "react";
import { Link } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface UnauthorizedAccessProps {
  scammerId: string;
}

export function UnauthorizedAccess({ scammerId }: UnauthorizedAccessProps) {
  return (
    <Alert variant="destructive" className="max-w-2xl mx-auto">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Unauthorized</AlertTitle>
      <AlertDescription>
        You are not authorized to edit this scammer listing. Only the creator can edit their listings.
      </AlertDescription>
      <div className="mt-4">
        <Button asChild>
          <Link to={`/scammer/${scammerId}`}>Go back to scammer details</Link>
        </Button>
      </div>
    </Alert>
  );
}
