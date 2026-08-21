async function testKvdb() {
  const bucketId = 'R3goZbmw46oERU6Wbgmuy9';
  try {
    const res = await fetch(`https://kvdb.io/${bucketId}/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 'ok', updatedAt: Date.now() })
    });
    const txt = await res.text();
    console.log('kvdb POST status:', res.status, txt);

    const getRes = await fetch(`https://kvdb.io/${bucketId}/store`);
    const getTxt = await getRes.text();
    console.log('kvdb GET status:', getRes.status, getTxt);
  } catch(e) {
    console.log('kvdb error:', e.message);
  }
}

testKvdb();
