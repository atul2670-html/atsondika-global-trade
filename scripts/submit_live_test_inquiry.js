import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve('c:/Users/patel/Software/import-export-website/data/store.json');

async function submitLiveTestInquiry() {
  console.log('🚀 Raising new Live Test Inquiry from Importer...');

  // Create new realistic live customer inquiry
  const newInquiry = {
    id: `cust-${Date.now()}-live-test`,
    name: 'Dubai International Food Imports LLC (Mr. Rashid Al-Mansoori)',
    phone: '+971 50 987 6543',
    email: 'rashid@dubaifoodimports.ae',
    companyName: 'Dubai International Food Imports LLC',
    city: 'Dubai',
    country: 'United Arab Emirates',
    registeredAt: new Date().toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    inquiriesCount: 1,
    notes: '🔴 LIVE TEST INQUIRY: Urgent Quotation Required for 100 MT Premium 1121 Parboiled Basmati Rice & 25 MT Bold Cumin Seeds to Jebel Ali Port, Dubai.'
  };

  // Read existing data from store.json
  let existingData = {};
  if (fs.existsSync(DATA_FILE)) {
    try {
      existingData = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    } catch (e) {}
  }

  const existingCustomerList = Array.isArray(existingData.customerList) ? existingData.customerList : [];
  
  // Add new inquiry at top of list
  const updatedCustomerList = [newInquiry, ...existingCustomerList];

  const payload = {
    ...existingData,
    customerList: updatedCustomerList,
    updatedAt: Date.now()
  };

  // Try POSTing to live server endpoints on 8080 and 8081 first
  let postedSuccess = false;
  for (const port of [8080, 8081]) {
    try {
      const response = await fetch(`http://localhost:${port}/api/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        console.log(`✅ Successfully submitted inquiry via Live Server on port ${port}!`);
        postedSuccess = true;
        break;
      }
    } catch (err) {}
  }

  // Also write directly to store.json to ensure persistence
  fs.writeFileSync(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
  console.log('✅ Wrote live inquiry directly to data/store.json!');
  console.log('📋 New Inquiry Details:');
  console.log('----------------------------------------------------');
  console.log('👤 Name:', newInquiry.name);
  console.log('🏢 Company:', newInquiry.companyName);
  console.log('📞 Contact:', newInquiry.phone, '|', newInquiry.email);
  console.log('📍 Location:', newInquiry.city, ',', newInquiry.country);
  console.log('📝 Message:', newInquiry.notes);
  console.log('----------------------------------------------------');
}

submitLiveTestInquiry().catch(console.error);
