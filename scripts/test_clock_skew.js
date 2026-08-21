import { pushGlobalCloudSync, pullGlobalCloudSync } from '../src/utils/realtimeSync.js';

async function testClockSkewScenario() {
  console.log('--- Simulating Desktop Edit ---');
  const desktopTime = Date.now();
  await pushGlobalCloudSync({
    customProductsList: [
      {
        id: 'punjabi_dress_comp4',
        names: { en: 'Sari and Garment Fabrics (Updated on Desktop)', gu: 'સાડી અને ગારમેન્ટ ફેબ્રિક્સ (અપડેટ)' },
        spec: { en: '100% Premium Export Quality Cotton, Terry Cotton & Polyester with Metallic Zari Thread Work', gu: '100% પ્રીમિયમ એક્સપોર્ટ કોટન' }
      }
    ],
    updatedAt: desktopTime
  });

  console.log('--- Simulating Laptop Polling Cloud Data ---');
  const cloudData = await pullGlobalCloudSync();
  console.log('Laptop Pulled Data from Cloud:');
  console.log('Cloud updatedAt:', cloudData?.updatedAt);
  console.log('Product Name on Cloud:', cloudData?.customProductsList?.[0]?.names?.en);
}

testClockSkewScenario();
