
// Create a Supabase Edge Function to hash client IP addresses for view tracking
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";
import { encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Simple hash function to anonymize IP addresses
async function hashIp(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${ip}-Book-of-Scams-salt-key`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get client IP from request headers
    const clientIp = req.headers.get('x-real-ip') || 
                    req.headers.get('x-forwarded-for') || 
                    "unknown";
    
    // Generate a hash of the IP address
    const ipHash = await hashIp(clientIp);
    
    console.log(`Hashed IP address for tracking: ${ipHash.substring(0, 8)}...`);
    
    // Return the hashed IP
    return new Response(
      JSON.stringify({ ipHash }),
      { 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error("Error in get-client-ip-hash function:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json' 
        }
      }
    );
  }
});
