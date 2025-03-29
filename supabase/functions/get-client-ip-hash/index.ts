
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createHash } from 'https://deno.land/std@0.177.0/crypto/mod.ts'

// This edge function securely hashes the client's IP address to track unique views
// without storing actual IP addresses for privacy reasons
serve(async (req) => {
  try {
    // Get the client IP from the request headers
    const clientIp = req.headers.get('x-real-ip') || 
                    req.headers.get('x-forwarded-for') || 
                    'unknown';
    
    // Add a secret salt to the IP before hashing to make it more secure
    // In a production app, you'd store this salt in Supabase secrets
    const salt = Deno.env.get('IP_HASH_SALT') || 'default-salt-for-development';
    
    // Create a SHA-256 hash of the IP+salt
    const hash = createHash('sha256')
      .update(`${clientIp}:${salt}`)
      .toString('hex');
    
    // Return the hashed value
    return new Response(
      JSON.stringify({
        ipHash: hash,
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200 
      },
    )
  } catch (error) {
    console.error("Error hashing IP:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to generate IP hash" }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
