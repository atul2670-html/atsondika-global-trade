async function testWrite() {
  const url = 'https://atsondika-global-trade-default-rtdb.asia-southeast1.firebasedatabase.app/live_store.json';
  const res = await fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'active',
      updatedAt: Date.now(),
      message: 'Adidev Realtime Global Sync Active'
    })
  });
  console.log('PUT status:', res.status);
  const json = await res.json();
  console.log('PUT result:', json);
}

testWrite();
