import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runCleanedTabsInspection() {
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
  const ssPath = path.join(artifactDir, 'cleaned_category_tabs.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved Cleaned Category Tabs Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ Cleaned Category Tabs Inspection Completed Successfully!');
}

runCleanedTabsInspection().catch(err => {
  console.error('❌ Error during category tabs inspection:', err);
  process.exit(1);
});
