// Test creating a bin on jsonbin.io with Master Key or public access
const MASTER_KEY = '$2a$10$3YmG95XnF1jC5zE6GZ8uCe.wE9o7HkX5L1v2U3W4X5Y6Z7A8B9C0D';

async function setupJsonBin() {
  console.log('Testing JSONBin.io bin creation...');
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': '$2a$10$1r2s3t4u5v6w7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q'
      },
      body: JSON.stringify({
        adidev_store: true,
        customProductsList: [],
        photoOverrides: {},
        updatedAt: Date.now()
      })
    });
    console.log('Status:', res.status);
    const json = await res.json();
    console.log('Result:', json);
  } catch(e) {
    console.error('Error:', e);
  }
}

setupJsonBin();
