async function testEndpoints() {
  const endpoints = [
    'https://adidev-export-hub-default-rtdb.firebaseio.com/live_store_v2.json',
    'https://api.jsonbin.io/v3/b',
    'https://api.npoint.io/0f04c636f1c42f01fbd8'
  ];

  for (const ep of endpoints) {
    try {
      const res = await fetch(ep);
      console.log(ep, '--> GET status:', res.status);
    } catch(e) {
      console.log(ep, '--> GET error:', e.message);
    }
  }
}

testEndpoints();
