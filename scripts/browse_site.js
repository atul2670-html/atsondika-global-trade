import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function runBrowserInspection() {
  console.log('🚀 Launching Playwright Chromium Browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const consoleLogs = [];
  const pageErrors = [];

  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    console.log(`[BROWSER CONSOLE ${msg.type().toUpperCase()}]`, msg.text());
  });

  page.on('pageerror', err => {
    pageErrors.push(err.message || err.toString());
    console.error(`[BROWSER UNCAUGHT ERROR]`, err);
  });

  console.log('🌐 Navigating to http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });

  const artifactDir = 'C:\\Users\\patel\\.gemini\\antigravity-ide\\brain\\f19ad2a3-a179-48b3-870f-73bfbf5f2afb';
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  // 1. Initial Homepage Full Screenshot
  const ss1Path = path.join(artifactDir, 'site_homepage.png');
  await page.screenshot({ path: ss1Path, fullPage: true });
  console.log(`📸 Saved Homepage Screenshot: ${ss1Path}`);

  // Test tabs & category clicking
  const catButtons = await page.$$('.category-tab, .filter-chip');
  console.log(`Found ${catButtons.length} category tabs/chips`);
  for (let i = 0; i < Math.min(catButtons.length, 5); i++) {
    try {
      await catButtons[i].click();
      await page.waitForTimeout(300);
    } catch(e) {
      console.error('Click error:', e);
    }
  }

  // 2. Test Sea Freight Route Estimator Tab
  await page.evaluate(() => {
    const calcSec = document.getElementById('calc');
    if (calcSec) calcSec.scrollIntoView();
  });
  await page.waitForTimeout(500);

  const routeTabBtn = await page.$('button:has-text("Sea Freight Transit")');
  if (routeTabBtn) {
    await routeTabBtn.click();
    await page.waitForTimeout(400);
    const ss2Path = path.join(artifactDir, 'sea_freight_estimator_tab.png');
    await page.screenshot({ path: ss2Path });
    console.log(`📸 Saved Sea Freight Estimator Screenshot: ${ss2Path}`);
  }

  // 3. Test Proforma Invoice Generator Modal
  const proformaBtn = await page.$('.product-card button:has-text("Proforma Quote")');
  if (proformaBtn) {
    await proformaBtn.click();
    await page.waitForTimeout(500);
    const ss3Path = path.join(artifactDir, 'proforma_invoice_modal.png');
    await page.screenshot({ path: ss3Path });
    console.log(`📸 Saved Proforma Invoice Modal Screenshot: ${ss3Path}`);
  }

  const resultLog = {
    consoleLogs,
    pageErrors
  };
  fs.writeFileSync(path.join(artifactDir, 'inspection_log.json'), JSON.stringify(resultLog, null, 2));

  await browser.close();
  console.log('✅ Inspection Completed Successfully!');
}

runBrowserInspection().catch(err => {
  console.error('❌ Browser Inspection Error:', err);
  process.exit(1);
});

