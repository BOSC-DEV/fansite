
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createHash } from 'https://deno.land/std@0.177.0/crypto/mod.ts'

// Handle request to get a hash of the client's IP address
serve(async (req) => {
  try {
    // Get the client IP from the request headers
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'
    
    // Create a SHA-256 hash of the IP to protect privacy
    const hash = createHash('sha256')
    hash.update(clientIp)
    const ipHash = hash.toString('hex')
    
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
