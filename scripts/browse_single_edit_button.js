import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runSingleEditButtonInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 980 } });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Scroll to products section
  await page.evaluate(() => {
    const el = document.getElementById('products');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.waitForTimeout(600);

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';
  const ssPath = path.join(artifactDir, 'single_clean_edit_button_and_uncovered_hscode.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved Single Clean Edit Button Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ Single Clean Edit Button Inspection Completed Successfully!');
}

runSingleEditButtonInspection().catch(err => {
  console.error('❌ Error during single edit button inspection:', err);
  process.exit(1);
});
