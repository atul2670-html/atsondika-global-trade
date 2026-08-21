async function test() {
  try {
    console.log('Testing GitHub Gist API...');
    const res = await fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'AdidevExportApp'
      },
      body: JSON.stringify({
        description: 'Adidev Realtime Cloud Sync Store',
        public: true,
        files: {
          'store.json': {
            content: JSON.stringify({ test: 'ok', updatedAt: Date.now() })
          }
        }
      })
    });
    const data = await res.json();
    console.log('Gist result:', data.id, data.html_url);
  } catch(e) {
    console.error('Gist error:', e);
  }
}

test();
