async function testFirebase() {
  const firebaseUrls = [
    'https://adidev-export-hub-default-rtdb.firebaseio.com/live_store_v2.json',
    'https://adidev-smart-export-default-rtdb.asia-southeast1.firebasedatabase.app/live_store.json',
    'https://kvdb.io/W8P1V7yQ9z3K4L5M6N/adidev_store_v2',
    'https://api.myjson.online/v1/records'
  ];

  for (const url of firebaseUrls) {
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'hello', time: Date.now() })
      });
      console.log(url, '--> PUT status:', res.status);
      if (res.ok) {
        const getRes = await fetch(url);
        console.log(url, '--> GET status:', getRes.status, await getRes.json());
      }
    } catch(e) {
      console.log(url, '--> error:', e.message);
    }
  }
}

testFirebase();
