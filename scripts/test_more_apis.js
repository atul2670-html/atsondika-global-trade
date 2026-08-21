async function testMoreApis() {
  const apis = [
    'https://api.jsonsilo.com/public',
    'https://api.counterapi.dev/v1/adidev/store/up',
    'https://api.mockapi.io/api/v1/store',
    'https://adidev-export-hub.firebaseio.com/live_store_v2.json',
    'https://adidev-export-master.firebaseio.com/live_store_v2.json',
    'https://adidev-export-live.firebaseio.com/live_store_v2.json'
  ];

  for (const api of apis) {
    try {
      const res = await fetch(api);
      console.log(api, '--> status:', res.status);
    } catch(e) {
      console.log(api, '--> error:', e.message);
    }
  }
}

testMoreApis();
