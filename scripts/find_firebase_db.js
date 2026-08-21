async function findWorkingFirebase() {
  const dbNames = [
    'adidev-export-hub',
    'adidev-smart-solution',
    'adidev-export-hub-v2',
    'adidev-realtime-db',
    'adidev-store-live',
    'adidev-export-2026',
    'adidev-smart-export',
    'adidev-global-trade',
    'atsondika-global-trade'
  ];

  const regions = [
    '.firebaseio.com',
    '-default-rtdb.firebaseio.com',
    '-default-rtdb.asia-southeast1.firebasedatabase.app',
    '-default-rtdb.europe-west1.firebasedatabase.app'
  ];

  for (const name of dbNames) {
    for (const reg of regions) {
      const url = `https://${name}${reg}/live_store.json`;
      try {
        const res = await fetch(url, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: 'hello', time: Date.now() })
        });
        if (res.status === 200 || res.status === 204) {
          console.log('🎉 FOUND WORKING FIREBASE ENDPOINT! -->', url, 'Status:', res.status);
          const getRes = await fetch(url);
          console.log('Read back:', await getRes.json());
          return url;
        } else {
          // console.log(url, '-->', res.status);
        }
      } catch(e) {}
    }
  }
  console.log('Finished search.');
}

findWorkingFirebase();
