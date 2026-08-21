async function testEndpoints() {
  const testPayload = { app: 'adidev_export', test: 'ok', time: Date.now() };

  // Endpoint 1: jsonblob.com with custom User-Agent
  try {
    const res = await fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(testPayload)
    });
    console.log('jsonblob POST status:', res.status, res.headers.get('location'));
  } catch(e) {
    console.log('jsonblob failed:', e.message);
  }

  // Endpoint 2: myjson.online
  try {
    const res = await fetch('https://api.myjson.online/v1/records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonData: testPayload })
    });
    const data = await res.json();
    console.log('myjson.online status:', res.status, data);
  } catch(e) {
    console.log('myjson.online failed:', e.message);
  }

  // Endpoint 3: Firebase RTDB test
  try {
    const res = await fetch('https://adidev-export-hub-default-rtdb.firebaseio.com/live_store_v2.json');
    console.log('firebase status:', res.status);
    const txt = await res.text();
    console.log('firebase text:', txt.substring(0, 100));
  } catch(e) {
    console.log('firebase failed:', e.message);
  }
}

testEndpoints();
