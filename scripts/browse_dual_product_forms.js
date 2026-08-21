import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runDualProductFormsInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 980 } });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Unlock Admin Mode
  const adminBtn = await page.$('.header-actions button:has-text("🔐")');
  if (adminBtn) {
    await adminBtn.click();
    await page.waitForTimeout(400);

    const pinInput = await page.$('.modal-card input[type="password"]');
    if (pinInput) {
      await pinInput.fill('1234');
      await page.click('.modal-card button[type="submit"]');
      await page.waitForTimeout(500);
    }
  }

  // Open Product Modal
  await page.evaluate(() => {
    const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Product') || b.textContent.includes('ઉત્પાદન'));
    if (addBtn) addBtn.click();
  });
  await page.waitForTimeout(600);

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';

  // Screenshot 1: Sub-Product Form
  const ssPathSub = path.join(artifactDir, 'form_distinct_sub_product.png');
  await page.screenshot({ path: ssPathSub });
  console.log(`📸 Saved Sub-Product Form Screenshot: ${ssPathSub}`);

  // Switch to Main Category Form Tab
  const mainTabBtn = await page.$('button:has-text("1. Main Category Form")');
  if (mainTabBtn) {
    await mainTabBtn.click();
    await page.waitForTimeout(400);
  }

  // Screenshot 2: Main Product Category Form
  const ssPathMain = path.join(artifactDir, 'form_distinct_main_category.png');
  await page.screenshot({ path: ssPathMain });
  console.log(`📸 Saved Main Category Form Screenshot: ${ssPathMain}`);

  await browser.close();
  console.log('✅ Dual Product Forms Inspection Completed Successfully!');
}

runDualProductFormsInspection().catch(err => {
  console.error('❌ Error during dual product forms inspection:', err);
  process.exit(1);
});
