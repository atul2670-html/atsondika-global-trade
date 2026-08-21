async function testMyJsonCollection() {
  try {
    const res = await fetch('https://api.myjson.online/v1/collections', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'adidev_store' })
    });
    console.log('myjson collection status:', res.status);
    const text = await res.text();
    console.log('myjson response:', text);
  } catch(e) {
    console.error('error:', e);
  }
}

testMyJsonCollection();
