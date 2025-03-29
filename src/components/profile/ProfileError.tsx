
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ProfileErrorProps {
  error: string;
}

export function ProfileError({ error }: ProfileErrorProps) {
  // Customize the message for different error types
  let title = "Error";
  let description = error;

  if (error.includes("Profile not found")) {
    title = "Profile Not Found";
    description = "This profile does not exist or has been removed.";
  } else if (error.includes("Invalid username")) {
    title = "Invalid Username";
    description = "This username is not valid or does not exist.";
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
