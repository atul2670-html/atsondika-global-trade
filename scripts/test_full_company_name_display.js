import { chromium } from '@playwright/test';

async function testFullCompanyNameDisplay() {
  console.log('🚀 Testing Full Company Name Display (No Ellipsis)...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // Take screenshot of main company name in header
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/full_company_name_adidev_smart_solution.png' });

  // Unlock admin mode
  const adminLoginBtn = await page.$('button:has-text("Admin Login"), .admin-login-btn');
  if (adminLoginBtn) {
    await adminLoginBtn.click();
    await page.waitForTimeout(400);
    const passInput = await page.$('input[type="password"]');
    if (passInput) {
      await passInput.fill('Aip261970@');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(600);
      console.log('✅ Admin Mode Unlocked');
    }
  }

  // Click company switcher
  const switcherBtn = await page.$('button:has-text("ADIDEV")');
  if (switcherBtn) {
    await switcherBtn.click();
    await page.waitForTimeout(400);

    // Click company 2: ADIDEV AGRO EXPORTS & COMMODITIES
    const agroBtn = await page.$('button.admin-company-item:has-text("AGRO")');
    if (agroBtn) {
      await agroBtn.click();
      await page.waitForTimeout(500);
      console.log('✅ Switched to ADIDEV AGRO EXPORTS & COMMODITIES');
    }
  }

  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/full_company_name_adidev_agro.png' });

  await browser.close();
  console.log('✅ All Full Company Name Display Tests Complete!');
}

testFullCompanyNameDisplay().catch(console.error);
