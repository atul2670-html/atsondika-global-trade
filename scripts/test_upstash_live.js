import fs from 'fs';

async function testUpstashLive() {
  console.log('⚡ Testing Real-time High-Speed Cloud Sync Engine...');

  // Free Upstash Edge REST Endpoint (Sub-millisecond global sync)
  const UPSTASH_URL = 'https://suited-salmon-45094.upstash.io/set/adidev_export_live_store';
  const UPSTASH_GET = 'https://suited-salmon-45094.upstash.io/get/adidev_export_live_store';
  const UPSTASH_TOKEN = 'AcAmACQgNDg5MGNmNzUtYTVhMi00ZGU4LTg5YjItN2M4NzcyZWI4NTExYTIxZDZkNzVjNTllNGRhYTg5YTgxZDU5MDRmMTI2N2M=';

  const raw = JSON.parse(fs.readFileSync('c:/Users/patel/Software/import-export-website/data/store.json', 'utf8'));

  const cleanStore = {
    companiesList: raw.companiesList,
    customProductsList: raw.customProductsList || [],
    photoOverrides: raw.photoOverrides || {},
    customerList: raw.customerList || [],
    branchesList: raw.branchesList || [],
    certificatesList: raw.certificatesList || [],
    freightRoutesList: raw.freightRoutesList || [],
    updatedAt: Date.now()
  };

  const payloadStr = JSON.stringify(cleanStore);
  console.log('Payload size:', Math.round(payloadStr.length / 1024), 'KB');

  try {
    console.log('POSTing to Global Cloud Edge...');
    const postRes = await fetch(UPSTASH_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UPSTASH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: payloadStr
    });
    const postData = await postRes.json();
    console.log('Cloud POST Status:', postRes.status, 'Response:', postData);

    console.log('GETting from Global Cloud Edge...');
    const getRes = await fetch(UPSTASH_GET, {
      headers: {
        'Authorization': `Bearer ${UPSTASH_TOKEN}`
      }
    });
    const getData = await getRes.json();
    console.log('Cloud GET Status:', getRes.status);
    if (getData && getData.result) {
      const parsed = typeof getData.result === 'string' ? JSON.parse(getData.result) : getData.result;
      console.log('⚡ FETCH SUCCESS! Products count:', parsed.customProductsList?.length, 'Companies count:', parsed.companiesList?.length);
    }
  } catch(e) {
    console.error('Cloud Sync Error:', e);
  }
}

testUpstashLive();
