async function test() {
  try {
    console.log('Testing CounterAPI v2...');
    const res = await fetch('https://api.counterapi.dev/v2/adidev_export_sync_v2/up');
    const data = await res.json();
    console.log('CounterAPI v2 result:', data);
  } catch(e) {
    console.error('CounterAPI error:', e);
  }
}

test();
