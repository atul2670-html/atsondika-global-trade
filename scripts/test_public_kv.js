async function testPublicKV() {
  // Test keyvalue.xyz
  try {
    const keyRes = await fetch('https://keyvalue.xyz/new', { method: 'POST' });
    console.log('keyvalue.xyz new status:', keyRes.status);
    if (keyRes.ok) {
      const keyUrl = await keyRes.text();
      console.log('keyvalue.xyz created URL:', keyUrl);
      const putRes = await fetch(keyUrl.trim() + '/adidev_store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: 'hello world', updatedAt: Date.now() })
      });
      console.log('keyvalue.xyz PUT status:', putRes.status);
      const getRes = await fetch(keyUrl.trim() + '/adidev_store');
      console.log('keyvalue.xyz GET status:', getRes.status, await getRes.text());
    }
  } catch(e) {
    console.log('keyvalue.xyz error:', e.message);
  }
}

testPublicKV();
