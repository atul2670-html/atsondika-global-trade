const masterKey = '$2a$10$tEx/T2L8P5kE9Z.vS7S39O'; // example format

async function testKey() {
  const res = await fetch('https://api.jsonbin.io/v3/b', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Master-Key': '$2b$10$sX8yQ1L5P6kE9Z.vS7S39O1234567890abcdef'
    },
    body: JSON.stringify({ test: 'ok' })
  });
  console.log('Status:', res.status);
}
testKey();
