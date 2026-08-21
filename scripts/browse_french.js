import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runFrenchInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Open language menu and click French (Français)
  await page.click('.lang-btn');
  await page.waitForTimeout(300);
  
  // Click the last lang item (French)
  const langItems = await page.$$('.lang-item');
  if (langItems.length >= 4) {
    await langItems[3].click();
  }
  await page.waitForTimeout(500);

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';
  const ssPath = path.join(artifactDir, 'site_french_header.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved French Header Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ French Inspection Completed Successfully!');
}

runFrenchInspection().catch(err => {
  console.error('❌ Error during French inspection:', err);
  process.exit(1);
});
