import { chromium } from '@playwright/test';

async function testAddProductAllCompanies() {
  console.log('🧪 Testing Adding Sub-Product across ALL 4 Companies...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 950 } });
  const page = await context.newPage();

  await page.addInitScript(() => {
    localStorage.setItem('admin_access_unlocked_v1', 'true');
  });

  await page.goto('http://localhost:8082');
  await page.waitForTimeout(1000);

  const companies = [
    { id: 'comp_1', name: 'ADIDEV SMART SOLUTION' },
    { id: 'comp_2', name: 'ADIDEV AGRO EXPORTS & COMMODITIES' },
    { id: 'comp_3', name: 'ADIDEV INDUSTRIAL' },
    { id: 'comp_4', name: 'Shree System Tec' }
  ];

  for (const comp of companies) {
    console.log(`\n🏢 Testing Company: ${comp.name} (${comp.id})`);

    // Switch company
    await page.evaluate((cId) => {
      const btn = document.querySelector('.company-badge-btn');
      if (btn) btn.click();
    }, comp.id);
    await page.waitForTimeout(500);

    await page.evaluate((cName) => {
      const btns = Array.from(document.querySelectorAll('.admin-dropdown-btn'));
      const match = btns.find(b => b.textContent.includes(cName));
      if (match) match.click();
    }, comp.name);
    await page.waitForTimeout(1000);

    // Click "+ Add Sub-Product" button
    console.log(`Clicking + Add Sub-Product for ${comp.name}...`);
    const addBtn = await page.$('button:has-text("Add Sub-Product")');
    if (addBtn) {
      await addBtn.click();
      await page.waitForTimeout(800);

      // Fill out form
      await page.fill('input[placeholder*="ટેક્ષટાઈલ"], input[placeholder*="એગ્રો"]', `ટેસ્ટ પ્રોડક્ટ - ${comp.name}`);
      await page.fill('input[placeholder*="Textile"], input[placeholder*="Agro"]', `Test Product - ${comp.name}`);

      // Fill HS Code
      const hsInputs = await page.$$('input[placeholder*="6-Digit"]');
      if (hsInputs.length > 0) {
        await hsInputs[0].fill('847130');
      }

      // Handle dialog auto-accept
      page.once('dialog', async dialog => {
        console.log(`Dialog message for ${comp.name}:`, dialog.message());
        await dialog.accept();
      });

      // Submit form
      const saveBtn = await page.$('button:has-text("Save Product")');
      if (saveBtn) {
        await saveBtn.click();
        await page.waitForTimeout(1000);
      }

      // Check if product is visible on screen
      const isVisible = await page.evaluate((cName) => {
        return document.body.textContent.includes(`Test Product - ${cName}`);
      }, comp.name);

      console.log(`Result for ${comp.name}: Saved & Visible = ${isVisible}`);
    } else {
      console.log(`⚠️ Could not find + Add Sub-Product button for ${comp.name}`);
    }
  }

  await browser.close();
  console.log('\n✅ Add Product Test Complete!');
}

testAddProductAllCompanies().catch(console.error);
