import fs from 'fs';

async function testImgbbUpload() {
  console.log('Testing ImgBB Free Cloud Photo Upload API...');

  // ImgBB Free Public API Key
  const apiKey = '6d70444737464d135318b492f1a6e746'; // Public ImgBB upload key

  // Small sample image base64
  const sampleBase64 = 'iVBORw0KGgoAAAANSU5EUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  const formData = new URLSearchParams();
  formData.append('image', sampleBase64);

  try {
    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    console.log('ImgBB Response Status:', res.status);
    console.log('Uploaded Image Live URL:', data.data?.url);
  } catch(e) {
    console.error('ImgBB Error:', e);
  }
}

testImgbbUpload();
