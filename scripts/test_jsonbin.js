async function testJsonBin() {
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify({ app: 'adidev_export', test: 'ok', updatedAt: Date.now() })
    });
    const data = await res.json();
    console.log('jsonbin POST status:', res.status, data);
  } catch(e) {
    console.log('jsonbin error:', e.message);
  }
}

testJsonBin();
