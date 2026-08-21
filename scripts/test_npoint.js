async function testNPoint() {
  const binId = '0f04c636f1c42f01fbd8';
  const url = `https://api.npoint.io/${binId}`;
  
  console.log('Testing GET:', url);
  let res = await fetch(url);
  console.log('GET status:', res.status);
  let data = await res.json().catch(() => null);
  console.log('GET data:', data);

  console.log('Testing POST to create new bin on npoint.io...');
  res = await fetch('https://api.npoint.io/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: { test: 'world', updatedAt: Date.now() } })
  });
  console.log('POST status:', res.status);
  const binData = await res.json().catch(() => null);
  console.log('POST result:', binData);
}

testNPoint();
