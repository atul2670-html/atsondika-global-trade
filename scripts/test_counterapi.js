async function testCounter() {
  const name = 'adidev_store_' + Math.floor(Math.random() * 10000);
  try {
    // Up counter
    const res = await fetch(`https://api.counterapi.dev/v1/${name}/test/up`);
    console.log('counter status:', res.status);
    const json = await res.json().catch(() => null);
    console.log('counter res:', json);
  } catch(e) {
    console.log('counter err:', e.message);
  }
}

testCounter();
