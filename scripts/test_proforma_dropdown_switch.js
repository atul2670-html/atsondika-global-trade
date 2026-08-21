import { chromium } from '@playwright/test';

async function testProformaDropdownSwitch() {
  console.log('🏢 Testing Company Switcher Dropdown & Dynamic Proforma Invoice...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Click company selector dropdown in header
  const compMenuBtn = await page.$('.admin-company-btn');
  console.log('Found compMenuBtn:', !!compMenuBtn);
  if (compMenuBtn) {
    await compMenuBtn.click();
    await page.waitForTimeout(500);

    const items = await page.$$('.admin-company-item');
    console.log('Found admin-company-items count:', items.length);
    for (const item of items) {
      const text = await item.textContent();
      console.log('Item text:', text.trim());
      if (text.includes('ADIDEV SMART') || text.includes('ADIDEV AGRO')) {
        console.log('Clicking company option:', text.trim());
        await item.click();
        await page.waitForTimeout(1000);
        break;
      }
    }
  }

  // Open Proforma Invoice modal
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(600);

  const proformaBtn = await page.$('button[title="Generate Proforma Invoice / Export Quotation PDF"]');
  if (proformaBtn) {
    await proformaBtn.click();
    await page.waitForTimeout(1000);

    // Take screenshot of Proforma Invoice sheet for selected company
    await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/proforma_adidev_smart_dropdown.png' });
  }

  await browser.close();
  console.log('✅ Dropdown Switch Proforma Invoice Test Complete!');
}

testProformaDropdownSwitch().catch(console.error);
