
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IdentityTab } from './tabs/IdentityTab';
import { SocialsTab } from './tabs/SocialsTab';
import { NetworkTab } from './tabs/NetworkTab';
import { ResponseTab } from './tabs/ResponseTab';

interface ScammerContentProps {
  aliases: string[];
  links: string[];
  accomplices: string[];
  officialResponse: string;
}

export function ScammerContent({ aliases, links, accomplices, officialResponse }: ScammerContentProps) {
  // Add console logs to debug the data
  console.log('ScammerContent props:', { aliases, links, accomplices, officialResponse });
  
  return (
    <Tabs defaultValue="identity" className="w-full mt-4">
      <TabsList className="grid grid-cols-4 mb-6 bg-western-sand/20 p-1 border border-western-wood/30 rounded-md">
        <TabsTrigger 
          value="identity" 
          className="data-[state=active]:bg-western-parchment data-[state=active]:text-western-accent font-western"
        >
          Identity
        </TabsTrigger>
        <TabsTrigger 
          value="socials" 
          className="data-[state=active]:bg-western-parchment data-[state=active]:text-western-accent font-western"
        >
          Links
        </TabsTrigger>
        <TabsTrigger 
          value="network" 
          className="data-[state=active]:bg-western-parchment data-[state=active]:text-western-accent font-western"
        >
          Network
        </TabsTrigger>
        <TabsTrigger 
          value="response" 
          className="data-[state=active]:bg-western-parchment data-[state=active]:text-western-accent font-western"
        >
          Response
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="identity">
        <IdentityTab aliases={aliases} />
      </TabsContent>
      
      <TabsContent value="socials">
        <SocialsTab links={links} />
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
