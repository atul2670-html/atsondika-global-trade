async function testOpenProviders() {
  const testData = { app: 'adidev', updatedAt: Date.now(), customProductsList: [{ id: 'test' }] };

  // Provider 1: json.schemastore.org / jsonbin / api.npoint.io
  try {
    const res = await fetch('https://api.npoint.io/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    console.log('npoint post status:', res.status);
    if (res.ok) {
      const data = await res.json();
      console.log('npoint created ID:', data);
    }
  } catch(e) { console.log('npoint err:', e.message); }

  // Provider 2: https://api.jsonbin.io/v3/b (testing public bin creation without key)
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bin-Name': 'adidev_store'
      },
      body: JSON.stringify(testData)
    });
    console.log('jsonbin status:', res.status);
    console.log('jsonbin body:', await res.json().catch(() => null));
  } catch(e) { console.log('jsonbin err:', e.message); }

  // Provider 3: https://crudcrud.com/api/
  try {
    // Generate 32 char hex for crudcrud
    const crudRes = await fetch('https://crudcrud.com/api/8d73b2a941e2474db85a201b17a149bc/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });
    console.log('crudcrud status:', crudRes.status);
    if (crudRes.ok) console.log('crudcrud body:', await crudRes.json());
  } catch(e) { console.log('crudcrud err:', e.message); }
}

testOpenProviders();
