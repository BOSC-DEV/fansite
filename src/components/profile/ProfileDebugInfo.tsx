
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { profileService } from "@/services/storage/profileService";
import { toast } from "sonner";

export function ProfileDebugInfo() {
  const { address, isConnected } = useWallet();
  const [debugInfo, setDebugInfo] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchProfileDebugInfo = async () => {
    if (!address) {
      toast.error("No wallet connected");
      return;
    }
    
    setLoading(true);
    try {
      // Check if profile exists
      const hasProfile = await profileService.hasProfile(address);
      
      // Get profile data if it exists
      const profileData = hasProfile ? await profileService.getProfile(address) : null;
      
      // Get direct database data
      const { data: dbData, error } = await fetch(
        `https://mfirlsuuxpvgwaxymjor.supabase.co/rest/v1/profiles?wallet_address=eq.${address}`,
        {
          headers: {
            "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maXJsc3V1eHB2Z3dheHltam9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDIyNjQsImV4cCI6MjA1ODgxODI2NH0.NCYmYYwlpwGieEd3VwrnWCKsva6Wl6Tw1ouTBmfSO-I",
            "Content-Type": "application/json"
          }
        }
      ).then(res => res.json());
      
      setDebugInfo({
        hasProfile,
        profileData,
        dbData: dbData || null,
        dbError: error
      });
      
      toast.success("Debug info loaded");
    } catch (error) {
      console.error("Error fetching debug info:", error);
      toast.error("Failed to load debug info");
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <Card className="mt-8 border-western-wood/30">
      <CardHeader>
        <CardTitle className="text-md font-western text-western-accent flex items-center justify-between">
          Profile Debug Information
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchProfileDebugInfo}
            disabled={loading}
            className="text-xs"
          >
            {loading ? "Loading..." : "Load Debug Info"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {debugInfo ? (
          <div className="text-xs font-mono overflow-x-auto">
            <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Click the button to load debug information.</p>
        )}
      </CardContent>
    </Card>
  );
}
