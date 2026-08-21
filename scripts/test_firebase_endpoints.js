async function testFirebaseEndpoints() {
  const endpoints = [
    'https://adidev-export-v2-default-rtdb.firebaseio.com/store.json',
    'https://adidev-export-v3-default-rtdb.firebaseio.com/store.json',
    'https://adidev-smart-2026-default-rtdb.firebaseio.com/store.json',
    'https://adidev-hub-default-rtdb.asia-southeast1.firebasedatabase.app/store.json',
    'https://adidev-live-sync-default-rtdb.firebaseio.com/store.json',
    'https://adidev-export-hub-default-rtdb.firebaseio.com/live_store_v2.json'
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'hello', updatedAt: Date.now() })
      });
      console.log(ep, '--> PUT:', res.status);
    } catch(e) {
      console.log(ep, '--> err:', e.message);
    }
  }
}

testFirebaseEndpoints();
