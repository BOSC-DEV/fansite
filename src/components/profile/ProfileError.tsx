
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProfileErrorProps {
  error: string;
}

export function ProfileError({ error }: ProfileErrorProps) {
  return (
    <div className="max-w-md mx-auto">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      
      <div className="mt-4 text-center">
        <Button asChild variant="outline">
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    </div>
  );
}
