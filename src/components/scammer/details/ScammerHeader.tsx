
import React from 'react';
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from 'react-router-dom';
import { storageService } from '@/services/storage';
import { toast } from 'sonner';
import { SolAmount } from '@/components/SolAmount';

interface ScammerHeaderProps {
  name: string;
  accusedOf: string;
  isCreator: boolean;
  scammerId: string;
  bountyAmount?: number;
}

export function ScammerHeader({ 
  name, 
  accusedOf, 
  isCreator, 
  scammerId, 
  bountyAmount = 0
}: ScammerHeaderProps) {
  const navigate = useNavigate();

  const handleDeleteScammer = async () => {
    try {
      // Using soft delete to archive instead of permanently removing
      const success = await storageService.softDeleteScammer(scammerId);
      
      if (success) {
        toast.success("Listing archived successfully", {
          description: "An admin can restore this listing if needed"
        });
        navigate('/most-wanted'); // Redirect to most wanted page after deletion
      } else {
        toast.error("Failed to archive listing");
      }
    } catch (error) {
      console.error("Error archiving scammer:", error);
      toast.error("An error occurred while archiving the listing");
    }
  };

  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="text-2xl text-western-wood">{name}</CardTitle>
        <CardDescription className="text-western-wood/70 mt-1">
          Accused of: {accusedOf}
        </CardDescription>
        {bountyAmount > 0 && (
          <div className="mt-2 flex items-center">
            <span className="text-sm text-western-accent font-medium">
              Total Bounty: <SolAmount amount={bountyAmount} className="font-bold" showIcon={true} />
            </span>
          </div>
        )}
      </div>
      
      {isCreator && (
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            asChild
            className="bg-western-sand/30 border-western-sand/20 text-western-wood/80 hover:bg-western-wood hover:text-western-parchment transition-colors"
          >
            <Link to={`/edit-listing/${scammerId}`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit Listing
            </Link>
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-western-sand/30 border-western-sand/20 text-western-wood/80 hover:bg-red-500 hover:text-white hover:border-red-500/30 transition-colors"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Archive
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-western-parchment border-western-wood/40">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-western-accent">Archive Listing</AlertDialogTitle>
                <AlertDialogDescription className="text-western-wood/80">
                  Are you sure you want to archive this listing? The listing will be hidden but can be recovered by an administrator if needed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-western-sand/20 border-western-wood/20 text-western-wood hover:bg-western-sand/30">Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteScammer}
                  className="bg-red-500/80 text-white hover:bg-red-600"
                >
                  Archive
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
