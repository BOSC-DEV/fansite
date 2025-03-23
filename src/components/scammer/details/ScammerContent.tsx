
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdentityTab } from './tabs/IdentityTab';
import { EvidenceTab } from './tabs/EvidenceTab';
import { NetworkTab } from './tabs/NetworkTab';
import { ResponseTab } from './tabs/ResponseTab';

interface ScammerContentProps {
  aliases: string[];
  links: string[];
  accomplices: string[];
  officialResponse: string;
  likes: number;
  dislikes: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export function ScammerContent({ 
  aliases = [], 
  links = [], 
  accomplices = [], 
  officialResponse = "",
  likes = 0,
  dislikes = 0,
  views = 0,
  isLiked = false,
  isDisliked = false,
  onLike,
  onDislike
}: ScammerContentProps) {
  console.log("ScammerContent rendering with:", {
    links,
    aliases,
    accomplices
  });
  
  return (
    <div className="w-full">
      <Tabs defaultValue="identity" className="w-full">
        <div className="flex flex-row gap-6">
          {/* TabsList moved to the left side */}
          <TabsList className="flex-col h-auto p-1 w-40">
            <TabsTrigger value="identity" className="w-full justify-start px-4 py-3">Identity</TabsTrigger>
            <TabsTrigger value="evidence" className="w-full justify-start px-4 py-3">Evidence</TabsTrigger>
            <TabsTrigger value="network" className="w-full justify-start px-4 py-3">Network</TabsTrigger>
            <TabsTrigger value="response" className="w-full justify-start px-4 py-3">Response</TabsTrigger>
          </TabsList>
          
          <div className="flex-1">
            <TabsContent value="identity">
              <IdentityTab aliases={aliases || []} />
            </TabsContent>
            
            <TabsContent value="evidence">
              <EvidenceTab links={links || []} />
            </TabsContent>
            
            <TabsContent value="network">
              <NetworkTab accomplices={accomplices || []} />
            </TabsContent>
            
            <TabsContent value="response">
              <ResponseTab officialResponse={officialResponse || ""} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
