async function testCounterV2() {
  try {
    const res = await fetch('https://api.counterapi.dev/v2/adidev_export_2026/up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'adidev' })
    });
    console.log('counter v2 status:', res.status);
    const json = await res.json().catch(() => null);
    console.log('counter v2 res:', json);
  } catch(e) {
    console.log('counter v2 err:', e.message);
  }
}

testCounterV2();
