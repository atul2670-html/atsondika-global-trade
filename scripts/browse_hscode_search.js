import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runHsCodeSearchInspection() {
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

  // Open Sub-Product Modal
  await page.evaluate(() => {
    const addBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Product') || b.textContent.includes('ઉત્પાદન'));
    if (addBtn) addBtn.click();
  });
  await page.waitForTimeout(600);

  // Type in the Online HS Code Search Box
  const hsSearchInput = await page.$('input[placeholder*="Type product name to search HS Code"]');
  if (hsSearchInput) {
    await hsSearchInput.focus();
    await hsSearchInput.fill('Cumin');
    await page.waitForTimeout(500);
  }

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\f19ad2a3-a179-48b3-870f-73bfbf5f2afb';
  const ssPath = path.join(artifactDir, 'online_hscode_search_box.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved Online HS Code Search Box Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ Online HS Code Search Inspection Completed Successfully!');
}

runHsCodeSearchInspection().catch(err => {
  console.error('❌ Error during HS Code search inspection:', err);
  process.exit(1);
});
