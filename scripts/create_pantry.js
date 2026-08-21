async function createPantry() {
  console.log('Creating free Pantry ID for Adidev Export...');
  try {
    const res = await fetch('https://getpantry.cloud/apiv1/pantry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Adidev Export Master Store',
        email: 'atul2670@gmail.com'
      })
    });
    const pantryId = await res.text();
    console.log('Pantry ID created:', pantryId);
  } catch(e) {
    console.error('Error creating pantry:', e);
  }
}

createPantry();
