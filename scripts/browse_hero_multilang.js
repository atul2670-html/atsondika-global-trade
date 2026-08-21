import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runHeroMultiLangInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 950 } });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Open Language Menu and select Gujarati (ગુજરાતી)
  await page.click('.lang-btn');
  await page.waitForTimeout(300);
  await page.click('.lang-item:has-text("ગુજરાતી")');
  await page.waitForTimeout(500);

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';
  const ssPathGu = path.join(artifactDir, 'hero_note_gujarati.png');
  await page.screenshot({ path: ssPathGu });
  console.log(`📸 Saved Hero Gujarati Note Screenshot: ${ssPathGu}`);

  // Open Language Menu and select Hindi (हिन्दी)
  await page.click('.lang-btn');
  await page.waitForTimeout(300);
  await page.click('.lang-item:has-text("हिन्दी")');
  await page.waitForTimeout(500);

  const ssPathHi = path.join(artifactDir, 'hero_note_hindi.png');
  await page.screenshot({ path: ssPathHi });
  console.log(`📸 Saved Hero Hindi Note Screenshot: ${ssPathHi}`);

  await browser.close();
  console.log('✅ Hero Multi-Language Inspection Completed Successfully!');
}

runHeroMultiLangInspection().catch(err => {
  console.error('❌ Error during hero multi-lang inspection:', err);
  process.exit(1);
});
