
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'

// Handle request to get a hash of the client's IP address
serve(async (req) => {
  try {
    // Get the client IP from the request headers
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    
    // Create a simple hash of the IP to protect privacy
    // We'll use SHA-256 algorithm from the Deno standard library
    const encoder = new TextEncoder();
    const data = encoder.encode(clientIp);
    
    // Calculate hash - using crypto.subtle instead of createHash
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    
    // Convert the hash buffer to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const ipHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Return the hashed IP
    return new Response(
      JSON.stringify({
        ipHash,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing get-client-ip-hash request:', error)
    
    return new Response(
      JSON.stringify({
        error: 'Failed to process request',
        message: error.message,
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
