const CLOUD_SYNC_URL = 'https://api.restful-api.dev/objects/ff8081819ff5b11001a010269b453880';

async function pushGlobalCloudSync(storeData) {
  if (!storeData) return;
  try {
    const payload = {
      name: 'adidev_store_v2',
      data: {
        ...storeData,
        updatedAt: Date.now()
      }
    };

    const res = await fetch(CLOUD_SYNC_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log('PUSH status:', res.status);
    return res.ok;
  } catch (err) {
    console.error('PUSH error:', err);
    return false;
  }
}

async function pullGlobalCloudSync() {
  try {
    const response = await fetch(CLOUD_SYNC_URL);
    if (!response.ok) return null;
    const json = await response.json();
    if (json && json.data) {
      return {
        ...json.data,
        updatedAt: json.data.updatedAt || json.updatedAt || Date.now()
      };
    }
  } catch (err) {
    console.error('PULL error:', err);
  }
  return null;
}

async function testCycle() {
  console.log('1. Pushing test data...');
  const success = await pushGlobalCloudSync({
    customProductsList: [
      { id: 'punjabi_dress_comp4', names: { en: 'Gujarati Dress', gu: 'ગુજરાતી ડ્રેસ' } }
    ],
    photoOverrides: {
      'punjabi_dress_comp4': { image: 'https://lh3.googleusercontent.com/test' }
    }
  });
  console.log('Push result:', success);

  console.log('2. Pulling cloud data...');
  const pulled = await pullGlobalCloudSync();
  console.log('Pulled result:', JSON.stringify(pulled, null, 2));
}

testCycle();
