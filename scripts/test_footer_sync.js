import { chromium } from '@playwright/test';

async function testFooterSync() {
  console.log('🚀 Testing Header & Footer Dynamic Sync across Company Profiles...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
  const page = await context.newPage();

  page.on('dialog', async dialog => {
    await dialog.accept('Aip261970@');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1500);

  // 1. Admin Login
  const adminBtn = await page.$('button:has-text("Admin Login")');
  if (adminBtn) {
    await adminBtn.click();
    await page.waitForTimeout(400);
    const passInput = await page.$('input[placeholder*="Password"]');
    if (passInput) {
      await passInput.fill('Aip261970@');
      const submit = await page.$('button:has-text("Unlock Admin Access")');
      if (submit) await submit.click();
      await page.waitForTimeout(500);
    }
  }

  // 2. Open Company Switcher
  const switcher = await page.$('button:has-text("ADIDEV")');
  if (switcher) {
    await switcher.click();
    await page.waitForTimeout(300);

    // Switch to Sister Company #4 (ECO PACKAGING & JUTE BAGS)
    const company4 = await page.$('button:has-text("ADIDEV ECO PACKAGING")');
    if (company4) {
      console.log('🏢 Switching to ADIDEV ECO PACKAGING & JUTE BAGS...');
      await company4.click();
      await page.waitForTimeout(600);
    }
  }

  // 3. Take Header screenshot
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/header_after_company_switch.png' });

  // 4. Scroll to Footer and take screenshot
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/footer_after_company_switch.png' });

  await browser.close();
  console.log('✅ Footer Sync Test Complete!');
}

testFooterSync().catch(console.error);
