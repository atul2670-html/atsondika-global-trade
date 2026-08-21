// Vercel / Netlify Serverless API Endpoint for Automated Realtime Cross-Device Cloud Sync

const CLOUD_SYNC_URL = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a010269b453880';
let globalCloudMemoryStore = null;

export default async function handler(req, res) {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (payload) {
        globalCloudMemoryStore = {
          ...payload,
          updatedAt: Date.now()
        };

        // Asynchronously persist to cloud store
        fetch(CLOUD_SYNC_URL, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'adidev_store_v2',
            data: globalCloudMemoryStore
          })
        }).catch(() => {});
      }
      return res.status(200).json({ success: true, updatedAt: globalCloudMemoryStore ? globalCloudMemoryStore.updatedAt : Date.now() });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'GET') {
    if (globalCloudMemoryStore && globalCloudMemoryStore.customProductsList) {
      return res.status(200).json(globalCloudMemoryStore);
    }
    try {
      const cloudRes = await fetch(CLOUD_SYNC_URL);
      if (cloudRes.ok) {
        const json = await cloudRes.json();
        if (json && json.data) {
          globalCloudMemoryStore = json.data;
          return res.status(200).json(json.data);
        }
      }
    } catch(e) {}

    return res.status(200).json(globalCloudMemoryStore || { status: 'no_updates_yet' });
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
