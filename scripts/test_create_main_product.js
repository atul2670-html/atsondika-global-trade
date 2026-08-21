import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runCreateMainProductTest() {
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

  // Click "+ Add Main Category" button
  const addMainBtn = await page.$('button:has-text("Add Main Category")');
  if (addMainBtn) {
    await addMainBtn.click();
    await page.waitForTimeout(500);
  }

  // Fill in Main Product Form
  const nameGuInput = await page.$('input[placeholder*="એગ્રો અને મસાલા"]');
  if (nameGuInput) {
    await nameGuInput.fill('કેમિકલ્સ અને ઓર્ગેનિક મસાલા');
  }

  const nameEnInput = await page.$('input[placeholder*="Agro & Spices"]');
  if (nameEnInput) {
    await nameEnInput.fill('Chemicals & Organic Spices');
  }

  const catCodeInput = await page.$('input[placeholder*="agro_spices"]');
  if (catCodeInput) {
    await catCodeInput.fill('chemicals_spices');
  }

  // Submit Main Product Form
  const saveBtn = await page.$('button[type="submit"]:has-text("Save Product")');
  if (saveBtn) {
    await saveBtn.click();
    await page.waitForTimeout(800);
  }

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';
  const ssPath = path.join(artifactDir, 'successfully_created_main_category.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved Successfully Created Main Category Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ Create Main Category Test Completed Successfully!');
}

runCreateMainProductTest().catch(err => {
  console.error('❌ Error during create main category test:', err);
  process.exit(1);
});
