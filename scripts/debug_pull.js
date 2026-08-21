const CLOUD_SYNC_URL = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a010269b453880';

async function debugPull() {
  const res = await fetch(CLOUD_SYNC_URL);
  console.log('Status:', res.status);
  const json = await res.json();
  console.log('Raw JSON from cloud:', JSON.stringify(json, null, 2));
}

debugPull();
