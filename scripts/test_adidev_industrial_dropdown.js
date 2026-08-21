import { chromium } from '@playwright/test';

async function testAdidevIndustrialDropdown() {
  console.log('🚀 Testing Company Profile Dropdown for ADIDEV INDUSTRIAL & Shree System Tec...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });

  page.on('dialog', async dialog => {
    await dialog.accept('Aip261970@');
  });

  await page.goto('http://localhost:8080');
  await page.waitForTimeout(1000);

  // 1. Unlock Admin
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

  // 2. Open Company Profile Dropdown
  const compDropdown = await page.$('.header-actions button:has-text("ADIDEV")');
  if (compDropdown) {
    await compDropdown.click();
    await page.waitForTimeout(400);
  }

  await page.screenshot({ path: 'C:/Users/patel/.gemini/antigravity-ide/brain/98fc078e-070c-49c0-83a4-118a59f1909f/adidev_industrial_dropdown.png' });

  await browser.close();
  console.log('✅ ADIDEV INDUSTRIAL Dropdown Test Complete!');
}

testAdidevIndustrialDropdown().catch(console.error);
