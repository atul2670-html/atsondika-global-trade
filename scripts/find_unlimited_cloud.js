async function findWorkingCloud() {
  console.log('Testing multiple high-capacity cloud storage APIs...');

  // Provider 1: jsonbin.io public request
  try {
    const res = await fetch('https://api.jsonbin.io/v3/b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Bin-Private': 'false'
      },
      body: JSON.stringify({ app: 'adidev', test: 'ok', updatedAt: Date.now() })
    });
    console.log('jsonbin.io status:', res.status);
    const json = await res.json().catch(() => null);
    console.log('jsonbin.io response:', json);
  } catch(e) { console.log('jsonbin error:', e.message); }

  // Provider 2: api.npoint.io creation
  try {
    const res = await fetch('https://api.npoint.io/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app: 'adidev', test: 'ok' })
    });
    console.log('npoint status:', res.status);
  } catch(e) { console.log('npoint error:', e.message); }
}

findWorkingCloud();
