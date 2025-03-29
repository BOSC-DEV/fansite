
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as crypto from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function hashString(str: string): Promise<string> {
  // Get the salt from environment variable, or use a default for dev
  const salt = Deno.env.get('IP_HASH_SALT') || 'default-salt-for-development';
  const msgUint8 = new TextEncoder().encode(str + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getIpHash(req: Request): Promise<string> {
  // Try to get the real client IP from various headers
  let clientIp = req.headers.get('cf-connecting-ip') ||
                 req.headers.get('x-forwarded-for')?.split(',')[0].trim();
                 
  if (!clientIp) {
    console.log("Couldn't determine client IP, using a fallback");
    // Generate a random string as a fallback
    clientIp = crypto.randomUUID();
  }
  
  // Hash the IP for anonymity
  return await hashString(clientIp);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Get and hash the client IP
    const ipHash = await getIpHash(req);
    console.log("Generated IP hash for tracking: ", ipHash.substring(0, 10) + "...");
    
    // Return the hashed IP
    return new Response(
      JSON.stringify({ ipHash }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error generating IP hash:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to generate IP hash" }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
