async function testFreeImageHost() {
  console.log('Testing FreeImageHost API...');
  const apiKey = '6D208455A4C04C1B95220D1B0'; // freeimage.host key
  const sampleBase64 = 'iVBORw0KGgoAAAANSU5EUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  const formData = new URLSearchParams();
  formData.append('key', '6D208455A4C04C1B95220D1B0');
  formData.append('action', 'upload');
  formData.append('source', sampleBase64);
  formData.append('format', 'json');

  try {
    const res = await fetch('https://freeimage.host/api/1/upload', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    console.log('FreeImageHost status:', res.status, 'Response:', data);
  } catch(e) {
    console.error('FreeImageHost Error:', e);
  }
}

testFreeImageHost();
