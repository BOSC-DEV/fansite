
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { UserProfile } from "@/components/profile/UserProfile";
import { useWallet } from "@/context/WalletContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiteFooter } from "@/components/layout/SiteFooter";

export function ProfilePage() {
  const { isConnected, address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseReady = isSupabaseConfigured();
  
  return (
    <div className="min-h-screen old-paper flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-4 flex-grow">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-wanted text-western-accent text-center mb-8">Your Profile</h1>
          
          {!supabaseReady && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Configuration Error</AlertTitle>
              <AlertDescription>
                Supabase is not configured properly. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY 
                to your .env file. See .env.example for details.
              </AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <Card className="p-4 mb-8">
              <div className="flex items-center justify-center gap-4">
                <Loader2 className="h-5 w-5 animate-spin text-western-accent" />
                <div>Loading profile data...</div>
              </div>
            </Card>
          ) : null}
          
          {supabaseReady ? (
            <UserProfile key={address} /> 
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Profile Management Unavailable</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Profile management is unavailable until Supabase is properly configured.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export default ProfilePage;
