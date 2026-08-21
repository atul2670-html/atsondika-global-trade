import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runSubProductFormInspection() {
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
  const ssPath = path.join(artifactDir, 'updated_subproduct_form.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved Updated Sub-Product Form Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ Sub-Product Form Inspection Completed Successfully!');
}

runSubProductFormInspection().catch(err => {
  console.error('❌ Error during subproduct form inspection:', err);
  process.exit(1);
});
