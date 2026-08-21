async function testStores() {
  // Test jsonstorage.net
  try {
    const res = await fetch('https://api.jsonstorage.net/v1/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'adidev', test: 'ok', updatedAt: Date.now() })
    });
    console.log('jsonstorage status:', res.status);
    const json = await res.json().catch(() => null);
    console.log('jsonstorage result:', json);
  } catch(e) { console.log('jsonstorage err:', e.message); }

  // Test reqres.in / dummyjson / mocki.io
  try {
    const res = await fetch('https://mocki.io/v1/d467b400-1680-4e76-963d-41712a8848d0');
    console.log('mocki status:', res.status);
  } catch(e) {}
}

testStores();
