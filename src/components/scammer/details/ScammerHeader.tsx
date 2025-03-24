
import React from 'react';
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";

interface ScammerHeaderProps {
  name: string;
  accusedOf: string;
  isCreator: boolean;
  scammerId: string;
}

export function ScammerHeader({ name, accusedOf, isCreator, scammerId }: ScammerHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription className="text-muted-foreground mt-1">
          Accused of: {accusedOf}
        </CardDescription>
      </div>
      {isCreator && (
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-4"
          asChild
        >
          <Link to={`/edit-listing/${scammerId}`}>
            <Edit className="h-4 w-4 mr-1" />
            Edit Listing
          </Link>
        </Button>
      )}
    </div>
  );
}
