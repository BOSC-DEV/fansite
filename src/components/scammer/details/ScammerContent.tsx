
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdentityTab } from './tabs/IdentityTab';
import { EvidenceTab } from './tabs/EvidenceTab';
import { NetworkTab } from './tabs/NetworkTab';
import { ResponseTab } from './tabs/ResponseTab';
import { ScammerInteractionButtons } from './ScammerInteractionButtons';
import { Eye } from "lucide-react";

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
  aliases, 
  links, 
  accomplices, 
  officialResponse,
  likes,
  dislikes,
  views,
  isLiked,
  isDisliked,
  onLike,
  onDislike
}: ScammerContentProps) {
  return (
    <div className="w-full">
      <Tabs defaultValue="identity" className="w-full">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row flex-wrap justify-between items-center gap-4 mt-6">
            <ScammerInteractionButtons
              likes={likes}
              dislikes={dislikes}
              views={views}
              isLiked={isLiked}
              isDisliked={isDisliked}
              onLike={onLike}
              onDislike={onDislike}
            />
            
            <TabsList className="grid grid-cols-4 w-auto">
              <TabsTrigger value="identity">Identity</TabsTrigger>
              <TabsTrigger value="evidence">Evidence</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="identity">
            <IdentityTab aliases={aliases} />
          </TabsContent>
          
          <TabsContent value="evidence">
            <EvidenceTab links={links} />
          </TabsContent>
          
          <TabsContent value="network">
            <NetworkTab accomplices={accomplices} />
          </TabsContent>
          
          <TabsContent value="response">
            <ResponseTab officialResponse={officialResponse} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
