async function checkUserFirebase() {
  const urls = [
    'https://atsondika-global-trade-default-rtdb.firebaseio.com/live_store.json',
    'https://atsondika-global-trade-default-rtdb.asia-southeast1.firebasedatabase.app/live_store.json',
    'https://atsondika-global-trade-default-rtdb.europe-west1.firebasedatabase.app/live_store.json'
  ];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      console.log(url, '--> status:', res.status);
      if (res.ok) console.log('Read success:', await res.json());
    } catch(e) {
      console.log(url, '--> err:', e.message);
    }
  }
}

checkUserFirebase();
