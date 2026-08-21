import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runHeroImageMenuInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 950 } });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Click 3-dots ••• menu on Hero Image box
  const imgBtn = await page.$('.hero-img-box .img-options-btn');
  if (imgBtn) {
    await imgBtn.click();
    await page.waitForTimeout(400);

    // Enter PIN 1234 if prompted
    const pinInput = await page.$('.modal-card input[type="password"]');
    if (pinInput) {
      await pinInput.fill('1234');
      await page.click('.modal-card button[type="submit"]');
      await page.waitForTimeout(500);

      // Click 3-dots button again after admin unlock
      const imgBtn2 = await page.$('.hero-img-box .img-options-btn');
      if (imgBtn2) await imgBtn2.click();
      await page.waitForTimeout(500);
    }
  }

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';
  const ssPath = path.join(artifactDir, 'hero_image_3dots_options_menu.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved Hero Image 3-Dots Action Menu Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ Hero Image Action Menu Inspection Completed Successfully!');
}

runHeroImageMenuInspection().catch(err => {
  console.error('❌ Error during hero image menu inspection:', err);
  process.exit(1);
});
