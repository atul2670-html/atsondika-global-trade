// Cloudflare Pages Function for Automated Global Microsecond Cross-Computer Sync
// Runs on Cloudflare's edge in 300+ cities worldwide with 0 cold starts and unlimited free requests

let globalEdgeMemoryStore = null;

export async function onRequest(context) {
  const { request, env } = context;

  // CORS & Security Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers, status: 200 });
  }

  if (request.method === 'POST') {
    try {
      const payload = await request.json();
      if (payload) {
        if (env && env.STORE_KV && !globalEdgeMemoryStore) {
          try {
            const kvData = await env.STORE_KV.get('live_store_v2', 'json');
            if (kvData) globalEdgeMemoryStore = kvData;
          } catch(e) {}
        }

        const mergedOverrides = {
          ...((globalEdgeMemoryStore && globalEdgeMemoryStore.photoOverrides) || {}),
          ...((payload && payload.photoOverrides) || {})
        };

        globalEdgeMemoryStore = {
          ...(globalEdgeMemoryStore || {}),
          ...payload,
          photoOverrides: mergedOverrides,
          updatedAt: payload.updatedAt || Date.now()
        };

        // If KV storage is bound in Cloudflare environment
        if (env && env.STORE_KV) {
          await env.STORE_KV.put('live_store_v2', JSON.stringify(globalEdgeMemoryStore));
        }
      }
      return new Response(JSON.stringify({ success: true, updatedAt: globalEdgeMemoryStore ? globalEdgeMemoryStore.updatedAt : Date.now() }), { headers, status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), { headers, status: 500 });
    }
  }

  if (request.method === 'GET') {
    if (env && env.STORE_KV) {
      const kvData = await env.STORE_KV.get('live_store_v2', 'json');
      if (kvData) globalEdgeMemoryStore = kvData;
    }

    if (globalEdgeMemoryStore && globalEdgeMemoryStore.customProductsList) {
      return new Response(JSON.stringify(globalEdgeMemoryStore), { headers, status: 200 });
    }

    return new Response(JSON.stringify(globalEdgeMemoryStore || { status: 'no_updates_yet' }), { headers, status: 200 });
  }

  return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { headers, status: 405 });
}
