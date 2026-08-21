import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runCurrencyInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  // Scroll to Calculator section
  await page.evaluate(() => {
    const calcSec = document.getElementById('calc');
    if (calcSec) calcSec.scrollIntoView();
  });
  await page.waitForTimeout(500);

  // Click Online Currency Converter tab
  const tabBtns = await page.$$('.tab-btn');
  if (tabBtns.length >= 2) {
    await tabBtns[1].click();
  }
  await page.waitForTimeout(600);

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\08998032-397c-4457-8a6d-64cbe50898b2';
  const ssPath = path.join(artifactDir, 'online_currency_calculator.png');
  await page.screenshot({ path: ssPath });
  console.log(`📸 Saved Online Currency Calculator Screenshot: ${ssPath}`);

  await browser.close();
  console.log('✅ Currency Inspection Completed Successfully!');
}

runCurrencyInspection().catch(err => {
  console.error('❌ Error during currency inspection:', err);
  process.exit(1);
});
