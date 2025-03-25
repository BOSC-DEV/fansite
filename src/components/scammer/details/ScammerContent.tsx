
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
}

export function ScammerContent({ aliases, links, accomplices, officialResponse }: ScammerContentProps) {
  return (
    <Tabs defaultValue="identity" className="w-full">
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="identity">Identity</TabsTrigger>
        <TabsTrigger value="evidence">Evidence</TabsTrigger>
        <TabsTrigger value="network">Network</TabsTrigger>
        <TabsTrigger value="response">Response</TabsTrigger>
      </TabsList>
      
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
    </Tabs>
  );
}
