import { chromium } from '@playwright/test';

async function testMultiCompanyDataIsolation() {
  console.log('🚀 Testing Multi-Company Products & Certifications Isolation...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  page.on('dialog', async dialog => {
    await dialog.accept('Aip261970@');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Screenshot comp_1 (ADIDEV SMART SOLUTION)
  await page.evaluate(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/comp1_products.png' });

  // 2. Unlock Admin
  const adminBtn = await page.$('button:has-text("Admin Login")');
  if (adminBtn) {
    await adminBtn.click();
    await page.waitForTimeout(300);
    const passInput = await page.$('input[placeholder*="Password"]');
    if (passInput) {
      await passInput.fill('Aip261970@');
      const submit = await page.$('button:has-text("Unlock Admin Access")');
      if (submit) await submit.click();
      await page.waitForTimeout(500);
    }
  }

  // 3. Switch to Sister Company 2 (ADIDEV AGRO EXPORTS & COMMODITIES)
  const compDropdown = await page.$('.header-actions button:has-text("ADIDEV")');
  if (compDropdown) {
    await compDropdown.click();
    await page.waitForTimeout(300);
    const sisterItem = await page.$('button:has-text("ADIDEV AGRO EXPORTS")');
    if (sisterItem) {
      await sisterItem.click();
      await page.waitForTimeout(600);
    }
  }

  // 4. Screenshot comp_2 products (Should show clean company empty state with Add buttons!)
  await page.evaluate(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/comp2_empty_products.png' });

  // 5. Screenshot comp_2 certificates (Should show clean company empty state with Add Cert button!)
  await page.evaluate(() => {
    const el = document.getElementById('quality');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(400);
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/comp2_empty_certs.png' });

  await browser.close();
  console.log('✅ Multi-Company Products & Certifications Test Complete!');
}

testMultiCompanyDataIsolation().catch(console.error);
