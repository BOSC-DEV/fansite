
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scammer } from "@/lib/types";
import { formatTimeAgo } from "@/utils/formatters";
import { ScammerCardImage } from "./image/ScammerCardImage";
import { SolAmount } from "@/components/SolAmount";
import { supabase } from "@/lib/supabase";

interface ScammerCardProps {
  scammer: Scammer;
  rank?: number;
  className?: string;
  inProfileSection?: boolean;
}

export function ScammerCard({ 
  scammer, 
  rank, 
  className = "", 
  inProfileSection = false 
}: ScammerCardProps) {
  const [commentCount, setCommentCount] = useState(0);
  
  useEffect(() => {
    // Fetch comment count for this scammer
    const fetchCommentCount = async () => {
      if (!scammer.id) {
        console.error("No scammer ID provided for comment count");
        return;
      }
      
      try {
        const { count, error } = await supabase
          .from('comments')
          .select('*', { count: 'exact', head: true })
          .eq('scammer_id', scammer.id);
          
        if (error) {
          console.error("Error fetching comment count:", error);
        } else {
          setCommentCount(count || 0);
        }
      } catch (error) {
        console.error("Error in fetchCommentCount:", error);
      }
    };
    
    if (scammer.id) {
      fetchCommentCount();
    }
  }, [scammer.id]);

  return (
    <Card className={`overflow-hidden border-western-wood bg-western-parchment/80 group hover:shadow-md transition-all ${className}`}>
      {/* Card image with interactions overlay */}
      <ScammerCardImage 
        name={scammer.name}
        photoUrl={scammer.photoUrl}
        likes={scammer.likes || 0}
        dislikes={scammer.dislikes || 0}
        views={scammer.views || 0}
        shares={scammer.shares || 0}
        comments={commentCount}
        scammerId={scammer.id}
        rank={rank}
        interactionsPosition="bottomRight"
      />

      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <h3 className="font-bold font-western text-lg">{scammer.name}</h3>
          <SolAmount amount={scammer.bountyAmount || 0} className="text-western-accent font-wanted" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pb-2">
        <p className="text-western-wood text-sm line-clamp-3">
          {scammer.accusedOf}
        </p>
        
        {!inProfileSection && (
          <div className="flex items-center mt-2 text-western-wood/70 text-xs">
            <Clock className="h-3 w-3 mr-1" />
            <span>{formatTimeAgo(scammer.dateAdded)}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="ghost" 
          size="sm"
          asChild
          className="text-western-wood ml-auto group-hover:bg-western-sand/30 group-hover:text-western-wood"
        >
          <Link to={`/scammer/${scammer.id}`}>
            View Profile
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
